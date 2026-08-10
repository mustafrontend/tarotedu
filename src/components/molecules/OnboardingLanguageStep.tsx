import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTarotStore } from '../../store/tarotStore'

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
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <motion.div
      key="lang-stage"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="space-y-4 font-sans"
    >
      <div className="text-center">
        <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {welcomeTitle}
        </h2>
        <p className={`text-xs mt-1 font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
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
              className={`flex items-center justify-between px-3 py-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                  : isDark
                  ? 'bg-slate-900 text-purple-100 border-purple-500/30 hover:bg-purple-900/40'
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
