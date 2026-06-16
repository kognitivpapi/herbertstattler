import { motion, type HTMLMotionProps } from 'framer-motion'
import { ArrowIcon } from './icons'

type GridLinkProps = {
  label: string
  variant: 'stories' | 'exhibition' | 'artlab' | 'about'
  onClick?: () => void
} & Pick<HTMLMotionProps<'button'>, 'variants' | 'animate' | 'initial' | 'transition'>

const variantClass: Record<GridLinkProps['variant'], string> = {
  stories:
    'home-link home-link--stories col-start-1 row-start-1 flex-row-reverse',
  exhibition: 'home-link home-link--exhibition col-start-3 row-start-1 justify-self-end',
  artlab:
    'home-link home-link--artlab col-start-3 row-start-5 justify-self-end self-end',
  about: 'home-link home-link--about col-start-1 row-start-5 self-end',
}

export function GridLink({ label, variant, onClick, ...motionProps }: GridLinkProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${variantClass[variant]} group`}
      {...motionProps}
    >
      <span className="home-link__icon" aria-hidden>
        <ArrowIcon />
      </span>
      <span className="home-link__label">{label}</span>
    </motion.button>
  )
}

export function DiscoverButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="discover-btn group">
      <span className="discover-btn__icon" aria-hidden>
        <ArrowIcon />
      </span>
      <span>Discover</span>
    </button>
  )
}

export function HerbertLogo() {
  return (
    <svg
      viewBox="0 0 900 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      aria-hidden
    >
      <text
        x="0"
        y="72"
        fill="currentColor"
        fontFamily="Inter, sans-serif"
        fontWeight="900"
        fontSize="86"
        letterSpacing="-1"
      >
        HERBERT
      </text>
      <text
        x="0"
        y="158"
        fill="currentColor"
        fontFamily="Inter, sans-serif"
        fontWeight="900"
        fontSize="86"
        letterSpacing="6"
      >
        STATTLER
      </text>
    </svg>
  )
}
