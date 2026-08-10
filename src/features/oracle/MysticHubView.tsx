import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, Sparkles, Wand2 } from 'lucide-react'
import { DailyView } from '../daily/DailyView'
import { SpreadsView } from '../spreads/SpreadsView'
import { TarotOracleView } from './TarotOracleView'

interface MysticHubViewProps {
  onOpenPaywall: () => void
  initialSubTab?: 'daily' | 'spreads' | 'oracle'
}

export const MysticHubView: React.FC<MysticHubViewProps> = ({
  onOpenPaywall,
  initialSubTab = 'daily',
}) => {
  const { t } = useTranslation()
  const [subTab, setSubTab] = useState<'daily' | 'spreads' | 'oracle'>(initialSubTab)

  const subTabs = [
    { id: 'daily', label: t('nav.daily'), icon: Sun, color: 'text-amber-300' },
    { id: 'spreads', label: t('nav.spreads'), icon: Sparkles, color: 'text-purple-300' },
    { id: 'oracle', label: t('oracle.title'), icon: Wand2, color: 'text-teal-300' },
  ]

  return (
    <div className="space-y-5 pb-12 font-sans">
      {/* Top Glass Sub-Tab Selector */}
      <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-purple-500/30 shadow-xl backdrop-blur-xl">
        {subTabs.map((st) => {
          const Icon = st.icon
          const isActive = subTab === st.id
          return (
            <button
              key={st.id}
              onClick={() => setSubTab(st.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all duration-200 ${
                isActive
                  ? 'bg-purple-600/40 text-amber-300 border border-purple-400/50 shadow-md scale-105'
                  : 'text-purple-200/70 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? st.color : ''}`} />
              <span className="truncate">{st.label}</span>
            </button>
          )
        })}
      </div>

      {/* Render Active View */}
      {subTab === 'daily' && <DailyView />}
      {subTab === 'spreads' && <SpreadsView />}
      {subTab === 'oracle' && <TarotOracleView onOpenPaywall={onOpenPaywall} />}
    </div>
  )
}
