import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useSpring,
} from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import type { PortfolioItem } from '../data/portfolio'
import { getSliderItemTransform } from '../lib/collectionSliderMath'
import { DiscoverWorkImage } from './DiscoverWorkImage'
import { ArrowIcon } from './icons'
import '../styles/discover.css'

interface CollectionOverlayProps {
  onClose: () => void
  initialActiveIndex?: number
}

function useViewportSize() {
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }))

  useEffect(() => {
    const onResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}

function SliderItem({
  item,
  index,
  activeIndex,
  viewportWidth,
  viewportHeight,
  onSelect,
  onOpen,
}: {
  item: PortfolioItem
  index: number
  activeIndex: number
  viewportWidth: number
  viewportHeight: number
  onSelect: (index: number) => void
  onOpen: (index: number) => void
}) {
  const isActive = index === activeIndex
  const transform = getSliderItemTransform(
    index,
    activeIndex,
    viewportWidth,
    viewportHeight,
  )
  const x = useSpring(transform.x, { stiffness: 260, damping: 32 })
  const y = useSpring(transform.y, { stiffness: 260, damping: 32 })
  const scale = useSpring(transform.scale, { stiffness: 260, damping: 32 })

  useEffect(() => {
    x.set(transform.x)
    y.set(transform.y)
    scale.set(transform.scale)
  }, [transform.x, transform.y, transform.scale, x, y, scale])

  return (
    <motion.div
      className={`discover-page__item${isActive ? ' discover-page__item--active' : ''}`}
      style={{
        x,
        y,
        scale,
        zIndex: transform.zIndex,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (!isActive) return
        if (info.offset.x > 50 || info.velocity.x > 500) onSelect(activeIndex - 1)
        if (info.offset.x < -50 || info.velocity.x < -500) onSelect(activeIndex + 1)
      }}
      onClick={() => {
        if (isActive) onOpen(index)
        else onSelect(index)
      }}
    >
      <DiscoverWorkImage src={item.imageUrl} alt={item.title} />
    </motion.div>
  )
}

function WorkInfo({
  item,
  onOpen,
}: {
  item: PortfolioItem
  onOpen: () => void
}) {
  return (
    <motion.div
      key={item.id}
      className="discover-page__info-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="discover-page__info-name">Herbert Stattler</p>
      <button type="button" className="discover-page__info-title" onClick={onOpen}>
        {item.title}
      </button>
      <p className="discover-page__info-year">{item.year}</p>
      <p className="discover-page__info-description">{item.description}</p>
    </motion.div>
  )
}

export function CollectionOverlay({
  onClose,
  initialActiveIndex = 0,
}: CollectionOverlayProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
  const { width, height } = useViewportSize()
  const activeItem = portfolioData[activeIndex]

  useEffect(() => {
    setActiveIndex(initialActiveIndex)
  }, [initialActiveIndex])

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), portfolioData.length - 1))
  }, [])

  const openWork = useCallback(
    (index: number) => {
      const item = portfolioData[index]
      if (item) {
        navigate(`/work/${item.id}`, {
          state: { fromDiscover: true, discoverIndex: index },
        })
      }
    },
    [navigate],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goTo(activeIndex - 1)
      if (event.key === 'ArrowRight') goTo(activeIndex + 1)
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, goTo, onClose])

  return (
    <motion.div
      className="discover-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.h1
        className="discover-page__title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="discover-page__title-word">Discover</span>
        <br />
        my collection
      </motion.h1>

      <div className="discover-page__wrapper">
        {portfolioData.map((item, index) => (
          <SliderItem
            key={item.id}
            item={item}
            index={index}
            activeIndex={activeIndex}
            viewportWidth={width}
            viewportHeight={height}
            onSelect={goTo}
            onOpen={openWork}
          />
        ))}
      </div>

      {activeItem && (
        <div className="discover-page__info">
          <AnimatePresence mode="wait">
            <WorkInfo item={activeItem} onOpen={() => openWork(activeIndex)} />
          </AnimatePresence>
        </div>
      )}

      <div className="discover-page__controls">
        <button
          type="button"
          className="discover-page__nav-btn"
          aria-label="Previous work"
          disabled={activeIndex === 0}
          onClick={() => goTo(activeIndex - 1)}
        >
          <ArrowIcon className="rotate-180" />
        </button>
        <button
          type="button"
          className="discover-page__nav-btn"
          aria-label="Next work"
          disabled={activeIndex === portfolioData.length - 1}
          onClick={() => goTo(activeIndex + 1)}
        >
          <ArrowIcon />
        </button>
      </div>
    </motion.div>
  )
}
