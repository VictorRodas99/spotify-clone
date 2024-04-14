export function changeSongTime({
  currentProgress,
  audioInstance
}: {
  currentProgress: number
  audioInstance: HTMLAudioElement
}) {
  const { duration } = audioInstance
  const updatedTime = (currentProgress * duration) / 100

  audioInstance.currentTime = updatedTime
}
