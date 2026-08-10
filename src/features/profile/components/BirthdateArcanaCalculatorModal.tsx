import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { Button } from '../../../components/atoms/Button'
import { majorArcana } from '../../../data/majorArcana'
import { useTarotStore } from '../../../store/tarotStore'

interface BirthdateArcanaCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BirthdateArcanaCalculatorModal: React.FC<BirthdateArcanaCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
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

  const localizedName = resultCard ? t(`cards.${resultCard.id}.name`, resultCard.name) : ''
  const localizedKw = resultCard ? t(`cards.${resultCard.id}.kw`, resultCard.keywords.upright.join(' • ')) : ''
  const localizedUpright = resultCard ? t(`cards.${resultCard.id}.upright`, resultCard.meaning.upright) : ''

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="🔮 Kişisel Kader & Ruh Kartı Analizi">
      <div className="space-y-4 font-sans">
        <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
          Doğum tarihinizin numerolojik sayı frekansını hesaplayarak yaşam boyu sizi koruyan Arkana Ruh Kartınızı keşfedin.
        </p>

        <form onSubmit={handleCalculate} className="space-y-3">
          <div>
            <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Doğum Tarihiniz:
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              className={`w-full p-3 rounded-2xl text-xs font-medium focus:outline-none transition-colors border ${
                isDark
                  ? 'bg-slate-900 border-purple-500/30 text-white focus:border-amber-400 [color-scheme:dark]'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white shadow-sm [color-scheme:light]'
              }`}
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
          <div className={`p-5 rounded-2xl border space-y-3 shadow-2xl ${
            isDark
              ? 'bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border-amber-400/40 text-white'
              : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-50 border-purple-200 text-slate-900'
          }`}>
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
                <span className="text-[10px] font-black text-amber-500 uppercase bg-amber-400/20 border border-amber-400/30 px-2 py-0.2 rounded-full">
                  Senin Kader Arkana Kartın
                </span>
                <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  #{resultCard.number} {localizedName}
                </h3>
                <p className={`text-xs font-medium ${isDark ? 'text-purple-200/90' : 'text-purple-700'}`}>
                  {localizedKw}
                </p>
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs font-medium leading-relaxed whitespace-pre-line ${
              isDark
                ? 'bg-purple-950/70 border-purple-500/30 text-purple-100'
                : 'bg-purple-100 border-purple-200 text-purple-900'
            }`}>
              {localizedUpright}
            </div>
          </div>
        )}
      </div>
    </ModalBase>
  )
}
