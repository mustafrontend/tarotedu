import { useState } from 'react'
import { majorArcana } from '../../../data/majorArcana'
import { TarotCard, CardPosition } from '../../../types/tarot'
import { soundService } from '../../../services/soundService'
import { useTarotStore } from '../../../store/tarotStore'
import { validateIntentionText } from '../../../utils/textValidation'

export const useDailyDraw = () => {
  const setDailyDrawing = useTarotStore((state) => state.setDailyDrawing)

  const [intention, setIntention] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [drawnCard, setDrawnCard] = useState<TarotCard | null>(null)
  const [position, setPosition] = useState<CardPosition>('upright')
  const [isFlipped, setIsFlipped] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [journalNote, setJournalNote] = useState('')

  const handleDraw = () => {
    const valid = validateIntentionText(intention)
    if (!valid.isValid) {
      setValidationError(valid.errorMessage || 'Lütfen kart çekmek için anlamlı bir niyet yazın.')
      soundService.playClick()
      return
    }

    setValidationError(null)
    setIsShuffling(true)
    setIsFlipped(false)
    soundService.playCardFlip()

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * majorArcana.length)
      const isReversed = Math.random() < 0.3
      const card = majorArcana[randomIndex]
      const pos: CardPosition = isReversed ? 'reversed' : 'upright'

      setDrawnCard(card)
      setPosition(pos)
      setIsShuffling(false)
      setIsFlipped(true)
      soundService.playMysticChime()

      setDailyDrawing({
        date: new Date().toISOString(),
        card,
        position: pos,
        intention,
      })
    }, 600)
  }

  const handleRedraw = () => {
    setIsFlipped(false)
  }

  return {
    intention,
    setIntention,
    validationError,
    setValidationError,
    drawnCard,
    position,
    isFlipped,
    isShuffling,
    journalNote,
    setJournalNote,
    handleDraw,
    handleRedraw,
  }
}
