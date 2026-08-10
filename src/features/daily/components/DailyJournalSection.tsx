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

import { useTarotStore } from '../../../store/tarotStore'

export const DailyJournalSection: React.FC<DailyJournalSectionProps> = ({
  journalNote,
  onJournalNoteChange,
  onRedraw,
  onSave,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <CardBase hoverEffect={false} className="space-y-3 p-5">
      <h4 className={`text-xs font-bold uppercase tracking-wider ${
        isDark ? 'text-purple-200/80' : 'text-slate-600'
      }`}>
        {t('daily.journalTitle')}
      </h4>
      <textarea
        value={journalNote}
        onChange={(e) => onJournalNoteChange(e.target.value)}
        placeholder={t('daily.journalPlaceholder')}
        rows={3}
        className={`w-full p-3 rounded-2xl border text-xs font-medium focus:outline-none transition-colors ${
          isDark
            ? 'bg-slate-900 border-purple-500/30 text-white'
            : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white shadow-sm'
        }`}
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
