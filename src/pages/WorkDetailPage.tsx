import { useMemo } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { DiscoverBackButton } from '../components/DiscoverBackButton'
import { StickyMenu } from '../components/StickyMenu'
import { WorkDialogue } from '../components/WorkDialogue'
import { portfolioData } from '../data/portfolio'
import { getWorkDetail } from '../data/workDetails'
import type { DiscoverNavigationState } from '../lib/discoverNavigation'
import { splitWorkTitle, martinBauerSubtitleParts } from '../lib/splitWorkTitle'
import '../styles/home.css'
import '../styles/discover.css'
import '../styles/work.css'

function decodeText(text: string) {
  return text
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function resolveDiscoverIndex(
  workId: string | undefined,
  state: DiscoverNavigationState | null,
): number {
  if (typeof state?.discoverIndex === 'number') return state.discoverIndex
  if (!workId) return 0
  const index = portfolioData.findIndex((item) => item.id === workId)
  return index >= 0 ? index : 0
}

export function WorkDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { workId } = useParams<{ workId: string }>()
  const work = workId ? getWorkDetail(workId) : undefined
  const navigationState = location.state as DiscoverNavigationState | null

  const discoverIndex = useMemo(
    () => resolveDiscoverIndex(workId, navigationState),
    [workId, navigationState],
  )

  const openDiscover = () => navigate('/', { state: { discover: true } })
  const backToDiscover = () =>
    navigate('/', { state: { discover: true, discoverIndex } })

  if (!work) {
    return (
      <div className="work-page">
        <StickyMenu onNavigate={openDiscover} />
        <DiscoverBackButton onClick={backToDiscover} />
        <main className="work-page__content">
          <p className="work-page__body">Work not found.</p>
          <Link to="/" className="work-page__back">
            Back to home
          </Link>
        </main>
      </div>
    )
  }

  const { name: titleName, year: titleYear } = splitWorkTitle(work.title)

  return (
    <div className="work-page">
      <StickyMenu onNavigate={openDiscover} />
      <DiscoverBackButton onClick={backToDiscover} />
      <main className="work-page__content">
        <header className="work-page__header">
          <h1 className="work-page__title">
            <span className="work-page__title-name">{decodeText(titleName)}</span>
            {titleYear && (
              <span className="work-page__title-year">{decodeText(titleYear)}</span>
            )}
          </h1>
          {work.subtitle && (
            <h2 className="work-page__subtitle">
              {martinBauerSubtitleParts[work.id] ? (
                <>
                  <span className="work-page__subtitle-muted">
                    {decodeText(martinBauerSubtitleParts[work.id].lead)}
                  </span>
                  <span className="work-page__subtitle-muted">
                    {decodeText(martinBauerSubtitleParts[work.id].muted)}
                  </span>
                </>
              ) : (
                decodeText(work.subtitle)
              )}
            </h2>
          )}
        </header>

        <div className="work-page__text">
          {work.contentType === 'dialogue' ? (
            <WorkDialogue paragraphs={work.paragraphs} />
          ) : (
            work.paragraphs.map((paragraph, index) => (
              <p key={index} className="work-page__body">
                {decodeText(paragraph)}
              </p>
            ))
          )}
        </div>

        {work.gallery.length > 0 && (
          <section className="work-page__gallery" aria-label="Work images">
            {work.gallery.map((item, index) => (
              <figure key={`${item.src}-${index}`} className="work-page__figure">
                <img
                  src={item.src}
                  alt={item.caption || work.title}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  className="work-page__image"
                />
                {item.caption && (
                  <figcaption className="work-page__caption">
                    {decodeText(item.caption)}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        )}

        {work.footerNote && (
          <p className="work-page__footer-note">{decodeText(work.footerNote)}</p>
        )}
      </main>
    </div>
  )
}
