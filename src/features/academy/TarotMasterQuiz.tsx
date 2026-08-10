import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Trophy, CheckCircle2, XCircle, RotateCcw, Zap, ArrowRight } from 'lucide-react'

export interface QuizQuestion {
  id: string; category: 'esoteric' | 'scenario' | 'kabbalah'; questionKey: string
  defaultQuestion: string; options: string[]; correctIndex: number; explanation: string
}

const QUESTIONS: QuizQuestion[] = [
  { id: 'k1', category: 'kabbalah', questionKey: 'quiz.q1', defaultQuestion: 'Which Tree of Life path & Hebrew letter belong to The Fool?', options: ['Path of Aleph (Kether to Chokmah)', 'Path of Beth (Kether to Binah)', 'Path of Gimel (Kether to Tiphareth)', 'Path of Daleth (Chokmah to Binah)'], correctIndex: 0, explanation: 'The Fool represents pure spirit embarking on Path 11 (Aleph), connecting Crown (Kether) to Wisdom (Chokmah).' },
  { id: 's1', category: 'scenario', questionKey: 'quiz.q2', defaultQuestion: 'Scenario: The Lovers appears with The Tower in a relationship reading. Intuitive synthesis?', options: ['Stable harmonious growth', 'Decisive truth choice triggering a sudden breakthrough', 'Passive delay', 'Financial disruption'], correctIndex: 1, explanation: 'The Lovers alignment forces absolute honesty, causing The Tower to dismantle false relationship structures.' },
  { id: 'e1', category: 'esoteric', questionKey: 'quiz.q3', defaultQuestion: 'What esoteric element & astrological ruler govern The Magician?', options: ['Water & Neptune', 'Air & Mercury', 'Fire & Mars', 'Earth & Saturn'], correctIndex: 1, explanation: 'The Magician channels conscious active mind ruled by Mercury and Air element power.' },
  { id: 'k2', category: 'kabbalah', questionKey: 'quiz.q4', defaultQuestion: 'Which Sephirah corresponds to The Empress (Great Mother)?', options: ['Binah (Understanding)', 'Malkuth (Kingdom)', 'Hod (Splendor)', 'Yesod (Foundation)'], correctIndex: 0, explanation: 'The Empress embodies the Supernal Mother associated with cosmic womb Binah on the Tree of Life.' },
  { id: 's2', category: 'scenario', questionKey: 'quiz.q5', defaultQuestion: 'Scenario: 3 of Swords is followed by 10 of Cups & The Sun. Client context?', options: ['Deeper emotional pain', 'Heartbreak resolving into profound emotional fulfillment & joy', 'Illusion & loss', 'Stagnant situation'], correctIndex: 1, explanation: 'Initial pain (3 of Swords) acts as catharsis, leading directly to absolute joy and renewal.' }
]

interface TarotMasterQuizProps {
  onComplete?: (score: number) => void
  onClose?: () => void
}

export const TarotMasterQuiz: React.FC<TarotMasterQuizProps> = ({ onComplete, onClose }) => {
  const { t } = useTranslation()
  const [idx, setIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const currentQ = QUESTIONS[idx]

  const handleSelect = (i: number) => {
    if (selectedOpt !== null) return
    setSelectedOpt(i)
    if (i === currentQ.correctIndex) {
      setScore((s) => s + 100 + streak * 25)
      setStreak((s) => s + 1)
    } else { setStreak(0) }
  }

  const handleNext = () => {
    if (idx + 1 < QUESTIONS.length) {
      setIdx((i) => i + 1)
      setSelectedOpt(null)
    } else {
      setIsFinished(true)
      onComplete?.(score)
    }
  }

  const handleReset = () => {
    setIdx(0); setSelectedOpt(null); setScore(0); setStreak(0); setIsFinished(false)
  }

  const getRank = () => {
    if (score >= 500) return { title: t('quiz.rankMaster', 'High Priest Master'), cls: 'text-amber-400 border-amber-500/50 bg-amber-500/10' }
    if (score >= 300) return { title: t('quiz.rankAdept', 'Esoteric Adept'), cls: 'text-purple-400 border-purple-500/50 bg-purple-500/10' }
    return { title: t('quiz.rankInitiate', 'Tarot Initiate'), cls: 'text-indigo-400 border-indigo-500/50 bg-indigo-500/10' }
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 text-slate-800 dark:text-slate-100 shadow-xl font-sans transition-all">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400"><Sparkles className="w-5 h-5" /></div>
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight">{t('quiz.title', 'Tarot Master Quiz')}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('quiz.subtitle', 'Kabbalah, Esoteric & Scenario Test')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"><Zap className="w-3.5 h-3.5" /> {streak}x</div>
          <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{score} {t('quiz.pts', 'pts')}</div>
          {onClose && <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm">✕</button>}
        </div>
      </div>

      {!isFinished ? (
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
            <span className="uppercase tracking-wider font-semibold text-purple-500">{t(`quiz.cat.${currentQ.category}`, currentQ.category)}</span>
            <span>{idx + 1} / {QUESTIONS.length}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-5 overflow-hidden">
            <div className="bg-purple-600 h-full transition-all duration-300" style={{ width: `${((idx + 1) / QUESTIONS.length) * 100}%` }} />
          </div>
          <h3 className="text-sm sm:text-base font-semibold mb-4 leading-snug">{t(currentQ.questionKey, currentQ.defaultQuestion)}</h3>
          <div className="space-y-2.5 mb-5">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOpt === i, isCorrect = i === currentQ.correctIndex
              let btnStyle = 'border-slate-200 dark:border-slate-800 hover:border-purple-400/50 bg-slate-50/50 dark:bg-slate-800/40'
              if (selectedOpt !== null) {
                if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold'
                else if (isSelected) btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-300 font-semibold'
              }
              return (
                <button key={i} onClick={() => handleSelect(i)} disabled={selectedOpt !== null} className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}>
                  <span>{opt}</span>
                  {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />}
                  {selectedOpt !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />}
                </button>
              )
            })}
          </div>
          {selectedOpt !== null && (
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 mb-5">
              <span className="font-bold">{t('quiz.explanation', 'Esoteric Insight')}: </span>{currentQ.explanation}
            </div>
          )}
          <button onClick={handleNext} disabled={selectedOpt === null} className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5">
            <span>{idx + 1 === QUESTIONS.length ? t('quiz.finish', 'View Final Rank') : t('quiz.next', 'Next Question')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="text-center py-5">
          <Trophy className="w-12 h-12 mx-auto text-amber-400 mb-2 animate-bounce" />
          <h3 className="text-lg font-extrabold mb-1">{t('quiz.completed', 'Quiz Mastered!')}</h3>
          <div className={`inline-block px-3.5 py-1 rounded-full border text-xs font-bold my-2 ${getRank().cls}`}>{getRank().title}</div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">{t('quiz.finalScore', 'Final Score')}: <span className="font-bold text-slate-800 dark:text-slate-100">{score}</span> {t('quiz.pts', 'pts')}</p>
          <button onClick={handleReset} className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> {t('quiz.retry', 'Try Again')}
          </button>
        </div>
      )}
    </div>
  )
}
