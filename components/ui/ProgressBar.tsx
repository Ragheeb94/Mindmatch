interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)
  return (
    <div className="h-1 w-full bg-white/25 rounded-full overflow-hidden">
      <div
        className="h-full bg-white rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
