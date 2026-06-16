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
  HOME_TEXT_REVEAL_AT,
  clamp01,
  easeOutCubic,
} from '../lib/homeIntro'
import '../styles/home.css'

function getInitialIntroState() {
  if (typeof window === 'undefined') {
    return {
      introProgress: 1,
      showHeader: true,
      headerIntroReveal: false,
      showHomeText: true,
      introActive: true,
    }
  }

  const reducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  const alreadyDone = sessionStorage.getItem(HOME_INTRO_STORAGE_KEY) === '1'

  if (reducedMotion || alreadyDone) {
    return {
      introProgress: 1,
      showHeader: true,
      headerIntroReveal: false,
      showHomeText: true,
      introActive: true,
    }
  }

  return {
    introProgress: 0,
    showHeader: false,
    headerIntroReveal: false,
    showHomeText: false,
    introActive: false,
  }
}

export function HomePage() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const initialIntro = useRef(getInitialIntroState()).current
  const [showCollection, setShowCollection] = useState(false)
  const [collectionInitialIndex, setCollectionInitialIndex] = useState(0)
  const [introProgress, setIntroProgress] = useState(initialIntro.introProgress)
  const [showHeader, setShowHeader] = useState(initialIntro.showHeader)
  const [headerIntroReveal, setHeaderIntroReveal] = useState(initialIntro.headerIntroReveal)
  const [showHomeText, setShowHomeText] = useState(initialIntro.showHomeText)
  const [introActive, setIntroActive] = useState(initialIntro.introActive)
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
      setIntroActive(true)
      return
    }

    const alreadyDone = sessionStorage.getItem(HOME_INTRO_STORAGE_KEY) === '1'
    if (alreadyDone) {
      setIntroProgress(1)
      setShowHeader(true)
      setShowHomeText(true)
      setIntroActive(true)
      return
    }

    setIntroProgress(0)
    setShowHeader(false)
    setShowHomeText(false)
    setIntroActive(true)

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
      if (eased >= HOME_TEXT_REVEAL_AT) {
        setShowHomeText(true)
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
        <HomeCarousel
          introProgress={introProgress}
          allowRotation={showHomeText}
          active={introActive}
        />
        <HomeGrid visible={showHomeText} onDiscover={() => openCollection(0)} />
      </div>
      {showHeader && (
        <StickyMenu
          introReveal={headerIntroReveal}
          onHomeReset={resetLanding}
          contextLabel={showCollection ? 'Work' : undefined}
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
