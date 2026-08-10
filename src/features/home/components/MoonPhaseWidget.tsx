import React from 'react'
import { Moon, Sparkles, Sun } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'
import { useTarotStore } from '../../../store/tarotStore'

export const MoonPhaseWidget: React.FC = () => {
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  // Simple deterministic moon phase calculator
  const now = new Date()
  const day = now.getDate()
  
  const getMoonInfo = (dayNum: number) => {
    const cycle = dayNum % 8
    if (cycle === 0) return { name: 'Yeniay (New Moon)', desc: 'Yeni niyetler ve başlangıçlar için en güçlü arınma zamanı.', icon: Moon, energy: 'Yenilenme' }
    if (cycle <= 2) return { name: 'Hilal (Waxing Crescent)', desc: 'Tohumları ekme ve harekete geçme enerjisi yüksek.', icon: Moon, energy: 'Büyüme' }
    if (cycle <= 4) return { name: 'Dolunay (Full Moon)', desc: 'Sezgilerin en üst noktada olduğu mistik uyanış evresi.', icon: Sun, energy: 'Zirve Sezgi' }
    return { name: 'Son Dördün (Waning Moon)', desc: 'Eski yükleri bırakma ve ruhsal değerlendirme zamanı.', icon: Moon, energy: 'Serbest Bırakma' }
  }

  const moon = getMoonInfo(day)
  const MoonIcon = moon.icon

  return (
    <CardBase
      className={`p-4 border relative overflow-hidden font-sans shadow-xl transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 border-purple-500/30 text-white'
          : 'bg-gradient-to-r from-purple-50 via-indigo-50/60 to-amber-50/50 border-purple-200 text-slate-900'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 shadow-lg ${
              isDark
                ? 'bg-purple-900/60 border-amber-400/40 text-amber-300'
                : 'bg-purple-100 border-purple-300 text-purple-700'
            }`}
          >
            <MoonIcon className={`w-5 h-5 animate-pulse ${isDark ? 'text-amber-300' : 'text-purple-700'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-amber-400 text-slate-950' : 'bg-amber-500 text-white'
                }`}
              >
                {moon.energy}
              </span>
              <span className={`text-xs font-bold ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
                Bugünün Gökyüzü
              </span>
            </div>
            <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{moon.name}</h4>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className={`text-[11px] font-bold flex items-center gap-1 ${isDark ? 'text-amber-300' : 'text-purple-700'}`}>
            <Sparkles className="w-3.5 h-3.5" /> Sezgi Gücü %98
          </span>
        </div>
      </div>
      <p className={`text-xs font-medium mt-2 leading-relaxed ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
        {moon.desc}
      </p>
    </CardBase>
  )
}
