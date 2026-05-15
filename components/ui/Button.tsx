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
        'rounded-xl px-4 py-3 font-semibold text-sm transition-opacity disabled:opacity-50',
        variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
        variant === 'outline' && 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
        variant === 'ghost' && 'text-blue-500 hover:bg-blue-50',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
