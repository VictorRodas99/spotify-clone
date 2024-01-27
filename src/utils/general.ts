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
