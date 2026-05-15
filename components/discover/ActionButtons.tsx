'use client'

interface ActionButtonsProps {
  onSkip: () => void
  onInfo: () => void
  onSave: () => void
  disabled?: boolean
}

export function ActionButtons({ onSkip, onInfo, onSave, disabled }: ActionButtonsProps) {
  const btnBase = 'w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold disabled:opacity-40 press-scale'

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={onSkip}
        disabled={disabled}
        className={`${btnBase} bg-white shadow-md text-red-400`}
        aria-label="Skip"
      >
        ✕
      </button>
      <button
        onClick={onInfo}
        disabled={disabled}
        className={`${btnBase} bg-white shadow-md text-gray-400`}
        aria-label="More info"
      >
        ℹ
      </button>
      <button
        onClick={onSave}
        disabled={disabled}
        className={`${btnBase} bg-blue-500 shadow-md text-white`}
        aria-label="Save"
      >
        ♡
      </button>
    </div>
  )
}
