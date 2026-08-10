import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sun } from 'lucide-react'
import { DailyCardResult } from './components/DailyCardResult'
import { DailyIntentionForm } from './components/DailyIntentionForm'
import { useDailyDraw } from './hooks/useDailyDraw'

export const DailyView: React.FC = () => {
  const { t } = useTranslation()
  const {
    intention,
    setIntention,
    validationError,
    setValidationError,
    drawnCard,
    position,
    isFlipped,
    isShuffling,
    journalNote,
    setJournalNote,
    handleDraw,
    handleRedraw,
  } = useDailyDraw()

  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Sun className="w-6 h-6 text-amber-500" />
          {t('daily.title')}
        </h2>
        <p className="text-xs text-purple-200/80 font-medium">{t('daily.subtitle')}</p>
      </div>

      {!isFlipped ? (
        <DailyIntentionForm
          intention={intention}
          onIntentionChange={(val) => {
            setIntention(val)
            if (validationError) setValidationError(null)
          }}
          validationError={validationError}
          isShuffling={isShuffling}
          onDraw={handleDraw}
        />
      ) : (
        drawnCard && (
          <DailyCardResult
            drawnCard={drawnCard}
            position={position}
            journalNote={journalNote}
            onJournalNoteChange={setJournalNote}
            onRedraw={handleRedraw}
          />
        )
      )}
    </div>
  )
}
