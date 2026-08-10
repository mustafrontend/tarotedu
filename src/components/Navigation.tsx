import { useTranslation } from 'react-i18next'
import { Home, BookOpen, Sun, Sparkles, User } from 'lucide-react'
import clsx from 'clsx'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const { t } = useTranslation()

  const tabs = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'learn', label: t('nav.learn'), icon: BookOpen },
    { id: 'daily', label: t('nav.daily'), icon: Sun },
    { id: 'spreads', label: t('nav.spreads'), icon: Sparkles },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ]

  return (
    <nav className='bg-white border-t border-slate-200 sticky bottom-0 z-40'>
      <div className='max-w-4xl mx-auto px-2 flex items-center justify-between md:gap-0'>
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                'flex flex-col items-center gap-1 px-3 md:px-4 py-3 text-xs md:text-sm font-medium transition-smooth',
                activeTab === tab.id
                  ? 'text-tarot-600 border-t-2 border-tarot-600'
                  : 'text-gray-600 hover:text-tarot-500 border-t-2 border-transparent'
              )}
            >
              <Icon className='w-5 h-5' />
              <span className='hidden sm:inline'>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
