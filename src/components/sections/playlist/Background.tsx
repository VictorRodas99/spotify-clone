import { usePalette } from 'react-palette'
import '@css/bg-noise.css'

/**
 * This only works if the image source is from the same server.
 * Use astro component to avoid CORS error
 */
export default function BackgroundColor({
  coverSource
}: {
  coverSource: string
}) {
  const { data } = usePalette(coverSource)

  return (
    <>
      <div
        className="absolute inset-0 h-[320px] bg-context"
        style={{ ['--context-color' as string]: `${data.darkVibrant ?? '#121212'}` }}
      ></div>
      <div className="bg-noise w-full h-full absolute inset-0"></div>
    </>
  )
}
