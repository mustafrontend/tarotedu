import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HelpCircle, ChevronRight, Smartphone, Layers } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { HowToReadTarotModal } from '../../academy/components/HowToReadTarotModal'
import { useTarotStore } from '../../../store/tarotStore'

export const HowToReadHomeSection: React.FC = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <div className="space-y-3 font-sans">
      <CardBase
        hoverEffect={false}
        className={`p-6 border relative overflow-hidden group shadow-xl transition-colors ${
          isDark
            ? 'bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 border-purple-500/30 text-white'
            : 'bg-gradient-to-br from-purple-50 via-indigo-50/50 to-slate-50 border-purple-200 text-slate-900'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-lg">
            <div
              className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-full text-xs font-black ${
                isDark
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>A'dan Z'ye Rehber</span>
            </div>
            <h3
              className={`text-lg font-black tracking-tight flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span>🔮 Tarot Nasıl Bakılır?</span>
            </h3>
            <p
              className={`text-xs font-medium leading-relaxed ${
                isDark ? 'text-purple-200/80' : 'text-slate-600'
              }`}
            >
              Hem TarotEdu uygulamamızla dijital kart okumayı hem de geleneksel fiziksel tarot destesiyle esoterik bakış tekniklerini öğrenin.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2.5 rounded-2xl text-xs font-bold text-amber-300 shadow-lg border border-purple-400/40 transition-all cursor-pointer shrink-0 group-hover:scale-105"
          >
            <span>Rehberi İncele</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Cards Preview */}
        <div
          className={`grid grid-cols-2 gap-3 pt-4 border-t mt-4 relative z-10 ${
            isDark ? 'border-purple-500/20' : 'border-purple-200/60'
          }`}
        >
          <div
            onClick={() => setIsModalOpen(true)}
            className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
              isDark
                ? 'bg-slate-900/80 border-purple-500/20 hover:border-purple-400/50'
                : 'bg-white/90 border-purple-200 hover:border-purple-400/50 shadow-sm'
            }`}
          >
            <Smartphone className="w-4 h-4 text-purple-500 shrink-0" />
            <div>
              <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1. Uygulama İle Bakış
              </h4>
              <p className={`text-[10px] font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
                Dijital deste & kehanet
              </p>
            </div>
          </div>

          <div
            onClick={() => setIsModalOpen(true)}
            className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
              isDark
                ? 'bg-slate-900/80 border-purple-500/20 hover:border-purple-400/50'
                : 'bg-white/90 border-purple-200 hover:border-purple-400/50 shadow-sm'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2. Fiziksel Deste İle
              </h4>
              <p className={`text-[10px] font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
                Sembolizm & kalp eli
              </p>
            </div>
          </div>
        </div>
      </CardBase>

      <HowToReadTarotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
