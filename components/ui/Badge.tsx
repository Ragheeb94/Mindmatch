import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'blue' | 'green'
  className?: string
}

export function Badge({ label, variant = 'blue', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-xs font-semibold',
        variant === 'blue' && 'bg-blue-100 text-blue-500',
        variant === 'green' && 'bg-green-100 text-green-600',
        className
      )}
    >
      {label}
    </span>
  )
}
