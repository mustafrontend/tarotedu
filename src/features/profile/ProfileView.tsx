import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { User, Calculator, Crown, Globe, Sparkles } from 'lucide-react'
import { CardBase } from '../../components/atoms/CardBase'
import { Button } from '../../components/atoms/Button'
import { LanguagePicker } from '../../components/molecules/LanguagePicker'
import { ModalBase } from '../../components/atoms/ModalBase'
import { useTarotStore } from '../../store/tarotStore'
import { AppStoreLegalSection } from './components/AppStoreLegalSection'

interface ProfileViewProps {
  onOpenPaywall: () => void
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const [birthDate, setBirthDate] = useState('')
  const [lifePathResult, setLifePathResult] = useState<number | null>(null)
  const [isLangOpen, setIsLangOpen] = useState(false)

  const calculateLifePath = () => {
    if (!birthDate) return
    const digits = birthDate.replace(/\D/g, '')
    let sum = digits.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0)
    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = sum
        .toString()
        .split('')
        .reduce((acc, curr) => acc + parseInt(curr, 10), 0)
    }
    setLifePathResult(sum)
  }

  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="space-y-1">
        <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <User className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('profile.title')}
        </h2>
        <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>{t('profile.subtitle')}</p>
      </div>

      {/* PRO Membership Banner */}
      <CardBase
        hoverEffect={false}
        className={`p-5 flex items-center justify-between border ${
          isPro
            ? 'bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white border-purple-500/40 shadow-xl shadow-purple-950/50'
            : isDark
            ? 'bg-slate-900 border-purple-500/30 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-md'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 shadow-md font-black">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h4 className={`text-sm font-black ${isPro || isDark ? 'text-white' : 'text-slate-900'}`}>
              {isPro ? t('profile.unlimited') : t('profile.proStatus')}
            </h4>
            <p className={`text-xs font-medium ${isPro || isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
              {isPro ? t('profile.proActiveDesc') : t('profile.proUnlockDesc')}
            </p>
          </div>
        </div>

        {!isPro && (
          <Button variant="mystic" size="sm" onClick={onOpenPaywall}>
            {t('profile.upgrade')}
          </Button>
        )}
      </CardBase>

      {/* Numerology Calculator */}
      <CardBase hoverEffect={false} className="space-y-4 p-5">
        <div className={`flex items-center gap-2 font-black text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <Calculator className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          <span>{t('profile.lifePath')}</span>
        </div>

        <div className="flex gap-2">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={`flex-1 p-2.5 rounded-2xl border text-xs font-medium transition-colors ${
              isDark
                ? 'bg-slate-900 border-purple-500/30 text-white [color-scheme:dark]'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white shadow-sm [color-scheme:light]'
            }`}
          />
          <Button variant="primary" size="sm" onClick={calculateLifePath}>
            {t('profile.calculate')}
          </Button>
        </div>

        {lifePathResult !== null && (
          <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-inner ${
            isDark ? 'bg-purple-950/60 border-purple-500/30' : 'bg-purple-50 border-purple-200'
          }`}>
            <div>
              <p className={`text-xs font-bold ${isDark ? 'text-purple-200' : 'text-purple-900'}`}>{t('profile.yourLifePath')}</p>
              <p className={`text-2xl font-black ${isDark ? 'text-amber-300' : 'text-purple-700'}`}>#{lifePathResult}</p>
            </div>
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
        )}
      </CardBase>

      {/* Language Picker Option */}
      <CardBase hoverEffect={false} className="space-y-3 p-5">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
          {t('profile.settings')}
        </h4>

        <button
          onClick={() => setIsLangOpen(true)}
          className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-colors text-xs font-semibold ${
            isDark
              ? 'bg-slate-900/80 border-purple-500/30 hover:bg-purple-900/40 text-white'
              : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>{t('profile.language')}</span>
          </div>
          <span className="text-amber-300 font-bold">{t('profile.change')}</span>
        </button>
      </CardBase>

      {/* App Store Legal & Submission Checklist Section */}
      <AppStoreLegalSection />

      <ModalBase isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} title={t('onboarding.welcome')}>
        <LanguagePicker onSelect={() => setIsLangOpen(false)} />
      </ModalBase>
    </div>
  )
}
