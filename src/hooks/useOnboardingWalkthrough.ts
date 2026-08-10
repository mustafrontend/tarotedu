import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen, Sun, Sparkles, Wand2 } from 'lucide-react'
import { useTarotStore } from '../store/tarotStore'
import { LANGUAGES, changeAppLanguage } from '../i18n'
import { Language } from '../types/tarot'

export interface OnboardingStep {
  icon: React.ElementType
  iconBg: string
  title: string
  subtitle: string
  highlight: string
}

export function useOnboardingWalkthrough(onComplete: () => void) {
  const { t, i18n } = useTranslation()
  const setStoreLanguage = useTarotStore((state) => state.setLanguage)
  const setStoreCompleted = useTarotStore((state) => state.setOnboardingCompleted)

  const [stage, setStage] = useState<'language' | 'walkthrough'>('language')
  const [currentStep, setCurrentStep] = useState(0)

  const steps: OnboardingStep[] = [
    {
      icon: BookOpen,
      iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
      title: t('onboarding.step1Title'),
      subtitle: t('onboarding.step1Sub'),
      highlight: t('onboarding.step1Highlight'),
    },
    {
      icon: Sun,
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
      title: t('onboarding.step2Title'),
      subtitle: t('onboarding.step2Sub'),
      highlight: t('onboarding.step2Highlight'),
    },
    {
      icon: Sparkles,
      iconBg: 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white',
      title: t('onboarding.step3Title'),
      subtitle: t('onboarding.step3Sub'),
      highlight: t('onboarding.step3Highlight'),
    },
    {
      icon: Wand2,
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
      title: t('onboarding.step4Title'),
      subtitle: t('onboarding.step4Sub'),
      highlight: t('onboarding.step4Highlight'),
    },
  ]

  const handleSelectLanguage = (langCode: string) => {
    changeAppLanguage(langCode)
    setStoreLanguage(langCode as Language)
  }

  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (stage === 'language') {
      setStage('walkthrough')
    } else if (isLastStep) {
      setStoreCompleted(true)
      onComplete()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (stage === 'walkthrough' && currentStep === 0) {
      setStage('language')
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    setStoreCompleted(true)
    onComplete()
  }

  return {
    t,
    currentLanguage: i18n.language,
    languages: LANGUAGES,
    stage,
    currentStep,
    steps,
    stepData: steps[currentStep],
    isLastStep,
    handleSelectLanguage,
    handleNext,
    handlePrev,
    handleSkip,
  }
}
