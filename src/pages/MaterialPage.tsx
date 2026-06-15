import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MaterialScrollChapter } from '../components/MaterialScrollChapter'
import { StickyMenu } from '../components/StickyMenu'
import { materialDescription, materialSections } from '../data/material'
import '../styles/home.css'
import '../styles/material.css'

export function MaterialPage() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  return (
    <div className="material-page">
      <StickyMenu onNavigate={() => navigate('/')} />
      <main className="material-page__main">
        <div className="material-landing">
          <motion.header
            className="material-landing__header"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="material-page__title">Material</h1>

            <nav className="material-page__nav" aria-label="Material sections">
              {materialSections.map((section) => (
                <a
                  key={section.id}
                  className="material-page__nav-link"
                  href={`#material-${section.id}`}
                >
                  {section.shortLabel}
                </a>
              ))}
            </nav>

            <p className="material-page__description">{materialDescription}</p>
          </motion.header>
        </div>

        {materialSections.map((section, index) => (
          <MaterialScrollChapter key={section.id} section={section} index={index} />
        ))}
      </main>
    </div>
  )
}
