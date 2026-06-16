/** Rabobank CollectionSlider spacing constant (Xe) */
const SPACING = 30
export const MOBILE_BREAKPOINT = 768
export const TABLET_MAX_BREAKPOINT = 1024
export const MOBILE_ITEM_GAP = 16

export const MOBILE_CAROUSEL_SPRING = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 36,
  mass: 0.8,
}

export function getMobileItemStep(itemWidth: number): number {
  return itemWidth + MOBILE_ITEM_GAP
}

export interface MobileSliderItemLayout {
  x: number
  scale: number
  opacity: number
  zIndex: number
}

export function getMobileSliderItemLayout(
  index: number,
  activeIndex: number,
  itemStep: number,
  dragOffset = 0,
): MobileSliderItemLayout {
  const distance = index - activeIndex
  const isActive = index === activeIndex

  return {
    x: distance * itemStep + dragOffset,
    scale: isActive ? 1 : 0.76,
    opacity: Math.abs(distance) > 3 ? 0 : isActive ? 1 : 0.42,
    zIndex: 100 - Math.abs(distance) + (isActive ? 50 : 0),
  }
}

function se(
  spread: number,
  distance: number,
  map: (value: number) => number,
  multiplier: number,
  viewportWidth: number,
): number {
  const base = map(distance) * (SPACING + viewportWidth / 100)
  const offset = Math.sign(distance) * map(viewportWidth * spread)
  return base + offset * multiplier
}

export interface SliderItemTransform {
  x: number
  y: number
  scale: number
  zIndex: number
}

export function getSliderItemTransform(
  index: number,
  activeIndex: number,
  viewportWidth: number,
  viewportHeight: number,
): SliderItemTransform {
  const isMobile = viewportWidth < MOBILE_BREAKPOINT
  const isTablet =
    !isMobile && viewportWidth <= TABLET_MAX_BREAKPOINT
  const isLeftOfActive = index < activeIndex
  const yMultiplier = isTablet
    ? 0.32
    : isMobile
      ? 0.15
      : viewportHeight / viewportWidth
  const spread = isTablet
    ? isLeftOfActive
      ? 0.16
      : 0.07
    : isMobile
      ? isLeftOfActive
        ? 0.42
        : 0.12
      : 0.27
  const distance = index - activeIndex
  const inactiveScale = isTablet ? 0.82 : isMobile ? 0.84 : 0.75

  return {
    x: se(spread, distance, (value) => value, 1, viewportWidth),
    y: se(spread, distance, (value) => -value, yMultiplier, viewportWidth),
    scale: index === activeIndex ? 1 : inactiveScale,
    zIndex: 100 - Math.abs(distance) + (index === activeIndex ? 50 : 0),
  }
}

/** Rabobank fade / spring easing */
export function sliderEasing(t: number): number {
  return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2
}

export function getSwipeThresholds(viewportWidth: number) {
  const isMobile = viewportWidth < MOBILE_BREAKPOINT
  return {
    offset: isMobile ? 32 : 50,
    velocity: isMobile ? 280 : 500,
  }
}
