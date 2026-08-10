import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, BookOpen, Sparkles, Wand2, Music } from 'lucide-react'

interface CategorySegmentedPillBarProps {
  onNavigate: (tab: any) => void
  activeTab?: string
}

export const CategorySegmentedPillBar: React.FC<CategorySegmentedPillBarProps> = ({
  onNavigate,
  activeTab = 'daily',
}) => {
  const { t } = useTranslation()

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
                : 'bg-purple-950/70 text-purple-200/90 border-purple-500/40 hover:bg-purple-900/70 hover:text-white shadow-sm'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-purple-300'}`} />
            <span>{cat.label}</span>
          </button>
        )
      })}
    </div>
  )
}
