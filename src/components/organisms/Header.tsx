import React, { useState } from 'react'
import { Globe, Crown, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTarotStore } from '../../store/tarotStore'
import { ModalBase } from '../atoms/ModalBase'
import { LanguagePicker } from '../molecules/LanguagePicker'

interface HeaderProps {
  onOpenPaywall: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)
  const theme = useTarotStore((state) => state.theme)
  const setTheme = useTarotStore((state) => state.setTheme)
  const [isLangOpen, setIsLangOpen] = useState(false)

  const isDark = theme === 'dark'

  return (
    <>
      <header
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 10px)' }}
        className={`sticky top-0 z-40 backdrop-blur-md px-4 pb-3 font-sans transition-colors ${
        isDark
          ? 'bg-slate-950/90 border-b-[0.5px] border-purple-900/40 text-white shadow-lg'
          : 'bg-white/95 border-b border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-amber-400/40 shadow-lg shrink-0">
              <img
                src="/tarotedu_app_logo.jpg"
                alt="TarotEdu PRO Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className={`text-base font-black tracking-tight flex items-center gap-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {t('app.title')}
                {isPro && (
                  <span className="bg-amber-400/20 text-amber-500 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/40">
                    PRO
                  </span>
                )}
              </h1>
              <p className={`text-[10px] font-medium hidden sm:block ${
                isDark ? 'text-purple-200/80' : 'text-slate-500'
              }`}>
                {t('app.tagline')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isPro && (
              <button
                onClick={onOpenPaywall}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>PRO</span>
              </button>
            )}

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl transition-all shadow-sm active:scale-95 border ${
                isDark
                  ? 'bg-slate-900/80 border-purple-500/30 text-amber-300 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-purple-700 hover:bg-slate-200'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-700" />}
            </button>

            <button
              onClick={() => setIsLangOpen(true)}
              className={`p-2 rounded-xl transition-all shadow-sm active:scale-95 border ${
                isDark
                  ? 'bg-slate-900/80 border-purple-500/30 text-purple-200 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <ModalBase
        isOpen={isLangOpen}
        onClose={() => setIsLangOpen(false)}
        title={t('onboarding.welcome')}
      >
        <LanguagePicker onSelect={() => setIsLangOpen(false)} />
      </ModalBase>
    </>
  )
}
