import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { Button } from '../../../components/atoms/Button'
import { majorArcana } from '../../../data/majorArcana'

interface BirthdateArcanaCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BirthdateArcanaCalculatorModal: React.FC<BirthdateArcanaCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [birthdate, setBirthdate] = useState('')
  const [resultCard, setResultCard] = useState<typeof majorArcana[0] | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!birthdate) return

    const digits = birthdate.replace(/\D/g, '').split('').map(Number)
    let sum = digits.reduce((a, b) => a + b, 0)
    while (sum > 21) {
      sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0)
    }

    const card = majorArcana.find((c) => c.number === sum) || majorArcana[0]
    setResultCard(card)
  }

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="🔮 Kişisel Kader & Ruh Kartı Analizi">
      <div className="space-y-4 font-sans">
        <p className="text-xs text-purple-200/80 font-medium">
          Doğum tarihinizin numerolojik sayı frekansını hesaplayarak yaşam boyu sizi koruyan Arkana Ruh Kartınızı keşfedin.
        </p>

        <form onSubmit={handleCalculate} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-white block mb-1">
              Doğum Tarihiniz:
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              className="w-full p-3 rounded-2xl bg-slate-900 border border-purple-500/30 text-xs text-white font-medium focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="w-full flex justify-center">
            <Button type="submit" variant="primary" size="md">
              <span>Ruh Kartımı Hesapla</span>
              <Sparkles className="w-4 h-4 ml-1 text-amber-300" />
            </Button>
          </div>
        </form>

        {resultCard && (
          <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 p-5 rounded-2xl border border-amber-400/40 space-y-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-16 rounded-xl bg-slate-950 border border-amber-400/50 overflow-hidden shrink-0 shadow-md">
                {resultCard.videoUrl && (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src={resultCard.videoUrl}
                  />
                )}
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-300 uppercase bg-amber-400/20 border border-amber-400/30 px-2 py-0.2 rounded-full">
                  Senin Kader Arkana Kartın
                </span>
                <h3 className="text-lg font-black text-white">
                  #{resultCard.number} {resultCard.name}
                </h3>
                <p className="text-xs text-purple-200/90 font-medium">
                  {resultCard.keywords.upright.join(' • ')}
                </p>
              </div>
            </div>

            <div className="bg-purple-950/70 p-3 rounded-xl border border-purple-500/30 text-xs text-purple-100 font-medium leading-relaxed">
              {resultCard.meaning.upright}
            </div>
          </div>
        )}
      </div>
    </ModalBase>
  )
}
