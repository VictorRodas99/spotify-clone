---
interface Props {
  className?: string
  size?: number
}

const { className, size } = Astro.props
---

<svg
  viewBox="0 0 24 24"
  width={size ?? 28}
  height={size ?? 28}
  fill="currentColor"
  class={className}
  ><path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path></svg
>
