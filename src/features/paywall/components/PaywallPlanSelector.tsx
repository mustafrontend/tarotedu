import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Crown, Infinity } from 'lucide-react'

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
    <div className="space-y-3 mb-6 font-sans">
      {/* 1. Lifetime VIP Plan ($39.99) */}
      <button
        type="button"
        onClick={() => onSelectPlan('lifetime')}
        className={`w-full relative flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
          selectedPlan === 'lifetime'
            ? 'bg-gradient-to-r from-amber-500/20 via-purple-900/60 to-indigo-900/60 border-amber-400 text-white shadow-xl ring-2 ring-amber-400/40 scale-[1.02]'
            : 'bg-slate-900/60 border-purple-500/20 text-purple-200 hover:bg-slate-800'
        }`}
      >
        <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full shadow-lg flex items-center gap-1">
          <Crown className="w-3 h-3 fill-current" />
          <span>ÖMÜR BOYU VIP (TEK SEFERLİK)</span>
        </span>
        <div>
          <h4 className="text-sm font-black text-amber-300 flex items-center gap-1.5">
            <span>{t('paywall.lifetime', 'Ömür Boyu VIP Paket')}</span>
          </h4>
          <p className="text-xs text-purple-200/80 font-medium">
            {t('paywall.lifetimeSub', '$39.99 Tek Seferlik Ödeme (Sınırsız Erişim)')}
          </p>
        </div>
        <Infinity className="w-6 h-6 text-amber-300 shrink-0" />
      </button>

      {/* 2. Annual Plan ($19.99/yr) */}
      <button
        type="button"
        onClick={() => onSelectPlan('annual')}
        className={`w-full relative flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
          selectedPlan === 'annual'
            ? 'bg-purple-900/50 border-purple-400 text-white shadow-lg'
            : 'bg-slate-900/60 border-purple-500/20 text-purple-200 hover:bg-slate-800'
        }`}
      >
        <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
          EN POPÜLER (%60 İNDİRİM)
        </span>
        <div>
          <h4 className="text-sm font-bold text-white">{t('paywall.annual', 'Yıllık Üyelik')}</h4>
          <p className="text-xs text-purple-200/70">{t('paywall.annualSub', '3 Gün Ücretsiz Deneme, Sonra $19.99/Yıl')}</p>
        </div>
        <Sparkles className="w-5 h-5 text-purple-300 shrink-0" />
      </button>

      {/* 3. Monthly Plan ($4.99/mo) */}
      <button
        type="button"
        onClick={() => onSelectPlan('monthly')}
        className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
          selectedPlan === 'monthly'
            ? 'bg-purple-900/50 border-purple-400 text-white shadow-lg'
            : 'bg-slate-900/60 border-purple-500/20 text-purple-200 hover:bg-slate-800'
        }`}
      >
        <div>
          <h4 className="text-sm font-bold text-white">{t('paywall.monthly', 'Aylık Üyelik')}</h4>
          <p className="text-xs text-purple-200/70">{t('paywall.monthlySub', '$4.99/Ay')}</p>
        </div>
      </button>
    </div>
  )
}
