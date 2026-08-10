import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Wand2, Sparkles, Send, Crown, AlertCircle } from 'lucide-react'
import { majorArcana } from '../../data/majorArcana'
import { CardBase } from '../../components/atoms/CardBase'
import { Button } from '../../components/atoms/Button'
import { soundService } from '../../services/soundService'
import { useTarotStore } from '../../store/tarotStore'
import { validateIntentionText } from '../../utils/textValidation'

interface TarotOracleViewProps {
  onOpenPaywall: () => void
}

export const TarotOracleView: React.FC<TarotOracleViewProps> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)

  const [prompt, setPrompt] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [oracleAnswer, setOracleAnswer] = useState<{
    cardName: string
    cardEmoji: string
    response: string
  } | null>(null)

  const handleConsult = () => {
    const valid = validateIntentionText(prompt)
    if (!valid.isValid) {
      setValidationError(valid.errorMessage || 'Lütfen anlamlı bir soru yazın.')
      soundService.playClick()
      return
    }

    if (!isPro) {
      onOpenPaywall()
      return
    }

    setValidationError(null)
    setIsAnalyzing(true)
    setOracleAnswer(null)
    soundService.playCardFlip()

    setTimeout(() => {
      const card = majorArcana[Math.floor(Math.random() * majorArcana.length)]
      setIsAnalyzing(false)
      soundService.playMysticChime()
      const localizedName = t(`cards.${card.id}.name`, card.name)
      const localizedGuidance = t(`cards.${card.id}.guidance`, card.guidance)
      const localizedUpright = t(`cards.${card.id}.upright`, card.meaning.upright)
      setOracleAnswer({
        cardName: localizedName,
        cardEmoji: '🔮',
        response: t('oracle.answerTemplate', {
          cardName: localizedName,
          guidance: localizedGuidance,
          theme: localizedUpright,
        }),
      })
    }, 1200)
  }

  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-purple-400" />
          {t('oracle.title')}
        </h2>
        <p className="text-xs text-purple-200/80">{t('oracle.subtitle')}</p>
      </div>

      <CardBase hoverEffect={false} className="space-y-4 p-6">
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value)
            if (validationError) setValidationError(null)
          }}
          placeholder={t('oracle.promptPlaceholder')}
          rows={3}
          className={`w-full p-3 rounded-2xl bg-slate-900/90 border text-xs text-white placeholder-slate-400 font-medium focus:outline-none shadow-inner transition-colors ${
            validationError
              ? 'border-rose-500/80 bg-rose-950/20 focus:border-rose-400'
              : 'border-purple-500/30 focus:border-purple-400'
          }`}
        />

        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs text-rose-300 font-bold bg-rose-950/60 p-2.5 rounded-xl border border-rose-500/40"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{validationError}</span>
          </motion.div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-[11px] text-purple-200/70 font-medium">
            {t('oracle.helperHint')}
          </span>
          <Button
            variant="mystic"
            size="md"
            isLoading={isAnalyzing}
            onClick={handleConsult}
            disabled={!prompt.trim()}
          >
            {!isPro ? <Crown className="w-4 h-4 mr-1 text-amber-300" /> : <Send className="w-4 h-4 mr-1" />}
            <span>{t('oracle.askBtn')}</span>
          </Button>
        </div>
      </CardBase>

      {isAnalyzing && (
        <CardBase hoverEffect={false} className="p-6 text-center space-y-2 bg-purple-950/60 border border-purple-500/30">
          <Sparkles className="w-6 h-6 text-purple-400 animate-spin mx-auto" />
          <p className="text-xs font-bold text-purple-200">{t('oracle.analyzing')}</p>
        </CardBase>
      )}

      {oracleAnswer && (
        <CardBase hoverEffect={false} className="p-6 space-y-3 bg-gradient-to-br from-purple-950 to-indigo-950 text-white border border-purple-500/30 shadow-xl shadow-purple-950/50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{oracleAnswer.cardEmoji}</span>
            <h3 className="text-base font-black text-amber-300">
              {oracleAnswer.cardName}
            </h3>
          </div>
          <p className="text-xs text-purple-100 leading-relaxed font-medium">
            {oracleAnswer.response}
          </p>
        </CardBase>
      )}
    </div>
  )
}
