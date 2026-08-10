import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTarotStore } from '../store/tarotStore'
import { Card, TarotCard } from '../components/Card'
import { Button } from '../components/Button'
import { majorArcana } from '../data/majorArcana'

export const DailyView = () => {
  const { t } = useTranslation()
  const { dailyDrawing, setDailyDrawing } = useTarotStore()
  const [intention, setIntention] = useState('')
  const [drawn, setDrawn] = useState(false)

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * majorArcana.length)
    const card = majorArcana[randomIndex]
    const isReversed = Math.random() > 0.5
    return { card, isReversed }
  }

  const handleDraw = () => {
    const { card, isReversed } = getRandomCard()
    const today = new Date().toISOString().split('T')[0]

    setDailyDrawing({
      date: today,
      card,
      position: isReversed ? 'reversed' : 'upright',
      intention,
    })
    setDrawn(true)
  }

  const hasDrawnToday = dailyDrawing && dailyDrawing.date === new Date().toISOString().split('T')[0]

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 pb-24 space-y-8'>
      <div className='text-center space-y-2'>
        <h2 className='font-serif text-4xl font-bold text-tarot-800'>{t('daily.title')}</h2>
        <p className='text-gray-600'>{t('daily.subtitle')}</p>
      </div>

      {/* Intention Setting */}
      {!hasDrawnToday && (
        <Card className='p-8 space-y-4 bg-gradient-to-br from-tarot-50 to-mystical-light'>
          <h3 className='font-serif text-xl font-bold text-tarot-800'>{t('daily.intention')}</h3>
          <textarea
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder='What would you like guidance on today?'
            className='w-full p-4 border-2 border-tarot-200 rounded-lg focus:outline-none focus:border-tarot-500 resize-none'
            rows={3}
          />

          <Button
            onClick={handleDraw}
            variant='primary'
            size='lg'
            className='w-full justify-center'
          >
            {t('daily.draw')}
          </Button>
        </Card>
      )}

      {/* Today's Card Display */}
      {(hasDrawnToday || drawn) && dailyDrawing && (
        <div className='space-y-6'>
          <Card className='p-8 text-center space-y-6 bg-gradient-to-br from-tarot-50 to-mystical-light'>
            <h3 className='font-serif text-2xl font-bold text-tarot-800'>{t('daily.cardOf')}</h3>

            <div className='flex justify-center'>
              <div className='w-40 h-56'>
                <TarotCard
                  name={dailyDrawing.card.name}
                  number={dailyDrawing.card.number}
                  isReversed={dailyDrawing.position === 'reversed'}
                />
              </div>
            </div>

            <div>
              <h4 className='font-serif text-xl font-bold text-tarot-800 mb-4'>
                {t(`cards.${dailyDrawing.card.id}.name`, dailyDrawing.card.name)}
              </h4>
              <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                {dailyDrawing.position === 'upright'
                  ? t(`cards.${dailyDrawing.card.id}.upright`, dailyDrawing.card.meaning.upright)
                  : t(`cards.${dailyDrawing.card.id}.reversed`, dailyDrawing.card.meaning.reversed)}
              </p>
            </div>

            <div className='bg-white/50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600 font-medium'>Guidance for Today</p>
              <p className='text-gray-800 mt-2 whitespace-pre-line'>
                {t(`cards.${dailyDrawing.card.id}.guidance`, dailyDrawing.card.guidance)}
              </p>
            </div>

            {intention && (
              <div className='bg-mystical-light p-4 rounded-lg border-l-4 border-tarot-500'>
                <p className='text-xs text-gray-600 font-medium mb-1'>Your Intention</p>
                <p className='text-gray-800 italic'>"{intention}"</p>
              </div>
            )}

            <Button
              onClick={() => {
                setDrawn(false)
                setIntention('')
              }}
              variant='outline'
              className='w-full justify-center mt-4'
            >
              {t('daily.newDraw')}
            </Button>
          </Card>
        </div>
      )}

      {/* Statistics */}
      <Card className='p-6 space-y-4'>
        <h3 className='font-serif text-lg font-bold text-tarot-800'>Your Reading Insights</h3>
        <div className='grid grid-cols-3 gap-4 text-center text-sm'>
          <div>
            <div className='text-xl font-serif font-bold text-tarot-600'>7</div>
            <p className='text-gray-600 text-xs'>Day Streak</p>
          </div>
          <div>
            <div className='text-xl font-serif font-bold text-tarot-600'>24</div>
            <p className='text-gray-600 text-xs'>Total Draws</p>
          </div>
          <div>
            <div className='text-xl font-serif font-bold text-tarot-600'>15</div>
            <p className='text-gray-600 text-xs'>Unique Cards</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
