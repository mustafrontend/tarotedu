import React, { useState } from 'react'
import { Music, Play, Pause, FastForward, Sparkles } from 'lucide-react'
import { soundService } from '../../../services/soundService'

interface AppleMiniPlayerBarProps {
  onNavigate: (tab: any) => void
}

export const AppleMiniPlayerBar: React.FC<AppleMiniPlayerBarProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false)

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
    <div
      onClick={() => onNavigate('player')}
      className="fixed bottom-19 sm:bottom-18 left-3 right-3 max-w-xl mx-auto bg-slate-900/95 backdrop-blur-2xl border border-purple-500/40 p-2.5 px-4 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.7)] z-30 flex items-center justify-between cursor-pointer transition-all hover:border-purple-400 font-sans"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-md">
          {isPlaying ? (
            <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
          ) : (
            <Music className="w-5 h-5 text-purple-300" />
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
          <p className="text-[10px] text-purple-200/70 truncate font-medium">
            {isPlaying ? 'Huzurlu Periyodik Meditasyon Çanı' : 'Mistik Ses Oynatıcısı (Dokun ve Dinle)'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleTogglePlay}
          className="p-2 rounded-full bg-purple-600/40 text-amber-300 hover:bg-purple-600/60 transition-colors shadow-sm"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate('player')
          }}
          className="p-2 text-purple-300/70 hover:text-white transition-colors"
        >
          <FastForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
