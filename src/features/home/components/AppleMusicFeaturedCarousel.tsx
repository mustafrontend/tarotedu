import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Play, ChevronRight } from 'lucide-react'
import { majorArcana } from '../../../data/majorArcana'
import { useTarotStore } from '../../../store/tarotStore'

interface AppleMusicFeaturedCarouselProps {
  onNavigate: (tab: any) => void
}

export const AppleMusicFeaturedCarousel: React.FC<AppleMusicFeaturedCarouselProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const featuredCards = majorArcana.slice(0, 4)

  return (
    <div className="space-y-2 font-sans">
      <div className="flex justify-between items-end px-1">
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-widest block ${
            isDark ? 'text-purple-300' : 'text-purple-700'
          }`}>
            ÖNE ÇIKAN DERS & DESTE
          </span>
          <h3 className={`text-xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Günün Vitrini
          </h3>
        </div>
        <button
          onClick={() => onNavigate('learn')}
          className={`text-xs font-bold flex items-center gap-0.5 transition-colors ${
            isDark ? 'text-amber-300 hover:text-white' : 'text-purple-700 hover:text-purple-900'
          }`}
        >
          <span>Tümünü Gör</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 pt-1">
        {featuredCards.map((card) => {
          const localizedName = t(`cards.${card.id}.name`, card.name)
          const localizedKw = t(`cards.${card.id}.kw`, card.keywords.upright.slice(0, 2).join(' • '))

          return (
            <div
              key={card.id}
              onClick={() => onNavigate('learn')}
              className={`snap-center shrink-0 w-[82vw] sm:w-[340px] rounded-3xl overflow-hidden relative shadow-xl group cursor-pointer border transition-all ${
                isDark
                  ? 'bg-slate-900 border-purple-500/30'
                  : 'bg-white border-slate-200 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Media Background */}
              <div className="h-52 w-full relative overflow-hidden bg-slate-950">
                <img
                  src={card.image}
                  alt={localizedName}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                      #{card.number} Arkana
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md border border-purple-400/40 flex items-center justify-center text-amber-300">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {localizedName}
                    </h2>
                    <p className="text-xs text-purple-200/90 font-medium line-clamp-1">
                      {localizedKw}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
