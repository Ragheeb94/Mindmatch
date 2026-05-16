import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'press-scale rounded-2xl px-5 py-4 font-bold text-base transition-opacity',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-blue-600 text-white',
        variant === 'outline' && 'border-2 border-blue-600 text-blue-600',
        variant === 'ghost' && 'text-blue-600',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
