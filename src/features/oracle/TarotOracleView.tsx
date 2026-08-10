import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Wand2, Sparkles, Send, Crown, AlertCircle, Moon } from 'lucide-react'
import { majorArcana } from '../../data/majorArcana'
import { CardBase } from '../../components/atoms/CardBase'
import { Button } from '../../components/atoms/Button'
import { soundService } from '../../services/soundService'
import { useTarotStore } from '../../store/tarotStore'
import { validateIntentionText } from '../../utils/textValidation'
import { geminiService } from '../../services/geminiService'
import { DreamTarotInterpreterModal } from './components/DreamTarotInterpreterModal'

interface TarotOracleViewProps {
  onOpenPaywall: () => void
}

export const TarotOracleView: React.FC<TarotOracleViewProps> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const [prompt, setPrompt] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isDreamModalOpen, setIsDreamModalOpen] = useState(false)
  const [oracleAnswer, setOracleAnswer] = useState<{ cardName: string; cardEmoji: string; response: string } | null>(null)

  const handleConsult = async () => {
    const valid = validateIntentionText(prompt)
    if (!valid.isValid) {
      setValidationError(valid.errorMessage || 'Lütfen anlamlı bir soru yazın.')
      soundService.playClick()
      return
    }
    if (!isPro) return onOpenPaywall()

    setValidationError(null)
    setIsAnalyzing(true)
    setOracleAnswer(null)
    soundService.playCardFlip()

    const card = majorArcana[Math.floor(Math.random() * majorArcana.length)]
    const localizedName = t(`cards.${card.id}.name`, card.name)

    const aiResponse = await geminiService.getOracleAnswer(prompt, localizedName)

    setIsAnalyzing(false)
    soundService.playMysticChime()
    setOracleAnswer({ cardName: localizedName, cardEmoji: '🔮', response: aiResponse })
  }

  return (
    <div className="space-y-5 pb-12 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Wand2 className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            {t('oracle.title')}
          </h2>
          <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>{t('oracle.subtitle')}</p>
        </div>
        <button
          onClick={() => setIsDreamModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-amber-300 text-xs font-black shadow-md border border-purple-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Moon className="w-4 h-4 fill-current" />
          <span>{t('oracle.aiDreamAnalysisBtn', '🌙 AI Rüya Analizi')}</span>
        </button>
      </div>

      <CardBase hoverEffect={false} className="space-y-4 p-5">
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value)
            if (validationError) setValidationError(null)
          }}
          placeholder={t('oracle.promptPlaceholder')}
          rows={3}
          className={`w-full p-3.5 rounded-2xl border text-xs font-medium focus:outline-none transition-colors ${
            validationError
              ? isDark ? 'border-rose-500/80 bg-rose-950/20 text-white' : 'border-rose-500 bg-rose-50 text-slate-900'
              : isDark ? 'bg-slate-900/80 border-purple-500/30 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white shadow-sm'
          }`}
        />

        {validationError && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-xs font-bold p-2.5 rounded-xl border bg-rose-950/60 border-rose-500/40 text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{validationError}</span>
          </motion.div>
        )}

        <div className="flex justify-between items-center">
          <span className={`text-[11px] font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>{t('oracle.helperHint')}</span>
          <Button variant="mystic" size="md" isLoading={isAnalyzing} onClick={handleConsult} disabled={!prompt.trim()}>
            {!isPro ? <Crown className="w-4 h-4 mr-1 text-amber-300" /> : <Send className="w-4 h-4 mr-1" />}
            <span>{t('oracle.askBtn')}</span>
          </Button>
        </div>
      </CardBase>

      {isAnalyzing && (
        <CardBase hoverEffect={false} className={`p-5 text-center space-y-2 border ${isDark ? 'bg-purple-950/60 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
          <Sparkles className="w-6 h-6 text-purple-400 animate-spin mx-auto" />
          <p className={`text-xs font-bold ${isDark ? 'text-purple-200' : 'text-purple-900'}`}>🤖 Gemini AI Mistik Kehanet Yanıtı Hazırlıyor...</p>
        </CardBase>
      )}

      {oracleAnswer && (
        <CardBase hoverEffect={false} className={`p-6 space-y-3 border shadow-xl ${isDark ? 'bg-slate-900/90 border-purple-500/30 text-white' : 'bg-gradient-to-br from-purple-50 to-indigo-50 text-slate-900 border-purple-200'}`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{oracleAnswer.cardEmoji}</span>
            <h3 className={`text-base font-black ${isDark ? 'text-amber-300' : 'text-purple-900'}`}>{oracleAnswer.cardName}</h3>
          </div>
          <p className={`text-xs leading-relaxed font-medium whitespace-pre-line ${isDark ? 'text-purple-100' : 'text-slate-700'}`}>{oracleAnswer.response}</p>
        </CardBase>
      )}

      <DreamTarotInterpreterModal isOpen={isDreamModalOpen} onClose={() => setIsDreamModalOpen(false)} />
    </div>
  )
}
