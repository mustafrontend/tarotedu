import React from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight, MoreHorizontal, Sparkles, Play } from 'lucide-react'
import { majorArcana } from '../../../data/majorArcana'
import { useTarotStore } from '../../../store/tarotStore'

interface AppleCardListSectionProps {
  onNavigate: (tab: any) => void
}

export const AppleCardListSection: React.FC<AppleCardListSectionProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const listCards = majorArcana.slice(0, 5)

  return (
    <div className="space-y-3 font-sans">
      <div className="flex justify-between items-center px-1">
        <h3
          className={`text-lg font-black tracking-tight flex items-center gap-1.5 cursor-pointer ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          onClick={() => onNavigate('learn')}
        >
          <span>Son Eklenen Kartlar</span>
          <ChevronRight className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
        </h3>
        <span className={`text-xs font-bold ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
          22 Kart
        </span>
      </div>

      <div
        className={`rounded-3xl border divide-y overflow-hidden shadow-xl backdrop-blur-xl transition-colors ${
          isDark
            ? 'bg-slate-900/90 border-purple-500/30 divide-purple-500/20 text-white'
            : 'bg-white border-slate-200/80 divide-slate-100 text-slate-900 shadow-md'
        }`}
      >
        {listCards.map((card) => {
          const localizedName = t(`cards.${card.id}.name`, card.name)
          const localizedKw = t(`cards.${card.id}.kw`, card.keywords.upright.slice(0, 3).join(' • '))

          return (
            <div
              key={card.id}
              onClick={() => onNavigate('learn')}
              className={`p-3.5 flex items-center justify-between transition-all cursor-pointer group ${
                isDark ? 'hover:bg-purple-900/30' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Square Media Thumbnail */}
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-purple-400/40 overflow-hidden shrink-0 relative shadow-md">
                  <img
                    src={card.image}
                    alt={localizedName}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>

                <div className="min-w-0 space-y-0.5">
                  <h4
                    className={`text-sm font-black truncate group-hover:text-amber-500 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {localizedName}
                    <span
                      className={`ml-1.5 text-[10px] font-mono font-bold ${
                        isDark ? 'text-purple-300' : 'text-purple-600'
                      }`}
                    >
                      #{card.number}
                    </span>
                  </h4>
                  <p
                    className={`text-xs truncate font-medium ${
                      isDark ? 'text-purple-200/80' : 'text-slate-600'
                    }`}
                  >
                    {localizedKw}
                  </p>
                </div>
              </div>

              {/* 3-Dots Action Menu Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate('learn')
                }}
                className={`p-2 rounded-full transition-colors shrink-0 ${
                  isDark
                    ? 'text-purple-300/70 hover:text-white hover:bg-purple-900/50'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
