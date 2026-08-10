import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProfile, Reading, DailyDrawing, Language } from '../types/tarot'

interface TarotStore {
  user: UserProfile | null
  dailyDrawing: DailyDrawing | null
  readings: Reading[]
  learnedCards: string[]
  language: Language
  theme: 'light' | 'dark'
  isPro: boolean
  onboardingCompleted: boolean

  setUser: (user: UserProfile) => void
  setDailyDrawing: (drawing: DailyDrawing) => void
  addReading: (reading: Reading) => void
  toggleLearnedCard: (cardId: string) => void
  setLanguage: (lang: Language) => void
  setTheme: (theme: 'light' | 'dark') => void
  setIsPro: (isPro: boolean) => void
  setOnboardingCompleted: (completed: boolean) => void
}

export const useTarotStore = create<TarotStore>()(
  persist(
    (set) => ({
      user: null,
      dailyDrawing: null,
      readings: [],
      learnedCards: [],
      language: 'en' as Language,
      theme: 'light',
      isPro: false,
      onboardingCompleted: false,

      setUser: (user) => set({ user }),
      setDailyDrawing: (drawing) => set({ dailyDrawing: drawing }),
      addReading: (reading) =>
        set((state) => ({
          readings: [reading, ...state.readings].slice(0, 100),
        })),
      toggleLearnedCard: (cardId) =>
        set((state) => {
          const exists = state.learnedCards.includes(cardId)
          const updated = exists
            ? state.learnedCards.filter((id) => id !== cardId)
            : [...state.learnedCards, cardId]
          return { learnedCards: updated }
        }),
      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => set({ theme }),
      setIsPro: (isPro) => set({ isPro }),
      setOnboardingCompleted: (onboardingCompleted) => set({ onboardingCompleted }),
    }),
    {
      name: 'tarotedu-store',
      partialize: (state) => ({
        user: state.user,
        readings: state.readings,
        learnedCards: state.learnedCards,
        language: state.language,
        theme: state.theme,
        isPro: state.isPro,
        onboardingCompleted: state.onboardingCompleted,
      }),
    }
  )
)
