import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Moon, Sun, Wand2, Compass, Loader2, Zap } from 'lucide-react'
import { useTarotStore } from '../../store/tarotStore'
import { geminiService } from '../../services/geminiService'
import { majorArcana } from '../../data/majorArcana'

export interface PlanetaryTransit {
  id: string
  planet: string
  sign: string
  degree: string
  cardId: string
  element: string
  iconName: 'sun' | 'moon' | 'sparkles'
}

export const AstroTarotSync: React.FC = () => {
  const { t } = useTranslation()
  const isDark = useTarotStore((state) => state.theme) === 'dark'
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [userFocus, setUserFocus] = useState('')
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const transits = useMemo<PlanetaryTransit[]>(() => {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth() + 1
    const hour = now.getHours()
    const zodiac = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']
    const sunIdx = (month - (day < 20 ? 1 : 0) + 12) % 12
    return [
      { id: 'sun', planet: t('astro.sun', 'Sun'), sign: zodiac[sunIdx], degree: `${((day * 0.98) % 30).toFixed(1)}°`, cardId: 'the-sun', element: 'Fire', iconName: 'sun' },
      { id: 'moon', planet: t('astro.moon', 'Moon'), sign: zodiac[(sunIdx + Math.floor((day + hour) / 2.5)) % 12], degree: `${(((day * 13.2) + hour) % 30).toFixed(1)}°`, cardId: 'the-moon', element: 'Water', iconName: 'moon' },
      { id: 'venus', planet: t('astro.venus', 'Venus'), sign: zodiac[(sunIdx + 2) % 12], degree: `${((day * 1.1) % 30).toFixed(1)}°`, cardId: 'the-empress', element: 'Earth', iconName: 'sparkles' },
      { id: 'mercury', planet: t('astro.mercury', 'Mercury'), sign: zodiac[(sunIdx + 1) % 12], degree: `${((day * 1.4) % 30).toFixed(1)}°`, cardId: 'the-magician', element: 'Air', iconName: 'sparkles' },
    ]
  }, [t])

  const active = transits[selectedIdx] || transits[0]
  const cardData = majorArcana.find((c) => c.id === active.cardId) || majorArcana[0]

  const handleSynthesize = async () => {
    setLoading(true)
    try {
      const res = await geminiService.getAstroTarotSync(`${active.planet} in ${active.sign} (${active.degree})`, cardData.name, userFocus)
      setAiAnalysis(res)
    } catch {
      setAiAnalysis(t('astro.error', 'Cosmic synthesis failed. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-md transition-all ${isDark ? 'bg-slate-900/90 border-purple-500/30 text-white' : 'bg-white/95 border-purple-200 text-slate-800'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 text-white shadow-md">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">{t('astro.title', 'Astro-Tarot Transit Sync')}</h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('astro.subtitle', 'Real-time planetary transits & Rider-Waite archetype synthesis')}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
          <Zap className="w-3 h-3" /> Live Transit
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {transits.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setSelectedIdx(idx)}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1 ${
              selectedIdx === idx ? 'border-amber-400 bg-amber-400/10 shadow-md ring-1 ring-amber-400/30' : isDark ? 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/70' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1">
                {item.iconName === 'sun' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : item.iconName === 'moon' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                {item.planet}
              </span>
              <span className="text-[10px] opacity-70">{item.degree}</span>
            </div>
            <div className="text-xs font-bold truncate">{item.sign}</div>
          </button>
        ))}
      </div>

      <div className={`p-4 rounded-2xl border mb-4 flex flex-col sm:flex-row items-center gap-4 ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-purple-50/50 border-purple-100'}`}>
        <img src={cardData.image} alt={cardData.name} className="w-20 h-32 object-cover rounded-xl shadow-md border border-amber-400/30" />
        <div className="flex-1 text-center sm:text-left">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">{active.planet} in {active.sign} • {active.element} Element</div>
          <h3 className="text-lg font-bold mb-1">{cardData.name}</h3>
          <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{cardData.meaning.upright}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          value={userFocus}
          onChange={(e) => setUserFocus(e.target.value)}
          placeholder={t('astro.focusPlaceholder', 'Enter your life focus or question (optional)...')}
          className={`w-full px-4 py-2.5 rounded-xl text-xs border transition-all outline-none ${
            isDark ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
          }`}
        />
        <button
          onClick={handleSynthesize}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          {t('astro.synthesizeBtn', 'Synthesize AI Cosmic Guidance')}
        </button>
      </div>

      {aiAnalysis && (
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed transition-all ${isDark ? 'bg-purple-950/30 border-purple-500/40 text-purple-100' : 'bg-purple-50 border-purple-200 text-purple-900'}`}>
          <div className="flex items-center gap-2 font-bold mb-2 text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>{t('astro.aiTitle', 'AI Cosmic Transit Guidance')}</span>
          </div>
          <div className="whitespace-pre-line">{aiAnalysis}</div>
        </div>
      )}
    </div>
  )
}

export default AstroTarotSync
