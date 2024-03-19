import type IconProps from './types/icon-generic-type'

export default function PauseIcon({ className, size, ...props }: IconProps) {
  return (
    <svg
      role="img"
      height={size ?? 16}
      width={size ?? 16}
      className={className}
      aria-hidden="true"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
    </svg>
  )
}