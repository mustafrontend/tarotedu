import React from 'react'
import { Lock } from 'lucide-react'
import { Button } from '../../../components/atoms/Button'

interface CardProLockOverlayProps {
  cardNumber: number
  onOpenPaywall?: () => void
}

export const CardProLockOverlay: React.FC<CardProLockOverlayProps> = ({
  cardNumber,
  onOpenPaywall,
}) => {
  return (
    <div className="p-4 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl border border-amber-400/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <div className="flex items-center gap-2">
        <Lock className="w-5 h-5 text-amber-300 shrink-0" />
        <div>
          <h4 className="text-xs font-black text-amber-300">Ders #{cardNumber} PRO Kilitli</h4>
          <p className="text-[11px] text-purple-200/80">Sadece 1. Ders ücretsizdir. Tüm 22 karta erişmek için PRO'ya geçin.</p>
        </div>
      </div>
      <Button variant="mystic" size="sm" onClick={onOpenPaywall}>
        PRO Aç
      </Button>
    </div>
  )
}
