import type IconProps from './types/icon-generic-type'

export const VOLUME_MODE = {
  high: 70,
  mid: 40,
  low: 20,
  no: 1
} as const

export default function SoundIcon({
  volume,
  ...props
}: IconProps & { volume: number }) {
  if (typeof volume !== 'number' || isNaN(volume)) {
    throw new Error(
      `Invalid volume mode, given ${volume}, expected this range of volumes: ${Object.values(
        VOLUME_MODE
      ).join(', ')}`
    )
  }

  if (volume === VOLUME_MODE.no) {
    return <NoVolumeSound {...props} />
  }

  if (volume >= VOLUME_MODE.high) {
    return <HighVolumeIcon {...props} />
  }

  if (volume >= VOLUME_MODE.mid) {
    return <MidVolumeIcon {...props} />
  }

  if (volume <= VOLUME_MODE.low || volume < VOLUME_MODE.mid) {
    return <LowVolumeIcon {...props} />
  }
}

export function HighVolumeIcon({ className, size, ...props }: IconProps) {
  return (
    <svg
      role="presentation"
      aria-label="high-volumen"
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      width={size ?? 16}
      height={size ?? 16}
      className={className}
      {...props}
    >
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
      <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
    </svg>
  )
}

export function MidVolumeIcon({ className, size, ...props }: IconProps) {
  return (
    <svg
      role="presentation"
      aria-label="mid-volumen"
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      width={size ?? 16}
      height={size ?? 16}
      className={className}
      {...props}
    >
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
    </svg>
  )
}

export function LowVolumeIcon({ className, size, ...props }: IconProps) {
  return (
    <svg
      role="presentation"
      aria-label="low-volumen"
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      width={size ?? 16}
      height={size ?? 16}
      className={className}
      {...props}
    >
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    </svg>
  )
}

export function NoVolumeSound({ className, size, ...props }: IconProps) {
  return (
    <svg
      role="presentation"
      aria-label="no-volume"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width={size ?? 16}
      height={size ?? 16}
      fill="currentColor"
      {...props}
    >
      <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
      <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
    </svg>
  )
}
