import { motion, useReducedMotion } from 'framer-motion'

interface MaterialLoadingScreenProps {
  exiting: boolean
}

export function MaterialLoadingScreen({ exiting }: MaterialLoadingScreenProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="material-loading"
      role="status"
      aria-live="polite"
      aria-label="Loading material page"
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: reducedMotion ? 0.15 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="material-loading__frame">
        <svg
          className="material-loading__svg"
          viewBox="0 0 240 300"
          aria-hidden
          focusable="false"
        >
          <rect
            className="material-loading__paper"
            x="28"
            y="16"
            width="184"
            height="268"
            rx="1"
          />

          <line
            className="material-loading__stroke material-loading__stroke--hatch"
            style={{ animationDelay: '0.15s' }}
            x1="48"
            y1="92"
            x2="168"
            y2="92"
            pathLength={1}
          />
          <line
            className="material-loading__stroke material-loading__stroke--hatch"
            style={{ animationDelay: '0.28s' }}
            x1="48"
            y1="108"
            x2="152"
            y2="108"
            pathLength={1}
          />
          <line
            className="material-loading__stroke material-loading__stroke--hatch"
            style={{ animationDelay: '0.4s' }}
            x1="48"
            y1="124"
            x2="176"
            y2="124"
            pathLength={1}
          />
          <line
            className="material-loading__stroke material-loading__stroke--hatch material-loading__stroke--light"
            style={{ animationDelay: '0.52s' }}
            x1="48"
            y1="140"
            x2="160"
            y2="140"
            pathLength={1}
          />
          <line
            className="material-loading__stroke material-loading__stroke--hatch material-loading__stroke--light"
            style={{ animationDelay: '0.64s' }}
            x1="48"
            y1="156"
            x2="144"
            y2="156"
            pathLength={1}
          />

          <path
            className="material-loading__stroke material-loading__stroke--gesture"
            style={{ animationDelay: '0.5s' }}
            d="M 56 188 C 78 168, 98 210, 118 192 S 152 176, 172 198"
            pathLength={1}
          />
          <path
            className="material-loading__stroke material-loading__stroke--gesture material-loading__stroke--light"
            style={{ animationDelay: '0.72s' }}
            d="M 132 72 C 148 58, 168 64, 180 82"
            pathLength={1}
          />

          <line
            className="material-loading__stroke material-loading__stroke--edge"
            style={{ animationDelay: '0.85s' }}
            x1="48"
            y1="220"
            x2="120"
            y2="220"
            pathLength={1}
          />

          <circle
            className="material-loading__tip"
            style={{ animationDelay: '0.95s' }}
            cx="120"
            cy="220"
            r="2.5"
          />
        </svg>

        <p className="material-loading__label">Material</p>
      </div>
    </motion.div>
  )
}
