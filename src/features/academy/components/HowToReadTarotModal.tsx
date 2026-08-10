import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Compass, ChevronRight, Smartphone, Layers, Wand2 } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { Button } from '../../../components/atoms/Button'
import { useTarotStore } from '../../../store/tarotStore'

interface HowToReadTarotModalProps {
  isOpen: boolean
  onClose: () => void
  onStartReading?: (tab?: 'daily' | 'spreads' | 'oracle') => void
}

export const HowToReadTarotModal: React.FC<HowToReadTarotModalProps> = ({
  isOpen,
  onClose,
  onStartReading,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
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

  const handleStartCTA = (targetTab: 'daily' | 'spreads' | 'oracle' = 'daily') => {
    onClose()
    if (onStartReading) onStartReading(targetTab)
  }

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={t('howToRead.modalTitle', '🔮 Tarot Nasıl Bakılır? (Tam Rehber)')} maxWidth="lg">
      <div className="space-y-4 font-sans">
        {/* Mode Selector Top SubTab Bar */}
        <div className={`flex p-1 rounded-2xl border text-xs font-bold transition-colors ${
          isDark ? 'bg-slate-900/90 border-purple-500/30' : 'bg-slate-200/80 border-slate-300'
        }`}>
          <button
            onClick={() => { setGuideMode('app'); setActiveStep(0); }}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              guideMode === 'app' ? 'bg-purple-600 text-white shadow-md' : isDark ? 'text-purple-200/70 hover:text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{t('howToRead.appTab', 'TarotEdu Uygulamamızla')}</span>
          </button>
          <button
            onClick={() => { setGuideMode('physical'); setActiveStep(0); }}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              guideMode === 'physical' ? 'bg-purple-600 text-white shadow-md' : isDark ? 'text-purple-200/70 hover:text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('howToRead.physicalTab', 'Fiziksel Kartlarla')}</span>
          </button>
        </div>

        {/* Step Numbers */}
        <div className={`flex justify-between items-center p-1.5 rounded-2xl border ${
          isDark ? 'bg-slate-950 border-purple-500/20' : 'bg-slate-100 border-slate-200'
        }`}>
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                activeStep === idx ? 'bg-amber-400 text-slate-950 shadow-md scale-105' : isDark ? 'text-purple-300/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              #{idx + 1}
            </button>
          ))}
        </div>

        {/* Active Content */}
        <div className={`p-5 rounded-2xl border space-y-3 shadow-xl ${
          isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 border-purple-500/30 text-white' : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-50 border-purple-200 text-slate-900'
        }`}>
          <div className={`flex items-center gap-2 font-black text-sm ${isDark ? 'text-amber-300' : 'text-purple-900'}`}>
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3>{t(current.titleKey)}</h3>
          </div>
          <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-purple-100' : 'text-slate-700'}`}>
            {t(current.descKey)}
          </p>

          <div className={`p-3 rounded-xl border text-[11px] font-bold flex items-center gap-2 ${
            isDark ? 'bg-purple-950/60 border-purple-500/30 text-amber-300' : 'bg-purple-100 border-purple-200 text-purple-900'
          }`}>
            <Compass className="w-4 h-4 text-purple-500 shrink-0" />
            <span>{t(current.tipKey)}</span>
          </div>
        </div>

        {/* Prominent Direct CTA Button */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => handleStartCTA('daily')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:brightness-110 text-slate-950 px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4 fill-current" />
            <span>{t('howToRead.startReadingCTA', '🔮 Bakmaya Başla (Hemen Kart Çek)')}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="mystic"
              size="sm"
              onClick={() => {
                if (activeStep < steps.length - 1) {
                  setActiveStep(activeStep + 1)
                } else {
                  handleStartCTA('daily')
                }
              }}
            >
              <span>{activeStep < steps.length - 1 ? t('howToRead.nextStep', 'Sonraki Adım') : t('howToRead.finish', 'Tamamla & Bak')}</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </ModalBase>
  )
}
