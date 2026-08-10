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
    { id: 'daily', label: t('nav.daily'), icon: Sun, color: 'bg-rose-500 text-white' },
    { id: 'learn', label: t('nav.learn'), icon: BookOpen, color: 'bg-purple-600 text-white' },
    { id: 'spreads', label: t('nav.spreads'), icon: Sparkles, color: 'bg-indigo-600 text-white' },
    { id: 'oracle', label: t('nav.oracle'), icon: Wand2, color: 'bg-teal-600 text-white' },
    { id: 'player', label: t('nav.player'), icon: Music, color: 'bg-sky-600 text-white' },
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = activeTab === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onNavigate(cat.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap shadow-sm transition-all duration-200 active:scale-95 border-[0.5px] ${
              isActive
                ? `${cat.color} border-transparent shadow-md scale-105`
                : 'bg-slate-900/80 text-purple-200/90 border-purple-500/30 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{cat.label}</span>
          </button>
        )
      })}
    </div>
  )
}
