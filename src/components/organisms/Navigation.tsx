import React, { useState } from 'react'
import { Home, BookOpen, Sparkles, User, Search, Music, Play, Pause, FastForward } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ModalBase } from '../atoms/ModalBase'
import { soundService } from '../../services/soundService'

export type TabType = 'home' | 'learn' | 'oracle' | 'profile' | 'daily' | 'spreads' | 'player'

interface NavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [quickSearch, setQuickSearch] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const tabs: Array<{ id: TabType; labelKey: string; icon: React.ComponentType<any> }> = [
    { id: 'home', labelKey: 'nav.home', icon: Home },
    { id: 'learn', labelKey: 'nav.learn', icon: BookOpen },
    { id: 'oracle', labelKey: 'nav.oracle', icon: Sparkles },
    { id: 'profile', labelKey: 'nav.profile', icon: User },
  ]

  const getIsActive = (tabId: TabType) => {
    if (tabId === 'oracle') {
      return activeTab === 'oracle' || activeTab === 'daily' || activeTab === 'spreads'
    }
    return activeTab === tabId
  }

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
      {/* Glowing Bright Purple Glassmorphism Floating Dock */}
      <nav className="fixed bottom-3 left-3 right-3 max-w-xl mx-auto flex flex-col gap-1.5 z-40 font-sans">
        {/* Glowing Bright Purple Mini-Player Bar */}
        <div
          onClick={() => onTabChange('player')}
          className="bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-900/90 backdrop-blur-3xl border border-purple-400/60 p-2.5 px-4 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.45)] flex items-center justify-between cursor-pointer transition-all hover:border-purple-300"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-300/50 flex items-center justify-center text-amber-300 shrink-0 shadow-md">
              {isPlaying ? (
                <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
              ) : (
                <Music className="w-4 h-4 text-purple-200" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-white truncate flex items-center gap-1.5">
                <span>528Hz Solfeggio Frekansı</span>
                {isPlaying && (
                  <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black uppercase animate-pulse">
                    OYNATILIYOR
                  </span>
                )}
              </h4>
              <p className="text-[10px] text-purple-200/80 truncate font-medium">
                {isPlaying ? 'Huzurlu Periyodik Meditasyon Çanı' : 'Mistik Ses Oynatıcısı (Dokun ve Dinle)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleTogglePlay}
              className="p-1.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onTabChange('player')
              }}
              className="p-1.5 text-purple-200 hover:text-white transition-colors"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Floating Nav Pill + Circular Search Button */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gradient-to-r from-purple-950/90 via-slate-950/90 to-purple-950/90 backdrop-blur-3xl border border-purple-400/50 rounded-full px-2 py-1.5 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = getIsActive(tab.id)
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-amber-300 border border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.6)] font-black scale-105'
                      : 'text-purple-200/70 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-amber-300' : ''}`} />
                  <span className="whitespace-nowrap text-[10px] font-bold tracking-tight">
                    {t(tab.labelKey)}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-900/90 to-indigo-900/90 backdrop-blur-3xl border border-purple-400/60 text-amber-300 shadow-[0_0_20px_rgba(168,85,247,0.45)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Search className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      </nav>

      {/* Floating Quick Search Modal */}
      <ModalBase
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="🔍 Tarot Kartlarında Ara"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setIsSearchOpen(false)
            onTabChange('learn')
          }}
          className="space-y-4 font-sans"
        >
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Kart veya anahtar kelime yazın (ör: Joker, Aşk)..."
            autoFocus
            className="w-full p-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 text-xs text-white placeholder-slate-400 font-medium focus:outline-none focus:border-purple-400 shadow-inner"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-purple-300 hover:text-white"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-lg"
            >
              Ara & Keşfet
            </button>
          </div>
        </form>
      </ModalBase>
    </>
  )
}
