import React, { useState } from 'react'
import { Eye, Sparkles, Compass } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { TarotCard } from '../../../types/tarot'

interface CardSymbolismInspectorModalProps {
  card: TarotCard | null
  isOpen: boolean
  onClose: () => void
}

export const CardSymbolismInspectorModal: React.FC<CardSymbolismInspectorModalProps> = ({
  card,
  isOpen,
  onClose,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)

  if (!card) return null

  const symbols = [
    { id: 'dog', name: 'Beyaz Köpek (Sadakat & Sezgi)', desc: 'Saf içgüdüleri ve tehlikelere karşı ruhsal uyarıyı temsil eder.' },
    { id: 'sun', name: 'Altın Güneş (Uyanış & Netlik)', desc: 'Bilinçli farkındalığı, ilahi aydınlanmayı ve yaşam enerjisini simgeler.' },
    { id: 'rose', name: 'Beyaz Gül (Masumiyet & Arınma)', desc: 'Arzuların arındığını ve saf niyetle yola çıkıldığını gösterir.' },
    { id: 'cliff', name: 'Uçurum Kenarı (Cesaret & İnanç)', desc: 'Bilinmeyene atılan cesur adım ve evrene duyulan sarsılmaz inanç.' },
  ]

  const active = symbols.find((s) => s.id === selectedSymbol) || symbols[0]

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={`🔍 Sembolizm Büyüteci: ${card.name}`}>
      <div className="space-y-4 font-sans">
        <p className="text-xs text-purple-200/80 font-medium">
          Kartın üzerindeki gizemli sembollerin üzerine dokunarak kadim anlamlarını inceleyin.
        </p>

        {/* Card Media Preview */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-950 border border-purple-500/40 shadow-xl flex items-center justify-center">
          {card.videoUrl ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={card.videoUrl} />
          ) : (
            <div className="text-amber-300 font-bold text-sm">#{card.number} {card.name}</div>
          )}
          <div className="absolute inset-0 bg-slate-950/30" />

          {/* Interactive Symbol Pins */}
          <div className="absolute inset-0 p-4 flex flex-wrap gap-2 items-end justify-center z-10">
            {symbols.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSymbol(s.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-black border transition-all ${
                  active.id === s.id
                    ? 'bg-amber-400 text-slate-950 border-amber-300 scale-110 shadow-lg'
                    : 'bg-slate-950/80 text-purple-200 border-purple-400/40 hover:text-white'
                }`}
              >
                🔍 {s.name.split(' ')[0]} {s.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Symbol Interpretation */}
        <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 p-4 rounded-2xl border border-amber-400/40 space-y-2 shadow-xl">
          <div className="flex items-center gap-2 text-amber-300 font-black text-xs">
            <Sparkles className="w-4 h-4" />
            <span>{active.name}</span>
          </div>
          <p className="text-xs text-purple-100 font-medium leading-relaxed">
            {active.desc}
          </p>
        </div>
      </div>
    </ModalBase>
  )
}
