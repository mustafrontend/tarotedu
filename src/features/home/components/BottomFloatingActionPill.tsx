import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sun, Crown, ArrowRight } from 'lucide-react'

interface BottomFloatingActionPillProps {
  onNavigate: (tab: any) => void
  onOpenPaywall: () => void
  isPro: boolean
}

export const BottomFloatingActionPill: React.FC<BottomFloatingActionPillProps> = ({
  onNavigate,
  onOpenPaywall,
  isPro,
}) => {
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 max-w-xl mx-auto">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => (isPro ? onNavigate('daily') : onOpenPaywall())}
        className="w-full bg-slate-950 hover:bg-slate-900 text-white p-4 rounded-[2rem] shadow-2xl border-[0.5px] border-purple-400/40 flex items-center justify-between backdrop-blur-xl transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-400 flex items-center justify-center text-white shadow-md">
            {isPro ? <Sun className="w-5 h-5" /> : <Crown className="w-5 h-5 text-amber-300" />}
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black tracking-tight text-white">
              {isPro ? t('home.drawTodayCard') : t('home.unlockProAccess')}
            </h4>
            <p className="text-[10px] text-purple-200/80 font-medium">
              {isPro ? t('home.proFeatureSummary', '78 Cards • 5 Spreads • AI Oracle') : t('paywall.annualSub')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full border border-white/20 text-xs font-bold text-amber-300">
          <span>{isPro ? t('home.drawFree') : t('home.tryFree')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </motion.button>
    </div>
  )
}
