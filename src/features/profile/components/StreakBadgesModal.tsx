import React from 'react'
import { Award, Flame, Star, ShieldCheck, Sparkles } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { useTarotStore } from '../../../store/tarotStore'

interface StreakBadgesModalProps {
  isOpen: boolean
  onClose: () => void
  learnedCount: number
  readingsCount: number
}

export const StreakBadgesModal: React.FC<StreakBadgesModalProps> = ({
  isOpen,
  onClose,
  learnedCount,
  readingsCount,
}) => {
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const badges = [
    {
      id: 'novice',
      title: 'Acemi Kahin',
      desc: 'İlk tarot niyetini belirledin ve akademiye adım attın.',
      icon: Sparkles,
      unlocked: true,
    },
    {
      id: 'seeker',
      title: 'Sezgi Arayıcısı',
      desc: 'En az 5 adet tarot açılımı ve niyet okuması tamamladın.',
      icon: Flame,
      unlocked: readingsCount >= 5,
    },
    {
      id: 'moon',
      title: 'Ay Ustası',
      desc: 'Akademide 10 veya daha fazla tarot kartını tamamladın.',
      icon: Star,
      unlocked: learnedCount >= 10,
    },
    {
      id: 'master',
      title: 'Kelt Bilgesi',
      desc: '22 Major Arcana kartının tüm sırlarına vakıf oldun.',
      icon: ShieldCheck,
      unlocked: learnedCount >= 22,
    },
  ]

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="🏆 Sezgi Rozetleri & Başarılar">
      <div className="space-y-4 font-sans">
        <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
          Günlük ritüellerini tamamlayarak ve akademide ilerleyerek kazandığın kutsal sezgi rozetlerin:
        </p>

        <div className="grid grid-cols-2 gap-3">
          {badges.map((b) => {
            const Icon = b.icon
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2 ${
                  b.unlocked
                    ? isDark
                      ? 'bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border-amber-400/50 shadow-lg text-white'
                      : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-50 border-amber-500/50 shadow-md text-slate-900'
                    : isDark
                    ? 'bg-slate-950/60 border-purple-500/20 opacity-50 grayscale'
                    : 'bg-slate-100 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    b.unlocked ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'bg-slate-300 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {b.unlocked && (
                    <span className="text-[9px] font-black uppercase bg-emerald-500 text-slate-950 px-2 py-0.2 rounded-full">
                      KAZANILDI
                    </span>
                  )}
                </div>

                <div>
                  <h4 className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{b.title}</h4>
                  <p className={`text-[10px] font-medium leading-tight mt-0.5 ${isDark ? 'text-purple-200/70' : 'text-slate-600'}`}>
                    {b.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ModalBase>
  )
}
