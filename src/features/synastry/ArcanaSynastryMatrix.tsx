import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Wand2, Shuffle, Heart, Crown } from 'lucide-react'
import { majorArcana } from '../../data/majorArcana'
import { TarotCard } from '../../types/tarot'
import { useTarotStore } from '../../store/tarotStore'
import { geminiService } from '../../services/geminiService'
import { soundService } from '../../services/soundService'
import { computeElementalBalance } from './elementalUtils'
import { ElementalBalanceView } from './components/ElementalBalanceView'
import { SoulContractView } from './components/SoulContractView'
import { PartnerCardSelector } from './components/PartnerCardSelector'

interface Props {
  onOpenPaywall?: () => void
}

export const ArcanaSynastryMatrix: React.FC<Props> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)
  const isDark = useTarotStore((state) => state.theme) === 'dark'

  const [partnerA, setPartnerA] = useState('Partner A')
  const [partnerB, setPartnerB] = useState('Partner B')
  const [cardA, setCardA] = useState<TarotCard>(majorArcana[6] || majorArcana[0])
  const [cardB, setCardB] = useState<TarotCard>(majorArcana[14] || majorArcana[1])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)

  const balance = computeElementalBalance(cardA, cardB)

  const handleRandomize = () => {
    soundService.playCardFlip()
    const randA = majorArcana[Math.floor(Math.random() * majorArcana.length)]
    let randB = majorArcana[Math.floor(Math.random() * majorArcana.length)]
    while (randB.id === randA.id) {
      randB = majorArcana[Math.floor(Math.random() * majorArcana.length)]
    }
    setCardA(randA)
    setCardB(randB)
  }

  const handleAnalyze = async () => {
    if (!isPro && onOpenPaywall) {
      soundService.playClick()
      return onOpenPaywall()
    }
    setIsAnalyzing(true)
    soundService.playCardFlip()
    const localizedA = t(`cards.${cardA.id}.name`, cardA.name)
    const localizedB = t(`cards.${cardB.id}.name`, cardB.name)

    const res = await geminiService.getSynastryAnalysis(localizedA, localizedB, partnerA, partnerB)
    setIsAnalyzing(false)
    soundService.playMysticChime()
    setAnalysisResult(res)
  }

  return (
    <div className="space-y-5 pb-8 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500/20" />
            {t('synastry.title', 'Arcana Synastry Matrix')}
          </h2>
          <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
            {t('synastry.subtitle', 'Relational Alchemy, Soul Contracts & Elemental Compatibility')}
          </p>
        </div>
        <button
          onClick={handleRandomize}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold bg-purple-600/20 border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-all"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{t('synastry.randomize', 'Shuffle')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <PartnerCardSelector
          name={partnerA}
          onNameChange={setPartnerA}
          card={cardA}
          onCardSelect={setCardA}
          isDark={isDark}
        />
        <PartnerCardSelector
          name={partnerB}
          onNameChange={setPartnerB}
          card={cardB}
          onCardSelect={setCardB}
          isDark={isDark}
        />
      </div>

      <ElementalBalanceView balance={balance} isDark={isDark} />

      {!analysisResult ? (
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
        >
          {isAnalyzing ? (
            <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
          ) : !isPro ? (
            <Crown className="w-4 h-4 text-amber-300" />
          ) : (
            <Wand2 className="w-4 h-4 text-amber-300" />
          )}
          <span>{isAnalyzing ? t('synastry.analyzing', 'Synthesizing Soul Contract...') : t('synastry.analyzeBtn', 'Analyze Relational Alchemy & Soul Contract')}</span>
        </button>
      ) : (
        <SoulContractView
          cardA={cardA}
          cardB={cardB}
          partnerAName={partnerA}
          partnerBName={partnerB}
          analysisText={analysisResult}
          isDark={isDark}
          onReset={() => setAnalysisResult(null)}
        />
      )}
    </div>
  )
}
