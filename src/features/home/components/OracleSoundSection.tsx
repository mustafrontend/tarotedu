import React from 'react'
import { useTranslation } from 'react-i18next'
import { Wand2, Music, Crown } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Tarot Oracle Card */}
      <CardBase
        onClick={() => (isPro ? onNavigate('oracle') : onOpenPaywall())}
        className="p-5 bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white border-[0.5px] border-purple-500/30 flex flex-col justify-between space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300">
            <Wand2 className="w-5 h-5" />
          </div>
          {!isPro && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" /> {t('home.proBadge', 'PRO')}
            </span>
          )}
        </div>

        <div>
          <h4 className="text-base font-black text-white">{t('oracle.title')}</h4>
          <p className="text-xs text-purple-200/80 mt-1">
            {t('oracle.homeDesc', 'Ask any question to receive instant card guidance.')}
          </p>
        </div>
      </CardBase>

      {/* Ambient Player Card */}
      <CardBase
        onClick={() => onNavigate('player')}
        className="p-5 bg-gradient-to-br from-purple-900 via-sky-950 to-slate-950 text-white border-[0.5px] border-sky-500/30 flex flex-col justify-between space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-300">
            <Music className="w-5 h-5" />
          </div>
          <span className="bg-sky-400/20 text-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-400/30">
            {t('player.solfeggioBadge', '528Hz Solfeggio')}
          </span>
        </div>

        <div>
          <h4 className="text-base font-black text-white">{t('player.title')}</h4>
          <p className="text-xs text-sky-200/80 mt-1">
            {t('player.homeDesc', 'Elevate meditation with Solfeggio frequencies.')}
          </p>
        </div>
      </CardBase>
    </div>
  )
}
