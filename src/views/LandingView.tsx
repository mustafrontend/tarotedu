import { motion } from 'framer-motion'
import { BookOpen, Sun, Sparkles, Globe } from 'lucide-react'

export const LandingView = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const features = [
    {
      icon: BookOpen,
      title: 'Learn',
      description: '22 Major Arcana cards',
      color: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
    },
    {
      icon: Sun,
      title: 'Daily',
      description: 'Personal guidance',
      color: 'from-rose-50 to-rose-100',
      borderColor: 'border-rose-200',
    },
    {
      icon: Sparkles,
      title: 'Spreads',
      description: 'Celtic Cross & more',
      color: 'from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
    },
    {
      icon: Globe,
      title: 'Languages',
      description: '12 global languages',
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-mystical-light via-tarot-50 to-mystical-light pb-24'>
      {/* Hero Section */}
      <motion.div
        className='text-center pt-12 md:pt-20 px-4 space-y-6'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Logo & Title */}
        <motion.div variants={itemVariants} className='flex justify-center mb-6'>
          <div className='relative w-20 h-20 md:w-24 md:h-24'>
            <div className='absolute inset-0 bg-gradient-to-br from-mystical-purple to-tarot-600 rounded-full opacity-80'></div>
            <div className='absolute inset-0 flex items-center justify-center text-3xl md:text-5xl'>✨</div>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className='font-serif text-5xl md:text-7xl font-bold text-tarot-600'>
          TarotEdu
        </motion.h1>

        <motion.p variants={itemVariants} className='text-2xl md:text-3xl text-gray-600 font-serif'>
          Master Tarot Learning Platform
        </motion.p>
      </motion.div>

      {/* Welcome Card */}
      <motion.div
        variants={itemVariants}
        className='max-w-2xl mx-auto px-4 mt-12 md:mt-16'
        initial='hidden'
        animate='visible'
      >
        <div className='bg-white rounded-3xl border-2 border-tarot-200 shadow-lg p-8 md:p-12 space-y-6'>
          <h2 className='font-serif text-3xl font-bold text-tarot-700 flex items-center gap-3 justify-center'>
            <span>✨</span> Welcome
          </h2>

          <p className='text-lg text-gray-700 text-center leading-relaxed'>
            A comprehensive tarot education platform with 22 Major Arcana lessons, daily readings, and interactive spreads.
          </p>

          {/* Feature Grid */}
          <div className='grid grid-cols-2 md:grid-cols-2 gap-4 mt-8'>
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`bg-gradient-to-br ${feature.color} border-2 ${feature.borderColor} rounded-2xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className='flex justify-center mb-4'>
                    <Icon className='w-8 h-8 text-tarot-600' />
                  </div>
                  <h3 className='font-serif text-xl font-bold text-tarot-800 mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-700 text-sm'>{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={itemVariants}
        className='text-center mt-12 px-4'
        initial='hidden'
        animate='visible'
      >
        <p className='text-lg text-tarot-700 font-medium'>
          🚀 Platform is live and ready!
        </p>
        <p className='text-gray-600 mt-2'>Start your tarot journey today</p>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className='fixed bottom-24 right-8 text-4xl opacity-30 pointer-events-none'
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🔮
      </motion.div>

      <motion.div
        className='fixed top-20 left-8 text-3xl opacity-20 pointer-events-none'
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        ✨
      </motion.div>
    </div>
  )
}
