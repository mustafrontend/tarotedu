import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Moon, RefreshCw, Wand2, AlertCircle } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { Button } from '../../../components/atoms/Button'
import { majorArcana } from '../../../data/majorArcana'
import { geminiService } from '../../../services/geminiService'
import { TarotCard } from '../../../types/tarot'

interface DreamTarotInterpreterModalProps {
  isOpen: boolean
  onClose: () => void
}

export const DreamTarotInterpreterModal: React.FC<DreamTarotInterpreterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation()
  const [dreamText, setDreamText] = useState('')
  const [drawnCard, setDrawnCard] = useState<TarotCard | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrawCard = () => {
    const randomCard = majorArcana[Math.floor(Math.random() * majorArcana.length)]
    setDrawnCard(randomCard)
    setError(null)
  }

  const handleAnalyze = async () => {
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
      <div className="space-y-4 font-sans text-slate-800">
        <p className="text-xs text-slate-600 font-medium">{t('dreamTarot.subtitle')}</p>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!result ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-purple-600" />
                <span>{t('dreamTarot.inputLabel')}</span>
              </label>
              <textarea
                value={dreamText}
                onChange={(e) => setDreamText(e.target.value)}
                placeholder={t('dreamTarot.placeholder')}
                rows={3}
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none shadow-sm"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <Button variant="secondary" size="sm" onClick={handleDrawCard}>
                <Wand2 className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                <span>{t('dreamTarot.drawCard')}</span>
              </Button>
              {drawnCard && (
                <div className="flex items-center gap-2 bg-purple-100/80 px-3 py-1.5 rounded-xl border border-purple-200 text-xs font-bold text-purple-900">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>{t('dreamTarot.drawnCard')}: {drawnCard.name}</span>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading || !dreamText.trim() || !drawnCard}
              onClick={handleAnalyze}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              <span>{isLoading ? t('dreamTarot.analyzing') : t('dreamTarot.analyzeBtn')}</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-2xl max-h-72 overflow-y-auto">
              <h4 className="text-xs font-black text-purple-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{t('dreamTarot.resultTitle')}</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{result}</p>
            </div>
            <Button variant="secondary" size="md" className="w-full" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2 text-purple-600" />
              <span>{t('dreamTarot.newAnalysisBtn')}</span>
            </Button>
          </div>
        )}
      </div>
    </ModalBase>
  )
}
