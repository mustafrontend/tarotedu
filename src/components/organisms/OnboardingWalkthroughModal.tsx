import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '../atoms/Button'
import { useOnboardingWalkthrough } from '../../hooks/useOnboardingWalkthrough'
import { OnboardingHeader } from '../molecules/OnboardingHeader'
import { OnboardingLanguageStep } from '../molecules/OnboardingLanguageStep'
import { OnboardingWalkthroughStep } from '../molecules/OnboardingWalkthroughStep'

interface OnboardingWalkthroughModalProps {
  isOpen: boolean
  onComplete: () => void
}

export const OnboardingWalkthroughModal: React.FC<OnboardingWalkthroughModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const {
    t,
    currentLanguage,
    languages,
    stage,
    currentStep,
    steps,
    stepData,
    isLastStep,
    handleSelectLanguage,
    handleNext,
    handlePrev,
    handleSkip,
  } = useOnboardingWalkthrough(onComplete)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-[0.5px] border-slate-200 overflow-hidden z-10 p-6 sm:p-7 font-sans"
        >
          <OnboardingHeader
            stage={stage}
            currentStep={currentStep}
            totalSteps={steps.length}
            onSkip={handleSkip}
            skipLabel={t('onboarding.skip')}
          />

          <AnimatePresence mode="wait">
            {stage === 'language' ? (
              <OnboardingLanguageStep
                welcomeTitle={t('onboarding.welcome')}
                languages={languages}
                selectedLanguage={currentLanguage}
                onSelectLanguage={handleSelectLanguage}
              />
            ) : (
              <OnboardingWalkthroughStep
                stepData={stepData}
                stepIndex={currentStep}
              />
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
            {stage === 'walkthrough' ? (
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}

            <Button
              variant="mystic"
              size="md"
              onClick={handleNext}
              className="flex-1 justify-center"
            >
              <span>
                {stage === 'language'
                  ? t('onboarding.next')
                  : isLastStep
                  ? t('onboarding.start')
                  : t('onboarding.next')}
              </span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

