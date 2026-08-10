import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Flame, Droplets, Wind, Mountain, Sparkles } from 'lucide-react'
import { ElementalBalance, ElementType } from '../types'

interface Props {
  balance: ElementalBalance
  isDark: boolean
  t?: any
}

const ELEMENT_CONFIG: Record<ElementType, { nameKey: string; icon: any; color: string; bg: string }> = {
  fire: { nameKey: 'synastry.fire', icon: Flame, color: 'text-amber-400', bg: 'bg-amber-500' },
  water: { nameKey: 'synastry.water', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500' },
  air: { nameKey: 'synastry.air', icon: Wind, color: 'text-purple-300', bg: 'bg-purple-500' },
  earth: { nameKey: 'synastry.earth', icon: Mountain, color: 'text-emerald-400', bg: 'bg-emerald-500' },
}

export const ElementalBalanceView: React.FC<Props> = ({ balance, isDark, t: propT }) => {
  const { t: tHook } = useTranslation()
  const t = propT || tHook

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-2xl border space-y-3.5 ${
        isDark ? 'bg-slate-900/90 border-purple-500/30 text-white' : 'bg-purple-50/50 border-purple-200 text-slate-900'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          <h4 className="text-sm font-black tracking-wide">
            {t('synastry.elementalTitle', 'Elemental Balance Breakdown')}
          </h4>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-amber-300 text-xs font-black border border-purple-400/30">
          {balance.synergyScore}% {t('synastry.synergy', 'Synergy')}
        </div>
      </div>

      <div className={`p-3 rounded-xl border flex items-center justify-between ${
        isDark ? 'bg-slate-950/80 border-purple-500/20' : 'bg-white border-purple-100'
      }`}>
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-purple-400">
            {t('synastry.alchemyFormula', 'Alchemical Reaction')}
          </span>
          <div className="text-sm font-extrabold text-amber-300">{balance.alchemyName}</div>
        </div>
        <p className={`text-xs max-w-[200px] text-right font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
          {balance.description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(['fire', 'water', 'air', 'earth'] as ElementType[]).map((elem) => {
          const cfg = ELEMENT_CONFIG[elem]
          const Icon = cfg.icon
          const pct = balance.ratios[elem]
          return (
            <div
              key={elem}
              className={`p-2.5 rounded-xl border flex flex-col justify-between space-y-1.5 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold capitalize flex items-center gap-1 ${cfg.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {t(cfg.nameKey, elem)}
                </span>
                <span className="text-[11px] font-black text-amber-400">{pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${cfg.bg} transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
