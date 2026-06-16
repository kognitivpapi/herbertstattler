import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
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

function splitChars(text: string) {
  return Array.from(text)
}

export function HerbertLogoReveal({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <HerbertLogo />
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.022,
        delayChildren: 0.04,
      },
    },
  } as const

  const char = {
    hidden: { opacity: 0, x: -6, filter: 'blur(6px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)' },
  } as const

  const herbert = splitChars('HERBERT')
  const stattler = splitChars('STATTLER')

  return (
    <div className="home-wordmark" aria-hidden>
      <motion.div
        className="home-wordmark__line home-wordmark__line--top"
        variants={container}
        initial={false}
        animate={active ? 'show' : 'hidden'}
      >
        {herbert.map((c, i) => (
          <motion.span
            key={`h-${i}-${c}`}
            className="home-wordmark__char"
            variants={char}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {c}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="home-wordmark__line home-wordmark__line--bottom"
        variants={container}
        initial={false}
        animate={active ? 'show' : 'hidden'}
      >
        {stattler.map((c, i) => (
          <motion.span
            key={`s-${i}-${c}`}
            className="home-wordmark__char"
            variants={char}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {c}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
