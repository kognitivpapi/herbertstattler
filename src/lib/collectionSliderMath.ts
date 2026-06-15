/** Rabobank CollectionSlider spacing constant (Xe) */
const SPACING = 30
const MOBILE_BREAKPOINT = 768

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
  const yMultiplier = isMobile ? 0.5 : viewportHeight / viewportWidth
  const spread = isMobile ? (isLeftOfActive ? 0.75 : 0) : 0.27
  const distance = index - activeIndex

  return {
    x: se(spread, distance, (value) => value, 1, viewportWidth),
    y: se(spread, distance, (value) => -value, yMultiplier, viewportWidth),
    scale: index === activeIndex ? 1 : 0.75,
    zIndex: 100 - index,
  }
}

/** Rabobank fade / spring easing */
export function sliderEasing(t: number): number {
  return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2
}
