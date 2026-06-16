import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DiscoverButton, GridLink, HerbertLogoReveal } from './GridLink'

interface HomeGridProps {
  visible: boolean
  onDiscover: () => void
}

export function HomeGrid({ visible, onDiscover }: HomeGridProps) {
  const navigate = useNavigate()

  const ease = [0.22, 1, 0.36, 1] as const
  const stagger = 0.13
  const revealDuration = 0.6
  const base = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  } as const

  const logoVisible = visible

  const reveal = (index: number) => ({
    initial: false as const,
    animate: visible ? ('show' as const) : ('hidden' as const),
    variants: base,
    transition: { duration: revealDuration, delay: 0.2 + stagger * index, ease },
  })

  return (
    <div className="home-shell">
      <div className="home-grid">
        <div className="home-content">
          <motion.div
            className="home-logo"
            initial={false}
            animate={logoVisible ? 'show' : 'hidden'}
            variants={base}
            transition={{ duration: 0.7, delay: 0.0, ease }}
          >
            <HerbertLogoReveal active={logoVisible} />
          </motion.div>

          <GridLink
            label="Exhibitions"
            variant="stories"
            onClick={() => navigate('/exhibitions')}
            {...reveal(1)}
          />
          <GridLink
            label="Contact"
            variant="exhibition"
            onClick={() => navigate('/contact')}
            {...reveal(2)}
          />
          <GridLink
            label="Material"
            variant="artlab"
            onClick={() => navigate('/material')}
            {...reveal(3)}
          />
          <GridLink
            label="About"
            variant="about"
            onClick={() => navigate('/about')}
            {...reveal(4)}
          />

          <motion.div className="home-middle" {...reveal(5)}>
            <p className="home-tagline">Drawings dealing with everyday topics</p>
            <DiscoverButton onClick={onDiscover} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
