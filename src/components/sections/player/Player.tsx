import ForwardLeftIcon from '@icons/ForwardLeft'
import ForwardRightIcon from '@icons/ForwardRight'
import PauseIcon from '@icons/PauseIcon'
import PlayIcon from '@icons/PlayIcon'
import SoundIcon, { VOLUME_MODE } from '@icons/SoundIcon'

import { useEffect, useMemo, useRef, useState } from 'react'
import './input-styling.css'

export function MainStateIcon({
  isPlaying,
  ...props
}: { isPlaying: boolean } & React.HTMLProps<SVGSVGElement>) {
  return isPlaying ? <PauseIcon {...props} /> : <PlayIcon {...props} />
}

const DEFAULT_AUDIO_DURATION = {
  current: '00:00',
  total: '00:00',
  progress: 0
}

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [songDuration, setSongDuration] = useState(DEFAULT_AUDIO_DURATION)
  const audio = useMemo(
    () =>
      new Audio(
        'https://cdns-preview-1.dzcdn.net/stream/c-10d23ec5bf25dd292accac4d9ae240e6-4.mp3'
      ),
    []
  )

  // const audioContext = useMemo(() => new AudioContext(), [])
  const trackProgressInputRef = useRef<HTMLInputElement>(null)

  const [inputProgressHoverStatus, setInputProgressHoverStatus] = useState<
    'hovered' | 'no-hover'
  >('no-hover')
  const inputProgressMainColor = useMemo(() => {
    return inputProgressHoverStatus === 'hovered'
      ? `linear-gradient(to right, var(--spotify-green) ${songDuration.progress}%, var(--color-light) ${songDuration.progress}%`
      : `linear-gradient(to right, #fff ${songDuration.progress}%, var(--color-light) ${songDuration.progress}%`
  }, [inputProgressHoverStatus, songDuration.progress])

  useEffect(() => {
    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!trackProgressInputRef.current) {
      return
    }

    trackProgressInputRef.current.style.background = inputProgressMainColor
  }, [songDuration.progress])

  useEffect(() => {
    if (!trackProgressInputRef.current) {
      return
    }

    trackProgressInputRef.current.style.background = inputProgressMainColor
  }, [inputProgressHoverStatus])

  useEffect(() => {
    const updateInputProgress = () => {
      const { currentTime, duration } = audio

      const currentMinutes = Math.floor(currentTime / 60)
        .toString()
        .padStart(2, '0')
      const currentSeconds = Math.floor(currentTime % 60)
        .toString()
        .padStart(2, '0')

      const totalMinutes = Math.floor(duration / 60)
        .toString()
        .padStart(2, '0')
      const totalSeconds = Math.floor(duration % 60)
        .toString()
        .padStart(2, '0')

      const progress = (currentTime / duration) * 100

      setSongDuration((prev) => ({
        ...prev,
        current: `${currentMinutes}:${currentSeconds}`,
        total: `${totalMinutes}:${totalSeconds}`,
        progress
      }))
    }

    const resetInputProgress = () => {
      setSongDuration((prev) => ({ ...prev, ...DEFAULT_AUDIO_DURATION }))
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', updateInputProgress)
    audio.addEventListener('ended', resetInputProgress)

    return () => {
      audio.removeEventListener('timeupdate', updateInputProgress)
      audio.removeEventListener('ended', resetInputProgress)
    }
  }, [audio])

  const playerHandler = () => {
    if (audio && audio.readyState >= audio.HAVE_CURRENT_DATA) {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="grid grid-cols-3 gap-2 p-2">
      <div>
        {/* image, title, artist */}
        Current Song
        {/* like icon */}
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex gap-6 justify-center items-center">
          <button className="text-light hover:text-white">
            <ForwardLeftIcon />
          </button>
          <button className="rounded-full bg-white text-black w-8 h-8 hover:scale-105">
            <MainStateIcon
              isPlaying={isPlaying}
              className="m-auto"
              onClick={playerHandler}
            />
          </button>
          <button className="text-light hover:text-white">
            <ForwardRightIcon />
          </button>
        </div>
        <div className="group flex justify-center items-center w-full">
          {/* advanced media player controls */}
          <span className="w-[15%] text-[0.75rem] text-light text-center">
            {songDuration.current}
          </span>

          <input
            id="track-progress"
            ref={trackProgressInputRef}
            type="range"
            min={0}
            max={100}
            value={songDuration.progress}
            className="w-[70%] h-1 bg-light rounded-lg cursor-pointer"
            onMouseEnter={() => setInputProgressHoverStatus('hovered')}
            onMouseLeave={() => setInputProgressHoverStatus('no-hover')}
            onChange={(e) =>
              setSongDuration((prev) => ({
                ...prev,
                progress: Number(e.target.value)
              }))
            }
          />
          <span className="w-[15%] text-[0.75rem] text-light text-center">
            {songDuration.total}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {/* volume, lyrics, list, etc */}
        <div className="flex gap-2 items-center">
          <SoundIcon volume={VOLUME_MODE.high} />

          {/* TODO: style this */}
          <input
            id="volume"
            type="range"
            className="bg-light h-1 appearance-none rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
