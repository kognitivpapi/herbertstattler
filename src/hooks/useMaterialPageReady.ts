import { useEffect, useState } from 'react'

const MIN_LOADING_MS = 1400

function preloadImages(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const image = new Image()
          image.onload = () => resolve()
          image.onerror = () => resolve()
          image.src = url
        }),
    ),
  ).then(() => undefined)
}

export type MaterialLoadingPhase = 'loading' | 'exiting' | 'done'

export function useMaterialPageReady(imageUrls: string[]): MaterialLoadingPhase {
  const [assetsReady, setAssetsReady] = useState(false)
  const [minElapsed, setMinElapsed] = useState(false)
  const [phase, setPhase] = useState<MaterialLoadingPhase>('loading')

  useEffect(() => {
    let cancelled = false
    preloadImages(imageUrls).then(() => {
      if (!cancelled) setAssetsReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [imageUrls])

  useEffect(() => {
    const timer = window.setTimeout(() => setMinElapsed(true), MIN_LOADING_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!assetsReady || !minElapsed || phase !== 'loading') return

    setPhase('exiting')
    const timer = window.setTimeout(() => setPhase('done'), 700)
    return () => window.clearTimeout(timer)
  }, [assetsReady, minElapsed, phase])

  return phase
}
