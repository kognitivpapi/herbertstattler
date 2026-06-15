import { useNavigate } from 'react-router-dom'
import { DiscoverButton, GridLink, HerbertLogo } from './GridLink'

interface HomeGridProps {
  onDiscover: () => void
}

export function HomeGrid({ onDiscover }: HomeGridProps) {
  const navigate = useNavigate()

  return (
    <div className="home-shell">
      <div className="home-grid">
        <div className="home-content">
          <div className="home-logo">
            <HerbertLogo />
          </div>

          <GridLink
            label="Exhibitions"
            variant="stories"
            onClick={() => navigate('/exhibitions')}
          />
          <GridLink label="Contact" variant="exhibition" onClick={() => navigate('/contact')} />
          <GridLink label="Material" variant="artlab" onClick={() => navigate('/material')} />
          <GridLink label="About" variant="about" onClick={() => navigate('/about')} />

          <div className="home-middle">
            <p className="home-tagline">
              Drawings dealing with everyday topics
            </p>
            <DiscoverButton onClick={onDiscover} />
          </div>
        </div>
      </div>
    </div>
  )
}
