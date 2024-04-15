import type useAudio from './hooks/use-audio'
import useInputRange from './hooks/use-input-range-colors'

interface SongProgressProps {
  songProgress: ReturnType<typeof useAudio>['song']['progress']
  updateSongTime: ReturnType<typeof useAudio>['updateSongTime']
}

export default function SongProgressInput({
  songProgress,
  updateSongTime
}: SongProgressProps) {
  const { inputRef, setHoverColor, setDefaultColor } = useInputRange({
    value: songProgress.percent
  })

  return (
    <input
      id="track-progress"
      ref={inputRef}
      type="range"
      min={0}
      max={100}
      value={songProgress.percent}
      className="w-[70%] h-1 bg-light rounded-lg cursor-pointer"
      onMouseEnter={setHoverColor}
      onMouseLeave={setDefaultColor}
      onChange={(e) => updateSongTime(e.target.value)}
    />
  )
}
