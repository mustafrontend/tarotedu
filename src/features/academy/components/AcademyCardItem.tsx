import React from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Sparkles, Lock, Play } from 'lucide-react'
import { TarotCard } from '../../../types/tarot'
import { CardBase } from '../../../components/atoms/CardBase'
import { useTarotStore } from '../../../store/tarotStore'

interface AcademyCardItemProps {
  card: TarotCard
  isLearned: boolean
  isPro: boolean
  isSequentialLocked: boolean
  onClick: () => void
}

export const AcademyCardItem: React.FC<AcademyCardItemProps> = ({
  card,
  isLearned,
  isPro,
  isSequentialLocked,
  onClick,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const isFreeLesson = card.number === 0
  const isProLocked = !isFreeLesson && !isPro

  return (
    <CardBase
      onClick={onClick}
      className={`relative p-0 overflow-hidden flex flex-col justify-between h-48 text-white border shadow-md group cursor-pointer transition-all ${
        isSequentialLocked
          ? 'opacity-60 saturate-50 bg-slate-950 border-slate-700'
          : isDark
          ? 'bg-slate-900 border-purple-500/30 hover:border-purple-400'
          : 'bg-slate-900 border-purple-400/40 hover:border-purple-600'
      }`}
    >
      <img
        src={card.image}
        alt={card.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-purple-950/50 p-3 flex flex-col justify-between z-10">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-amber-300">
          <span>#{card.number}</span>
          {isSequentialLocked ? (
            <div className="bg-slate-800 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded-md font-extrabold text-[9px] flex items-center gap-0.5 shadow-sm">
              <Lock className="w-2.5 h-2.5 text-rose-400" />
              <span>#{card.number - 1}'i Bitir</span>
            </div>
          ) : isProLocked ? (
            <div className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md font-extrabold text-[9px] flex items-center gap-0.5 shadow-sm">
              <Lock className="w-2.5 h-2.5" />
              <span>PRO</span>
            </div>
          ) : isLearned ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 opacity-80 text-amber-300" />
          )}
        </div>

        <div className="text-center space-y-0.5">
          <h4 className="text-xs font-black text-white leading-tight drop-shadow-md">
            {t(`cards.${card.id}.name`, card.name)}
          </h4>
          <div className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>{isFreeLesson ? 'Ücretsiz Ders' : 'Ders & Video'}</span>
          </div>
        </div>

        <div className="text-[9px] text-purple-200 truncate text-center font-medium capitalize">
          {t(`cards.${card.id}.kw`, card.keywords.upright.slice(0, 2).join(' • '))}
        </div>
      </div>
    </CardBase>
  )
}
