import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_AUDIO_PROGRESS, useAudioTimer } from './use-audio-timer'
import { changeSongTime } from '../utils/audio-tools'
import { parseInputValue } from '../utils/parsers'

const DEFAULT_VOLUME = 50

export default function useAudio({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)

  if (typeof src !== 'string') {
    console.error(`AUDIO ERROR: source not loaded, given: ${src}`)
  }

  const audio = useMemo(() => new Audio(src), [])
  const { songProgress, setSongProgress } = useAudioTimer({
    audio
  })

  useEffect(() => {
    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const toggleMusic = (event: KeyboardEvent) => {
      const MAIN_KEY_TRIGGER = ' '
      const { key } = event

      if (key === MAIN_KEY_TRIGGER) {
        setIsPlaying((prev) => !prev)
      }
    }

    window.addEventListener('keydown', toggleMusic)

    return () => {
      window.removeEventListener('keydown', toggleMusic)
    }
  }, [])

  useEffect(() => {
    const resetPlayer = () => {
      setSongProgress((prev) => ({ ...prev, ...DEFAULT_AUDIO_PROGRESS }))
      setIsPlaying(false)
    }

    audio.addEventListener('ended', resetPlayer)

    return () => {
      audio.removeEventListener('ended', resetPlayer)
    }
  }, [audio])

  useEffect(() => {
    audio.volume = volume / 100
  }, [volume])

  const toggleMusic = () => {
    if (audio && audio.readyState >= audio.HAVE_CURRENT_DATA) {
      setIsPlaying(!isPlaying)
    }
  }

  /**
   * Is expected a numeric value to 0 from 100
   */
  const updateSongTime = (inputValue: string) => {
    const parsedValue = parseInputValue(inputValue)

    if (!parsedValue) {
      return
    }

    changeSongTime({ currentProgress: parsedValue, audioInstance: audio })
    setSongProgress((prev) => ({ ...prev, percent: parsedValue }))
  }

  const updateVolume = useCallback((inputValue: string) => {
    const parsedValue = parseInputValue(inputValue)

    if (parsedValue) {
      setVolume(parsedValue)
    }
  }, [])

  return {
    song: {
      audio,
      progress: songProgress,
      volume,
      isPlaying
    },
    updateVolume,
    updateSongTime,
    toggleMusic
  }
}
