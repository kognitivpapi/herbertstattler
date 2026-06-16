import { useCallback, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { PortfolioItem } from '../data/portfolio'
import {
  getMobileCarouselItemHeight,
  getMobileCarouselItemSize,
  getMobileItemStep,
  getMobileSliderItemLayout,
  getSwipeThresholds,
  MOBILE_CAROUSEL_SPRING,
} from '../lib/collectionSliderMath'
import { DiscoverWorkImage } from './DiscoverWorkImage'

interface MobileDiscoverCarouselProps {
  items: PortfolioItem[]
  activeIndex: number
  viewportWidth: number
  viewportHeight: number
  onSelect: (index: number) => void
}

export function MobileDiscoverCarousel({
  items,
  activeIndex,
  viewportWidth,
  viewportHeight,
  onSelect,
}: MobileDiscoverCarouselProps) {
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const itemWidth = getMobileCarouselItemSize(viewportWidth, viewportHeight)
  const itemHeight = getMobileCarouselItemHeight(itemWidth)
  const itemStep = getMobileItemStep(itemWidth)
  const { offset: swipeOffset, velocity: swipeVelocity } =
    getSwipeThresholds(viewportWidth)

  const clampIndex = useCallback(
    (index: number) => Math.min(Math.max(index, 0), items.length - 1),
    [items.length],
  )

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      setIsDragging(false)
      setDragOffset(0)

      if (info.offset.x < -swipeOffset || info.velocity.x < -swipeVelocity) {
        onSelect(clampIndex(activeIndex + 1))
        return
      }
      if (info.offset.x > swipeOffset || info.velocity.x > swipeVelocity) {
        onSelect(clampIndex(activeIndex - 1))
      }
    },
    [activeIndex, clampIndex, onSelect, swipeOffset, swipeVelocity],
  )

  return (
    <div
      className="discover-page__mobile-stage"
      aria-label="Collection"
      style={
        {
          '--mobile-item-width': `${itemWidth}px`,
          '--mobile-item-height': `${itemHeight}px`,
          '--mobile-item-step': `${itemStep}px`,
        } as CSSProperties
      }
    >
      <div className="discover-page__mobile-viewport">
        {items.map((item, index) => {
          const layout = getMobileSliderItemLayout(
            index,
            activeIndex,
            itemStep,
            dragOffset,
          )

          return (
            <motion.button
              key={item.id}
              type="button"
              className={`discover-page__mobile-item${
                index === activeIndex ? ' discover-page__mobile-item--active' : ''
              }`}
              style={{
                zIndex: layout.zIndex,
                pointerEvents: index === activeIndex ? 'none' : 'auto',
              }}
              animate={{
                x: layout.x,
                scale: layout.scale,
                opacity: layout.opacity,
              }}
              transition={isDragging ? { duration: 0 } : MOBILE_CAROUSEL_SPRING}
              onClick={() => {
                if (index !== activeIndex) onSelect(index)
              }}
            >
              <DiscoverWorkImage src={item.imageUrl} alt={item.title} />
            </motion.button>
          )
        })}

        <motion.div
          className="discover-page__mobile-drag-surface"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDrag={(_, info) => setDragOffset(info.offset.x)}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  )
}
