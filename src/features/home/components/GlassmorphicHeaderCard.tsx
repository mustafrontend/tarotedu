import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sun, Compass } from 'lucide-react'
import { Button } from '../../../components/atoms/Button'

interface GlassmorphicHeaderCardProps {
  onNavigate: (tab: any) => void
  learnedCount: number
}

export const GlassmorphicHeaderCard: React.FC<GlassmorphicHeaderCardProps> = ({
  onNavigate,
  learnedCount,
}) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 text-white min-h-[380px] p-6 flex flex-col justify-between shadow-2xl border-[0.5px] border-purple-400/40 font-sans"
    >
      {/* Background MP4 Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none scale-105"
        src="/videos/A_D_cinematic_seamless_loop_o.mp4"
      />

      {/* Dark Mystic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-purple-950/40 to-slate-950/60 pointer-events-none" />

      {/* Center Floating Path Marker */}
      <div className="relative z-10 my-auto flex justify-center">
        <div className="bg-slate-900/80 backdrop-blur-md border border-purple-400/40 px-4 py-2 rounded-2xl text-center shadow-xl">
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest block">
            {t('home.currentLandmark')}
          </span>
          <h4 className="text-sm font-black text-white flex items-center gap-1.5 justify-center">
            <Compass className="w-4 h-4 text-amber-300" />
            {t('home.pathTitle')} #{learnedCount}
          </h4>
        </div>
      </div>

      {/* Bottom Floating Glass Overlay Card */}
      <div className="relative z-10 bg-slate-900/75 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('hero.title')}
            </h2>
            <p className="text-xs text-purple-200/80 font-medium">
              {t('home.colvilleSanctuary')}
            </p>
          </div>
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            {t('home.ratingPro')}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <Button variant="mystic" size="md" onClick={() => onNavigate('daily')}>
            <Sun className="w-4 h-4 text-amber-300" />
            <span>{t('hero.ctaDaily')}</span>
          </Button>

          <span className="text-xs font-bold text-purple-200">
            {t('home.freeDailyDraw')}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
