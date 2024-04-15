import ForwardLeftIcon from '@icons/ForwardLeft'
import ForwardRightIcon from '@icons/ForwardRight'
import PauseIcon from '@icons/PauseIcon'
import PlayIcon from '@icons/PlayIcon'
import SoundIcon from '@icons/SoundIcon'

import './input-styling.css'
import useAudio from './hooks/use-audio'
import SongProgressInput from './SongProgressInput'
import VolumeInput from './VolumeInput'

export function MainStateIcon({
  isPlaying,
  ...props
}: { isPlaying: boolean } & React.HTMLProps<SVGSVGElement>) {
  return isPlaying ? <PauseIcon {...props} /> : <PlayIcon {...props} />
}

export default function Player() {
  const { song, updateSongTime, updateVolume, toggleMusic } = useAudio({
    src: 'https://cdns-preview-1.dzcdn.net/stream/c-10d23ec5bf25dd292accac4d9ae240e6-4.mp3'
  })

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
              isPlaying={song.isPlaying}
              className="m-auto"
              onClick={toggleMusic}
            />
          </button>
          <button className="text-light hover:text-white">
            <ForwardRightIcon />
          </button>
        </div>
        <div className="group flex justify-center items-center w-full">
          {/* advanced media player controls */}
          <span className="w-[15%] text-[0.75rem] text-light text-center">
            {song.progress.current}
          </span>

          <SongProgressInput
            songProgress={song.progress}
            updateSongTime={updateSongTime}
          />

          <span className="w-[15%] text-[0.75rem] text-light text-center">
            {song.progress.total}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {/* volume, lyrics, list, etc */}
        <div className="flex gap-2 items-center">
          <SoundIcon volume={song.volume} />
          <VolumeInput volume={song.volume} updateVolume={updateVolume} />
        </div>
      </div>
    </section>
  )
}
