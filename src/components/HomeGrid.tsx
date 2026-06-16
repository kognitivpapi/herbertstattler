import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DiscoverButton, GridLink, HerbertLogo } from './GridLink'

interface HomeGridProps {
  visible: boolean
  onDiscover: () => void
}

export function HomeGrid({ visible, onDiscover }: HomeGridProps) {
  const navigate = useNavigate()

  const stagger = 0.11
  const base = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  } as const

  return (
    <div className="home-shell">
      <div className="home-grid">
        <motion.div
          className="home-content"
          initial={false}
          animate={visible ? 'show' : 'hidden'}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="home-logo"
            variants={base}
            transition={{ duration: 0.45, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <HerbertLogo />
          </motion.div>

          <motion.div
            variants={base}
            transition={{ duration: 0.45, delay: 0.15 + stagger * 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <GridLink
              label="Exhibitions"
              variant="stories"
              onClick={() => navigate('/exhibitions')}
            />
          </motion.div>
          <motion.div
            variants={base}
            transition={{ duration: 0.45, delay: 0.15 + stagger * 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <GridLink label="Contact" variant="exhibition" onClick={() => navigate('/contact')} />
          </motion.div>
          <motion.div
            variants={base}
            transition={{ duration: 0.45, delay: 0.15 + stagger * 2, ease: [0.22, 1, 0.36, 1] }}
          >
            <GridLink label="Material" variant="artlab" onClick={() => navigate('/material')} />
          </motion.div>
          <motion.div
            variants={base}
            transition={{ duration: 0.45, delay: 0.15 + stagger * 3, ease: [0.22, 1, 0.36, 1] }}
          >
            <GridLink label="About" variant="about" onClick={() => navigate('/about')} />
          </motion.div>

          <motion.div
            className="home-middle"
            variants={base}
            transition={{ duration: 0.45, delay: 0.15 + stagger * 4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="home-tagline">Drawings dealing with everyday topics</p>
            <DiscoverButton onClick={onDiscover} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
