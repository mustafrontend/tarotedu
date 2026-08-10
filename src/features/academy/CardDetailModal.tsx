import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Bookmark, Compass, Lock, Crown } from 'lucide-react'
import { TarotCard } from '../../types/tarot'
import { ModalBase } from '../../components/atoms/ModalBase'
import { Button } from '../../components/atoms/Button'
import { Badge } from '../../components/atoms/Badge'
import { useTarotStore } from '../../store/tarotStore'
import { CardDetailVisual } from './components/CardDetailVisual'
import { CardDetailTabsContent } from './components/CardDetailTabsContent'

interface CardDetailModalProps {
  card: TarotCard | null
  isOpen: boolean
  onClose: () => void
  onOpenPaywall?: () => void
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
  onOpenPaywall,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const isPro = useTarotStore((state) => state.isPro)
  const learnedCards = useTarotStore((state) => state.learnedCards)
  const toggleLearned = useTarotStore((state) => state.toggleLearnedCard)
  const [activeTab, setActiveTab] = useState<'core' | 'symbolism' | 'loveCareer'>('core')

  if (!card) return null

  const isFreeLesson = card.number === 0
  const isLocked = !isFreeLesson && !isPro
  const isLearned = learnedCards.includes(card.id)
  const localizedName = t(`cards.${card.id}.name`, card.name)

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={localizedName} maxWidth="lg">
      <div className="space-y-5 font-sans">
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          <CardDetailVisual videoUrl={card.videoUrl} number={card.number} localizedName={localizedName} />

          <div className="space-y-3 flex-1 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="purple">{t('academy.majorArcana')} #{card.number}</Badge>
                {isFreeLesson && <Badge variant="emerald">Ücretsiz Ders</Badge>}
                {!isFreeLesson && !isPro && <Badge variant="amber">PRO Ders</Badge>}
              </div>
            </div>

            <div className={`flex p-1 rounded-xl border text-xs font-bold transition-colors ${
              isDark ? 'bg-slate-900/90 border-purple-500/30' : 'bg-slate-200/80 border-slate-300'
            }`}>
              <button
                onClick={() => setActiveTab('core')}
                className={`flex-1 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'core' ? 'bg-purple-600 text-white shadow' : isDark ? 'text-purple-200/70 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Anlamlar
              </button>
              <button
                onClick={() => setActiveTab('symbolism')}
                className={`flex-1 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'symbolism' ? 'bg-purple-600 text-white shadow' : isDark ? 'text-purple-200/70 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Sembolizm
              </button>
              <button
                onClick={() => setActiveTab('loveCareer')}
                className={`flex-1 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'loveCareer' ? 'bg-purple-600 text-white shadow' : isDark ? 'text-purple-200/70 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Aşk & Kariyer
              </button>
            </div>

            {isLocked ? (
              <div className="relative rounded-2xl overflow-hidden min-h-[160px] border border-amber-400/40 bg-slate-900/90 p-4 shadow-xl">
                <div className="filter blur-md select-none opacity-20 pointer-events-none">
                  <CardDetailTabsContent card={card} activeTab={activeTab} />
                </div>
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center space-y-2.5 z-20">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-lg animate-pulse">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 max-w-xs">
                    <h4 className="text-xs font-black text-white">Ders #{card.number} PRO Kilitli</h4>
                    <p className="text-[10px] text-purple-200/80 font-medium leading-tight">
                      Sadece 1. Ders (Joker) ücretsizdir. Tüm 22 ders içeriğini ve detaylı analizleri okumak için PRO'ya geçin.
                    </p>
                  </div>
                  <button
                    onClick={onOpenPaywall}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 text-xs font-black shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5 fill-current" />
                    <span>PRO'ya Geç & Tüm İçeriği Aç</span>
                  </button>
                </div>
              </div>
            ) : (
              <CardDetailTabsContent card={card} activeTab={activeTab} />
            )}
          </div>
        </div>

        {!isLocked && (
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 mb-2 ${
              isDark ? 'text-amber-300' : 'text-purple-900'
            }`}>
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              {t('daily.guidanceTitle')}
            </h4>
            <p className={`text-xs leading-relaxed p-3.5 rounded-2xl border shadow-inner whitespace-pre-line ${
              isDark ? 'bg-purple-950/40 border-purple-500/30 text-purple-100' : 'bg-purple-50 border-purple-200 text-purple-900'
            }`}>
              {t(`cards.${card.id}.guidance`, card.guidance)}
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button variant={isLearned ? 'secondary' : 'mystic'} size="md" onClick={() => toggleLearned(card.id)}>
            {isLearned ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('academy.mastered')}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>{t('academy.markLearned')}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </ModalBase>
  )
}
