import type useAudio from './hooks/use-audio'
import useInputRange from './hooks/use-input-range-colors'

interface VolumeInputProps {
  volume: ReturnType<typeof useAudio>['song']['volume']
  updateVolume: ReturnType<typeof useAudio>['updateVolume']
}

export default function VolumeInput({
  volume,
  updateVolume
}: VolumeInputProps) {
  const { inputRef, setHoverColor, setDefaultColor } = useInputRange({
    value: volume
  })

  return (
    <input
      id="volume"
      ref={inputRef}
      type="range"
      min={0}
      max={100}
      value={volume}
      onMouseEnter={setHoverColor}
      onMouseLeave={setDefaultColor}
      className="bg-light h-1 rounded-lg"
      onChange={(e) => updateVolume(e.target.value)}
    />
  )
}
