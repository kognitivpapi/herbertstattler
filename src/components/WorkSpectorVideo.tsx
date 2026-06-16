import { useEffect, useRef, useState } from 'react'

interface WorkSpectorVideoProps {
  videoId: string
  title: string
}

function buildEmbedSrc(videoId: string, autoplay: boolean) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })

  if (autoplay) {
    params.set('autoplay', '1')
    params.set('mute', '1')
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}

export function WorkSpectorVideo({ videoId, title }: WorkSpectorVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    const element = frameRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAutoplay(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <figure className="work-page__video" ref={frameRef}>
      <div className="work-page__video-frame">
        <iframe
          title={title}
          src={buildEmbedSrc(videoId, autoplay)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </figure>
  )
}
