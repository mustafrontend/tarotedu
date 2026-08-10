import { ElementType, ElementalBalance } from './types'
import { TarotCard } from '../../types/tarot'

const MAJOR_ELEMENTS: Record<number, ElementType> = {
  0: 'air', 1: 'air', 2: 'water', 3: 'earth', 4: 'fire',
  5: 'earth', 6: 'air', 7: 'water', 8: 'fire', 9: 'earth',
  10: 'fire', 11: 'air', 12: 'water', 13: 'water', 14: 'fire',
  15: 'earth', 16: 'fire', 17: 'air', 18: 'water', 19: 'fire',
  20: 'fire', 21: 'earth',
}

export function getCardElement(card?: TarotCard): ElementType {
  if (!card) return 'fire'
  if (card.element) {
    const el = card.element.toLowerCase()
    if (el.includes('fire') || el.includes('ateş')) return 'fire'
    if (el.includes('water') || el.includes('su')) return 'water'
    if (el.includes('air') || el.includes('hava')) return 'air'
    if (el.includes('earth') || el.includes('toprak')) return 'earth'
  }
  if (card.suit === 'wands') return 'fire'
  if (card.suit === 'cups') return 'water'
  if (card.suit === 'swords') return 'air'
  if (card.suit === 'pentacles') return 'earth'
  return MAJOR_ELEMENTS[card.number] || 'fire'
}

const ALCHEMY_MATRIX: Record<string, { name: string; score: number; desc: string }> = {
  'fire-fire': { name: '🔥 Cosmic Inferno', score: 90, desc: 'High passion, catalytic drive & shared flame.' },
  'fire-air': { name: '🌬️ Expanding Ember', score: 95, desc: 'Intellectual inspiration fueling action.' },
  'fire-water': { name: '🧪 Alchemical Steam', score: 84, desc: 'Transformative emotional & spiritual heat.' },
  'fire-earth': { name: '🌋 Volcanic Foundation', score: 88, desc: 'Passionate vision anchored into material reality.' },
  'water-water': { name: '💧 Oceanic Empathy', score: 92, desc: 'Deep psychic bond & intuitive understanding.' },
  'water-air': { name: '🌫️ Mystic Mist', score: 85, desc: 'Poetic intuition meets visionary thoughts.' },
  'water-earth': { name: '🌱 Fertile Sanctuary', score: 96, desc: 'Nurturing growth & enduring spiritual stability.' },
  'air-air': { name: '⚡ Mind Sinergy', score: 89, desc: 'Harmonious thought exchange & telepathy.' },
  'air-earth': { name: '🏔️ Grounded Wisdom', score: 86, desc: 'Clarity of mind bringing structural peace.' },
  'earth-earth': { name: '💎 Diamond Anchor', score: 94, desc: 'Unshakable loyalty & manifested abundance.' },
}

export function computeElementalBalance(cardA?: TarotCard, cardB?: TarotCard): ElementalBalance {
  const elemA = getCardElement(cardA)
  const elemB = getCardElement(cardB)
  const pairKey = [elemA, elemB].sort().join('-')
  const alchemy = ALCHEMY_MATRIX[pairKey] || { name: '✨ Divine Synergy', score: 88, desc: 'Sacred energy synthesis.' }

  const counts: Record<ElementType, number> = { fire: 0, water: 0, air: 0, earth: 0 }
  counts[elemA] += 50
  counts[elemB] += 50

  return {
    elementA: elemA,
    elementB: elemB,
    alchemyName: alchemy.name,
    synergyScore: alchemy.score,
    description: alchemy.desc,
    ratios: counts,
  }
}
