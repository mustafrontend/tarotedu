import React from 'react'
import { Sun, BookOpen, Sparkles, Wand2, Music, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CardBase } from '../atoms/CardBase'

interface QuickActionsSheetProps {
  onSelectAction: (action: string) => void
}

export const QuickActionsSheet: React.FC<QuickActionsSheetProps> = ({
  onSelectAction,
}) => {
  const { t } = useTranslation()

  const actions = [
    {
      id: 'daily',
      title: t('nav.daily'),
      subtitle: t('daily.subtitle'),
      icon: Sun,
      color: 'bg-amber-500 text-white',
    },
    {
      id: 'learn',
      title: t('nav.learn'),
      subtitle: t('academy.subtitle'),
      icon: BookOpen,
      color: 'bg-purple-600 text-white',
    },
    {
      id: 'spreads',
      title: t('nav.spreads'),
      subtitle: t('spreads.subtitle'),
      icon: Sparkles,
      color: 'bg-indigo-600 text-white',
    },
    {
      id: 'oracle',
      title: t('nav.oracle'),
      subtitle: t('oracle.subtitle'),
      icon: Wand2,
      color: 'bg-teal-600 text-white',
    },
    {
      id: 'player',
      title: t('nav.player'),
      subtitle: t('player.subtitle'),
      icon: Music,
      color: 'bg-sky-600 text-white',
    },
    {
      id: 'profile',
      title: t('nav.profile'),
      subtitle: t('profile.lifePath'),
      icon: User,
      color: 'bg-slate-700 text-white',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <CardBase
            key={action.id}
            onClick={() => onSelectAction(action.id)}
            className="flex flex-col gap-2 p-4 border-[0.5px] border-slate-200"
          >
            <div className={`w-9 h-9 rounded-2xl ${action.color} flex items-center justify-center shadow-sm`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                {action.title}
              </h4>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                {action.subtitle}
              </p>
            </div>
          </CardBase>
        )
      })}
    </div>
  )
}
