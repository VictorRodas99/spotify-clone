import type IconProps from './types/icon-generic-type'

export default function PlayIcon({ className, size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size ?? 28}
      height={size ?? 28}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path>
    </svg>
  )
}
