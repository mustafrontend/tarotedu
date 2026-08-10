import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TarotCard } from '../../../types/tarot'

export type FilterMode = 'all' | 'learned' | 'unlearned'

export const useAcademyFilter = (cards: TarotCard[], learnedCards: string[]) => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMode, setFilterMode] = useState<FilterMode>('all')

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const localizedName = t(`cards.${card.id}.name`, card.name)
      const matchesSearch =
        localizedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.keywords.upright.some((kw: string) => kw.toLowerCase().includes(searchQuery.toLowerCase()))
      const isLearned = learnedCards.includes(card.id)

      if (filterMode === 'learned') return matchesSearch && isLearned
      if (filterMode === 'unlearned') return matchesSearch && !isLearned
      return matchesSearch
    })
  }, [cards, learnedCards, searchQuery, filterMode, t])

  return {
    searchQuery,
    setSearchQuery,
    filterMode,
    setFilterMode,
    filteredCards,
  }
}
