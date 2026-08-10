import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Bookmark, Compass } from 'lucide-react'
import { TarotCard } from '../../types/tarot'
import { ModalBase } from '../../components/atoms/ModalBase'
import { Button } from '../../components/atoms/Button'
import { Badge } from '../../components/atoms/Badge'
import { useTarotStore } from '../../store/tarotStore'
import { CardDetailVisual } from './components/CardDetailVisual'
import { CardDetailTabsContent } from './components/CardDetailTabsContent'
import { CardProLockOverlay } from './components/CardProLockOverlay'

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
                <Badge variant="purple">
                  {t('academy.majorArcana')} #{card.number}
                </Badge>
                {isFreeLesson && (
                  <Badge variant="emerald">Ücretsiz Ders</Badge>
                )}
                {!isFreeLesson && !isPro && (
                  <Badge variant="amber">PRO Ders</Badge>
                )}
              </div>
            </div>

            <div className="flex bg-slate-900 p-1 rounded-xl border border-purple-500/30 text-xs font-bold">
              <button
                onClick={() => setActiveTab('core')}
                className={`flex-1 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'core' ? 'bg-purple-600 text-white shadow' : 'text-purple-200/70'
                }`}
              >
                Anlamlar
              </button>
              <button
                onClick={() => setActiveTab('symbolism')}
                className={`flex-1 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'symbolism' ? 'bg-purple-600 text-white shadow' : 'text-purple-200/70'
                }`}
              >
                Sembolizm
              </button>
              <button
                onClick={() => setActiveTab('loveCareer')}
                className={`flex-1 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'loveCareer' ? 'bg-purple-600 text-white shadow' : 'text-purple-200/70'
                }`}
              >
                Aşk & Kariyer
              </button>
            </div>

            <CardDetailTabsContent card={card} activeTab={activeTab} />
          </div>
        </div>

        {isLocked ? (
          <CardProLockOverlay cardNumber={card.number} onOpenPaywall={onOpenPaywall} />
        ) : (
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1 mb-2">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              {t('daily.guidanceTitle')}
            </h4>
            <p className="text-xs text-purple-100 leading-relaxed bg-purple-950/40 p-3.5 rounded-2xl border border-purple-500/30 shadow-inner whitespace-pre-line">
              {t(`cards.${card.id}.guidance`, card.guidance)}
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button
            variant={isLearned ? 'secondary' : 'mystic'}
            size="md"
            onClick={() => toggleLearned(card.id)}
          >
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
