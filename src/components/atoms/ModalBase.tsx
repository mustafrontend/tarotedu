import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTarotStore } from '../../store/tarotStore'

interface ModalBaseProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

export const ModalBase: React.FC<ModalBaseProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = 'md',
}) => {
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 backdrop-blur-md ${isDark ? 'bg-slate-950/80' : 'bg-slate-900/60'}`}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl backdrop-blur-2xl z-10 p-5 sm:p-6 font-sans border transition-colors ${
              isDark
                ? 'bg-slate-950/95 text-white border-purple-500/40'
                : 'bg-white text-slate-900 border-slate-200 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-transparent z-10">
              {title ? (
                <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-purple-300 hover:text-white hover:bg-purple-900/50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
