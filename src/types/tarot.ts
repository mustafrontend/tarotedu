export type CardSuit = 'cups' | 'wands' | 'swords' | 'pentacles' | 'major'
export type CardPosition = 'upright' | 'reversed'
export type Language = 'en' | 'tr' | 'es' | 'de' | 'fr' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh' | 'ar'
export type SpreadType = 'three-card' | 'celtic-cross' | 'horseshoe' | 'daily' | 'career' | 'love'

export interface TarotCard {
  id: string
  number: number
  name: string
  suit: CardSuit
  arcana: 'major' | 'minor'
  element?: string
  astrology?: string
  meaning: {
    upright: string
    reversed: string
  }
  keywords: {
    upright: string[]
    reversed: string[]
  }
  image: string
  videoUrl?: string
  guidance: string
  symbolism?: string
  loveMeaning?: string
  careerMeaning?: string
  exercise?: string
  isPremium?: boolean
}

export interface ReadingCard {
  card: TarotCard
  position: CardPosition
  positionName: string
}

export interface Reading {
  id: string
  date: string
  spread: SpreadType
  cards: ReadingCard[]
  interpretation: string
  notes: string
}

export interface DailyDrawing {
  date: string
  card: TarotCard
  position: CardPosition
  intention: string
  journalNote?: string
}

export interface TarotSpread {
  id: SpreadType
  name: string
  positions: number
  positionNames: string[]
  guidanceTemplate: string
  description: string
  isPremium?: boolean
}

export interface UserProfile {
  id: string
  name: string
  birthDate: string
  lifePath: number
  favoriteCards: string[]
  readingHistory: Reading[]
  learnedCards: string[]
  streakDays: number
  preferences: {
    language: Language
    theme: 'light' | 'dark'
    deckVersion: 'traditional' | 'modern'
  }
}

export interface AmbientTrack {
  id: string
  title: string
  frequency: string
  description: string
  iconName: string
}
