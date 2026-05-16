interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)
  return (
    <div className="w-full h-1 bg-gray-100" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${current} of ${total}`}>
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
