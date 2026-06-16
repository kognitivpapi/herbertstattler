import { useState, useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { StickyMenu } from '../components/StickyMenu'
import { HomeCarousel } from '../components/HomeCarousel'
import { HomeGrid } from '../components/HomeGrid'
import { CollectionOverlay } from '../components/CollectionOverlay'
import type { DiscoverNavigationState } from '../lib/discoverNavigation'
import {
  HOME_HEADER_REVEAL_AT,
  HOME_INTRO_DURATION_MS,
  HOME_INTRO_STORAGE_KEY,
  clamp01,
  easeOutCubic,
} from '../lib/homeIntro'
import '../styles/home.css'

export function HomePage() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const [showCollection, setShowCollection] = useState(false)
  const [collectionInitialIndex, setCollectionInitialIndex] = useState(0)
  const [introProgress, setIntroProgress] = useState(1)
  const [showHeader, setShowHeader] = useState(true)
  const [headerIntroReveal, setHeaderIntroReveal] = useState(false)
  const [showHomeText, setShowHomeText] = useState(true)
  const startedRef = useRef(false)

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

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    if (reducedMotion) {
      sessionStorage.setItem(HOME_INTRO_STORAGE_KEY, '1')
      setIntroProgress(1)
      setShowHeader(true)
      setShowHomeText(true)
      return
    }

    const alreadyDone = sessionStorage.getItem(HOME_INTRO_STORAGE_KEY) === '1'
    if (alreadyDone) {
      setIntroProgress(1)
      setShowHeader(true)
      setShowHomeText(true)
      return
    }

    setIntroProgress(0)
    setShowHeader(false)
    setShowHomeText(false)

    const startedAt = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const t = clamp01((now - startedAt) / HOME_INTRO_DURATION_MS)
      const eased = easeOutCubic(t)
      setIntroProgress(eased)

      if (eased >= HOME_HEADER_REVEAL_AT) {
        setShowHeader(true)
        setHeaderIntroReveal(true)
      }
      if (t >= 1) {
        setShowHomeText(true)
        sessionStorage.setItem(HOME_INTRO_STORAGE_KEY, '1')
        return
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  return (
    <div className="home-page">
      <div className="home-page__grid">
        <HomeCarousel introProgress={introProgress} allowRotation={showHomeText} />
        <HomeGrid
          visible={showHomeText}
          introProgress={introProgress}
          onDiscover={() => openCollection(0)}
        />
      </div>
      {showHeader && (
        <StickyMenu
          introReveal={headerIntroReveal}
          onNavigate={() => openCollection(0)}
          onHomeReset={resetLanding}
        />
      )}
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
