import { StickyMenu } from '../components/StickyMenu'
import { featuredExhibitions, groupExhibitions, soloExhibitions, type Exhibition } from '../data/exhibitions'
import '../styles/home.css'
import '../styles/exhibitions.css'

function ExhibitionCard({ exhibition }: { exhibition: Exhibition }) {
  return (
    <article className="exhibitions-card">
      {exhibition.imageUrl && (
        <figure className="exhibitions-card__figure">
          <img src={exhibition.imageUrl} alt={exhibition.title} loading="lazy" />
          {exhibition.imageCredit && (
            <figcaption className="exhibitions-card__credit">
              {exhibition.imageCredit}
            </figcaption>
          )}
        </figure>
      )}
      <div className="exhibitions-card__body">
        <p className="exhibitions-card__type">
          {exhibition.type === 'solo' ? 'Solo exhibition' : 'Group exhibition'}
        </p>
        <h2 className="exhibitions-card__title">{exhibition.title}</h2>
        <p className="exhibitions-card__meta">
          {exhibition.venue}
          <br />
          {exhibition.location}
          {exhibition.dates ? (
            <>
              <br />
              {exhibition.dates}
            </>
          ) : (
            <>
              <br />
              {exhibition.year}
            </>
          )}
        </p>
        {exhibition.description && (
          <p className="exhibitions-card__description">{exhibition.description}</p>
        )}
        {exhibition.sourceUrl && (
          <a
            className="exhibitions-card__link"
            href={exhibition.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            More information
          </a>
        )}
      </div>
    </article>
  )
}

function ExhibitionListItem({ exhibition }: { exhibition: Exhibition }) {
  return (
    <li className="exhibitions-list__item">
      <span className="exhibitions-list__title">{exhibition.title}</span>
      <span className="exhibitions-list__details">
        {exhibition.venue}; {exhibition.location}, {exhibition.year}
      </span>
    </li>
  )
}

export function ExhibitionsPage() {
  return (
    <div className="exhibitions-page">
      <StickyMenu />
      <main className="exhibitions-page__content">
        <header className="exhibitions-page__header">
          <h1 className="exhibitions-page__title">Exhibitions</h1>
          <p className="exhibitions-page__intro">
            Over the years, my drawings have found their way into galleries, museums,
            and book spaces across Europe and the United States. Below are the
            exhibitions that meant the most to me—starting with the most recent—with
            a few images and notes on what was shown.
          </p>
        </header>

        <section className="exhibitions-page__section" aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="exhibitions-page__section-title">
            Highlights
          </h2>
          <div className="exhibitions-page__featured">
            {featuredExhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
            ))}
          </div>
        </section>

        <section className="exhibitions-page__section" aria-labelledby="solo-heading">
          <h2 id="solo-heading" className="exhibitions-page__section-title">
            Solo exhibitions
          </h2>
          <ul className="exhibitions-list">
            {soloExhibitions.map((exhibition) => (
              <ExhibitionListItem key={exhibition.id} exhibition={exhibition} />
            ))}
          </ul>
        </section>

        <section className="exhibitions-page__section" aria-labelledby="group-heading">
          <h2 id="group-heading" className="exhibitions-page__section-title">
            Group exhibitions
          </h2>
          <ul className="exhibitions-list">
            {groupExhibitions.map((exhibition) => (
              <ExhibitionListItem key={exhibition.id} exhibition={exhibition} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
