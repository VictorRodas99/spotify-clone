export function getLocalHour() {
  return Number(
    new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit' })
  )
}
