import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { StickyMenu } from '../components/StickyMenu'
import { HomeCarousel } from '../components/HomeCarousel'
import { HomeGrid } from '../components/HomeGrid'
import { CollectionOverlay } from '../components/CollectionOverlay'
import type { DiscoverNavigationState } from '../lib/discoverNavigation'
import '../styles/home.css'

export function HomePage() {
  const location = useLocation()
  const [showCollection, setShowCollection] = useState(false)
  const [collectionInitialIndex, setCollectionInitialIndex] = useState(0)

  const openCollection = useCallback((index = 0) => {
    setCollectionInitialIndex(index)
    setShowCollection(true)
  }, [])

  const closeCollection = useCallback(() => {
    setShowCollection(false)
  }, [])

  const resetLanding = useCallback(() => {
    setShowCollection(false)
    setCollectionInitialIndex(0)
    window.history.replaceState({}, '')
  }, [])

  useEffect(() => {
    const state = location.state as DiscoverNavigationState | null
    if (state?.discover) {
      setCollectionInitialIndex(
        typeof state.discoverIndex === 'number' ? state.discoverIndex : 0,
      )
      setShowCollection(true)
      window.history.replaceState({}, '')
    }
  }, [location.state])

  return (
    <div className="home-page">
      <div className="home-page__grid">
        <HomeCarousel />
        <HomeGrid onDiscover={() => openCollection(0)} />
      </div>
      <StickyMenu
        onNavigate={() => openCollection(0)}
        onHomeReset={resetLanding}
      />
      <AnimatePresence>
        {showCollection && (
          <CollectionOverlay
            key={collectionInitialIndex}
            onClose={closeCollection}
            initialActiveIndex={collectionInitialIndex}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
