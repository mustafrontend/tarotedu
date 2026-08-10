import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface LanguageOption {
  code: string
  label: string
  flag: string
}

interface OnboardingLanguageStepProps {
  welcomeTitle: string
  languages: LanguageOption[]
  selectedLanguage: string
  onSelectLanguage: (code: string) => void
}

export const OnboardingLanguageStep: React.FC<OnboardingLanguageStepProps> = ({
  welcomeTitle,
  languages,
  selectedLanguage,
  onSelectLanguage,
}) => {
  return (
    <motion.div
      key="lang-stage"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="space-y-4"
    >
      <div className="text-center">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          {welcomeTitle}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Select your preferred language for TarotEdu
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code
          return (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-2xl border-[0.5px] text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                <span className="truncate">{lang.label}</span>
              </div>
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
