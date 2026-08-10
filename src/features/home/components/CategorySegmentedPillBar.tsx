import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, BookOpen, Sparkles, Wand2, Music } from 'lucide-react'
import { useTarotStore } from '../../../store/tarotStore'

interface CategorySegmentedPillBarProps {
  onNavigate: (tab: any) => void
  activeTab?: string
}

export const CategorySegmentedPillBar: React.FC<CategorySegmentedPillBarProps> = ({
  onNavigate,
  activeTab = 'daily',
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const categories = [
    { id: 'daily', label: t('nav.daily'), icon: Sun },
    { id: 'learn', label: t('nav.learn'), icon: BookOpen },
    { id: 'spreads', label: t('nav.spreads'), icon: Sparkles },
    { id: 'oracle', label: t('nav.oracle'), icon: Wand2 },
    { id: 'player', label: t('nav.player'), icon: Music },
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 font-sans">
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = activeTab === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onNavigate(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all duration-200 active:scale-95 border backdrop-blur-md cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-amber-300 border-purple-300/80 shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-105'
                : isDark
                ? 'bg-slate-900/90 text-purple-200/90 border-purple-500/30 hover:bg-slate-800 hover:text-white shadow-sm'
                : 'bg-slate-200/80 text-slate-700 border-slate-300 hover:bg-slate-300 hover:text-slate-900 shadow-sm'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : isDark ? 'text-purple-300' : 'text-purple-600'}`} />
            <span>{cat.label}</span>
          </button>
        )
      })}
    </div>
  )
}
