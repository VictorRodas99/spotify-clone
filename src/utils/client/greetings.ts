export default function createGreeting(currentTime: number) {
  if (currentTime < 12 || isNaN(currentTime)) {
    return 'Buenos días'
  } else if (currentTime >= 19) {
    return 'Buenas noches'
  } else {
    return 'Buenas tardes'
  }
}
