import { motion, useReducedMotion } from 'framer-motion'
import { StickyMenu } from '../components/StickyMenu'
import {
  aboutBiography,
  aboutIntro,
  aboutNav,
  aboutPortrait,
  aboutSections,
  type AboutListSection,
} from '../data/about'
import '../styles/home.css'
import '../styles/pageLanding.css'
import '../styles/about.css'

function AboutList({ section }: { section: AboutListSection }) {
  return (
    <section
      id={`about-${section.id}`}
      className="about-page__section"
      aria-labelledby={`about-${section.id}-heading`}
    >
      <h2 id={`about-${section.id}-heading`} className="about-page__section-title">
        {section.title}
      </h2>
      <ul className="about-list">
        {section.items.map((item, index) => (
          <li key={index} className="about-list__item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function AboutPage() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="about-page">
      <StickyMenu />

      <main className="about-page__main">
        <div className="page-landing">
          <motion.header
            className="page-landing__header"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="page-landing__title">Biography</h1>

            <nav className="page-landing__nav" aria-label="Biography sections">
              {aboutNav.map((section) => (
                <a
                  key={section.id}
                  className="page-landing__nav-link"
                  href={`#about-${section.id}`}
                >
                  {section.shortLabel}
                </a>
              ))}
            </nav>

            <p className="page-landing__description">{aboutIntro}</p>
          </motion.header>
        </div>

        <div className="about-page__content">
          <figure className="about-page__portrait">
            <img src={aboutPortrait.imageUrl} alt={aboutPortrait.alt} loading="eager" />
            {aboutPortrait.credit && (
              <figcaption className="about-page__portrait-credit">
                {aboutPortrait.credit}
              </figcaption>
            )}
          </figure>

          <section
            id="about-biography"
            className="about-page__biography"
            aria-label="Biography"
          >
            {aboutBiography.map((paragraph, index) => (
              <p key={index} className="about-page__body">
                {paragraph}
              </p>
            ))}
          </section>

          {aboutSections.map((section) => (
            <AboutList key={section.id} section={section} />
          ))}
        </div>
      </main>
    </div>
  )
}
