import React from 'react'

interface OnboardingHeaderProps {
  stage: 'language' | 'walkthrough'
  currentStep: number
  totalSteps: number
  onSkip: () => void
  skipLabel: string
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  stage,
  currentStep,
  totalSteps,
  onSkip,
  skipLabel,
}) => {
  return (
    <div className="flex items-center justify-between mb-5">
      {stage === 'language' ? (
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
          Step 1 of 2: Language
        </span>
      ) : (
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-6 bg-purple-600' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      )}

      <button
        onClick={onSkip}
        className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
      >
        {skipLabel}
      </button>
    </div>
  )
}
