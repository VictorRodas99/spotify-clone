export const getFormattedTime = (seconds: number, getOnlySeconds = false) => {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    throw new Error('given time must be a valid number')
  }

  const currentMinutes = Math.floor(seconds / 60)
  const currentSeconds = Math.floor(seconds % 60)

  return getOnlySeconds
    ? { currentMinutes, currentSeconds }
    : {
        currentMinutes: currentMinutes.toString().padStart(2, '0'),
        currentSeconds: currentSeconds.toString().padStart(2, '0')
      }
}
