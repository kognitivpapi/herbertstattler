/** Rabobank CollectionSlider spacing constant (Xe) */
const SPACING = 30
export const MOBILE_BREAKPOINT = 768

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
  const isLeftOfActive = index < activeIndex
  const yMultiplier = isMobile ? 0.15 : viewportHeight / viewportWidth
  const spread = isMobile ? (isLeftOfActive ? 0.42 : 0.12) : 0.27
  const distance = index - activeIndex
  const inactiveScale = isMobile ? 0.84 : 0.75

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
