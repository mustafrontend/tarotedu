import React from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight, MoreHorizontal, Sparkles, Play } from 'lucide-react'
import { majorArcana } from '../../../data/majorArcana'

interface AppleCardListSectionProps {
  onNavigate: (tab: any) => void
}

export const AppleCardListSection: React.FC<AppleCardListSectionProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation()
  const listCards = majorArcana.slice(0, 5)

  return (
    <div className="space-y-3 font-sans">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('learn')}>
          <span>Son Eklenen Kartlar</span>
          <ChevronRight className="w-5 h-5 text-purple-400" />
        </h3>
        <span className="text-xs font-bold text-purple-200/70">22 Kart</span>
      </div>

      <div className="bg-slate-900/90 rounded-3xl border border-purple-500/30 divide-y divide-purple-500/20 overflow-hidden shadow-xl backdrop-blur-xl">
        {listCards.map((card) => {
          const localizedName = t(`cards.${card.id}.name`, card.name)
          const localizedKw = t(`cards.${card.id}.kw`, card.keywords.upright.slice(0, 3).join(' • '))

          return (
            <div
              key={card.id}
              onClick={() => onNavigate('learn')}
              className="p-3.5 flex items-center justify-between hover:bg-purple-900/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Square Media Thumbnail */}
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-purple-400/40 overflow-hidden shrink-0 relative shadow-md">
                  {card.videoUrl ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform"
                      src={card.videoUrl}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-300">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>

                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-sm font-black text-white truncate group-hover:text-amber-300 transition-colors">
                    {localizedName}
                    <span className="ml-1.5 text-[10px] font-mono text-purple-300 font-bold">
                      #{card.number}
                    </span>
                  </h4>
                  <p className="text-xs text-purple-200/70 truncate font-medium">
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
                className="p-2 text-purple-300/70 hover:text-white hover:bg-purple-900/50 rounded-full transition-colors shrink-0"
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
