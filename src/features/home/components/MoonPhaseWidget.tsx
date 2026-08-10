import React from 'react'
import { Moon, Sparkles, Sun } from 'lucide-react'
import { CardBase } from '../../../components/atoms/CardBase'

export const MoonPhaseWidget: React.FC = () => {
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
    <CardBase className="p-4 bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 border border-purple-500/30 text-white shadow-xl relative overflow-hidden font-sans">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-900/60 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-lg">
            <MoonIcon className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase bg-amber-400 text-slate-950 px-2 py-0.2 rounded-full">
                {moon.energy}
              </span>
              <span className="text-xs text-purple-200/80 font-bold">Bugünün Gökyüzü</span>
            </div>
            <h4 className="text-sm font-black text-white">{moon.name}</h4>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Sezgi Gücü %98
          </span>
        </div>
      </div>
      <p className="text-xs text-purple-200/90 font-medium mt-2 leading-relaxed">
        {moon.desc}
      </p>
    </CardBase>
  )
}
