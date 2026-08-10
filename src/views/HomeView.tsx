import { useTranslation } from 'react-i18next'
import { useTarotStore } from '../store/tarotStore'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { BookOpen, Zap, TrendingUp } from 'lucide-react'
import { majorArcana } from '../data/majorArcana'

export const HomeView = () => {
  const { t } = useTranslation()
  const { user, readings, learnedCards } = useTarotStore()

  const getTodayCard = () => {
    const today = new Date().toDateString()
    const index = new Date().getDate() % majorArcana.length
    return majorArcana[index]
  }

  const todayCard = getTodayCard()

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 pb-24 space-y-8'>
      {/* Welcome Hero */}
      <div className='text-center space-y-4'>
        <h2 className='font-serif text-4xl font-bold text-tarot-800'>{t('home.welcome')}</h2>
        <p className='text-gray-600 text-lg'>{t('home.subtitle')}</p>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-3 gap-4'>
        <Card className='text-center py-6'>
          <div className='text-3xl font-serif font-bold text-tarot-600'>{learnedCards.length}</div>
          <div className='text-sm text-gray-600 mt-2'>{t('home.stat.learned')}</div>
        </Card>
        <Card className='text-center py-6'>
          <div className='text-3xl font-serif font-bold text-tarot-600'>{readings.length}</div>
          <div className='text-sm text-gray-600 mt-2'>{t('home.stat.readings')}</div>
        </Card>
        <Card className='text-center py-6'>
          <div className='text-3xl font-serif font-bold text-tarot-600'>7</div>
          <div className='text-sm text-gray-600 mt-2'>{t('home.stat.streak')}</div>
        </Card>
      </div>

      {/* Today's Card */}
      <Card className='bg-gradient-to-br from-tarot-50 to-mystical-light p-8 text-center space-y-6'>
        <div>
          <h3 className='text-2xl font-serif font-bold text-tarot-700 mb-2'>{t('home.todaysDraw')}</h3>
          <p className='text-tarot-600'>{todayCard.name}</p>
        </div>

        <div className='flex justify-center'>
          <div className='w-32 h-48 bg-gradient-to-br from-tarot-100 to-tarot-50 border-2 border-tarot-200 rounded-lg flex flex-col items-center justify-between p-4 shadow-lg'>
            <div className='text-lg font-serif font-bold text-tarot-600'>{todayCard.number}</div>
            <div className='text-3xl'>✨</div>
            <div className='text-xs text-tarot-600 font-semibold'>TODAY</div>
          </div>
        </div>

        <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
          {t(`cards.${todayCard.id}.upright`, todayCard.meaning.upright)}
        </p>
        <Button variant='secondary' size='lg' className='w-full justify-center'>
          {t('daily.draw')}
        </Button>
      </Card>

      {/* Learning Path */}
      <div className='space-y-4'>
        <h3 className='font-serif text-2xl font-bold text-tarot-800'>Quick Actions</h3>

        <div className='grid md:grid-cols-2 gap-4'>
          <Card className='p-6 cursor-pointer hover:shadow-md transition-smooth'>
            <div className='flex items-start gap-4'>
              <BookOpen className='w-8 h-8 text-tarot-600 mt-1 flex-shrink-0' />
              <div>
                <h4 className='font-semibold text-tarot-800 mb-1'>Start Learning</h4>
                <p className='text-sm text-gray-600'>Master the 22 Major Arcana cards</p>
              </div>
            </div>
          </Card>

          <Card className='p-6 cursor-pointer hover:shadow-md transition-smooth'>
            <div className='flex items-start gap-4'>
              <Zap className='w-8 h-8 text-tarot-600 mt-1 flex-shrink-0' />
              <div>
                <h4 className='font-semibold text-tarot-800 mb-1'>Daily Draw</h4>
                <p className='text-sm text-gray-600'>Get your personalized daily guidance</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Readings */}
      {readings.length > 0 && (
        <div className='space-y-4'>
          <h3 className='font-serif text-2xl font-bold text-tarot-800'>{t('home.recentReadings')}</h3>
          <div className='space-y-2'>
            {readings.slice(0, 3).map((reading) => (
              <Card key={reading.id} className='p-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='font-semibold text-tarot-800'>{reading.spread}</h4>
                    <p className='text-sm text-gray-600'>{new Date(reading.date).toLocaleDateString()}</p>
                  </div>
                  <TrendingUp className='w-5 h-5 text-tarot-600' />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
