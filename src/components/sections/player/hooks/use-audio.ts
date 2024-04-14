import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_AUDIO_PROGRESS, useAudioTimer } from './use-audio-timer'

export default function useAudio({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false)

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
    const resetPlayer = () => {
      setSongProgress((prev) => ({ ...prev, ...DEFAULT_AUDIO_PROGRESS }))
      setIsPlaying(false)
    }

    audio.addEventListener('ended', resetPlayer)

    return () => {
      audio.removeEventListener('ended', resetPlayer)
    }
  }, [audio])

  const playerHandler = () => {
    if (audio && audio.readyState >= audio.HAVE_CURRENT_DATA) {
      setIsPlaying(!isPlaying)
    }
  }

  /**
   * Is expected a numeric value to 0 from 100
   */
  const setTrackProgress = (inputValue: string) => {
    const parsedValue = Number(inputValue)

    if (isNaN(parsedValue)) {
      console.warn(
        `Player progress has a NaN value, given: ${inputValue}, expected a valid number`
      )
      return
    }

    if (parsedValue < 0 || parsedValue > 100) {
      console.warn(
        'Player process needs a min value of 0 and a max value of 100'
      )
    }

    setSongProgress((prev) => ({ ...prev, percent: parsedValue }))
  }

  return {
    audio,
    songProgress,
    isPlaying,
    playerHandler,
    setTrackProgress
  }
}
