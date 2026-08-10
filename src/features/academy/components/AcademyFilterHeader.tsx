import React from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen, Search, HelpCircle, ChevronRight } from 'lucide-react'
import { FilterMode } from '../hooks/useAcademyFilter'

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

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-400" />
            {t('academy.title')}
          </h2>
          <p className="text-xs text-purple-200/80 font-medium">{t('academy.subtitle')}</p>
        </div>

        {onOpenHowToRead && (
          <button
            onClick={onOpenHowToRead}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 p-2.5 px-4 rounded-2xl border border-amber-400/40 text-amber-300 text-xs font-bold shadow-lg hover:border-amber-400 transition-all cursor-pointer group shrink-0"
          >
            <HelpCircle className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            <span>{t('howToRead.guideButton', 'Tarot Nasıl Bakılır?')}</span>
            <ChevronRight className="w-4 h-4 text-purple-300 ml-1" />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-purple-300/70 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('academy.searchPlaceholder')}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-xs text-white placeholder-slate-400 font-medium focus:outline-none focus:border-purple-500/80 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-2xl border border-purple-500/30 backdrop-blur-md">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterMode === 'all'
                ? 'bg-purple-600 text-white shadow-sm border border-purple-400/30'
                : 'text-purple-200/70 hover:text-white'
            }`}
          >
            {t('academy.all')}
          </button>
          <button
            onClick={() => onFilterChange('learned')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterMode === 'learned'
                ? 'bg-purple-600 text-white shadow-sm border border-purple-400/30'
                : 'text-purple-200/70 hover:text-white'
            }`}
          >
            {t('academy.learned')} ({learnedCount})
          </button>
          <button
            onClick={() => onFilterChange('unlearned')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterMode === 'unlearned'
                ? 'bg-purple-600 text-white shadow-sm border border-purple-400/30'
                : 'text-purple-200/70 hover:text-white'
            }`}
          >
            {t('academy.unlearned')}
          </button>
        </div>
      </div>
    </>
  )
}
