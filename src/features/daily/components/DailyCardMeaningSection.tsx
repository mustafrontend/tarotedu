import React from 'react'
import { useTranslation } from 'react-i18next'
import { Compass } from 'lucide-react'
import { CardPosition } from '../../../types/tarot'
import { Badge } from '../../../components/atoms/Badge'

interface DailyCardMeaningSectionProps {
  position: CardPosition
  localizedName: string
  localizedMeaning: string
  localizedGuidance: string
}

export const DailyCardMeaningSection: React.FC<DailyCardMeaningSectionProps> = ({
  position,
  localizedName,
  localizedMeaning,
  localizedGuidance,
}) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 flex-1">
      <div className="flex items-center gap-2">
        <Badge variant={position === 'upright' ? 'purple' : 'amber'}>
          {position === 'upright' ? t('daily.upright') : t('daily.reversed')}
        </Badge>
        <span className="text-sm font-black text-white">{localizedName}</span>
      </div>

      <div>
        <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-1">
          {t('daily.cardMeaning')}
        </h4>
        <p className="text-xs text-purple-100 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-purple-500/20 font-medium whitespace-pre-line">
          {localizedMeaning}
        </p>
      </div>

      <div>
        <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-purple-400" />
          {t('daily.guidanceTitle')}
        </h4>
        <p className="text-xs text-purple-100 leading-relaxed bg-purple-950/40 p-3.5 rounded-2xl border border-purple-500/30 font-medium whitespace-pre-line">
          {localizedGuidance}
        </p>
      </div>
    </div>
  )
}
