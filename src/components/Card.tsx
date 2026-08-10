import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
}

export const Card = ({ children, className, onClick, interactive = false }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-slate-200/50',
        'transition-smooth',
        interactive && 'cursor-pointer hover:shadow-md hover:border-tarot-200 active:scale-95',
        className
      )}
    >
      {children}
    </div>
  )
}

interface TarotCardProps {
  name: string
  image?: string
  number?: number
  suit?: string
  isReversed?: boolean
  onClick?: () => void
}

export const TarotCard = ({ name, number, isReversed = false, onClick }: TarotCardProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-full aspect-[2/3] bg-gradient-to-br from-tarot-100 to-tarot-50',
        'border-2 border-tarot-200 rounded-lg shadow-lg',
        'flex flex-col items-center justify-between p-4',
        'cursor-pointer transition-smooth hover:shadow-xl hover:scale-105',
        'active:scale-95',
        isReversed && 'rotate-180 opacity-75'
      )}
    >
      <div className='text-2xl font-serif font-bold text-tarot-600'>
        {number !== undefined && `${number + 1}`}
      </div>
      <div className='text-center'>
        <h3 className='font-serif text-xl font-semibold text-tarot-800 mb-2'>{name}</h3>
        <div className='text-xs text-tarot-500 font-medium'>
          {isReversed ? 'REVERSED' : 'UPRIGHT'}
        </div>
      </div>
      <div className='text-3xl opacity-50'>✨</div>
    </div>
  )
}
