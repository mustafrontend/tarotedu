import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import { majorArcana } from '../../data/majorArcana'
import { SpreadType, CardPosition, ReadingCard } from '../../types/tarot'
import { soundService } from '../../services/soundService'
import { useTarotStore } from '../../store/tarotStore'
import { SpreadResultGrid } from './components/SpreadResultGrid'
import { SpreadSelectorBar } from './components/SpreadSelectorBar'
import { SpreadIntroCard } from './components/SpreadIntroCard'

interface SpreadsViewProps {
  onOpenPaywall?: () => void
}

const SPREADS_CONFIG: Record<
  SpreadType,
  { nameKey: string; count: number; positions: string[] }
> = {
  'three-card': { nameKey: 'spreads.threeCard', count: 3, positions: ['pastFoundation', 'presentSituation', 'futureOutcome'] },
  'celtic-cross': {
    nameKey: 'spreads.celticCross',
    count: 10,
    positions: [
      'coreIssue', 'crossingObstacle', 'subconscious', 'pastRoots',
      'attainableGoal', 'nearFuture', 'selfAttitude', 'environment',
      'hopesAndFears', 'finalOutcome',
    ],
  },
  horseshoe: { nameKey: 'spreads.horseshoe', count: 7, positions: ['pastInfluence', 'presentState', 'hiddenInfluences', 'obstacle', 'externalFactors', 'bestAction', 'finalOutcome'] },
  career: { nameKey: 'spreads.career', count: 4, positions: ['currentSkill', 'opportunity', 'challenge', 'financialPathway'] },
  love: { nameKey: 'spreads.love', count: 3, positions: ['yourEnergy', 'partnerEnergy', 'relationshipDynamics'] },
  daily: { nameKey: 'spreads.threeCard', count: 1, positions: ['dailyGuidance'] },
}

export const SpreadsView: React.FC<SpreadsViewProps> = ({ onOpenPaywall }) => {
  const { t } = useTranslation()
  const addReading = useTarotStore((state) => state.addReading)

  const [activeSpread, setActiveSpread] = useState<SpreadType>('three-card')
  const [drawnCards, setDrawnCards] = useState<ReadingCard[]>([])
  const [isReadingComplete, setIsReadingComplete] = useState(false)

  const currentConfig = SPREADS_CONFIG[activeSpread]

  const handleDrawSpread = () => {
    soundService.playCardFlip()
    const shuffled = [...majorArcana].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, currentConfig.count)

    const cards: ReadingCard[] = selected.map((card, idx) => ({
      card,
      position: Math.random() < 0.25 ? ('reversed' as CardPosition) : ('upright' as CardPosition),
      positionName: currentConfig.positions[idx],
    }))

    setDrawnCards(cards)
    setIsReadingComplete(true)
    soundService.playMysticChime()

    addReading({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      spread: activeSpread,
      cards,
      interpretation: t('spreads.defaultInterpretation'),
      notes: '',
    })
  }

  const handleReset = () => {
    setDrawnCards([])
    setIsReadingComplete(false)
  }

  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="space-y-1">
        <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <Sparkles className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('spreads.title')}
        </h2>
        <p className={`text-xs font-medium ${
          isDark ? 'text-purple-200/80' : 'text-slate-600'
        }`}>{t('spreads.subtitle')}</p>
      </div>

      <SpreadSelectorBar
        spreadsConfig={SPREADS_CONFIG}
        activeSpread={activeSpread}
        onSelectSpread={(spreadKey) => {
          setActiveSpread(spreadKey)
          handleReset()
        }}
        onOpenPaywall={onOpenPaywall}
      />

      {!isReadingComplete ? (
        <SpreadIntroCard
          nameKey={currentConfig.nameKey}
          count={currentConfig.count}
          onDrawSpread={handleDrawSpread}
        />
      ) : (
        <SpreadResultGrid
          drawnCards={drawnCards}
          spreadTitle={t(currentConfig.nameKey)}
          onReset={handleReset}
        />
      )}
    </div>
  )
}
