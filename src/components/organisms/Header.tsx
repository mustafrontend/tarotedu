import React, { useState } from 'react'
import { Globe, Crown } from 'lucide-react'
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
  const [isLangOpen, setIsLangOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b-[0.5px] border-purple-900/40 px-4 py-3 text-white font-sans">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-amber-400/40 shadow-lg shadow-purple-950 shrink-0">
              <img
                src="/tarotedu_app_logo.jpg"
                alt="TarotEdu PRO Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                {t('app.title')}
                {isPro && (
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/40">
                    PRO
                  </span>
                )}
              </h1>
              <p className="text-[10px] font-medium text-purple-200/70 hidden sm:block">
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
              onClick={() => setIsLangOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border-[0.5px] border-purple-500/30 text-purple-200 hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
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
