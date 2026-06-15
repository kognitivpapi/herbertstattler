import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowIcon, CloseIcon, MenuIcon } from './icons'

const menuItems = [
  { label: 'Work', to: '/' },
  { label: 'Exhibitions', to: '/exhibitions' },
  { label: 'Material', to: '/material' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

interface StickyMenuProps {
  /** Work menu item on `/` — e.g. open Discover. */
  onNavigate?: () => void
  /** Reset landing page when already on `/` (close overlays, etc.). */
  onHomeReset?: () => void
}

export function StickyMenu({ onNavigate, onHomeReset }: StickyMenuProps) {
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
    <header className="sticky-menu-wrap">
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
    </header>
  )
}
