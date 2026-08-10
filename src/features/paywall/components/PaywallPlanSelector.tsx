import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'

interface PaywallPlanSelectorProps {
  selectedPlan: 'annual' | 'monthly' | 'lifetime'
  onSelectPlan: (plan: 'annual' | 'monthly' | 'lifetime') => void
}

export const PaywallPlanSelector: React.FC<PaywallPlanSelectorProps> = ({
  selectedPlan,
  onSelectPlan,
}) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-2.5 mb-6 font-sans">
      <button
        onClick={() => onSelectPlan('annual')}
        className={`w-full relative flex items-center justify-between p-4 rounded-2xl border-[0.5px] text-left transition-all ${
          selectedPlan === 'annual'
            ? 'bg-purple-900/50 border-purple-400 text-white shadow-lg'
            : 'bg-slate-900/60 border-purple-500/20 text-purple-200 hover:bg-slate-800'
        }`}
      >
        <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md">
          BEST VALUE (%60 OFF)
        </span>
        <div>
          <h4 className="text-sm font-bold text-white">{t('paywall.annual')}</h4>
          <p className="text-xs text-purple-200/70">{t('paywall.annualSub')}</p>
        </div>
        <Sparkles className="w-5 h-5 text-amber-300" />
      </button>

      <button
        onClick={() => onSelectPlan('monthly')}
        className={`w-full flex items-center justify-between p-4 rounded-2xl border-[0.5px] text-left transition-all ${
          selectedPlan === 'monthly'
            ? 'bg-purple-900/50 border-purple-400 text-white shadow-lg'
            : 'bg-slate-900/60 border-purple-500/20 text-purple-200 hover:bg-slate-800'
        }`}
      >
        <div>
          <h4 className="text-sm font-bold text-white">{t('paywall.monthly')}</h4>
          <p className="text-xs text-purple-200/70">{t('paywall.monthlySub')}</p>
        </div>
      </button>
    </div>
  )
}
