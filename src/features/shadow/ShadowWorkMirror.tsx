import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Moon, Eye, Sparkles, RefreshCw, Wand2 } from 'lucide-react'
import { majorArcana } from '../../data/majorArcana'
import { TarotCard } from '../../types/tarot'
import { CardBase } from '../../components/atoms/CardBase'
import { Button } from '../../components/atoms/Button'
import { soundService } from '../../services/soundService'
import { useTarotStore } from '../../store/tarotStore'
import { geminiService } from '../../services/geminiService'

interface ShadowWorkMirrorProps {
  onOpenPaywall?: () => void
}

export const ShadowWorkMirror: React.FC<ShadowWorkMirrorProps> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isPro = useTarotStore((state) => state.isPro)
  const isDark = theme === 'dark'

  const [personaCard, setPersonaCard] = useState<TarotCard | null>(null)
  const [shadowCard, setShadowCard] = useState<TarotCard | null>(null)
  const [notes, setNotes] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [insight, setInsight] = useState<string | null>(null)

  const handleDrawCards = () => {
    const shuffled = [...majorArcana].sort(() => Math.random() - 0.5)
    setPersonaCard(shuffled[0])
    setShadowCard(shuffled[1])
    setInsight(null)
    soundService.playCardFlip()
  }

  const handleGenerateInsight = async () => {
    if (!isPro && onOpenPaywall) return onOpenPaywall()
    if (!personaCard || !shadowCard) return
    setIsAnalyzing(true)
    soundService.playCardFlip()
    const pName = t(`cards.${personaCard.id}.name`, personaCard.name)
    const sName = t(`cards.${shadowCard.id}.name`, shadowCard.name)
    const res = await geminiService.getShadowWorkReading(pName, sName, notes)
    setInsight(res)
    setIsAnalyzing(false)
    soundService.playMysticChime()
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Moon className="w-6 h-6 text-indigo-400" />
            {t('shadow.title', 'Jungian Shadow Mirror')}
          </h2>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('shadow.subtitle', 'Unveil your conscious Persona and subconscious Shadow archetypes')}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDrawCards}>
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          {personaCard ? t('shadow.redraw', 'Redraw') : t('shadow.draw', 'Dual Draw')}
        </Button>
      </div>

      {!personaCard || !shadowCard ? (
        <CardBase className="text-center py-10 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/10 flex items-center justify-center">
            <Eye className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('shadow.startTitle', 'Reflect Your Inner Psyche')}</h3>
          <p className="text-xs max-w-sm mx-auto text-slate-400">{t('shadow.startDesc', 'Draw dual cards to illuminate the balance between public Persona and hidden Shadow.')}</p>
          <Button variant="mystic" onClick={handleDrawCards} className="mt-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('shadow.drawDualBtn', 'Draw Persona & Shadow')}
          </Button>
        </CardBase>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardBase className="border-indigo-500/30 bg-gradient-to-b from-indigo-900/10 to-transparent">
              <span className="inline-block px-2.5 py-0.5 mb-3 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {t('shadow.personaLabel', '🎭 Persona (Conscious Self)')}
              </span>
              <img src={personaCard.image} alt={personaCard.name} className="w-full h-48 object-cover rounded-2xl mb-3 shadow-md" />
              <h4 className={`font-black text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(`cards.${personaCard.id}.name`, personaCard.name)}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{personaCard.guidance}</p>
            </CardBase>

            <CardBase className="border-purple-500/30 bg-gradient-to-b from-purple-900/10 to-transparent">
              <span className="inline-block px-2.5 py-0.5 mb-3 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {t('shadow.shadowLabel', '🌑 Shadow (Subconscious Self)')}
              </span>
              <img src={shadowCard.image} alt={shadowCard.name} className="w-full h-48 object-cover rounded-2xl mb-3 shadow-md" />
              <h4 className={`font-black text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(`cards.${shadowCard.id}.name`, shadowCard.name)}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{shadowCard.guidance}</p>
            </CardBase>
          </div>

          <CardBase className="space-y-3">
            <label className={`block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('shadow.notesLabel', 'Subconscious Journal / Context (Optional)')}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('shadow.notesPlaceholder', 'What hidden emotions, fears, or repeating dreams are on your mind?')}
              rows={2}
              className={`w-full p-3 rounded-2xl text-xs border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            <Button variant="mystic" isLoading={isAnalyzing} onClick={handleGenerateInsight} className="w-full">
              <Wand2 className="w-4 h-4 mr-2" />
              {t('shadow.illuminateBtn', 'Illuminate Subconscious Mirror Insight')}
            </Button>
          </CardBase>

          {insight && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <CardBase className="border-indigo-500/40 bg-indigo-950/20 space-y-3">
                <h4 className="text-sm font-black flex items-center gap-2 text-indigo-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {t('shadow.insightTitle', 'Jungian Mirror Insights')}
                </h4>
                <div className={`text-xs leading-relaxed whitespace-pre-wrap ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{insight}</div>
              </CardBase>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
