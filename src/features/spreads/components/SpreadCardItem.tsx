import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ReadingCard } from '../../../types/tarot'
import { CardBase } from '../../../components/atoms/CardBase'

interface SpreadCardItemProps {
  readingCard: ReadingCard
  index: number
}

import { useTarotStore } from '../../../store/tarotStore'

export const SpreadCardItem: React.FC<SpreadCardItemProps> = ({
  readingCard,
  index,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

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
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
            isDark
              ? 'text-amber-300 bg-purple-950/80 border-purple-500/30'
              : 'text-purple-900 bg-purple-100 border-purple-300'
          }`}>
            {t(`spreads.positions.${readingCard.positionName}`, {
              defaultValue: readingCard.positionName,
            })}
          </span>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
            {readingCard.position === 'upright' ? t('daily.upright') : t('daily.reversed')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-20 rounded-xl bg-slate-950 border border-purple-400/40 text-amber-300 overflow-hidden shrink-0 relative shadow-md">
            <img
              src={readingCard.card.image}
              alt={localizedName}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{localizedName}</h4>
            <p className={`text-xs font-medium line-clamp-2 mt-0.5 ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
              {localizedMeaning}
            </p>
          </div>
        </div>
      </CardBase>
    </motion.div>
  )
}
