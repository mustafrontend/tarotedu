import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Scroll, HeartHandshake, RefreshCw, Share2 } from 'lucide-react'
import { TarotCard } from '../../../types/tarot'

interface Props {
  cardA: TarotCard
  cardB: TarotCard
  partnerAName: string
  partnerBName: string
  analysisText: string
  isDark: boolean
  onReset: () => void
  t?: any
}

export const SoulContractView: React.FC<Props> = ({
  cardA,
  cardB,
  partnerAName,
  partnerBName,
  analysisText,
  isDark,
  onReset,
  t: propT,
}) => {
  const { t: tHook } = useTranslation()
  const t = propT || tHook

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-5 rounded-2xl border space-y-4 shadow-2xl ${
        isDark
          ? 'bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border-amber-400/40 text-white'
          : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-amber-50 border-purple-200 text-slate-900'
      }`}
    >
      <div className="flex items-center justify-between border-b pb-3 border-purple-500/20">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-6 h-6 text-amber-400" />
          <div>
            <h3 className="text-base font-black tracking-tight">
              {t('synastry.resultTitle', 'Relational Alchemy & Soul Contract')}
            </h3>
            <p className="text-xs font-semibold text-amber-400/90">
              {partnerAName} ({cardA.name}) × {partnerBName} ({cardB.name})
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 transition-colors"
          title={t('synastry.recalculate', 'Recalculate')}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 py-2">
        <div className="text-center space-y-1">
          <div className="w-14 h-20 rounded-xl overflow-hidden border border-amber-400/50 shadow-md mx-auto">
            <img src={cardA.image} alt={cardA.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] font-bold block max-w-[80px] truncate">{partnerAName}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Scroll className="w-6 h-6 text-amber-400 animate-bounce" />
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Soul Link</span>
        </div>
        <div className="text-center space-y-1">
          <div className="w-14 h-20 rounded-xl overflow-hidden border border-amber-400/50 shadow-md mx-auto">
            <img src={cardB.image} alt={cardB.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] font-bold block max-w-[80px] truncate">{partnerBName}</span>
        </div>
      </div>

      <div className={`p-4 rounded-xl border text-xs leading-relaxed font-medium whitespace-pre-line max-h-96 overflow-y-auto ${
        isDark ? 'bg-slate-950/80 border-purple-500/30 text-purple-100' : 'bg-white/90 border-purple-200 text-slate-800'
      }`}>
        {analysisText}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'Arcana Synastry Matrix', text: analysisText }).catch(() => {})
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t('synastry.share', 'Share Analysis')}</span>
        </button>
      </div>
    </motion.div>
  )
}
