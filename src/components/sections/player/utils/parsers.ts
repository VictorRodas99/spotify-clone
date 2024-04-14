export const parseInputValue = (inputValue: string) => {
  const parsedValue = Number(inputValue)

  if (isNaN(parsedValue)) {
    console.warn(
      `Player progress has a NaN value, given: ${inputValue}, expected a valid number`
    )
    return
  }

  if (parsedValue < 0 || parsedValue > 100) {
    console.warn('Player process needs a min value of 0 and a max value of 100')
  }

  return parsedValue
}
