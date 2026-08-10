import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshCw, Sparkles, Loader2, Bot } from 'lucide-react'
import { ReadingCard } from '../../../types/tarot'
import { Button } from '../../../components/atoms/Button'
import { CardBase } from '../../../components/atoms/CardBase'
import { SpreadCardItem } from './SpreadCardItem'
import { geminiService } from '../../../services/geminiService'
import { useTarotStore } from '../../../store/tarotStore'

interface SpreadResultGridProps {
  drawnCards: ReadingCard[]
  spreadTitle?: string
  onReset: () => void
}

export const SpreadResultGrid: React.FC<SpreadResultGridProps> = ({
  drawnCards,
  spreadTitle,
  onReset,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const [userQuestion, setUserQuestion] = useState('')
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null)
  const [isLoadingAi, setIsLoadingAi] = useState(false)

  const handleGetAiMasterclass = async () => {
    setIsLoadingAi(true)
    const formattedCards = drawnCards.map((rc) => ({
      position: t(`spreads.positions.${rc.positionName}`, rc.positionName),
      cardName: t(`cards.${rc.card.id}.name`, rc.card.name),
      isReversed: rc.position === 'reversed',
    }))

    const reading = await geminiService.getSpreadReading(
      spreadTitle || t('spreads.title', 'Tarot Açılımı'),
      formattedCards,
      userQuestion.trim() || 'Genel hayat rehberliği'
    )
    setAiInterpretation(reading)
    setIsLoadingAi(false)
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <h3
          className={`text-sm font-bold uppercase tracking-wider ${
            isDark ? 'text-amber-300' : 'text-purple-900'
          }`}
        >
          {t('spreads.readingLayout', { count: drawnCards.length })}
        </h3>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          {t('spreads.reset')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drawnCards.map((rc, idx) => (
          <SpreadCardItem key={idx} readingCard={rc} index={idx} />
        ))}
      </div>

      <CardBase hoverEffect={false} className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4
              className={`text-sm font-bold flex items-center gap-2 ${
                isDark ? 'text-amber-300' : 'text-purple-950'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-400" />
              AI Masterclass Tarot Analizi
            </h4>
            <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
              Kartların arasındaki gizli esoterik bağı ve sinerjiyi AI Mistik Rehber ile çöz.
            </p>
          </div>
          <Button
            variant="mystic"
            size="sm"
            onClick={handleGetAiMasterclass}
            disabled={isLoadingAi}
            className="shrink-0"
          >
            {isLoadingAi ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin text-amber-300" />
            ) : (
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-300" />
            )}
            <span>🤖 AI Masterclass Yorum Al</span>
          </Button>
        </div>

        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Özel bir sorunuz veya odaklanmak istediğiniz konu var mı? (İsteğe bağlı)"
          className={`w-full p-3 rounded-2xl border text-xs font-medium focus:outline-none transition-colors ${
            isDark
              ? 'bg-slate-900/80 border-purple-500/30 text-white placeholder-slate-400 focus:border-purple-400'
              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white shadow-sm'
          }`}
        />

        {aiInterpretation && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 whitespace-pre-line ${
              isDark
                ? 'bg-slate-900/90 border-purple-500/40 text-purple-100'
                : 'bg-purple-50 border-purple-200 text-slate-800'
            }`}
          >
            <h5 className={`font-bold text-sm ${isDark ? 'text-amber-300' : 'text-purple-900'}`}>
              🌟 AI Masterclass Sentez Yorumu
            </h5>
            <div>{aiInterpretation}</div>
          </div>
        )}
      </CardBase>
    </div>
  )
}
