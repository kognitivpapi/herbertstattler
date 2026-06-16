import { Suspense, useRef, useMemo, useState, useEffect, useSyncExternalStore } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera, PerformanceMonitor, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { PortfolioItem } from '../data/portfolio'
import {
  CAROUSEL_ITEMS,
  fadeInEasing,
  getAspectScale,
  getItemAngle,
  getItemPosition,
  getItemRotation,
  seededRandom,
} from '../lib/carouselMath'
import { clamp01, getIntroStartPose } from '../lib/homeIntro'

const MOBILE_BREAKPOINT = 768
const FADE_DURATION = 1.25

function subscribeVisibility(cb: () => void) {
  document.addEventListener('visibilitychange', cb)
  return () => document.removeEventListener('visibilitychange', cb)
}

function getVisibility() {
  return document.visibilityState === 'visible'
}

function usePageVisible() {
  return useSyncExternalStore(subscribeVisibility, getVisibility, () => true)
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

function getTextureAspect(texture: THREE.Texture, fallback: number): number {
  const image = texture.image as { width?: number; height?: number } | undefined
  if (image?.width && image?.height) {
    return image.width / image.height
  }
  return fallback
}

function CarouselItem({
  index,
  visible,
  item,
  texture,
  introProgress,
}: {
  index: number
  visible: boolean
  item: PortfolioItem
  texture: THREE.Texture
  introProgress: number
}) {
  const material = useRef<THREE.MeshBasicMaterial>(null)
  const aspect = getTextureAspect(texture, item.aspectRatio)
  const scale = useMemo(() => getAspectScale(aspect), [aspect])
  const angle = getItemAngle(index)
  const position = getItemPosition(angle)
  const rotation = getItemRotation(angle)
  const startPose = useMemo(() => getIntroStartPose(index), [index])
  const intro = clamp01(introProgress)
  const eased = intro * intro
  const easedScale = intro < 0.85 ? intro * 0.95 : 0.8075 + (intro - 0.85) / 0.15 * 0.1925
  const flyPos = useMemo(() => {
    const target = new THREE.Vector3(position[0], position[1], position[2])
    return startPose.position.clone().lerp(target, eased)
  }, [eased, position, startPose.position])
  const flyRot = useMemo(() => {
    const target = new THREE.Euler(rotation[0], rotation[1], rotation[2])
    return new THREE.Euler(
      THREE.MathUtils.lerp(startPose.rotation.x, target.x, eased),
      THREE.MathUtils.lerp(startPose.rotation.y, target.y, eased),
      THREE.MathUtils.lerp(startPose.rotation.z, target.z, eased),
    )
  }, [eased, rotation, startPose.rotation])
  const flyScale = useMemo(() => {
    const k = clamp01(easedScale)
    return [scale[0] * k, scale[1] * k, scale[2] * k] as [number, number, number]
  }, [easedScale, scale])
  const fadeDelay = useMemo(() => seededRandom(index) * 0.01, [index])
  const elapsed = useRef(0)
  const opacity = useRef(0)

  useFrame((_, delta) => {
    if (!material.current || !visible) return

    if (opacity.current < 1) {
      elapsed.current += delta
      const t = Math.min(1, Math.max(0, (elapsed.current - fadeDelay) / FADE_DURATION))
      opacity.current = fadeInEasing(t)
      material.current.opacity = opacity.current
    }
  })

  return (
    <group position={flyPos} rotation={flyRot}>
      <mesh scale={flyScale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={material}
          map={texture}
          transparent
          side={THREE.DoubleSide}
          toneMapped={false}
          opacity={0}
        />
      </mesh>
    </group>
  )
}

function CarouselRing({
  visible,
  allowRotation,
  introProgress,
}: {
  visible: boolean
  allowRotation: boolean
  introProgress: number
}) {
  const group = useRef<THREE.Group>(null)
  const imageUrls = useMemo(() => CAROUSEL_ITEMS.map((item) => item.imageUrl), [])
  const textures = useTexture(imageUrls)
  const isMobile = useIsMobile()

  useFrame((_, delta) => {
    if (!group.current || !visible) return
    if (allowRotation) group.current.rotation.y += delta / 15
  })

  return (
    <group ref={group} position={[0, isMobile ? -0.25 : -0.4, 0]}>
      {CAROUSEL_ITEMS.map((entry, i) => (
        <CarouselItem
          key={entry.id}
          index={i}
          visible={visible}
          item={entry}
          texture={textures[i]}
          introProgress={introProgress}
        />
      ))}
    </group>
  )
}

function CarouselCamera({ visible }: { visible: boolean }) {
  const { camera, pointer, size, viewport } = useThree()
  const targetZoom = useRef(50)
  const targetPos = useRef(new THREE.Vector3(0, 4.5, 9))
  const isMobile = useIsMobile()

  useFrame((_, delta) => {
    if (!visible || !(camera instanceof THREE.OrthographicCamera)) return

    if (isMobile) {
      targetZoom.current = (40 * Math.min(size.width, 1800)) / 1000
      targetPos.current.set(pointer.x * 0.4, pointer.y * 0.16 + 4.5, 9)
    } else {
      const { width } = viewport.getCurrentViewport(camera)
      targetZoom.current = Math.round(width * 2.9)
      targetPos.current.set(0, 4.5, 9)
    }

    camera.zoom = THREE.MathUtils.lerp(camera.zoom, targetZoom.current, 0.05)
    camera.position.lerp(targetPos.current, delta)
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  })

  return (
    <OrthographicCamera makeDefault position={[0, 4.5, 9]} zoom={50} />
  )
}

function CarouselScene({
  allowRotation,
  introProgress,
  active,
}: {
  allowRotation: boolean
  introProgress: number
  active: boolean
}) {
  const visible = usePageVisible()

  return (
    <>
      <CarouselCamera visible={visible && active} />
      <CarouselRing
        visible={visible && active}
        allowRotation={allowRotation}
        introProgress={introProgress}
      />
    </>
  )
}

export function HomeCarousel({
  introProgress = 1,
  allowRotation = true,
  active = true,
}: {
  introProgress?: number
  allowRotation?: boolean
  active?: boolean
}) {
  const [dpr, setDpr] = useState(2)

  return (
    <div className="home-carousel">
      <Canvas
        orthographic
        dpr={dpr}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0xffffff, 1)
        }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        />
        <Suspense fallback={null}>
          <CarouselScene
            allowRotation={allowRotation}
            introProgress={introProgress}
            active={active}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
