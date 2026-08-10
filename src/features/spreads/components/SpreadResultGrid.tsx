import React from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshCw } from 'lucide-react'
import { ReadingCard } from '../../../types/tarot'
import { Button } from '../../../components/atoms/Button'
import { SpreadCardItem } from './SpreadCardItem'

interface SpreadResultGridProps {
  drawnCards: ReadingCard[]
  onReset: () => void
}

export const SpreadResultGrid: React.FC<SpreadResultGridProps> = ({
  drawnCards,
  onReset,
}) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
          {t('spreads.readingLayout', { count: drawnCards.length })}
        </h3>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          {t('spreads.reset')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drawnCards.map((rc, idx) => (
          <SpreadCardItem key={idx} readingCard={rc} index={idx} />
        ))}
      </div>
    </div>
  )
}
