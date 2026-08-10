import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Layers } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { Button } from '../../../components/atoms/Button'

interface SpreadIntroCardProps {
  nameKey: string
  count: number
  onDrawSpread: () => void
}

import { useTarotStore } from '../../../store/tarotStore'

export const SpreadIntroCard: React.FC<SpreadIntroCardProps> = ({
  nameKey,
  count,
  onDrawSpread,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <CardBase hoverEffect={false} className="text-center p-8 space-y-4">
      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg border ${
        isDark
          ? 'bg-purple-950/60 border-purple-500/30 text-purple-300 shadow-purple-950/50'
          : 'bg-purple-100 border-purple-200 text-purple-700 shadow-purple-100'
      }`}>
        <Layers className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(nameKey)}</h3>
        <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
          {t('spreads.spreadDescription', { count })}
        </p>
      </div>
      <Button variant="mystic" size="lg" onClick={onDrawSpread}>
        <Sparkles className="w-4 h-4 mr-2" />
        <span>{t('spreads.drawCards')}</span>
      </Button>
    </CardBase>
  )
}
