import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion, type Transition } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { HOME_HEADER_REVEAL_DURATION_MS } from '../lib/homeIntro'
import { getNavContextLabel } from '../lib/navContextLabel'
import { ArrowIcon, CloseIcon, MenuIcon } from './icons'

const otherMenuItems = [
  { label: 'Exhibitions', to: '/exhibitions' },
  { label: 'Material', to: '/material' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

const introRevealTransition: Transition = {
  duration: HOME_HEADER_REVEAL_DURATION_MS / 1000,
  ease: [0.22, 1, 0.36, 1],
}

function splitChars(text: string) {
  return Array.from(text)
}

function TitleReveal({
  text,
  active,
}: {
  text: string
  active: boolean
}) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion || !active) return <>{text}</>

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.08,
      },
    },
  } as const

  const char = {
    hidden: { opacity: 0, x: -6, filter: 'blur(6px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)' },
  } as const

  return (
    <motion.span
      aria-label={text}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: 'inline-flex' }}
    >
      {splitChars(text).map((c, i) => (
        <motion.span
          key={`${text}-${i}-${c}`}
          variants={char}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface StickyMenuProps {
  /** Reset landing page when already on `/` (close overlays, etc.). */
  onHomeReset?: () => void
  /** Fade/slide in during the one-time landing intro. */
  introReveal?: boolean
  /** Override auto-detected page label after "Herbert Stattler". */
  contextLabel?: string
}

export function StickyMenu({
  onHomeReset,
  introReveal = false,
  contextLabel: contextLabelOverride,
}: StickyMenuProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { workId } = useParams<{ workId: string }>()
  const [open, setOpen] = useState(false)
  const [workMenuOpen, setWorkMenuOpen] = useState(false)

  const contextLabel =
    contextLabelOverride ?? getNavContextLabel(location.pathname, workId)

  const closeMenu = () => {
    setOpen(false)
    setWorkMenuOpen(false)
  }

  const goToLanding = () => {
    closeMenu()
    if (location.pathname === '/') {
      onHomeReset?.()
      return
    }
    navigate('/')
  }

  const handleMenuItem = (to: string) => {
    closeMenu()
    navigate(to)
  }

  const handleWorkSelect = (id: string, index: number) => {
    closeMenu()
    navigate(`/work/${id}`, {
      state: { fromMenu: true, discoverIndex: index },
    })
  }

  const toggleMenu = () => {
    setOpen((value) => {
      if (value) setWorkMenuOpen(false)
      return !value
    })
  }

  return (
    <motion.header
      className="sticky-menu-wrap"
      initial={introReveal ? { opacity: 0, y: -14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={introReveal ? introRevealTransition : { duration: 0 }}
    >
      <div className="sticky-menu-shadow" aria-hidden />
      <div className="sticky-menu-inner">
        <nav className="sticky-menu">
          <div className="sticky-menu__title">
            <button type="button" className="sticky-menu__home-link" onClick={goToLanding}>
              <TitleReveal text="Herbert Stattler" active={introReveal} />
            </button>
            <span className="sticky-menu__sep">|</span>
            <span className="sticky-menu__context" aria-current="page">
              <TitleReveal text={contextLabel} active={introReveal} />
            </span>
          </div>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={toggleMenu}
            className="sticky-menu__toggle"
          >
            <span className={open ? 'hidden' : ''}>Menu</span>
            <span className={open ? '' : 'hidden'}>Close</span>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`sticky-menu-dropdown${workMenuOpen ? ' sticky-menu-dropdown--work-open' : ''}`}
            >
              <div className="sticky-menu-dropdown__viewport">
                <div className="sticky-menu-dropdown__panel">
                  <ul>
                    <li>
                      <button
                        type="button"
                        aria-expanded={workMenuOpen}
                        onClick={() => setWorkMenuOpen(true)}
                      >
                        Work
                        <ArrowIcon />
                      </button>
                    </li>
                    {otherMenuItems.map(({ label, to }) => (
                      <li key={label}>
                        <button type="button" onClick={() => handleMenuItem(to)}>
                          {label}
                          <ArrowIcon />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sticky-menu-dropdown__panel sticky-menu-dropdown__panel--works">
                  <button
                    type="button"
                    className="sticky-menu-dropdown__back"
                    onClick={() => setWorkMenuOpen(false)}
                  >
                    <ArrowIcon className="sticky-menu-dropdown__back-icon" />
                    Work
                  </button>
                  <ul className="sticky-menu-dropdown__work-list">
                    {portfolioData.map((item, index) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`sticky-menu-dropdown__work-item${
                            workId === item.id ? ' sticky-menu-dropdown__work-item--active' : ''
                          }`}
                          onClick={() => handleWorkSelect(item.id, index)}
                        >
                          <span className="sticky-menu-dropdown__work-title">{item.title}</span>
                          <span className="sticky-menu-dropdown__work-year">{item.year}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
