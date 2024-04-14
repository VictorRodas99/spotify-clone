import ForwardLeftIcon from '@icons/ForwardLeft'
import ForwardRightIcon from '@icons/ForwardRight'
import PauseIcon from '@icons/PauseIcon'
import PlayIcon from '@icons/PlayIcon'
import SoundIcon, { VOLUME_MODE } from '@icons/SoundIcon'

import './input-styling.css'
import useAudio from './hooks/use-audio'
import useTrackProgress from './hooks/use-track-progress'

export function MainStateIcon({
  isPlaying,
  ...props
}: { isPlaying: boolean } & React.HTMLProps<SVGSVGElement>) {
  return isPlaying ? <PauseIcon {...props} /> : <PlayIcon {...props} />
}

export default function Player() {
  // TODO: register an event to play the music if the space key is pressed

  const { songProgress, playerHandler, isPlaying, setTrackProgress } = useAudio(
    {
      src: 'https://cdns-preview-1.dzcdn.net/stream/c-10d23ec5bf25dd292accac4d9ae240e6-4.mp3'
    }
  )
  const { trackProgressInputRef, setHoverColor, setDefaultColor } =
    useTrackProgress({ songProgress })

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
            {songProgress.current}
          </span>

          <input
            id="track-progress"
            ref={trackProgressInputRef}
            type="range"
            min={0}
            max={100}
            value={songProgress.percent}
            className="w-[70%] h-1 bg-light rounded-lg cursor-pointer"
            onMouseEnter={setHoverColor}
            onMouseLeave={setDefaultColor}
            onChange={(e) => setTrackProgress(e.target.value)}
          />
          <span className="w-[15%] text-[0.75rem] text-light text-center">
            {songProgress.total}
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
