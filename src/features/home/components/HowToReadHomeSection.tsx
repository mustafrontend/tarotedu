import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, HelpCircle, ChevronRight, Compass, Smartphone, Layers } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { HowToReadTarotModal } from '../../academy/components/HowToReadTarotModal'

export const HowToReadHomeSection: React.FC = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-3 font-sans">
      <CardBase
        hoverEffect={false}
        className="p-6 bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 border border-purple-500/30 text-white shadow-xl relative overflow-hidden group"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-lg">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-black">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>A'dan Z'ye Rehber</span>
            </div>
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>🔮 Tarot Nasıl Bakılır?</span>
            </h3>
            <p className="text-xs text-purple-200/80 font-medium leading-relaxed">
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
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-purple-500/20 mt-4 relative z-10">
          <div
            onClick={() => setIsModalOpen(true)}
            className="p-3 bg-slate-900/80 rounded-2xl border border-purple-500/20 flex items-center gap-2.5 cursor-pointer hover:border-purple-400/50 transition-all"
          >
            <Smartphone className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">1. Uygulama İle Bakış</h4>
              <p className="text-[10px] text-purple-200/60 font-medium">Dijital deste & kehanet</p>
            </div>
          </div>

          <div
            onClick={() => setIsModalOpen(true)}
            className="p-3 bg-slate-900/80 rounded-2xl border border-purple-500/20 flex items-center gap-2.5 cursor-pointer hover:border-purple-400/50 transition-all"
          >
            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">2. Fiziksel Deste İle</h4>
              <p className="text-[10px] text-purple-200/60 font-medium">Sembolizm & kalp eli</p>
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
