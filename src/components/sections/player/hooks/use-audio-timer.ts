import { useEffect, useState } from 'react'
import { getFormattedTime } from '../utils/time-tools'

export const DEFAULT_AUDIO_PROGRESS = {
  current: '00:00',
  total: '00:00',
  percent: 0
}

export function useAudioTimer({ audio }: { audio: HTMLAudioElement }) {
  const [songProgress, setSongProgress] = useState(DEFAULT_AUDIO_PROGRESS)

  useEffect(() => {
    const setAudioDuration = () => {
      const { duration } = audio

      const totalMinutes = Math.floor(duration / 60)
        .toString()
        .padStart(2, '0')
      const totalSeconds = Math.floor(duration % 60)
        .toString()
        .padStart(2, '0')

      setSongProgress((prev) => ({
        ...prev,
        total: `${totalMinutes}:${totalSeconds}`
      }))
    }

    audio.addEventListener('loadeddata', setAudioDuration)

    return () => {
      audio.removeEventListener('loadeddata', setAudioDuration)
    }
  }, [audio])

  useEffect(() => {
    const updateAudioTimer = () => {
      const { currentTime, duration } = audio

      const { currentMinutes, currentSeconds } = getFormattedTime(currentTime)
      const progressInPercentFormat = (currentTime / duration) * 100

      setSongProgress((prev) => ({
        ...prev,
        current: `${currentMinutes}:${currentSeconds}`,
        percent: progressInPercentFormat
      }))
    }

    audio.addEventListener('timeupdate', updateAudioTimer)

    return () => {
      audio.removeEventListener('timeupdate', updateAudioTimer)
    }
  }, [audio])

  return {
    songProgress,
    setSongProgress
  }
}
