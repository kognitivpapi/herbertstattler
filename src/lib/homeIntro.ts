import * as THREE from 'three'
import { CAROUSEL_RADIUS, seededRandom } from './carouselMath'

export const HOME_INTRO_STORAGE_KEY = 'hs_home_intro_done'
export const HOME_INTRO_DURATION_MS = 3000
// Keep the start "carousel-only" — UI appears late.
export const HOME_HEADER_REVEAL_AT = 0.92
export const HOME_HEADER_REVEAL_DURATION_MS = 2000
export const HOME_TEXT_REVEAL_AT = 0.94

export function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Deterministic "random" start pose far from the carousel ring.
 * Kept outside the central area to avoid visual crowding during fly-in.
 */
export function getIntroStartPose(index: number) {
  const r1 = seededRandom(index + 11)
  const r2 = seededRandom(index + 101)
  const r3 = seededRandom(index + 1001)

  const radius = CAROUSEL_RADIUS * (1.8 + r1 * 0.7)
  const angle = r2 * Math.PI * 2

  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  const y = (r3 - 0.5) * 5.5

  const yaw = (r1 - 0.5) * 0.45

  return {
    position: new THREE.Vector3(x, y, z),
    rotation: new THREE.Euler(0, yaw, 0),
  }
}

