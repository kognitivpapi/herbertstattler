import type { MaterialSection } from '../data/material'

interface MaterialCardProps {
  section: MaterialSection
  index: number
  titleId?: string
  className?: string
}

export function MaterialCard({ section, index, titleId, className = '' }: MaterialCardProps) {
  return (
    <article
      className={`material-card ${className}`.trim()}
      aria-labelledby={titleId ?? `material-${section.id}-title`}
    >
      <p className="material-card__index" aria-hidden>
        {String(index + 1).padStart(2, '0')}
      </p>
      <h2 id={titleId ?? `material-${section.id}-title`} className="material-card__title">
        {section.title}
      </h2>
      <div className="material-card__body">
        {section.paragraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
