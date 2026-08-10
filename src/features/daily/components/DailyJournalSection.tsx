import React from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshCw, Bookmark } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { Button } from '../../../components/atoms/Button'

interface DailyJournalSectionProps {
  journalNote: string
  onJournalNoteChange: (note: string) => void
  onRedraw: () => void
  onSave: () => void
}

export const DailyJournalSection: React.FC<DailyJournalSectionProps> = ({
  journalNote,
  onJournalNoteChange,
  onRedraw,
  onSave,
}) => {
  const { t } = useTranslation()

  return (
    <CardBase hoverEffect={false} className="space-y-3 p-5">
      <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wider">
        {t('daily.journalTitle')}
      </h4>
      <textarea
        value={journalNote}
        onChange={(e) => onJournalNoteChange(e.target.value)}
        placeholder={t('daily.journalPlaceholder')}
        rows={3}
        className="w-full p-3 rounded-2xl bg-slate-950/60 border border-purple-500/30 text-xs text-white placeholder-slate-400 font-medium focus:outline-none focus:border-purple-500/80 shadow-inner"
      />
      <div className="flex justify-between items-center pt-2">
        <Button variant="outline" size="sm" onClick={onRedraw}>
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          {t('daily.redraw')}
        </Button>
        <Button variant="primary" size="sm" onClick={onSave}>
          <Bookmark className="w-3.5 h-3.5 mr-1" />
          {t('daily.saveJournal')}
        </Button>
      </div>
    </CardBase>
  )
}
