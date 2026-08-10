import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Layers, ArrowRight } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { useTarotStore } from '../../../store/tarotStore'

interface SpreadsShowcaseSectionProps {
  onNavigate: (tab: any) => void
}

export const SpreadsShowcaseSection: React.FC<SpreadsShowcaseSectionProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const spreads = [
    {
      id: 'celtic-cross',
      title: t('spreads.celticCrossTitle', 'Celtic Cross'),
      count: t('spreads.tenCards', '10 Cards'),
      desc: t('spreads.celticCrossDesc', 'Deep master layout for ultimate life clarity'),
      color: 'bg-purple-600 text-white',
    },
    {
      id: 'three-card',
      title: t('spreads.threeCardTitle', '3-Card Spread'),
      count: t('spreads.threeCards', '3 Cards'),
      desc: t('spreads.threeCardDesc', 'Past, Present, and Future trajectory'),
      color: 'bg-indigo-600 text-white',
    },
    {
      id: 'love',
      title: t('spreads.loveTitle', 'Love & Relationship'),
      count: t('spreads.threeCards', '3 Cards'),
      desc: t('spreads.loveDesc', 'Energy alignment between partner and self'),
      color: 'bg-amber-600 text-white',
    },
  ]

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-extrabold tracking-tight flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <Sparkles className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          <span>{t('spreads.title')}</span>
        </h3>
        <button
          onClick={() => onNavigate('spreads')}
          className={`text-xs font-bold flex items-center gap-0.5 transition-colors ${
            isDark ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-800'
          }`}
        >
          <span>{t('spreads.exploreAll', 'Explore All Spreads')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {spreads.map((sp) => (
          <CardBase
            key={sp.id}
            onClick={() => onNavigate('spreads')}
            className={`p-4 flex flex-col justify-between space-y-3 border-[0.5px] ${
              isDark ? 'border-purple-500/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-xl ${sp.color}`}>
                <Layers className="w-4 h-4" />
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isDark
                    ? 'text-purple-200 bg-purple-950/60 border-purple-500/30'
                    : 'text-purple-700 bg-purple-100 border-purple-300'
                }`}
              >
                {sp.count}
              </span>
            </div>

            <div>
              <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{sp.title}</h4>
              <p className={`text-xs mt-0.5 line-clamp-2 ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
                {sp.desc}
              </p>
            </div>
          </CardBase>
        ))}
      </div>
    </div>
  )
}
