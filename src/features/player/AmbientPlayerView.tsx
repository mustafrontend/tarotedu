import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Music, Play, Pause, Volume2, Sparkles, Repeat, Lock } from 'lucide-react'
import { CardBase } from '../../components/atoms/CardBase'
import { Button } from '../../components/atoms/Button'
import { soundService } from '../../services/soundService'
import { useTarotStore } from '../../store/tarotStore'

interface AmbientPlayerViewProps {
  onOpenPaywall?: () => void
}

export const AmbientPlayerView: React.FC<AmbientPlayerViewProps> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      soundService.stopAmbientLoop()
    }
  }, [])

  const tracks = [
    {
      id: 'solfeggio',
      title: t('player.solfeggio'),
      freqNum: 528,
      freq: '528Hz',
      desc: t('player.solfeggioDesc'),
      color: 'bg-purple-600 text-white',
      isFree: true,
    },
    {
      id: 'cosmic',
      title: t('player.cosmic'),
      freqNum: 639,
      freq: '639Hz',
      desc: t('player.cosmicDesc'),
      color: 'bg-indigo-600 text-white',
      isFree: false,
    },
    {
      id: 'bell',
      title: t('player.bell'),
      freqNum: 432,
      freq: '432Hz',
      desc: t('player.bellDesc'),
      color: 'bg-amber-600 text-white',
      isFree: false,
    },
    {
      id: 'rain',
      title: t('player.rain'),
      freqNum: 741,
      freq: '741Hz',
      desc: t('player.rainDesc'),
      color: 'bg-teal-600 text-white',
      isFree: false,
    },
  ]

  const handleToggleTrack = (tr: typeof tracks[0]) => {
    if (!tr.isFree && !isPro) {
      if (onOpenPaywall) onOpenPaywall()
      return
    }

    if (playingTrack === tr.id) {
      soundService.stopAmbientLoop()
      setPlayingTrack(null)
    } else {
      soundService.startAmbientLoop(tr.id, tr.freqNum)
      setPlayingTrack(tr.id)
    }
  }

  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Music className="w-6 h-6 text-purple-400" />
            {t('player.title')}
          </h2>
          <p className="text-xs text-purple-200/80 font-medium">{t('player.subtitle')}</p>
        </div>

        {playingTrack && (
          <div className="bg-purple-950/80 border border-purple-400/50 px-3 py-1.5 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1.5 shadow-lg backdrop-blur-md animate-pulse">
            <Repeat className="w-3.5 h-3.5" />
            <span>Continuous Loop Active</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tracks.map((tr) => {
          const isPlaying = playingTrack === tr.id
          const isLocked = !tr.isFree && !isPro

          return (
            <CardBase
              key={tr.id}
              onClick={() => handleToggleTrack(tr)}
              className={`p-5 flex items-center justify-between transition-all ${
                isPlaying
                  ? 'ring-2 ring-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.4)] bg-purple-950/50 border-purple-400/60'
                  : 'bg-slate-900/90 border-purple-500/30 hover:border-purple-400/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl ${tr.color} flex items-center justify-center shadow-md relative`}>
                  {isPlaying ? (
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    {tr.title}
                    {tr.isFree ? (
                      <span className="text-[9px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full font-black uppercase">
                        ÜCRETSİZ
                      </span>
                    ) : (
                      <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black uppercase flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> PRO
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-purple-200/80 font-medium">
                    {tr.freq} • {tr.desc}
                  </p>
                </div>
              </div>

              <Button
                variant={isPlaying ? 'primary' : isLocked ? 'outline' : 'mystic'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggleTrack(tr)
                }}
              >
                {isLocked ? (
                  <Lock className="w-4 h-4 text-amber-300" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-amber-300" />
                )}
              </Button>
            </CardBase>
          )
        })}
      </div>
    </div>
  )
}
