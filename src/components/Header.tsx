import { useTranslation } from 'react-i18next'
import { useTarotStore } from '../store/tarotStore'
import { Wand2, Settings } from 'lucide-react'

interface HeaderProps {
  title?: string
  showSettings?: boolean
  onSettingsClick?: () => void
}

export const Header = ({ title, showSettings = true, onSettingsClick }: HeaderProps) => {
  const { t } = useTranslation()
  const { language } = useTarotStore()

  return (
    <header className='bg-gradient-to-r from-tarot-600 to-tarot-700 text-white shadow-lg sticky top-0 z-40'>
      <div className='max-w-4xl mx-auto px-4 py-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='text-3xl'>✨</div>
          <div>
            <h1 className='font-serif text-2xl font-bold'>{title || t('app.title')}</h1>
            <p className='text-tarot-100 text-sm'>{t('app.subtitle')}</p>
          </div>
        </div>

        {showSettings && (
          <button
            onClick={onSettingsClick}
            className='p-2 hover:bg-tarot-600 rounded-lg transition-smooth'
            aria-label='Settings'
          >
            <Settings className='w-6 h-6' />
          </button>
        )}
      </div>
    </header>
  )
}
