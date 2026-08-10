import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, Sparkles, Wand2, Moon, Heart } from 'lucide-react'
import { DailyView } from '../daily/DailyView'
import { SpreadsView } from '../spreads/SpreadsView'
import { TarotOracleView } from './TarotOracleView'
import { ShadowWorkMirror } from '../shadow/ShadowWorkMirror'
import { ArcanaSynastryMatrix } from '../synastry/ArcanaSynastryMatrix'
import { useTarotStore } from '../../store/tarotStore'

interface MysticHubViewProps {
  onOpenPaywall: () => void
  initialSubTab?: 'daily' | 'spreads' | 'oracle' | 'shadow' | 'synastry'
}

export const MysticHubView: React.FC<MysticHubViewProps> = ({
  onOpenPaywall,
  initialSubTab = 'daily',
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const [subTab, setSubTab] = useState<'daily' | 'spreads' | 'oracle' | 'shadow' | 'synastry'>(initialSubTab)

  const subTabs = [
    { id: 'daily', label: t('nav.daily'), icon: Sun, color: 'text-amber-400' },
    { id: 'spreads', label: t('nav.spreads'), icon: Sparkles, color: 'text-purple-400' },
    { id: 'oracle', label: t('oracle.title'), icon: Wand2, color: 'text-teal-400' },
    { id: 'synastry', label: t('synastry.title', 'Sinastri'), icon: Heart, color: 'text-rose-400' },
    { id: 'shadow', label: t('shadow.title', 'Gölge Aynası'), icon: Moon, color: 'text-indigo-400' },
  ]

  return (
    <div className="space-y-5 pb-12 font-sans">
      {/* Top Glass Sub-Tab Selector */}
      <div className={`flex items-center gap-1.5 p-1 rounded-2xl border backdrop-blur-md transition-colors overflow-x-auto ${
        isDark ? 'bg-slate-900/90 border-purple-500/30' : 'bg-slate-200/80 border-slate-300'
      }`}>
        {subTabs.map((st) => {
          const Icon = st.icon
          const isActive = subTab === st.id
          return (
            <button
              key={st.id}
              onClick={() => setSubTab(st.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-purple-600 text-white border border-purple-400/50 shadow-md scale-105'
                  : isDark
                  ? 'text-purple-200/70 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : st.color}`} />
              <span className="truncate">{st.label}</span>
            </button>
          )
        })}
      </div>

      {/* Render Active View */}
      {subTab === 'daily' && <DailyView onOpenPaywall={onOpenPaywall} />}
      {subTab === 'spreads' && <SpreadsView onOpenPaywall={onOpenPaywall} />}
      {subTab === 'oracle' && <TarotOracleView onOpenPaywall={onOpenPaywall} />}
      {subTab === 'synastry' && <ArcanaSynastryMatrix onOpenPaywall={onOpenPaywall} />}
      {subTab === 'shadow' && <ShadowWorkMirror onOpenPaywall={onOpenPaywall} />}
    </div>
  )
}
