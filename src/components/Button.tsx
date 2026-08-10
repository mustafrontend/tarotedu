import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'font-medium rounded-lg transition-smooth inline-flex items-center justify-center gap-2',
          variant === 'primary' && 'bg-gradient-to-r from-tarot-500 to-tarot-600 text-white hover:shadow-lg active:scale-95',
          variant === 'secondary' && 'bg-mystical-gold text-mystical-dark hover:bg-opacity-90 active:scale-95',
          variant === 'outline' && 'border-2 border-tarot-500 text-tarot-600 hover:bg-tarot-50 active:scale-95',
          variant === 'ghost' && 'text-tarot-600 hover:bg-tarot-50 active:scale-95',
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2.5 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {isLoading && <span className='animate-spin'>⏳</span>}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
