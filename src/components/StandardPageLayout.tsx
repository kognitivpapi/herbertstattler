import type { ReactNode } from 'react'
import { StickyMenu } from './StickyMenu'
import '../styles/standardPage.css'

export interface StandardPageHeroImage {
  src: string
  alt: string
  credit?: string
}

export function StandardPageLayout({
  className,
  heroImage,
  header,
  children,
}: {
  className?: string
  heroImage?: StandardPageHeroImage
  header: ReactNode
  children: ReactNode
}) {
  return (
    <div className={['standard-page', className].filter(Boolean).join(' ')}>
      <StickyMenu />
      <main className="standard-page__main">
        <div className="standard-page__top">
          {heroImage && (
            <figure className="standard-page__hero">
              <img
                className="standard-page__hero-image"
                src={heroImage.src}
                alt={heroImage.alt}
                loading="eager"
              />
              {heroImage.credit && (
                <figcaption className="standard-page__hero-credit">
                  {heroImage.credit}
                </figcaption>
              )}
            </figure>
          )}

          <header className="standard-page__header">{header}</header>
        </div>

        <div className="standard-page__body">{children}</div>
      </main>
    </div>
  )
}

