import React, { useState, useEffect } from 'react'
import { Header } from './components/organisms/Header'
import { Navigation, TabType } from './components/organisms/Navigation'
import { OnboardingWalkthroughModal } from './components/organisms/OnboardingWalkthroughModal'
import { PaywallModal } from './features/paywall/PaywallModal'
import { HomePageView } from './features/home/HomePageView'
import { LearnView } from './features/academy/LearnView'
import { MysticHubView } from './features/oracle/MysticHubView'
import { AmbientPlayerView } from './features/player/AmbientPlayerView'
import { ProfileView } from './features/profile/ProfileView'
import { useTarotStore } from './store/tarotStore'
import { initializeRevenueCat } from './services/revenueCatService'
import { initializeNotifications } from './services/notificationService'
import { tarotApiService } from './services/tarotApiService'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [isPaywallOpen, setIsPaywallOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const onboardingCompleted = useTarotStore((state) => state.onboardingCompleted)
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    import('./i18n')
      .then(() => {
        setMounted(true)
        if (!onboardingCompleted) {
          setShowOnboarding(true)
        }
      })
      .catch(console.error)

    initializeRevenueCat()
    initializeNotifications()
    tarotApiService.notifyLogin('TarotEdu User')

    const handleFocusOut = (e: FocusEvent) => {
      if (
        e.target &&
        (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }, 100)
      }
    }

    document.addEventListener('focusout', handleFocusOut)
    return () => {
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [onboardingCompleted])

  if (!mounted) return null

  const renderView = () => {
    switch (activeTab) {
      case 'learn':
        return (
          <LearnView
            onOpenPaywall={() => setIsPaywallOpen(true)}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )
      case 'daily':
        return (
          <MysticHubView
            onOpenPaywall={() => setIsPaywallOpen(true)}
            initialSubTab="daily"
          />
        )
      case 'spreads':
        return (
          <MysticHubView
            onOpenPaywall={() => setIsPaywallOpen(true)}
            initialSubTab="spreads"
          />
        )
      case 'oracle':
        return (
          <MysticHubView
            onOpenPaywall={() => setIsPaywallOpen(true)}
            initialSubTab="oracle"
          />
        )
      case 'player':
        return <AmbientPlayerView onOpenPaywall={() => setIsPaywallOpen(true)} />
      case 'profile':
        return <ProfileView onOpenPaywall={() => setIsPaywallOpen(true)} />
      default:
        return (
          <HomePageView
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenPaywall={() => setIsPaywallOpen(true)}
          />
        )
    }
  }

  return (
    <div
      className={`min-h-screen font-sans flex flex-col selection:bg-purple-700 selection:text-white transition-colors duration-200 overflow-x-hidden w-full max-w-full relative ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <Header onOpenPaywall={() => setIsPaywallOpen(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-4 pb-24 overflow-x-hidden">
        {renderView()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      <OnboardingWalkthroughModal
        isOpen={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
      />

      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
    </div>
  )
}
