import React, { useState } from 'react'
import { Home, BookOpen, Sparkles, User, Search, Music, Play, Pause, FastForward } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ModalBase } from '../atoms/ModalBase'
import { soundService } from '../../services/soundService'
import { useTarotStore } from '../../store/tarotStore'

export type TabType = 'home' | 'learn' | 'oracle' | 'profile' | 'daily' | 'spreads' | 'player'

interface NavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [quickSearch, setQuickSearch] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const tabs: Array<{ id: TabType; labelKey: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'home', labelKey: 'nav.home', icon: Home },
    { id: 'learn', labelKey: 'nav.learn', icon: BookOpen },
    { id: 'oracle', labelKey: 'nav.oracle', icon: Sparkles },
    { id: 'profile', labelKey: 'nav.profile', icon: User },
  ]

  const getIsActive = (tabId: TabType) =>
    tabId === 'oracle' ? activeTab === 'oracle' || activeTab === 'daily' || activeTab === 'spreads' : activeTab === tabId

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isPlaying) {
      soundService.stopAmbientLoop()
      setIsPlaying(false)
    } else {
      soundService.startAmbientLoop('solfeggio', 528)
      setIsPlaying(true)
    }
  }

  return (
    <>
      <nav
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)' }}
        className="fixed left-2 right-2 max-w-md mx-auto flex flex-col gap-1.5 z-40 font-sans"
      >
        <div
          onClick={() => onTabChange('player')}
          className={`backdrop-blur-3xl border p-2 px-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
            isDark
              ? 'bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-900/90 border-purple-400/60 shadow-[0_0_25px_rgba(168,85,247,0.45)] text-white hover:border-purple-300'
              : 'bg-white/95 border-slate-200 shadow-lg text-slate-900 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-md ${
              isDark ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 border-purple-300/50 text-amber-300' : 'bg-purple-100 border-purple-200 text-purple-700'
            }`}>
              {isPlaying ? <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" /> : <Music className={`w-3.5 h-3.5 ${isDark ? 'text-purple-200' : 'text-purple-700'}`} />}
            </div>
            <div className="min-w-0">
              <h4 className={`text-[11px] font-black truncate flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>528Hz Solfeggio Frekansı</span>
                {isPlaying && <span className="text-[8px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black uppercase animate-pulse">OYNATILIYOR</span>}
              </h4>
              <p className={`text-[9px] truncate font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
                {isPlaying ? 'Huzurlu Meditasyon Çanı' : 'Mistik Ses Oynatıcısı (Dokun ve Dinle)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button onClick={handleTogglePlay} className="p-1.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shadow-[0_0_12px_rgba(251,191,36,0.6)]">
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); onTabChange('player') }} className={`p-1.5 transition-colors ${isDark ? 'text-purple-200 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className={`flex-1 backdrop-blur-3xl border rounded-full px-1.5 py-1 flex items-center justify-around ${
            isDark ? 'bg-gradient-to-r from-purple-950/90 via-slate-950/90 to-purple-950/90 border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.4)]' : 'bg-white/95 border-slate-200 shadow-lg text-slate-900'
          }`}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = getIsActive(tab.id)
              return (
                <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-full transition-all duration-200 ${
                  isActive ? (isDark ? 'bg-purple-600 text-amber-300 border border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.6)] font-black scale-105' : 'bg-purple-600 text-white font-black scale-105 shadow-md') : (isDark ? 'text-purple-200/70 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}>
                  <Icon className={`w-4 h-4 ${isActive && isDark ? 'text-amber-300' : ''}`} />
                  <span className="whitespace-nowrap text-[9px] font-bold tracking-tight">{t(tab.labelKey)}</span>
                </button>
              )
            })}
          </div>

          <button onClick={() => setIsSearchOpen(true)} className={`w-10 h-10 rounded-full border backdrop-blur-3xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer ${
            isDark ? 'bg-gradient-to-tr from-purple-900/90 to-indigo-900/90 border-purple-400/60 text-amber-300 shadow-[0_0_20px_rgba(168,85,247,0.45)]' : 'bg-purple-600 border-purple-500 text-white shadow-lg'
          }`}>
            <Search className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <ModalBase isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="🔍 Tarot Kartlarında Ara">
        <form onSubmit={(e) => { e.preventDefault(); setIsSearchOpen(false); onTabChange('learn'); }} className="space-y-4 font-sans">
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Kart veya anahtar kelime yazın (ör: Joker, Aşk)..."
            autoFocus
            className={`w-full p-3.5 rounded-2xl text-xs font-medium focus:outline-none transition-colors border ${
              isDark ? 'bg-slate-900 border-purple-500/30 text-white' : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white shadow-sm'
            }`}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsSearchOpen(false)} className={`px-4 py-2 rounded-xl text-xs font-bold ${isDark ? 'text-purple-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
              Vazgeç
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-lg">
              Ara & Keşfet
            </button>
          </div>
        </form>
      </ModalBase>
    </>
  )
}
