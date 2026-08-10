import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Moon, Sparkles, Eye, RefreshCw, Zap, Compass, Wand2 } from 'lucide-react'
import { majorArcana } from '../../data/majorArcana'
import { geminiService } from '../../services/geminiService'
import { useTarotStore } from '../../store/tarotStore'
import { TarotCard } from '../../types/tarot'

const ARCHETYPES = ['water', 'flying', 'shadow', 'snake', 'moon', 'star', 'fire', 'door', 'mirror', 'key', 'tower', 'abyss', 'ocean', 'forest', 'crown']
const POSITIONS = ['Unconscious Root', 'Dream Mirror', 'Astral Awakening']

export const AstralDreamDecoder: React.FC = () => {
  const { t } = useTranslation()
  const isDark = useTarotStore((state) => state.theme) === 'dark'

  const [dreamText, setDreamText] = useState('')
  const [cards, setCards] = useState<TarotCard[]>([])
  const [reading, setReading] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const extractedSymbols = useMemo(() => {
    const textLower = dreamText.toLowerCase()
    const found = ARCHETYPES.filter((s) => textLower.includes(s))
    return found.length > 0 ? found : ['night-vision', 'subconscious-gate']
  }, [dreamText])

  const handleDecode = async () => {
    if (!dreamText.trim()) return
    setLoading(true)
    const drawn = [...majorArcana].sort(() => 0.5 - Math.random()).slice(0, 3)
    setCards(drawn)
    const mapped = drawn.map((card, idx) => ({ position: t(`dream.pos${idx + 1}`, POSITIONS[idx]), cardName: card.name, isReversed: Math.random() > 0.8 }))
    const prompt = `${dreamText} | Extracted Nocturnal Symbols: ${extractedSymbols.join(', ')}`
    const result = await geminiService.getSpreadReading(t('dream.spreadTitle', 'Astral Dream Decoder (3-Card Nocturnal Spread)'), mapped, prompt)
    setReading(result)
    setLoading(false)
  }

  const handleReset = () => { setDreamText(''); setCards([]); setReading(null) }

  return (
    <div className={`p-5 rounded-3xl border transition-all duration-300 ${isDark ? 'bg-slate-900/90 border-indigo-500/30 text-indigo-100 shadow-xl shadow-indigo-950/40' : 'bg-white/90 border-indigo-200 text-slate-900 shadow-lg shadow-indigo-100'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"><Moon className="w-5 h-5 animate-pulse" /></div>
          <div>
            <h3 className="text-base font-bold tracking-tight">{t('dream.decoderTitle', 'Astral Dream Decoder')}</h3>
            <p className={`text-xs ${isDark ? 'text-indigo-300/70' : 'text-slate-500'}`}>{t('dream.decoderSub', 'Nocturnal symbol extraction & 3-card arcana mapping')}</p>
          </div>
        </div>
        <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">{t('dream.badge', 'Nocturnal AI')}</span>
      </div>

      {!reading ? (
        <div className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${isDark ? 'text-indigo-200' : 'text-slate-700'}`}>
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t('dream.inputLabel', 'Describe Your Nocturnal Dreamscape')}</span>
            </label>
            <textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder={t('dream.placeholder', 'I was swimming in a deep midnight ocean under a silver star...')}
              rows={3}
              className={`w-full p-3.5 rounded-2xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isDark ? 'bg-slate-950/70 border-indigo-500/30 text-white placeholder-slate-500' : 'bg-slate-50 border-indigo-200 text-slate-900 placeholder-slate-400'}`}
            />
          </div>

          {dreamText.trim() && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1"><Zap className="w-3 h-3" /> {t('dream.symbolsFound', 'Nocturnal Symbols:')}</span>
              {extractedSymbols.map((sym) => (
                <span key={sym} className={`text-[10px] font-medium px-2 py-0.5 rounded-lg border ${isDark ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>#{sym}</span>
              ))}
            </div>
          )}

          <button
            onClick={handleDecode}
            disabled={loading || !dreamText.trim()}
            className="w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white disabled:opacity-50 shadow-md shadow-indigo-600/30"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 text-amber-300" />}
            <span>{loading ? t('dream.analyzing', 'Extracting Symbols & Mapping Cards...') : t('dream.decodeBtn', 'Decode Dreamscape (3-Card Draw)')}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {cards.map((card, idx) => (
              <div key={card.id} className={`p-2.5 rounded-2xl border text-center ${isDark ? 'bg-slate-950/60 border-indigo-500/30' : 'bg-indigo-50/70 border-indigo-200'}`}>
                <div className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-400 mb-1">{t(`dream.pos${idx + 1}`, POSITIONS[idx])}</div>
                <img src={card.image} alt={card.name} className="w-full h-16 object-cover rounded-xl mb-1.5 shadow-sm" />
                <div className="text-[11px] font-bold truncate">{card.name}</div>
              </div>
            ))}
          </div>

          <div className={`p-4 rounded-2xl border max-h-60 overflow-y-auto text-xs leading-relaxed ${isDark ? 'bg-slate-950/80 border-indigo-500/30 text-indigo-100' : 'bg-slate-50 border-indigo-200 text-slate-800'}`}>
            <div className="flex items-center gap-1.5 font-bold text-indigo-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{t('dream.analysisTitle', 'Nocturnal AI Synthesis')}</span>
            </div>
            <p className="whitespace-pre-line">{reading}</p>
          </div>

          <button
            onClick={handleReset}
            className={`w-full py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${isDark ? 'bg-slate-800/80 border-indigo-500/30 text-indigo-200 hover:bg-slate-800' : 'bg-white border-indigo-200 text-indigo-900 hover:bg-indigo-50'}`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t('dream.newDecoder', 'Decode Another Dream')}</span>
          </button>
        </div>
      )}
    </div>
  )
}

