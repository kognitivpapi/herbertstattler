import type { MaterialSection } from '../data/material'
import { MaterialCard } from './MaterialCard'

interface MaterialScrollChapterProps {
  section: MaterialSection
  index: number
}

export function MaterialScrollChapter({ section, index }: MaterialScrollChapterProps) {
  return (
    <section
      className={`material-chapter material-chapter--${section.id}`}
      id={`material-${section.id}`}
      aria-labelledby={`material-${section.id}-title`}
    >
      <div
        className="material-chapter__backdrop"
        style={{
          backgroundImage: `url(${section.sceneImage})`,
          backgroundPosition: section.scenePosition ?? 'center',
        }}
        aria-hidden
      />
      <div className="material-chapter__overlay">
        <MaterialCard section={section} index={index} />
      </div>
    </section>
  )
}
