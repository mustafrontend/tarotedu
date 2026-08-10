import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Compass, ChevronRight, Smartphone, Layers } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { Button } from '../../../components/atoms/Button'

interface HowToReadTarotModalProps {
  isOpen: boolean
  onClose: () => void
}

export const HowToReadTarotModal: React.FC<HowToReadTarotModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation()
  const [guideMode, setGuideMode] = useState<'app' | 'physical'>('app')
  const [activeStep, setActiveStep] = useState(0)

  const appStepKeys = [
    { titleKey: 'howToRead.appStep1Title', descKey: 'howToRead.appStep1Desc', tipKey: 'howToRead.appStep1Tip' },
    { titleKey: 'howToRead.appStep2Title', descKey: 'howToRead.appStep2Desc', tipKey: 'howToRead.appStep2Tip' },
    { titleKey: 'howToRead.appStep3Title', descKey: 'howToRead.appStep3Desc', tipKey: 'howToRead.appStep3Tip' },
    { titleKey: 'howToRead.appStep4Title', descKey: 'howToRead.appStep4Desc', tipKey: 'howToRead.appStep4Tip' },
  ]

  const physicalStepKeys = [
    { titleKey: 'howToRead.physStep1Title', descKey: 'howToRead.physStep1Desc', tipKey: 'howToRead.physStep1Tip' },
    { titleKey: 'howToRead.physStep2Title', descKey: 'howToRead.physStep2Desc', tipKey: 'howToRead.physStep2Tip' },
    { titleKey: 'howToRead.physStep3Title', descKey: 'howToRead.physStep3Desc', tipKey: 'howToRead.physStep3Tip' },
    { titleKey: 'howToRead.physStep4Title', descKey: 'howToRead.physStep4Desc', tipKey: 'howToRead.physStep4Tip' },
  ]

  const steps = guideMode === 'app' ? appStepKeys : physicalStepKeys
  const current = steps[activeStep] || steps[0]

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={t('howToRead.modalTitle', '🔮 Tarot Nasıl Bakılır? (Tam Rehber)')} maxWidth="lg">
      <div className="space-y-4 font-sans">
        {/* Mode Selector */}
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-purple-500/30 text-xs font-bold">
          <button
            onClick={() => { setGuideMode('app'); setActiveStep(0); }}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              guideMode === 'app' ? 'bg-purple-600 text-amber-300 shadow-md' : 'text-purple-200/70 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{t('howToRead.appTab', 'TarotEdu Uygulamamızla')}</span>
          </button>
          <button
            onClick={() => { setGuideMode('physical'); setActiveStep(0); }}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              guideMode === 'physical' ? 'bg-purple-600 text-amber-300 shadow-md' : 'text-purple-200/70 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('howToRead.physicalTab', 'Fiziksel Kartlarla')}</span>
          </button>
        </div>

        {/* Step Numbers */}
        <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded-2xl border border-purple-500/20">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                activeStep === idx
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'text-purple-300/60 hover:text-white'
              }`}
            >
              #{idx + 1}
            </button>
          ))}
        </div>

        {/* Active Content */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-5 rounded-2xl border border-purple-500/30 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
            <Sparkles className="w-4 h-4" />
            <h3>{t(current.titleKey)}</h3>
          </div>
          <p className="text-xs text-purple-100 font-medium leading-relaxed">
            {t(current.descKey)}
          </p>

          <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-500/30 text-[11px] font-bold text-amber-300 flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400 shrink-0" />
            <span>{t(current.tipKey)}</span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-purple-200/60 font-semibold">
            {t('howToRead.stepProgress', { current: activeStep + 1, total: steps.length })}
          </span>
          <Button
            variant="mystic"
            size="sm"
            onClick={() => {
              if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1)
              } else {
                onClose()
              }
            }}
          >
            <span>
              {activeStep < steps.length - 1
                ? t('howToRead.nextStep', 'Sonraki Adım')
                : t('howToRead.finish', 'Tamamla')}
            </span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </ModalBase>
  )
}
