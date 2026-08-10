import { useTranslation } from 'react-i18next'
import { useTarotStore } from '../store/tarotStore'
import { Card, TarotCard } from '../components/Card'
import { majorArcana } from '../data/majorArcana'

export const LearnView = () => {
  const { t } = useTranslation()
  const { learnedCards } = useTarotStore()

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 pb-24 space-y-8'>
      <div className='text-center space-y-2'>
        <h2 className='font-serif text-4xl font-bold text-tarot-800'>{t('learn.title')}</h2>
        <p className='text-gray-600'>{t('learn.subtitle')}</p>
      </div>

      <div className='bg-gradient-to-r from-tarot-50 to-mystical-light p-6 rounded-lg'>
        <div className='flex justify-between items-center'>
          <div>
            <div className='text-3xl font-serif font-bold text-tarot-700'>{learnedCards.length}</div>
            <p className='text-tarot-600 text-sm'>of {majorArcana.length} cards learned</p>
          </div>
          <div className='w-24 h-24 rounded-full bg-gradient-to-br from-tarot-500 to-tarot-600 flex items-center justify-center'>
            <div className='text-white font-serif text-2xl font-bold'>
              {Math.round((learnedCards.length / majorArcana.length) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Major Arcana Section */}
      <div className='space-y-4'>
        <h3 className='font-serif text-2xl font-bold text-tarot-800'>{t('learn.majorArcana')}</h3>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {majorArcana.map((card) => (
            <div key={card.id} className='cursor-pointer transition-smooth hover:scale-105'>
              <TarotCard
                name={card.name}
                number={card.number}
              />
              <div className='mt-2 text-center text-xs font-medium'>
                {learnedCards.includes(card.id) ? (
                  <span className='text-green-600'>✓ Learned</span>
                ) : (
                  <span className='text-gray-400'>Learn</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Details Modal would go here */}
      <Card className='p-8 text-center space-y-4 bg-gradient-to-br from-tarot-50 to-mystical-light'>
        <div className='text-2xl'>📚</div>
        <h4 className='font-serif text-xl font-bold text-tarot-800'>Click a card to learn more</h4>
        <p className='text-gray-600'>Detailed meanings, keywords, and guidance coming soon</p>
      </Card>
    </div>
  )
}
