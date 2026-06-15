import { useEffect, useState } from 'react'
import { removeWhiteBackground } from '../lib/removeWhiteBackground'

interface DiscoverWorkImageProps {
  src: string
  alt: string
}

export function DiscoverWorkImage({ src, alt }: DiscoverWorkImageProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(() =>
    src.endsWith('.svg') ? src : null,
  )

  useEffect(() => {
    let cancelled = false

    removeWhiteBackground(src)
      .then((url) => {
        if (!cancelled) setProcessedSrc(url)
      })
      .catch(() => {
        if (!cancelled) setProcessedSrc(src)
      })

    return () => {
      cancelled = true
    }
  }, [src])

  if (!processedSrc) {
    return <span className="discover-page__item-loading" aria-hidden />
  }

  return <img src={processedSrc} alt={alt} draggable={false} />
}
