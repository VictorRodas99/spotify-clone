import { useEffect, useMemo, useRef, useState } from 'react'
import type useAudio from './use-audio'

const HOVER_STATUS = {
  noHover: 'no-hover',
  hovered: 'hovered'
} as const

type HoverStates = (typeof HOVER_STATUS)[keyof typeof HOVER_STATUS]

const getProgressColorCSS = (status: HoverStates, width: number) => {
  const mainColor =
    status === HOVER_STATUS.hovered ? 'var(--spotify-green)' : '#fff'

  return `linear-gradient(to right, ${mainColor} ${width}%, var(--color-light) ${width}%`
}

export default function useTrackProgress({
  songProgress
}: {
  songProgress: ReturnType<typeof useAudio>['songProgress']
}) {
  const trackProgressInputRef = useRef<HTMLInputElement>(null)

  const [inputHoverStatus, setInputProgressHoverStatus] = useState<HoverStates>(
    HOVER_STATUS.noHover
  )

  const inputProgressMainColor = useMemo(
    () => getProgressColorCSS(inputHoverStatus, songProgress.percent),
    [inputHoverStatus, songProgress.percent]
  )

  const setHoverColor = () => {
    setInputProgressHoverStatus(HOVER_STATUS.hovered)
  }

  const setDefaultColor = () => {
    setInputProgressHoverStatus(HOVER_STATUS.noHover)
  }

  useEffect(() => {
    const { current: input } = trackProgressInputRef

    if (input) {
      input.style.background = inputProgressMainColor
    }
  }, [songProgress.percent])

  useEffect(() => {
    const { current: input } = trackProgressInputRef

    if (input) {
      input.style.background = inputProgressMainColor
    }
  }, [inputHoverStatus])

  return {
    setHoverColor,
    setDefaultColor,
    trackProgressInputRef
  }
}
