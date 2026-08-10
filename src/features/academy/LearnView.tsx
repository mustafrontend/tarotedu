import React, { useState } from 'react'
import { majorArcana } from '../../data/majorArcana'
import { TarotCard } from '../../types/tarot'
import { CardDetailModal } from './CardDetailModal'
import { useTarotStore } from '../../store/tarotStore'
import { useAcademyFilter } from './hooks/useAcademyFilter'
import { AcademyFilterHeader } from './components/AcademyFilterHeader'
import { AcademyCardItem } from './components/AcademyCardItem'
import { HowToReadTarotModal } from './components/HowToReadTarotModal'

interface LearnViewProps {
  onOpenPaywall?: () => void
  onNavigate?: (tab: any) => void
}

export const LearnView: React.FC<LearnViewProps> = ({ onOpenPaywall, onNavigate }) => {
  const isPro = useTarotStore((state) => state.isPro)
  const learnedCards = useTarotStore((state) => state.learnedCards)
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)
  const [isHowToReadOpen, setIsHowToReadOpen] = useState(false)

  const { searchQuery, setSearchQuery, filterMode, setFilterMode, filteredCards } = useAcademyFilter(
    majorArcana,
    learnedCards
  )

  return (
    <div className="space-y-6 pb-12 font-sans">
      <AcademyFilterHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterMode={filterMode}
        onFilterChange={setFilterMode}
        learnedCount={learnedCards.length}
        onOpenHowToRead={() => setIsHowToReadOpen(true)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredCards.map((card) => {
          const isLearned = learnedCards.includes(card.id)
          const prevCard = card.number > 0 ? majorArcana.find((c) => c.number === card.number - 1) : null
          const isPrevLearned = card.number === 0 ? true : (prevCard ? learnedCards.includes(prevCard.id) : true)
          const isSequentialLocked = !isPrevLearned

          return (
            <AcademyCardItem
              key={card.id}
              card={card}
              isLearned={isLearned}
              isPro={isPro}
              isSequentialLocked={isSequentialLocked}
              onClick={() => setSelectedCard(card)}
            />
          )
        })}
      </div>

      <CardDetailModal
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        onOpenPaywall={onOpenPaywall}
        onSelectCard={(c) => setSelectedCard(c)}
      />

      <HowToReadTarotModal
        isOpen={isHowToReadOpen}
        onClose={() => setIsHowToReadOpen(false)}
        onStartReading={(targetTab) => onNavigate?.(targetTab || 'daily')}
      />
    </div>
  )
}
