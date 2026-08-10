import React from 'react'
import { motion } from 'framer-motion'
import { OnboardingStep } from '../../hooks/useOnboardingWalkthrough'

interface OnboardingWalkthroughStepProps {
  stepData: OnboardingStep
  stepIndex: number
}

export const OnboardingWalkthroughStep: React.FC<OnboardingWalkthroughStepProps> = ({
  stepData,
  stepIndex,
}) => {
  const IconComponent = stepData.icon

  return (
    <motion.div
      key={`walk-stage-${stepIndex}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4 py-2"
    >
      <div className="flex justify-center">
        <div className={`p-4 rounded-3xl shadow-lg ${stepData.iconBg}`}>
          <IconComponent className="w-10 h-10" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <span className="inline-block text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {stepData.highlight}
        </span>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          {stepData.title}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          {stepData.subtitle}
        </p>
      </div>
    </motion.div>
  )
}
