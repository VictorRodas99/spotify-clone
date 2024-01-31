import Vibrant from 'node-vibrant'

export function getLocalHour() {
  return Number(
    new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit' })
  )
}

export function formatSeconds(
  seconds: number,
  options?: { stringify?: boolean }
) {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    console.error(
      'Invalid input, expected a non-negative number representing seconds'
    )
    return options?.stringify ? '0 min 0 s' : '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const parsedMinutes = String(minutes).padStart(2, '0')
  const parsedSeconds = String(remainingSeconds).padStart(2, '0')

  return options?.stringify
    ? `${parsedMinutes} min ${parsedSeconds} s`
    : `${parsedMinutes}:${parsedSeconds}`
}

interface Palette {
  primaryDarkColor: string
  secondaryDarkColor: string
  mutedColor: string
  primaryLightColor: string
  lightMutedColor: string
}
/**
 * Returns values as hex strings
 */
export async function getPaletteFromImage({
  source,
  colorFallback = '#000'
}: {
  source: string
  colorFallback?: string
}): Promise<Palette> {
  if (typeof source !== 'string') {
    console.error('Expected image source to be a string')

    return {
      primaryDarkColor: colorFallback,
      secondaryDarkColor: colorFallback,
      mutedColor: colorFallback,
      primaryLightColor: colorFallback,
      lightMutedColor: colorFallback
    }
  }

  const vibrant = new Vibrant(source)
  const palette = await vibrant.getPalette()

  return {
    primaryDarkColor: palette.Vibrant?.hex ?? colorFallback,
    secondaryDarkColor: palette.DarkVibrant?.hex ?? colorFallback,
    mutedColor: palette.Muted?.hex ?? colorFallback,
    primaryLightColor: palette.LightVibrant?.hex ?? colorFallback,
    lightMutedColor: palette.LightMuted?.hex ?? colorFallback
  }
}
