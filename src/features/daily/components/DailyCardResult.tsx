import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Bot, Loader2, Crown } from 'lucide-react'
import { TarotCard, CardPosition } from '../../../types/tarot'
import { DailyCardVisual } from './DailyCardVisual'
import { DailyCardMeaningSection } from './DailyCardMeaningSection'
import { DailyJournalSection } from './DailyJournalSection'
import { geminiService } from '../../../services/geminiService'
import { useTarotStore } from '../../../store/tarotStore'
import { CardBase } from '../../../components/atoms/CardBase'
import { Button } from '../../../components/atoms/Button'

interface DailyCardResultProps {
  drawnCard: TarotCard
  position: CardPosition
  journalNote: string
  onJournalNoteChange: (note: string) => void
  onRedraw: () => void
  intention?: string
  onOpenPaywall?: () => void
}

export const DailyCardResult: React.FC<DailyCardResultProps> = ({
  drawnCard,
  position,
  journalNote,
  onJournalNoteChange,
  onRedraw,
  intention = '',
  onOpenPaywall,
}) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const [mindQuestion, setMindQuestion] = useState('')
  const [feelingQuestion, setFeelingQuestion] = useState('')
  const [aiReading, setAiReading] = useState<string | null>(null)
  const [isLoadingAi, setIsLoadingAi] = useState(false)

  const handleSave = () => alert(t('daily.journalSaved'))

  const localizedName = t(`cards.${drawnCard.id}.name`, drawnCard.name)
  const localizedMeaning = position === 'upright'
    ? t(`cards.${drawnCard.id}.upright`, drawnCard.meaning.upright)
    : t(`cards.${drawnCard.id}.reversed`, drawnCard.meaning.reversed)
  const localizedGuidance = t(`cards.${drawnCard.id}.guidance`, drawnCard.guidance)

  const handleGetAiReading = async () => {
    if (!isPro) {
      onOpenPaywall?.()
      return
    }
    setIsLoadingAi(true)
    const answers = [
      mindQuestion.trim() ? `Zihnim: ${mindQuestion.trim()}` : '',
      feelingQuestion.trim() ? `Hislerim: ${feelingQuestion.trim()}` : '',
    ].filter(Boolean).join(' | ')

    const result = await geminiService.getDailyReading(
      localizedName,
      position === 'reversed',
      intention,
      answers || 'Derin yansıma ve kart rehberliği isteği.'
    )
    setAiReading(result)
    setIsLoadingAi(false)
  }

  return (
    <div className="space-y-6 font-sans">
      <div className={`flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 rounded-3xl border shadow-xl backdrop-blur-xl transition-colors ${
        isDark ? 'bg-slate-900/90 border-purple-500/30 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}>
        <DailyCardVisual drawnCard={drawnCard} position={position} localizedName={localizedName} />
        <DailyCardMeaningSection
          position={position}
          localizedName={localizedName}
          localizedMeaning={localizedMeaning}
          localizedGuidance={localizedGuidance}
        />
      </div>

      <CardBase hoverEffect={false} className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-amber-300' : 'text-purple-950'}`}>
            <Bot className="w-4 h-4 text-purple-400" />
            Mistik Yansıma & AI Rehberliği
          </h4>
          {!isPro && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Crown className="w-3 h-3 fill-current" />
              <span>PRO Ayrıcalığı</span>
            </span>
          )}
        </div>
        <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
          Kartın sana özel mesajını derinleştirmek için aşağıdaki soruları yanıtla:
        </p>
        <div className="space-y-3">
          <input
            type="text"
            value={mindQuestion}
            onChange={(e) => setMindQuestion(e.target.value)}
            placeholder="Bugün zihnini en çok ne meşgul ediyor?"
            className={`w-full p-3 rounded-2xl border text-xs font-medium focus:outline-none transition-colors ${
              isDark ? 'bg-slate-900/80 border-purple-500/30 text-white placeholder-slate-400 focus:border-purple-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
            }`}
          />
          <input
            type="text"
            value={feelingQuestion}
            onChange={(e) => setFeelingQuestion(e.target.value)}
            placeholder="Bu kart sana ne hissettirdi?"
            className={`w-full p-3 rounded-2xl border text-xs font-medium focus:outline-none transition-colors ${
              isDark ? 'bg-slate-900/80 border-purple-500/30 text-white placeholder-slate-400 focus:border-purple-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
            }`}
          />
        </div>
        <Button variant="mystic" size="sm" onClick={handleGetAiReading} disabled={isLoadingAi} className="w-full justify-center">
          {!isPro ? (
            <Crown className="w-4 h-4 mr-2 text-amber-300" />
          ) : isLoadingAi ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin text-amber-300" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
          )}
          <span>🤖 AI Mistik Günlük Yorum Al</span>
        </Button>

        {aiReading && (
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 whitespace-pre-line ${
            isDark ? 'bg-slate-900/90 border-purple-500/40 text-purple-100' : 'bg-purple-50 border-purple-200 text-slate-800'
          }`}>
            <h5 className={`font-bold text-sm ${isDark ? 'text-amber-300' : 'text-purple-900'}`}>🌟 Canlı AI Rehberlik Yorumu</h5>
            <div>{aiReading}</div>
          </div>
        )}
      </CardBase>

      <DailyJournalSection journalNote={journalNote} onJournalNoteChange={onJournalNoteChange} onRedraw={onRedraw} onSave={handleSave} />
    </div>
  )
}
