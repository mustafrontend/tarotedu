import React, { useState, useEffect } from 'react'
import { Wind, CheckCircle2 } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { Button } from '../../../components/atoms/Button'
import { soundService } from '../../../services/soundService'
import { useTarotStore } from '../../../store/tarotStore'

interface BreathingGroundingModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export const BreathingGroundingModal: React.FC<BreathingGroundingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [secondsLeft, setSecondsLeft] = useState(4)

  useEffect(() => {
    if (!isOpen) return
    soundService.startAmbientLoop('solfeggio', 528)

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1
        if (phase === 'inhale') {
          setPhase('hold')
          return 7
        } else if (phase === 'hold') {
          setPhase('exhale')
          return 8
        } else {
          setPhase('inhale')
          return 4
        }
      })
    }, 1000)

    return () => {
      clearInterval(timer)
      soundService.stopAmbientLoop()
    }
  }, [isOpen, phase])

  const getPhaseText = () => {
    if (phase === 'inhale') return 'Nefes Al (4 sn)...'
    if (phase === 'hold') return 'Nefesini Tut (7 sn)...'
    return 'Yavaşça Ver (8 sn)...'
  }

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="🧘 4-7-8 Zihinsel Nefes & Odaklanma Odası">
      <div className="space-y-6 text-center font-sans py-2">
        <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
          Kart çekmeden önce zihninizi dış gürültülerden arındırın ve 528Hz ses frekansıyla sezgilerinizi açın.
        </p>

        {/* Breathing Circle Ring */}
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-amber-400 opacity-40 blur-xl transition-all duration-1000 ${
              phase === 'inhale' ? 'scale-125' : phase === 'hold' ? 'scale-125 animate-pulse' : 'scale-90'
            }`}
          />
          <div
            className={`w-36 h-36 rounded-full border-2 border-amber-400/60 backdrop-blur-2xl flex flex-col items-center justify-center gap-1 shadow-2xl transition-all duration-1000 ${
              isDark ? 'bg-slate-950/80 text-white' : 'bg-white/90 text-slate-900'
            } ${phase === 'inhale' ? 'scale-110' : phase === 'hold' ? 'scale-110' : 'scale-95'}`}
          >
            <Wind className="w-6 h-6 text-amber-500 animate-bounce" />
            <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{secondsLeft}s</span>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
              {phase}
            </span>
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border text-xs font-bold ${
          isDark ? 'bg-slate-900/90 border-purple-500/30 text-amber-300' : 'bg-purple-50 border-purple-200 text-purple-900'
        }`}>
          {getPhaseText()}
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            soundService.stopAmbientLoop()
            onClose()
            if (onComplete) onComplete()
          }}
        >
          <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" />
          <span>Zihnim Hazır, Kartlara Geç</span>
        </Button>
      </div>
    </ModalBase>
  )
}
