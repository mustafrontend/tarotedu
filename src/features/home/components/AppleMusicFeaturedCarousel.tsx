import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Play, ChevronRight } from 'lucide-react'
import { majorArcana } from '../../../data/majorArcana'

interface AppleMusicFeaturedCarouselProps {
  onNavigate: (tab: any) => void
}

export const AppleMusicFeaturedCarousel: React.FC<AppleMusicFeaturedCarouselProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation()
  const featuredCards = majorArcana.slice(0, 4)

  return (
    <div className="space-y-2 font-sans">
      <div className="flex justify-between items-end px-1">
        <div>
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest block">
            ÖNE ÇIKAN DERS & DESTE
          </span>
          <h3 className="text-xl font-black text-white tracking-tight">
            Günün Vitrini
          </h3>
        </div>
        <button
          onClick={() => onNavigate('learn')}
          className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-0.5"
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
              className="snap-center shrink-0 w-[82vw] sm:w-[340px] rounded-3xl bg-slate-900 border border-purple-500/30 overflow-hidden relative shadow-2xl group cursor-pointer"
            >
              {/* Media Background */}
              <div className="h-52 w-full relative overflow-hidden bg-slate-950">
                {card.videoUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    src={card.videoUrl}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-purple-950 via-indigo-950 to-slate-950 p-4 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-amber-300 animate-pulse" />
                  </div>
                )}
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
