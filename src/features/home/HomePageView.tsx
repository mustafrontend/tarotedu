import React from 'react'
import { useTarotStore } from '../../store/tarotStore'
import { GlassmorphicHeaderCard } from './components/GlassmorphicHeaderCard'
import { CategorySegmentedPillBar } from './components/CategorySegmentedPillBar'
import { MoonPhaseWidget } from './components/MoonPhaseWidget'
import { AppleMusicFeaturedCarousel } from './components/AppleMusicFeaturedCarousel'
import { AppleCardListSection } from './components/AppleCardListSection'
import { HowToReadHomeSection } from './components/HowToReadHomeSection'
import { StatsOverviewSection } from './components/StatsOverviewSection'
import { SpreadsShowcaseSection } from './components/SpreadsShowcaseSection'
import { OracleSoundSection } from './components/OracleSoundSection'
import { TestimonialsFaqSection } from './components/TestimonialsFaqSection'

interface HomePageViewProps {
  onNavigate: (tab: any) => void
  onOpenPaywall: () => void
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  onNavigate,
  onOpenPaywall,
}) => {
  const learnedCards = useTarotStore((state) => state.learnedCards)
  const readings = useTarotStore((state) => state.readings)
  const isPro = useTarotStore((state) => state.isPro)

  return (
    <div className="space-y-6 pb-36 font-sans">
      {/* 1. Full-Height Glassmorphic Video Header matching UI reference */}
      <GlassmorphicHeaderCard
        onNavigate={onNavigate}
        learnedCount={learnedCards.length}
      />

      {/* 2. Category Segmented Pill Bar matching reference design */}
      <CategorySegmentedPillBar onNavigate={onNavigate} />

      {/* 3. Live Moon Phase & Celestial Synchronicity Widget */}
      <MoonPhaseWidget />

      {/* 4. Apple Music Style Horizontal Featured Hero Carousel */}
      <AppleMusicFeaturedCarousel onNavigate={onNavigate} />

      {/* 5. Apple Music Style List View Rows (Son Eklenen Kartlar) */}
      <AppleCardListSection onNavigate={onNavigate} />

      {/* 6. "Tarot Nasıl Bakılır?" Masterclass Section */}
      <HowToReadHomeSection />

      {/* 7. Stats Bento Overview */}
      <StatsOverviewSection
        learnedCount={learnedCards.length}
        readingsCount={readings.length}
      />

      {/* 8. Sacred Spreads Showcase */}
      <SpreadsShowcaseSection onNavigate={onNavigate} />

      {/* 9. AI Oracle & Ambient Sound Section */}
      <OracleSoundSection
        onNavigate={onNavigate}
        onOpenPaywall={onOpenPaywall}
        isPro={isPro}
      />

      {/* 10. Testimonials & FAQ */}
      <TestimonialsFaqSection />
    </div>
  )
}
