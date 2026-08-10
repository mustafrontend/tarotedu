import React from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen, ChevronRight, Sparkles } from 'lucide-react'
import { majorArcana } from '../../../data/majorArcana'
import { CardBase } from '../../../components/atoms/CardBase'
import { useTarotStore } from '../../../store/tarotStore'

interface AcademyPreviewSectionProps {
  onNavigate: (tab: any) => void
}

export const AcademyPreviewSection: React.FC<AcademyPreviewSectionProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const featuredCards = majorArcana.slice(0, 4)

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-extrabold tracking-tight flex items-center gap-1.5 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <BookOpen className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          <span>{t('academy.title')}</span>
        </h3>
        <button
          onClick={() => onNavigate('learn')}
          className={`text-xs font-bold flex items-center gap-0.5 transition-colors ${
            isDark ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-800'
          }`}
        >
          <span>{t('home.viewAll22', 'View all 22 Cards')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {featuredCards.map((card) => (
          <CardBase
            key={card.id}
            onClick={() => onNavigate('learn')}
            className={`p-3.5 flex flex-col justify-between min-h-[140px] border group transition-colors ${
              isDark
                ? 'bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-purple-500/20 hover:border-purple-400'
                : 'bg-gradient-to-br from-purple-50 via-indigo-50/50 to-slate-50 text-slate-900 border-purple-200 hover:border-purple-400 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-500">
              <span>#{card.number}</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="my-auto text-center space-y-0.5">
              <span className="text-xl block group-hover:scale-110 transition-transform">
                🔮
              </span>
              <h4 className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t(`cards.${card.id}.name`, card.name)}
              </h4>
            </div>

            <div className={`text-[9px] truncate text-center font-medium ${isDark ? 'text-purple-200/70' : 'text-slate-600'}`}>
              {t(`cards.${card.id}.kw`, card.keywords.upright.slice(0, 2).join(' • '))}
            </div>
          </CardBase>
        ))}
      </div>
    </div>
  )
}
