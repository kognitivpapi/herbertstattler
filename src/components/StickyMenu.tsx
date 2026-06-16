import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, type Transition } from 'framer-motion'
import { HOME_HEADER_REVEAL_DURATION_MS } from '../lib/homeIntro'
import { ArrowIcon, CloseIcon, MenuIcon } from './icons'

const menuItems = [
  { label: 'Work', to: '/' },
  { label: 'Exhibitions', to: '/exhibitions' },
  { label: 'Material', to: '/material' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

const introRevealTransition: Transition = {
  duration: HOME_HEADER_REVEAL_DURATION_MS / 1000,
  ease: [0.22, 1, 0.36, 1],
}

interface StickyMenuProps {
  /** Work menu item on `/` — e.g. open Discover. */
  onNavigate?: () => void
  /** Reset landing page when already on `/` (close overlays, etc.). */
  onHomeReset?: () => void
  /** Fade/slide in during the one-time landing intro. */
  introReveal?: boolean
}

export function StickyMenu({ onNavigate, onHomeReset, introReveal = false }: StickyMenuProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const goToLanding = () => {
    setOpen(false)
    if (location.pathname === '/') {
      onHomeReset?.()
      return
    }
    navigate('/')
  }

  const handleMenuItem = (to: string) => {
    setOpen(false)
    if (to === '/') {
      onNavigate?.()
      return
    }
    navigate(to)
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
              Herbert Stattler
            </button>
            <span className="sticky-menu__sep">|</span>
            <button type="button" className="sticky-menu__home-link" onClick={goToLanding}>
              Home
            </button>
          </div>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
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
              className="sticky-menu-dropdown"
            >
              <ul>
                {menuItems.map(({ label, to }) => (
                  <li key={label}>
                    <button type="button" onClick={() => handleMenuItem(to)}>
                      {label}
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
