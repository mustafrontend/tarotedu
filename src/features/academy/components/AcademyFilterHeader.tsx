import React from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen, Search, HelpCircle, ChevronRight } from 'lucide-react'
import { FilterMode } from '../hooks/useAcademyFilter'
import { useTarotStore } from '../../../store/tarotStore'

interface AcademyFilterHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  filterMode: FilterMode
  onFilterChange: (mode: FilterMode) => void
  learnedCount: number
  onOpenHowToRead?: () => void
}

export const AcademyFilterHeader: React.FC<AcademyFilterHeaderProps> = ({
  searchQuery,
  onSearchChange,
  filterMode,
  onFilterChange,
  learnedCount,
  onOpenHowToRead,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <BookOpen className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            {t('academy.title')}
          </h2>
          <p className={`text-xs font-medium ${
            isDark ? 'text-purple-200/80' : 'text-slate-600'
          }`}>
            {t('academy.subtitle')}
          </p>
        </div>

        {onOpenHowToRead && (
          <button
            onClick={onOpenHowToRead}
            className={`flex items-center gap-2 p-2.5 px-4 rounded-2xl text-xs font-bold shadow-md transition-all cursor-pointer group shrink-0 border ${
              isDark
                ? 'bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border-amber-400/40 text-amber-300 hover:border-amber-400'
                : 'bg-white border-purple-300 text-purple-900 hover:border-purple-500 shadow-sm'
            }`}
          >
            <HelpCircle className={`w-4 h-4 group-hover:scale-110 transition-transform ${
              isDark ? 'text-amber-300' : 'text-purple-600'
            }`} />
            <span>{t('howToRead.guideButton', 'Tarot Nasıl Bakılır?')}</span>
            <ChevronRight className={`w-4 h-4 ml-1 ${
              isDark ? 'text-purple-300' : 'text-purple-500'
            }`} />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`w-4 h-4 absolute left-3.5 top-3 ${
            isDark ? 'text-purple-300/70' : 'text-slate-400'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('academy.searchPlaceholder')}
            className={`w-full pl-9 pr-4 py-2.5 rounded-2xl text-xs font-medium focus:outline-none transition-colors border ${
              isDark
                ? 'bg-slate-900 border-purple-500/30 text-white placeholder-slate-400 focus:border-purple-400'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-600 shadow-sm'
            }`}
          />
        </div>

        <div className={`flex items-center gap-1.5 p-1 rounded-2xl border backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-slate-900/80 border-purple-500/30'
            : 'bg-slate-200/80 border-slate-300'
        }`}>
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-purple-600 text-white shadow-sm border border-purple-400/30'
                : isDark
                ? 'text-purple-200/70 hover:text-white'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {t('academy.all')}
          </button>
          <button
            onClick={() => onFilterChange('learned')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'learned'
                ? 'bg-purple-600 text-white shadow-sm border border-purple-400/30'
                : isDark
                ? 'text-purple-200/70 hover:text-white'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {t('academy.learned')} ({learnedCount})
          </button>
          <button
            onClick={() => onFilterChange('unlearned')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'unlearned'
                ? 'bg-purple-600 text-white shadow-sm border border-purple-400/30'
                : isDark
                ? 'text-purple-200/70 hover:text-white'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {t('academy.unlearned')}
          </button>
        </div>
      </div>
    </div>
  )
}
