import React from 'react'
import { useTranslation } from 'react-i18next'
import { TarotCard, CardPosition } from '../../../types/tarot'
import { DailyCardVisual } from './DailyCardVisual'
import { DailyCardMeaningSection } from './DailyCardMeaningSection'
import { DailyJournalSection } from './DailyJournalSection'

interface DailyCardResultProps {
  drawnCard: TarotCard
  position: CardPosition
  journalNote: string
  onJournalNoteChange: (note: string) => void
  onRedraw: () => void
}

import { useTarotStore } from '../../../store/tarotStore'

export const DailyCardResult: React.FC<DailyCardResultProps> = ({
  drawnCard,
  position,
  journalNote,
  onJournalNoteChange,
  onRedraw,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const handleSave = () => {
    alert(t('daily.journalSaved'))
  }

  const localizedName = t(`cards.${drawnCard.id}.name`, drawnCard.name)
  const localizedMeaning =
    position === 'upright'
      ? t(`cards.${drawnCard.id}.upright`, drawnCard.meaning.upright)
      : t(`cards.${drawnCard.id}.reversed`, drawnCard.meaning.reversed)
  const localizedGuidance = t(`cards.${drawnCard.id}.guidance`, drawnCard.guidance)

  return (
    <div className="space-y-6 font-sans">
      <div className={`flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 rounded-3xl border shadow-xl backdrop-blur-xl transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-purple-500/30 text-white'
          : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}>
        <DailyCardVisual
          drawnCard={drawnCard}
          position={position}
          localizedName={localizedName}
        />
        <DailyCardMeaningSection
          position={position}
          localizedName={localizedName}
          localizedMeaning={localizedMeaning}
          localizedGuidance={localizedGuidance}
        />
      </div>

      <DailyJournalSection
        journalNote={journalNote}
        onJournalNoteChange={onJournalNoteChange}
        onRedraw={onRedraw}
        onSave={handleSave}
      />
    </div>
  )
}
