import React from 'react'
import { Lock } from 'lucide-react'
import { Button } from '../../../components/atoms/Button'
import { useTarotStore } from '../../../store/tarotStore'

interface CardProLockOverlayProps {
  cardNumber: number
  onOpenPaywall?: () => void
}

export const CardProLockOverlay: React.FC<CardProLockOverlayProps> = ({
  cardNumber,
  onOpenPaywall,
}) => {
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <div className={`p-4 rounded-2xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-colors ${
      isDark
        ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-amber-400/50 text-white'
        : 'bg-gradient-to-r from-purple-100 via-slate-100 to-indigo-100 border-purple-300 text-slate-900'
    }`}>
      <div className="flex items-center gap-2">
        <Lock className={`w-5 h-5 shrink-0 ${isDark ? 'text-amber-300' : 'text-purple-600'}`} />
        <div>
          <h4 className={`text-xs font-black ${isDark ? 'text-amber-300' : 'text-purple-900'}`}>Ders #{cardNumber} PRO Kilitli</h4>
          <p className={`text-[11px] font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>Sadece 1. Ders ücretsizdir. Tüm 22 karta erişmek için PRO'ya geçin.</p>
        </div>
      </div>
      <Button variant="mystic" size="sm" onClick={onOpenPaywall}>
        PRO Aç
      </Button>
    </div>
  )
}
