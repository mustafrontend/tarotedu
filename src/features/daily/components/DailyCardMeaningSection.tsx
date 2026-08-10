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

import { useTarotStore } from '../../../store/tarotStore'

export const DailyCardMeaningSection: React.FC<DailyCardMeaningSectionProps> = ({
  position,
  localizedName,
  localizedMeaning,
  localizedGuidance,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <div className="space-y-4 flex-1">
      <div className="flex items-center gap-2">
        <Badge variant={position === 'upright' ? 'purple' : 'amber'}>
          {position === 'upright' ? t('daily.upright') : t('daily.reversed')}
        </Badge>
        <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{localizedName}</span>
      </div>

      <div>
        <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${
          isDark ? 'text-purple-200/80' : 'text-slate-600'
        }`}>
          {t('daily.cardMeaning')}
        </h4>
        <p className={`text-xs leading-relaxed p-3.5 rounded-2xl border font-medium whitespace-pre-line ${
          isDark ? 'bg-slate-950/60 border-purple-500/20 text-purple-100' : 'bg-slate-100 border-slate-200 text-slate-800'
        }`}>
          {localizedMeaning}
        </p>
      </div>

      <div>
        <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1 ${
          isDark ? 'text-purple-200/80' : 'text-slate-600'
        }`}>
          <Compass className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('daily.guidanceTitle')}
        </h4>
        <p className={`text-xs leading-relaxed p-3.5 rounded-2xl border font-medium whitespace-pre-line ${
          isDark ? 'bg-purple-950/40 border-purple-500/30 text-purple-100' : 'bg-purple-50 border-purple-200 text-purple-900'
        }`}>
          {localizedGuidance}
        </p>
      </div>
    </div>
  )
}
