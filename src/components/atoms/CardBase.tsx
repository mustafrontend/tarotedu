import React from 'react'
import { motion } from 'framer-motion'

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
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, scale: 1.005 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`bg-slate-900/90 rounded-3xl p-5 border-[0.5px] border-purple-500/30 text-white shadow-lg backdrop-blur-xl transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
