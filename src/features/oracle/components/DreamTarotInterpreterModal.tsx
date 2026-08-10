import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Moon, RefreshCw, Wand2, AlertCircle, Crown } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { Button } from '../../../components/atoms/Button'
import { majorArcana } from '../../../data/majorArcana'
import { geminiService } from '../../../services/geminiService'
import { TarotCard } from '../../../types/tarot'
import { useTarotStore } from '../../../store/tarotStore'

interface DreamTarotInterpreterModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenPaywall?: () => void
}

export const DreamTarotInterpreterModal: React.FC<DreamTarotInterpreterModalProps> = ({
  isOpen,
  onClose,
  onOpenPaywall,
}) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const [dreamText, setDreamText] = useState('')
  const [drawnCard, setDrawnCard] = useState<TarotCard | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrawCard = () => {
    if (!isPro) {
      onOpenPaywall?.()
      return
    }
    const randomCard = majorArcana[Math.floor(Math.random() * majorArcana.length)]
    setDrawnCard(randomCard)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!isPro) {
      onOpenPaywall?.()
      return
    }
    if (!dreamText.trim() || !drawnCard) {
      setError(t('dreamTarot.errorMsg'))
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const analysis = await geminiService.getDreamAnalysis(dreamText, drawnCard.name)
      setResult(analysis)
    } catch {
      setError(t('dreamTarot.errorMsg'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setDreamText('')
    setDrawnCard(null)
    setResult(null)
    setError(null)
  }

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={t('dreamTarot.title')} maxWidth="lg">
      <div className="space-y-4 font-sans">
        <div className="flex items-center justify-between">
          <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
            {t('dreamTarot.subtitle')}
          </p>
          {!isPro && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm shrink-0">
              <Crown className="w-3 h-3 fill-current" />
              <span>PRO Ayrıcalığı</span>
            </span>
          )}
        </div>

        {error && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
            isDark ? 'bg-rose-950/60 border-rose-500/40 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!result ? (
          <div className="space-y-4">
            <div>
              <label className={`block text-xs font-bold mb-1.5 flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-700'}`}>
                <Moon className="w-4 h-4 text-purple-500" />
                <span>{t('dreamTarot.inputLabel')}</span>
              </label>
              <textarea
                value={dreamText}
                onChange={(e) => setDreamText(e.target.value)}
                placeholder={t('dreamTarot.placeholder')}
                rows={3}
                className={`w-full p-3 rounded-2xl border text-xs font-medium focus:outline-none transition-colors ${
                  isDark ? 'bg-slate-900 border-purple-500/30 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white shadow-sm'
                }`}
              />
            </div>

            <div className={`flex items-center justify-between p-3 rounded-2xl border ${
              isDark ? 'bg-slate-900/80 border-purple-500/30' : 'bg-slate-100 border-slate-200'
            }`}>
              <Button variant="secondary" size="sm" onClick={handleDrawCard}>
                <Wand2 className="w-3.5 h-3.5 mr-1.5 text-purple-500" />
                <span>{t('dreamTarot.drawCard')}</span>
              </Button>
              {drawnCard && (
                <div className="flex items-center gap-2 bg-purple-600/20 px-3 py-1.5 rounded-xl border border-purple-400/40 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('dreamTarot.drawnCard')}: {drawnCard.name}</span>
                </div>
              )}
            </div>

            <Button
              variant="mystic"
              size="lg"
              className="w-full justify-center"
              disabled={isLoading || !dreamText.trim() || !drawnCard}
              onClick={handleAnalyze}
            >
              {!isPro ? (
                <Crown className="w-4 h-4 mr-2 text-amber-300" />
              ) : isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              <span>{isLoading ? t('dreamTarot.analyzing') : t('dreamTarot.analyzeBtn')}</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border max-h-72 overflow-y-auto ${
              isDark ? 'bg-slate-900/90 border-purple-500/40 text-purple-100' : 'bg-purple-50 border-purple-200 text-slate-800'
            }`}>
              <h4 className={`text-xs font-black mb-2 flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-purple-900'}`}>
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>{t('dreamTarot.resultTitle')}</span>
              </h4>
              <p className="text-xs leading-relaxed whitespace-pre-line">{result}</p>
            </div>
            <Button variant="secondary" size="md" className="w-full" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2 text-purple-500" />
              <span>{t('dreamTarot.newAnalysisBtn')}</span>
            </Button>
          </div>
        )}
      </div>
    </ModalBase>
  )
}
