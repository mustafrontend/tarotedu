import React from 'react'
import { motion } from 'framer-motion'
import { useTarotStore } from '../../store/tarotStore'

interface CardBaseProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverEffect?: boolean
}

export const CardBase: React.FC<CardBaseProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
}) => {
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, scale: 1.005 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`rounded-3xl p-5 border backdrop-blur-xl transition-all duration-200 ${
        isDark
          ? 'bg-slate-900/90 border-purple-500/30 text-white shadow-lg'
          : 'bg-white border-slate-200/80 text-slate-900 shadow-md hover:shadow-lg'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
