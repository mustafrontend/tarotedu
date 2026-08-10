import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ReadingCard } from '../../../types/tarot'
import { CardBase } from '../../../components/atoms/CardBase'

interface SpreadCardItemProps {
  readingCard: ReadingCard
  index: number
}

export const SpreadCardItem: React.FC<SpreadCardItemProps> = ({
  readingCard,
  index,
}) => {
  const { t } = useTranslation()
  const localizedName = t(`cards.${readingCard.card.id}.name`, readingCard.card.name)
  const localizedMeaning =
    readingCard.position === 'upright'
      ? t(`cards.${readingCard.card.id}.upright`, readingCard.card.meaning.upright)
      : t(`cards.${readingCard.card.id}.reversed`, readingCard.card.meaning.reversed)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <CardBase hoverEffect={false} className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-purple-950/80 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
            {t(`spreads.positions.${readingCard.positionName}`, {
              defaultValue: readingCard.positionName,
            })}
          </span>
          <span className="text-[10px] font-semibold text-purple-200">
            {readingCard.position === 'upright' ? t('daily.upright') : t('daily.reversed')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-20 rounded-xl bg-slate-950 border border-purple-400/40 text-amber-300 overflow-hidden shrink-0 shadow-md relative">
            {readingCard.card.videoUrl ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={readingCard.card.videoUrl}
              />
            ) : (
              <div className="w-full h-full p-1 text-center flex flex-col justify-between">
                <span className="text-[9px] font-mono font-bold">#{readingCard.card.number}</span>
                <span className="text-sm">🔮</span>
              </div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-black text-white">{localizedName}</h4>
            <p className="text-xs text-purple-100 font-medium line-clamp-2 mt-0.5">
              {localizedMeaning}
            </p>
          </div>
        </div>
      </CardBase>
    </motion.div>
  )
}
