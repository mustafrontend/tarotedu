import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles, Sun, BookOpen, Crown, ShieldCheck, Zap } from 'lucide-react'
import { Button } from '../../../components/atoms/Button'

interface HeroKineticSectionProps {
  onNavigate: (tab: any) => void
  onOpenPaywall: () => void
  isPro: boolean
}

export const HeroKineticSection: React.FC<HeroKineticSectionProps> = ({
  onNavigate,
  onOpenPaywall,
  isPro,
}) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-6 sm:p-10 shadow-2xl border-[0.5px] border-purple-400/40 min-h-[360px] flex items-center"
    >
      {/* Background MP4 Seamless Loop Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none scale-105"
        src="/videos/A_D_cinematic_seamless_loop_o.mp4"
      />

      {/* Dark Purple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-purple-950/80 to-transparent pointer-events-none" />

      {/* Dynamic Purple Glow Effects */}
      <div className="absolute -top-16 -right-16 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
        <div className="md:col-span-8 space-y-5">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-purple-500/30 text-purple-100 border border-purple-400/40 text-xs font-extrabold px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              {t('hero.badge')}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {t('hero.languagesSolfeggio', '12 Languages • 528Hz Solfeggio')}
            </span>
          </div>

          {/* Hero Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              {t('hero.title')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-purple-200 to-indigo-200">
                Rider-Waite
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-medium max-w-lg drop-shadow">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="mystic" size="lg" onClick={() => onNavigate('daily')}>
              <Sun className="w-5 h-5 text-amber-300" />
              <span>{t('hero.ctaDaily')}</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('learn')}
              className="bg-white/10 text-white border-purple-400/40 hover:bg-white/20 backdrop-blur-sm"
            >
              <BookOpen className="w-5 h-5 text-purple-300" />
              <span>{t('hero.ctaLearn')}</span>
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-purple-800/60 text-xs text-purple-200 font-semibold">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('hero.cards78', '78 Complete Cards')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('hero.authenticSymbolism', 'Authentic Symbolism')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-purple-300" />
              <span>{t('hero.oracleAndSpreads', 'Mystic Oracle & Spreads')}</span>
            </div>
          </div>
        </div>

        {/* 3D Video Card Preview */}
        <div className="hidden md:col-span-4 md:flex items-center justify-center relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-48 h-72 rounded-3xl bg-slate-900 border-2 border-purple-400/60 shadow-2xl overflow-hidden relative group"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="/videos/Cinematic_D_commercial_teaser.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-purple-950/40 p-4 flex flex-col justify-between">
              <div className="flex justify-between text-xs font-mono font-bold text-amber-300">
                <span>XXII</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-center space-y-1">
                <span className="text-xs font-extrabold text-white tracking-widest block bg-purple-950/80 py-1 px-2 rounded-full border border-purple-400/40 backdrop-blur-md">
                  {t('hero.cinematicTarot', 'CINEMATIC TAROT')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
