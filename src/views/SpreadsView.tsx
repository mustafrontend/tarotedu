import { useTranslation } from 'react-i18next'
import { Card } from '../components/Card'
import { Zap, Heart, Briefcase, Target } from 'lucide-react'

export const SpreadsView = () => {
  const { t } = useTranslation()

  const spreads = [
    {
      id: 'three-card',
      name: t('spreads.threeCard'),
      description: 'Past, Present, Future',
      positions: 3,
      icon: Zap,
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
    },
    {
      id: 'celtic-cross',
      name: t('spreads.celticCross'),
      description: 'Deep spiritual insights',
      positions: 10,
      icon: Target,
      color: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
    },
    {
      id: 'horseshoe',
      name: t('spreads.horseshoe'),
      description: 'Seven-card guidance spread',
      positions: 7,
      icon: Zap,
      color: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
    },
    {
      id: 'career',
      name: t('spreads.career'),
      description: 'Career direction and success',
      positions: 5,
      icon: Briefcase,
      color: 'from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
    },
    {
      id: 'love',
      name: t('spreads.love'),
      description: 'Relationship and romance insights',
      positions: 6,
      icon: Heart,
      color: 'from-rose-50 to-rose-100',
      borderColor: 'border-rose-200',
    },
  ]

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 pb-24 space-y-8'>
      <div className='text-center space-y-2'>
        <h2 className='font-serif text-4xl font-bold text-tarot-800'>{t('spreads.title')}</h2>
        <p className='text-gray-600'>{t('spreads.subtitle')}</p>
      </div>

      <div className='grid md:grid-cols-2 gap-4'>
        {spreads.map((spread) => {
          const Icon = spread.icon
          return (
            <Card
              key={spread.id}
              className={`p-6 cursor-pointer hover:shadow-lg transition-smooth bg-gradient-to-br ${spread.color} border-2 ${spread.borderColor}`}
            >
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-white/50 rounded-lg'>
                  <Icon className='w-6 h-6 text-tarot-600' />
                </div>

                <div className='flex-1'>
                  <h3 className='font-serif text-lg font-bold text-tarot-800 mb-1'>
                    {spread.name}
                  </h3>
                  <p className='text-sm text-gray-600 mb-3'>{spread.description}</p>

                  <div className='flex items-center gap-2'>
                    <span className='inline-block px-3 py-1 bg-white/70 text-xs font-medium text-tarot-600 rounded-full'>
                      {spread.positions} {t('spreads.positions')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Guide Section */}
      <Card className='p-8 space-y-4 bg-gradient-to-br from-tarot-50 to-mystical-light'>
        <h3 className='font-serif text-2xl font-bold text-tarot-800'>How to Use Spreads</h3>
        <div className='space-y-3 text-gray-700'>
          <p>
            <span className='font-semibold text-tarot-700'>1. Set Your Intention</span> - Focus on your question or area
            of interest
          </p>
          <p>
            <span className='font-semibold text-tarot-700'>2. Shuffle</span> - Mentally shuffle your deck while thinking
            about your question
          </p>
          <p>
            <span className='font-semibold text-tarot-700'>3. Draw Cards</span> - Pull cards for each position in the
            spread
          </p>
          <p>
            <span className='font-semibold text-tarot-700'>4. Interpret</span> - Read each card's meaning in context of
            its position
          </p>
          <p>
            <span className='font-semibold text-tarot-700'>5. Reflect</span> - Meditate on how the reading applies to your
            life
          </p>
        </div>
      </Card>
    </div>
  )
}
