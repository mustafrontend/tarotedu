import React from 'react'
import { LANGUAGES, changeAppLanguage } from '../../i18n'
import { useTarotStore } from '../../store/tarotStore'
import { Language } from '../../types/tarot'

interface LanguagePickerProps {
  onSelect?: () => void
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({ onSelect }) => {
  const currentLang = useTarotStore((state) => state.language)
  const setStoreLanguage = useTarotStore((state) => state.setLanguage)

  const handleSelect = (code: string) => {
    changeAppLanguage(code)
    setStoreLanguage(code as Language)
    if (onSelect) onSelect()
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1">
      {LANGUAGES.map((lang) => {
        const isSelected = currentLang === lang.code
        return (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border-[0.5px] text-xs font-semibold transition-all ${
              isSelected
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="text-lg leading-none">{lang.flag}</span>
            <span className="truncate">{lang.label}</span>
          </button>
        )
      })}
    </div>
  )
}
