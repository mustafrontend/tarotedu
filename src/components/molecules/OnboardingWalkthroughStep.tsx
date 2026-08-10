import React from 'react'
import { motion } from 'framer-motion'
import { OnboardingStep } from '../../hooks/useOnboardingWalkthrough'
import { useTarotStore } from '../../store/tarotStore'

interface OnboardingWalkthroughStepProps {
  stepData: OnboardingStep
  stepIndex: number
}

export const OnboardingWalkthroughStep: React.FC<OnboardingWalkthroughStepProps> = ({
  stepData,
  stepIndex,
}) => {
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const IconComponent = stepData.icon

  return (
    <motion.div
      key={`walk-stage-${stepIndex}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4 py-2 font-sans"
    >
      <div className="flex justify-center">
        <div className={`p-4 rounded-3xl shadow-lg ${stepData.iconBg}`}>
          <IconComponent className="w-10 h-10" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border ${
          isDark
            ? 'bg-purple-950/60 border-purple-500/30 text-amber-300'
            : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          {stepData.highlight}
        </span>
        <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {stepData.title}
        </h2>
        <p className={`text-xs leading-relaxed max-w-xs mx-auto font-medium ${
          isDark ? 'text-purple-200/80' : 'text-slate-600'
        }`}>
          {stepData.subtitle}
        </p>
      </div>
    </motion.div>
  )
}
