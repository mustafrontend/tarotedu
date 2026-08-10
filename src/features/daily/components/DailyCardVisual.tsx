import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import { TarotCard, CardPosition } from '../../../types/tarot'

interface DailyCardVisualProps {
  drawnCard: TarotCard
  position: CardPosition
  localizedName: string
}

export const DailyCardVisual: React.FC<DailyCardVisualProps> = ({
  drawnCard,
  position,
  localizedName,
}) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ rotateY: 90 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-44 h-72 rounded-3xl bg-slate-950 border-2 border-amber-400/40 text-amber-300 overflow-hidden shadow-2xl flex flex-col justify-between shrink-0 relative ${
        position === 'reversed' ? 'rotate-180' : ''
      }`}
    >
      {drawnCard.videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src={drawnCard.videoUrl}
        />
      ) : null}

      <div className="relative z-10 p-4 flex flex-col justify-between h-full bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent">
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <span>#{drawnCard.number}</span>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-center my-auto space-y-1">
          <h4 className="text-sm font-black text-white leading-tight drop-shadow-md">
            {localizedName}
          </h4>
        </div>
        <div className="text-[10px] text-amber-300 text-center font-bold tracking-widest uppercase">
          {t('daily.deckName')}
        </div>
      </div>
    </motion.div>
  )
}
