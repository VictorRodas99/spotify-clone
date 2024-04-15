import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

export default function useInputRange({ value }: { value: number }) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [inputHoverStatus, setInputProgressHoverStatus] = useState<HoverStates>(
    HOVER_STATUS.noHover
  )

  const inputProgressMainColor = useMemo(
    () => getProgressColorCSS(inputHoverStatus, value),
    [inputHoverStatus, value]
  )

  const setHoverColor = useCallback(() => {
    setInputProgressHoverStatus(HOVER_STATUS.hovered)
  }, [])

  const setDefaultColor = useCallback(() => {
    setInputProgressHoverStatus(HOVER_STATUS.noHover)
  }, [])

  useEffect(() => {
    const { current: input } = inputRef

    if (input) {
      input.style.background = inputProgressMainColor
    }
  }, [value])

  useEffect(() => {
    const { current: input } = inputRef

    if (input) {
      input.style.background = inputProgressMainColor
    }
  }, [inputHoverStatus])

  return {
    setHoverColor,
    setDefaultColor,
    inputRef
  }
}
