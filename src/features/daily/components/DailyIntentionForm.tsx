import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { Button } from '../../../components/atoms/Button'

interface DailyIntentionFormProps {
  intention: string
  onIntentionChange: (val: string) => void
  validationError: string | null
  isShuffling: boolean
  onDraw: () => void
}

export const DailyIntentionForm: React.FC<DailyIntentionFormProps> = ({
  intention,
  onIntentionChange,
  validationError,
  isShuffling,
  onDraw,
}) => {
  const { t } = useTranslation()

  return (
    <CardBase hoverEffect={false} className="space-y-4 p-6 text-center">
      <div className="space-y-2 text-left">
        <label className="text-xs font-bold text-purple-200 uppercase tracking-wider block">
          {t('daily.setDailyIntention')}
        </label>
        <textarea
          value={intention}
          onChange={(e) => onIntentionChange(e.target.value)}
          placeholder={t('daily.intentionPlaceholder')}
          rows={3}
          className={`w-full p-3 rounded-2xl bg-slate-950/60 border text-xs text-white placeholder-slate-400 font-medium focus:outline-none shadow-inner transition-colors ${
            validationError
              ? 'border-rose-500/80 bg-rose-950/20 focus:border-rose-400'
              : 'border-purple-500/30 focus:border-purple-500/80'
          }`}
        />
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs text-rose-300 font-bold bg-rose-950/60 p-2.5 rounded-xl border border-rose-500/40"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{validationError}</span>
          </motion.div>
        )}
      </div>

      <div className="flex justify-center py-4">
        <motion.div
          animate={isShuffling ? { rotateY: 180, scale: 0.95 } : { rotateY: 0 }}
          transition={{ duration: 0.5 }}
          className="w-40 h-64 rounded-3xl bg-gradient-to-tr from-purple-950 via-indigo-900 to-slate-900 text-amber-300 p-4 border-[0.5px] border-amber-400/40 shadow-2xl flex flex-col items-center justify-center space-y-2 cursor-pointer"
          onClick={onDraw}
        >
          <Sparkles className="w-8 h-8 animate-pulse text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
            {t('daily.deckName')}
          </span>
        </motion.div>
      </div>

      <Button
        variant="mystic"
        size="lg"
        isLoading={isShuffling}
        onClick={onDraw}
        className="w-full sm:w-auto"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        <span>{t('daily.drawBtn')}</span>
      </Button>
    </CardBase>
  )
}
