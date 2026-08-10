import React from 'react'
import { useTranslation } from 'react-i18next'
import { TarotCard } from '../../../types/tarot'
import { majorArcana } from '../../../data/majorArcana'

interface Props {
  name: string
  onNameChange: (val: string) => void
  card: TarotCard
  onCardSelect: (card: TarotCard) => void
  isDark: boolean
  t?: any
}

export const PartnerCardSelector: React.FC<Props> = ({
  name,
  onNameChange,
  card,
  onCardSelect,
  isDark,
  t: propT,
}) => {
  const { t: tHook } = useTranslation()
  const t = propT || tHook

  return (
    <div
      className={`p-3.5 rounded-2xl border space-y-2.5 ${
        isDark ? 'bg-slate-900/90 border-purple-500/30 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className={`w-full p-2 rounded-xl text-xs font-bold border focus:outline-none ${
          isDark ? 'bg-slate-950 border-purple-500/20 text-amber-300' : 'bg-slate-50 border-slate-300 text-slate-900'
        }`}
      />
      <select
        value={card.id}
        onChange={(e) => {
          const found = majorArcana.find((c) => c.id === e.target.value)
          if (found) onCardSelect(found)
        }}
        className={`w-full p-2 rounded-xl text-xs font-semibold border ${
          isDark ? 'bg-slate-950 border-purple-500/20 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
        }`}
      >
        {majorArcana.map((c) => (
          <option key={c.id} value={c.id}>
            #{c.number} {t(`cards.${c.id}.name`, c.name)}
          </option>
        ))}
      </select>
    </div>
  )
}
