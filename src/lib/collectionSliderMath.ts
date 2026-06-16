export const MOBILE_BREAKPOINT = 768
export const TABLET_MAX_BREAKPOINT = 1024
export const MOBILE_ITEM_GAP = 16
export const DESKTOP_ITEM_GAP = 30

export const MOBILE_CAROUSEL_SPRING = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 36,
  mass: 0.8,
}

export function getMobileItemStep(itemWidth: number): number {
  return itemWidth + MOBILE_ITEM_GAP
}

const MOBILE_ITEM_ASPECT = 1.2

/** Size carousel tiles to show the full active work while reserving fixed chrome rows. */
export function getMobileCarouselItemSize(
  viewportWidth: number,
  viewportHeight: number,
): number {
  const inset = 40
  const availableWidth = Math.max(0, viewportWidth - inset * 2)

  const titleChrome = 108
  const barChrome = 72
  const infoChrome = Math.min(Math.max(viewportHeight * 0.3, 148), 260)
  const verticalGap = 20

  const maxItemHeight = Math.max(
    0,
    viewportHeight - titleChrome - barChrome - infoChrome - verticalGap,
  )
  const widthFromHeight = maxItemHeight / MOBILE_ITEM_ASPECT
  const widthFromViewport = availableWidth * 0.58
  const raw = Math.min(widthFromViewport, widthFromHeight, 172)

  return Math.round(Math.max(104, raw))
}

export function getMobileCarouselItemHeight(itemWidth: number): number {
  return Math.round(itemWidth * MOBILE_ITEM_ASPECT)
}

export function isTabletViewport(viewportWidth: number): boolean {
  return (
    viewportWidth >= MOBILE_BREAKPOINT &&
    viewportWidth <= TABLET_MAX_BREAKPOINT
  )
}

/** Desktop / tablet carousel tile size based on available viewport space. */
export function getCarouselItemSize(
  viewportWidth: number,
  viewportHeight: number,
): number {
  if (viewportWidth < MOBILE_BREAKPOINT) {
    return getMobileCarouselItemSize(viewportWidth, viewportHeight)
  }

  const isTablet = isTabletViewport(viewportWidth)
  const horizontalInset = isTablet ? 160 : 156
  const widthFactor = isTablet ? 0.18 : 0.225
  const maxFromWidth = (viewportWidth - horizontalInset) * widthFactor

  const titleChrome = isTablet ? 108 : 96
  const infoChrome = isTablet
    ? Math.min(viewportHeight * (viewportHeight < 860 ? 0.26 : 0.32), 240)
    : Math.min(viewportHeight * 0.24, 220)
  const verticalInset = isTablet ? 72 : 56
  const maxFromHeight =
    (viewportHeight - titleChrome - infoChrome - verticalInset) / 1.2

  const cap = isTablet
    ? 168
    : viewportWidth >= 1200
      ? 318
      : viewportWidth >= 1024
        ? 278
        : 214

  const floor = isTablet ? 112 : 150
  const raw = Math.min(maxFromWidth, maxFromHeight, cap)

  return Math.round(Math.max(floor, raw))
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

export function getDesktopItemStep(itemSize: number): number {
  return itemSize + DESKTOP_ITEM_GAP
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
  const isTablet = isTabletViewport(viewportWidth)
  const distance = index - activeIndex
  const itemSize = getCarouselItemSize(viewportWidth, viewportHeight)
  const itemStep = getDesktopItemStep(itemSize)
  const inactiveScale = isTablet ? 0.8 : 0.75

  return {
    x: distance * itemStep,
    y: 0,
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
