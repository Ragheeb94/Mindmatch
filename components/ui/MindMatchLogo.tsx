interface Props {
  size?: number
}

export function MindMatchLogo({ size = 48 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Blue rounded square — app icon background */}
      <rect width="48" height="48" rx="14" fill="#3B82F6" />

      {/* Left speech bubble */}
      <rect x="7" y="11" width="22" height="16" rx="5" fill="white" />
      <path d="M9 27 L5 34 L16 29" fill="white" />

      {/* Right speech bubble (offset, slightly smaller, overlapping) */}
      <rect x="19" y="20" width="22" height="16" rx="5" fill="white" opacity="0.65" />
      <path d="M39 36 L43 43 L32 38" fill="white" opacity="0.65" />
    </svg>
  )
}
