import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { soundService } from '../../services/soundService'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'mystic'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  }

  const variantStyles = {
    primary:
      'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200 border-[0.5px] border-purple-500',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 border-[0.5px] border-slate-200/80',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 border-[0.5px] border-slate-300 shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    mystic:
      'bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white shadow-lg shadow-purple-200 border-[0.5px] border-purple-400',
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundService.playClick()
    if (onClick) onClick(e)
  }

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </motion.button>
  )
}
