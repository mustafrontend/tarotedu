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

export const SpreadIntroCard: React.FC<SpreadIntroCardProps> = ({
  nameKey,
  count,
  onDrawSpread,
}) => {
  const { t } = useTranslation()

  return (
    <CardBase hoverEffect={false} className="text-center p-8 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-purple-950/60 border border-purple-500/30 text-purple-300 flex items-center justify-center mx-auto shadow-lg shadow-purple-950/50">
        <Layers className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-black text-white">{t(nameKey)}</h3>
        <p className="text-xs text-slate-300 max-w-sm mx-auto">
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
