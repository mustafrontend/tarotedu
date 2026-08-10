import React from 'react'
import { useTranslation } from 'react-i18next'
import { Lock } from 'lucide-react'
import { SpreadType } from '../../../types/tarot'
import { useTarotStore } from '../../../store/tarotStore'

interface SpreadConfigItem {
  nameKey: string
  count: number
  positions: string[]
}

interface SpreadSelectorBarProps {
  spreadsConfig: Record<SpreadType, SpreadConfigItem>
  activeSpread: SpreadType
  onSelectSpread: (spreadKey: SpreadType) => void
  onOpenPaywall?: () => void
}

export const SpreadSelectorBar: React.FC<SpreadSelectorBarProps> = ({
  spreadsConfig,
  activeSpread,
  onSelectSpread,
  onOpenPaywall,
}) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)

  const proLockedSpreads: SpreadType[] = ['celtic-cross', 'horseshoe', 'career']

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(spreadsConfig) as SpreadType[])
        .filter((s) => s !== 'daily')
        .map((spreadKey) => {
          const isSelected = activeSpread === spreadKey
          const isLocked = proLockedSpreads.includes(spreadKey) && !isPro

          const handleClick = () => {
            if (isLocked) {
              if (onOpenPaywall) onOpenPaywall()
            } else {
              onSelectSpread(spreadKey)
            }
          }

          return (
            <button
              key={spreadKey}
              onClick={handleClick}
              className={`px-3 py-2 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-900/80 text-slate-300 border-purple-500/30 hover:bg-slate-800/90 hover:text-white'
              }`}
            >
              <span>{t(spreadsConfig[spreadKey].nameKey)}</span>
              {isLocked && (
                <span className="bg-amber-400/20 text-amber-300 text-[9px] px-1.5 py-0.2 rounded-full border border-amber-400/40 flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" /> PRO
                </span>
              )}
            </button>
          )
        })}
    </div>
  )
}
