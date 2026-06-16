import { Link } from 'react-router-dom'
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
import {
  aboutShopBooks,
  aboutShopGalleries,
  aboutShopIntro,
} from '../data/aboutShopping'
import '../styles/home.css'
import '../styles/pageLanding.css'
import '../styles/about.css'

function AboutShop() {
  return (
    <section
      id="about-shop"
      className="about-page__section about-page__shop"
      aria-labelledby="about-shop-heading"
    >
      <h2 id="about-shop-heading" className="about-page__section-title">
        Shop
      </h2>
      <p className="about-page__shop-intro">{aboutShopIntro}</p>

      <h3 className="about-page__shop-group-title">Books</h3>
      <ul className="about-shop-list">
        {aboutShopBooks.map((book) => (
          <li key={book.id} className="about-shop-list__item">
            <div className="about-shop-list__main">
              <a
                className="about-shop-list__link"
                href={book.shopUrl}
                target="_blank"
                rel="noreferrer"
              >
                {book.title}
              </a>
              <p className="about-shop-list__meta">
                {book.publisher} · {book.detail}
              </p>
            </div>
            {book.workId && (
              <Link className="about-shop-list__work-link" to={`/work/${book.workId}`}>
                View work
              </Link>
            )}
          </li>
        ))}
      </ul>

      <h3 className="about-page__shop-group-title">Galleries</h3>
      <ul className="about-shop-list">
        {aboutShopGalleries.map((gallery) => (
          <li key={gallery.id} className="about-shop-list__item">
            <div className="about-shop-list__main">
              <a
                className="about-shop-list__link"
                href={gallery.url}
                target="_blank"
                rel="noreferrer"
              >
                {gallery.name}
              </a>
              <p className="about-shop-list__meta">
                {gallery.location} · {gallery.note}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

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

          <AboutShop />

          {aboutSections.map((section) => (
            <AboutList key={section.id} section={section} />
          ))}
        </div>
      </main>
    </div>
  )
}
