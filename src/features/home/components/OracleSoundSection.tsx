import React from 'react'
import { useTranslation } from 'react-i18next'
import { Wand2, Music, Crown } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { useTarotStore } from '../../../store/tarotStore'

interface OracleSoundSectionProps {
  onNavigate: (tab: any) => void
  onOpenPaywall: () => void
  isPro: boolean
}

export const OracleSoundSection: React.FC<OracleSoundSectionProps> = ({
  onNavigate,
  onOpenPaywall,
  isPro,
}) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
      {/* Tarot Oracle Card */}
      <CardBase
        onClick={() => (isPro ? onNavigate('oracle') : onOpenPaywall())}
        className={`p-5 border-[0.5px] flex flex-col justify-between space-y-4 transition-colors ${
          isDark
            ? 'bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white border-purple-500/30'
            : 'bg-gradient-to-br from-purple-50 via-indigo-50/50 to-slate-50 text-slate-900 border-purple-200 shadow-md'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-2xl ${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
            <Wand2 className="w-5 h-5" />
          </div>
          {!isPro && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Crown className="w-3 h-3" /> {t('home.proBadge', 'PRO')}
            </span>
          )}
        </div>

        <div>
          <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('oracle.title')}</h4>
          <p className={`text-xs mt-1 ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
            {t('oracle.homeDesc', 'Ask any question to receive instant card guidance.')}
          </p>
        </div>
      </CardBase>

      {/* Ambient Player Card */}
      <CardBase
        onClick={() => onNavigate('player')}
        className={`p-5 border-[0.5px] flex flex-col justify-between space-y-4 transition-colors ${
          isDark
            ? 'bg-gradient-to-br from-purple-900 via-sky-950 to-slate-950 text-white border-sky-500/30'
            : 'bg-gradient-to-br from-purple-50 via-sky-50/50 to-slate-50 text-slate-900 border-sky-200 shadow-md'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-2xl ${isDark ? 'bg-sky-500/20 text-sky-300' : 'bg-sky-100 text-sky-700'}`}>
            <Music className="w-5 h-5" />
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isDark
                ? 'bg-sky-400/20 text-sky-200 border-sky-400/30'
                : 'bg-sky-100 text-sky-700 border-sky-300'
            }`}
          >
            {t('player.solfeggioBadge', '528Hz Solfeggio')}
          </span>
        </div>

        <div>
          <h4 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('player.title')}</h4>
          <p className={`text-xs mt-1 ${isDark ? 'text-sky-200/80' : 'text-slate-600'}`}>
            {t('player.homeDesc', 'Elevate meditation with Solfeggio frequencies.')}
          </p>
        </div>
      </CardBase>
    </div>
  )
}
