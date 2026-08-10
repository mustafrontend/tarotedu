import React from 'react'
import { useTranslation } from 'react-i18next'
import { Star, ChevronRight, Sparkles, Play } from 'lucide-react'
import { majorArcana } from '../../../data/majorArcana'
import { useTarotStore } from '../../../store/tarotStore'

interface MysticFloatingCardGridProps {
  onNavigate: (tab: any) => void
}

export const MysticFloatingCardGrid: React.FC<MysticFloatingCardGridProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const showcaseCards = [majorArcana[0], majorArcana[1], majorArcana[2], majorArcana[3]]

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-black tracking-tight flex items-center gap-1.5 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <Sparkles className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          <span>{t('home.featuredArcana')}</span>
        </h3>
        <button
          onClick={() => onNavigate('learn')}
          className={`text-xs font-bold flex items-center gap-0.5 transition-colors ${
            isDark ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-800'
          }`}
        >
          <span>{t('home.viewAll22')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid Cards matching reference design */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {showcaseCards.map((card) => (
          <div
            key={card.id}
            onClick={() => onNavigate('learn')}
            className="relative h-60 rounded-[2rem] overflow-hidden shadow-lg border-[0.5px] border-purple-500/30 group cursor-pointer active:scale-95 transition-all duration-200 flex flex-col justify-between p-3.5"
          >
            {/* Background Video */}
            {card.videoUrl ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                src={card.videoUrl}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-950 to-indigo-900" />
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/40 pointer-events-none" />

            {/* Top Rating Badge Pill */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-slate-900/80 backdrop-blur-md border border-purple-400/30 px-2.5 py-1 rounded-full text-[10px] font-black text-white flex items-center gap-1 shadow-md">
                <Star className="w-3 h-3 text-amber-400 fill-current" />
                <span>5.0</span>
              </div>
              <span className="bg-purple-950/80 backdrop-blur-md border border-purple-400/40 text-[9px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded-full">
                #{card.number}
              </span>
            </div>

            {/* Bottom Card Title & Subtitle */}
            <div className="relative z-10 space-y-1">
              <h4 className="text-sm font-black text-white leading-tight drop-shadow-md">
                {t(`cards.${card.id}.name`, card.name)}
              </h4>
              <p className="text-[10px] font-medium text-purple-200/90 line-clamp-1 capitalize">
                {t(`cards.${card.id}.kw`, card.keywords.upright.slice(0, 2).join(' • '))}
              </p>
              <div className="pt-1 flex items-center justify-between text-[9px] font-bold text-amber-300">
                <span className="flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-current" /> {t('home.video3d')}
                </span>
                <span className="text-white/80 font-semibold">{t('home.freeLesson')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
