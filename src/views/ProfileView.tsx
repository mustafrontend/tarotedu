import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTranslation as useI18next } from 'react-i18next'
import { useTarotStore } from '../store/tarotStore'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { User, LogOut } from 'lucide-react'

export const ProfileView = () => {
  const { t } = useTranslation()
  const { i18n } = useI18next()
  const { user, setLanguage, setTheme, theme } = useTarotStore()
  const [name, setName] = useState(user?.name || '')
  const [birthDate, setBirthDate] = useState(user?.birthDate || '')
  const [language, setLanguageLocal] = useState(i18n.language)

  const handleSaveChanges = () => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language)
      setLanguage(language as any)
    }
    alert('Profile updated!')
  }

  const calculateLifePath = (date: string) => {
    if (!date) return 0
    const sum = date.replace(/-/g, '').split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    let result = sum
    while (result > 9 && result !== 11 && result !== 22) {
      result = String(result).split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    return result
  }

  const lifePath = calculateLifePath(birthDate)

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 pb-24 space-y-8'>
      <div className='text-center space-y-2'>
        <h2 className='font-serif text-4xl font-bold text-tarot-800'>{t('profile.title')}</h2>
        <p className='text-gray-600'>Customize your Tarot learning experience</p>
      </div>

      {/* Profile Section */}
      <Card className='p-8 space-y-6'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-16 h-16 rounded-full bg-gradient-to-br from-tarot-500 to-tarot-600 flex items-center justify-center'>
            <User className='w-8 h-8 text-white' />
          </div>
          <div>
            <h3 className='font-serif text-2xl font-bold text-tarot-800'>{name || 'Tarot Student'}</h3>
            <p className='text-gray-600'>Seeker of Wisdom</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-semibold text-tarot-800 mb-2'>{t('profile.name')}</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border-2 border-tarot-200 rounded-lg focus:outline-none focus:border-tarot-500'
              placeholder='Your name'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-tarot-800 mb-2'>{t('profile.birthDate')}</label>
            <input
              type='date'
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className='w-full px-4 py-2 border-2 border-tarot-200 rounded-lg focus:outline-none focus:border-tarot-500'
            />
          </div>

          {lifePath > 0 && (
            <div className='bg-gradient-to-br from-tarot-50 to-mystical-light p-4 rounded-lg'>
              <p className='text-sm text-gray-600 font-medium'>{t('profile.lifePath')}</p>
              <div className='text-3xl font-serif font-bold text-tarot-600 mt-2'>{lifePath}</div>
              <p className='text-xs text-gray-600 mt-1'>
                {lifePath === 1 && 'The Leader'}
                {lifePath === 2 && 'The Mediator'}
                {lifePath === 3 && 'The Creator'}
                {lifePath === 4 && 'The Builder'}
                {lifePath === 5 && 'The Freedom Seeker'}
                {lifePath === 6 && 'The Nurturer'}
                {lifePath === 7 && 'The Seeker'}
                {lifePath === 8 && 'The Achiever'}
                {lifePath === 9 && 'The Humanitarian'}
                {lifePath === 11 && 'The Master Teacher'}
                {lifePath === 22 && 'The Master Builder'}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Preferences */}
      <Card className='p-8 space-y-6'>
        <h3 className='font-serif text-xl font-bold text-tarot-800'>Preferences</h3>

        <div>
          <label className='block text-sm font-semibold text-tarot-800 mb-3'>{t('profile.language')}</label>
          <select
            value={language}
            onChange={(e) => setLanguageLocal(e.target.value)}
            className='w-full px-4 py-2 border-2 border-tarot-200 rounded-lg focus:outline-none focus:border-tarot-500'
          >
            <option value='en'>English</option>
            <option value='tr'>Türkçe</option>
            <option value='es'>Español</option>
            <option value='de'>Deutsch</option>
            <option value='fr'>Français</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-semibold text-tarot-800 mb-3'>{t('profile.theme')}</label>
          <div className='flex gap-4'>
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-smooth ${
                theme === 'light'
                  ? 'bg-tarot-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-smooth ${
                theme === 'dark'
                  ? 'bg-tarot-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              🌙 Dark
            </button>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className='flex gap-4'>
        <Button variant='primary' size='lg' onClick={handleSaveChanges} className='flex-1 justify-center'>
          {t('profile.saveChanges')}
        </Button>
        <Button variant='outline' size='lg' className='flex-1 justify-center'>
          <LogOut className='w-5 h-5' />
          Logout
        </Button>
      </div>

      {/* Stats Summary */}
      <Card className='p-6 space-y-4 bg-gradient-to-br from-tarot-50 to-mystical-light'>
        <h4 className='font-serif text-lg font-bold text-tarot-800'>Your Stats</h4>
        <div className='grid grid-cols-3 gap-4 text-center text-sm'>
          <div>
            <div className='text-xl font-serif font-bold text-tarot-600'>45</div>
            <p className='text-gray-600 text-xs mt-1'>Total Minutes Learned</p>
          </div>
          <div>
            <div className='text-xl font-serif font-bold text-tarot-600'>28</div>
            <p className='text-gray-600 text-xs mt-1'>Cards Mastered</p>
          </div>
          <div>
            <div className='text-xl font-serif font-bold text-tarot-600'>12</div>
            <p className='text-gray-600 text-xs mt-1'>Readings Done</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
