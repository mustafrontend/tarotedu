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

const TRACKS_DEF = [
  { id: 'solfeggio', freqNum: 528, freq: '528Hz', title: '528Hz Dönüşüm Frekansı', desc: 'Mucizeler, berraklık ve DNA hizalanması', color: 'bg-purple-600 text-white', isFree: true },
  { id: 'cosmic', freqNum: 639, freq: '639Hz', title: 'Kozmik Uyum & İlişki Çanı', desc: 'Derin bağlar, sevgi ve ilişki rezonansı', color: 'bg-indigo-600 text-white', isFree: false },
  { id: 'bell', freqNum: 432, freq: '432Hz', title: 'Tibetan Kutsal Çanı', desc: 'Evrensel kutsal geometri ve doğal akort', color: 'bg-amber-600 text-white', isFree: false },
  { id: 'rain', freqNum: 741, freq: '741Hz', title: 'Mistik Yağmur & Sezgi', desc: 'Zihinsel detoks ve sezgisel uyanış', color: 'bg-teal-600 text-white', isFree: false },
  { id: 'om_chant', freqNum: 136, freq: '136.1Hz', title: 'Kutsal Om Titreşimi', desc: 'Kök çakra dengeleme ve gezegensel uyum', color: 'bg-emerald-600 text-white', isFree: false },
  { id: 'crown_chakra', freqNum: 963, freq: '963Hz', title: 'Taç Çakra & İlahi Işık', desc: 'Birlik bilinci ve yüksek benlik teması', color: 'bg-violet-600 text-white', isFree: false },
  { id: 'third_eye', freqNum: 852, freq: '852Hz', title: 'Üçüncü Göz Sezgi Frekansı', desc: 'Görünmeyeni algılama ve durugörü', color: 'bg-blue-600 text-white', isFree: false },
  { id: 'delta_deep', freqNum: 174, freq: '174Hz', title: 'Derin Şifa & Anestezi', desc: 'Ağrı hafifletme ve hücresel dinlenme', color: 'bg-rose-600 text-white', isFree: false },
  { id: 'forest_shaman', freqNum: 285, freq: '285Hz', title: 'Şamanik Doğa Rüzgarı', desc: 'Aura tamiri ve enerji alanı koruması', color: 'bg-green-600 text-white', isFree: false },
  { id: 'heart_healing', freqNum: 417, freq: '417Hz', title: 'Kalp Çakrası & Arınma', desc: 'Geçmiş blokajları silme ve travma şifalandırma', color: 'bg-pink-600 text-white', isFree: false },
]

export const AmbientPlayerView: React.FC<AmbientPlayerViewProps> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const isPro = useTarotStore((state) => state.isPro)
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)

  useEffect(() => {
    return () => soundService.stopAmbientLoop()
  }, [])

  const handleToggleTrack = (tr: typeof TRACKS_DEF[0]) => {
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
          <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Music className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            {t('player.title')}
          </h2>
          <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>{t('player.subtitle')}</p>
        </div>

        {playingTrack && (
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md animate-pulse border ${
            isDark ? 'bg-purple-950/80 border-purple-400/50 text-amber-300' : 'bg-purple-100 border-purple-300 text-purple-900'
          }`}>
            <Repeat className="w-3.5 h-3.5" />
            <span>Sürekli Döngü Aktif</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TRACKS_DEF.map((tr) => {
          const isPlaying = playingTrack === tr.id
          const isLocked = !tr.isFree && !isPro

          return (
            <CardBase
              key={tr.id}
              onClick={() => handleToggleTrack(tr)}
              className={`p-4 flex items-center justify-between transition-all cursor-pointer ${
                isPlaying
                  ? isDark ? 'ring-2 ring-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.4)] bg-purple-950/50 border-purple-400/60' : 'ring-2 ring-purple-400 shadow-md bg-purple-50 border-purple-300'
                  : isDark ? 'bg-slate-900 border-purple-500/30 hover:border-purple-400/50' : 'bg-white border-slate-200 hover:border-purple-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${tr.color} flex items-center justify-center shadow-md shrink-0`}>
                  {isPlaying ? <Sparkles className="w-5 h-5 animate-pulse text-amber-300" /> : <Volume2 className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className={`text-xs font-black flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span>{tr.title}</span>
                    {tr.isFree ? (
                      <span className="text-[9px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full font-black uppercase">ÜCRETSİZ</span>
                    ) : (
                      <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black uppercase flex items-center gap-0.5"><Lock className="w-2.5 h-2.5" /> PRO</span>
                    )}
                  </h4>
                  <p className={`text-[11px] font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>{tr.freq} • {tr.desc}</p>
                </div>
              </div>

              <Button
                variant={isPlaying ? 'primary' : isLocked ? 'outline' : 'mystic'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggleTrack(tr)
                }}
                className="shrink-0"
              >
                {isLocked ? <Lock className="w-3.5 h-3.5 text-amber-300" /> : isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-amber-300" />}
              </Button>
            </CardBase>
          )
        })}
      </div>
    </div>
  )
}
