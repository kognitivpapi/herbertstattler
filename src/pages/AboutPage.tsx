import { useNavigate } from 'react-router-dom'
import { StickyMenu } from '../components/StickyMenu'
import {
  aboutBiography,
  aboutIntro,
  aboutPortrait,
  aboutSections,
  type AboutListSection,
} from '../data/about'
import '../styles/home.css'
import '../styles/about.css'

function AboutList({ section }: { section: AboutListSection }) {
  return (
    <section className="about-page__section" aria-labelledby={`about-${section.id}`}>
      <h2 id={`about-${section.id}`} className="about-page__section-title">
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
  const navigate = useNavigate()

  return (
    <div className="about-page">
      <StickyMenu onNavigate={() => navigate('/')} />

      <div className="about-page__hero" aria-label="Portrait">
        <div className="about-page__hero-scrim" aria-hidden />
        <figure className="about-page__portrait">
          <img src={aboutPortrait.imageUrl} alt={aboutPortrait.alt} loading="eager" />
          {aboutPortrait.credit && (
            <figcaption className="about-page__portrait-credit">
              {aboutPortrait.credit}
            </figcaption>
          )}
        </figure>
      </div>

      <main className="about-page__main">
        <div className="about-page__content">
          <header className="about-page__header">
            <h1 className="about-page__title">Biography</h1>
            <p className="about-page__intro">{aboutIntro}</p>
          </header>

          <section className="about-page__biography" aria-label="Biography">
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
