import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Crown, CheckCircle2, ShieldCheck, X } from 'lucide-react'
import { useTarotStore } from '../../store/tarotStore'
import { purchaseProPackage, restoreProPurchases } from '../../services/revenueCatService'
import { Button } from '../../components/atoms/Button'
import { PaywallPlanSelector } from './components/PaywallPlanSelector'

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const setIsPro = useTarotStore((state) => state.setIsPro)
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly' | 'lifetime'>('annual')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handlePurchase = async () => {
    setIsLoading(true)
    try {
      const isSuccess = await purchaseProPackage(selectedPlan)
      if (isSuccess) {
        setIsPro(true)
        onClose()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestore = async () => {
    setIsLoading(true)
    try {
      const isRestored = await restoreProPurchases()
      if (isRestored) {
        setIsPro(true)
        alert('Pro membership successfully restored!')
        onClose()
      } else {
        alert('No active Pro purchase found to restore.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    t('paywall.feature1'),
    t('paywall.feature2'),
    t('paywall.feature3'),
    t('paywall.feature4'),
    t('paywall.feature5'),
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto bg-slate-950/95 text-white rounded-3xl shadow-2xl border-[0.5px] border-purple-500/40 backdrop-blur-2xl z-10 p-5 sm:p-7"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-400 via-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-950">
              <Crown className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {t('paywall.title')}
            </h2>
            <p className="text-xs text-purple-200/80 max-w-sm mx-auto font-medium">
              {t('paywall.subtitle')}
            </p>
          </div>

          <div className="space-y-2 mb-6 bg-slate-900/80 p-4 rounded-2xl border border-purple-500/30">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <PaywallPlanSelector
            selectedPlan={selectedPlan}
            onSelectPlan={(plan) => setSelectedPlan(plan)}
          />

          <div className="space-y-3">
            <Button
              variant="mystic"
              size="lg"
              isLoading={isLoading}
              onClick={handlePurchase}
              className="w-full text-base font-bold shadow-xl"
            >
              {t('paywall.cta')}
            </Button>

            <div className="flex items-center justify-between text-xs text-purple-300/80 px-1 pt-1 font-medium">
              <button
                onClick={handleRestore}
                className="hover:text-amber-300 underline"
              >
                {t('paywall.restore')}
              </button>
              <div className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('paywall.guarantee')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
