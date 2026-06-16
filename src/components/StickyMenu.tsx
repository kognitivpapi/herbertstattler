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

const submenuTransition: Transition = {
  duration: 0.28,
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
  /** Open the work overview (Discover) when already on `/`. */
  onWorkNavigate?: () => void
  /** Reset landing page when already on `/` (close overlays, etc.). */
  onHomeReset?: () => void
  /** Fade/slide in during the one-time landing intro. */
  introReveal?: boolean
  /** Override auto-detected page label after "Herbert Stattler". */
  contextLabel?: string
}

export function StickyMenu({
  onWorkNavigate,
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

  const goToWorkPage = () => {
    closeMenu()
    if (location.pathname === '/') {
      onWorkNavigate?.()
      return
    }
    navigate('/', { state: { discover: true } })
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

  const toggleWorkList = () => {
    setWorkMenuOpen((value) => !value)
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
            <span className="sticky-menu__context" aria-current="page" title={contextLabel}>
              {contextLabel}
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
              <ul>
                <li className="sticky-menu-dropdown__item sticky-menu-dropdown__item--work">
                  <div className="sticky-menu-dropdown__split">
                    <button
                      type="button"
                      className="sticky-menu-dropdown__split-label"
                      onClick={goToWorkPage}
                    >
                      Work
                    </button>
                    <button
                      type="button"
                      className="sticky-menu-dropdown__split-arrow"
                      aria-expanded={workMenuOpen}
                      aria-label="Browse individual works"
                      onClick={toggleWorkList}
                    >
                      <ArrowIcon />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {workMenuOpen && (
                      <motion.div
                        className="sticky-menu-dropdown__work-submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={submenuTransition}
                      >
                        <ul className="sticky-menu-dropdown__work-list">
                          {portfolioData.map((item, index) => (
                            <li key={item.id}>
                              <button
                                type="button"
                                className={`sticky-menu-dropdown__work-item${
                                  workId === item.id
                                    ? ' sticky-menu-dropdown__work-item--active'
                                    : ''
                                }`}
                                onClick={() => handleWorkSelect(item.id, index)}
                              >
                                <span className="sticky-menu-dropdown__work-title">
                                  {item.title}
                                </span>
                                <span className="sticky-menu-dropdown__work-year">
                                  {item.year}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {otherMenuItems.map(({ label, to }) => (
                  <li key={label} className="sticky-menu-dropdown__item">
                    <button type="button" onClick={() => handleMenuItem(to)}>
                      <span className="sticky-menu-dropdown__label">{label}</span>
                      <ArrowIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
