import { portfolioData } from '../data/portfolio'

/** Rabobank HomeCarousel: horizontal ring radius (from bundle constant TT) */
export const CAROUSEL_RADIUS = 8.7

/** Global scale for carousel planes — kept modest so corner nav labels stay clear */
export const CAROUSEL_ITEM_SCALE = 0.96

export const CAROUSEL_ITEMS = portfolioData

export const ITEM_COUNT = CAROUSEL_ITEMS.length

export function getItemAngle(index: number, count: number = ITEM_COUNT): number {
  return (index / count) * Math.PI * 2
}

export function getItemPosition(angle: number): [number, number, number] {
  return [
    Math.sin(angle) * CAROUSEL_RADIUS,
    0,
    Math.cos(angle) * CAROUSEL_RADIUS,
  ]
}

export function getItemRotation(angle: number): [number, number, number] {
  return [0, Math.PI / 2 + angle, 0]
}

export function getAspectScale(aspectRatio: number): [number, number, number] {
  const base =
    aspectRatio > 1
      ? [1, 1 / aspectRatio, 1]
      : [aspectRatio, 1, 1]

  return [
    base[0] * CAROUSEL_ITEM_SCALE,
    base[1] * CAROUSEL_ITEM_SCALE,
    base[2] * CAROUSEL_ITEM_SCALE,
  ]
}

/** Rabobank fade-in easing */
export function fadeInEasing(t: number): number {
  return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2
}

/** Seeded random 0–1 (matches Rabobank Qx helper) */
export function seededRandom(seed: number): number {
  let h = (1779033703 ^ seed) >>> 0
  const str = `6555705619766379${seed}`
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return function rand() {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }()
}
