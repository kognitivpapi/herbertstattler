import { motion, useReducedMotion } from 'framer-motion'

/** Three nested circular loops — one continuous pen stroke */
const LOOP_PATH =
  'M 200 24 C 322 24, 376 110, 376 200 C 376 290, 322 376, 200 376 C 78 376, 24 290, 24 200 C 24 110, 78 24, 200 24 M 200 64 C 292 64, 336 128, 336 200 C 336 272, 292 336, 200 336 C 108 336, 64 272, 64 200 C 64 128, 108 64, 200 64 M 200 104 C 258 104, 296 144, 296 200 C 296 256, 258 296, 200 296 C 142 296, 104 256, 104 200 C 104 144, 142 104, 200 104'

const DRAW_DURATION = '2.4s'

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
      <div className="material-loading__stage">
        <svg
          className="material-loading__svg"
          viewBox="0 0 400 400"
          aria-hidden
          focusable="false"
        >
          <defs>
            <path id="material-loading-loop" d={LOOP_PATH} pathLength={1} />
          </defs>

          <use
            href="#material-loading-loop"
            className="material-loading__line material-loading__line--track"
          />
          <use
            href="#material-loading-loop"
            className="material-loading__line material-loading__line--draw"
          />

          {!reducedMotion && (
            <circle className="material-loading__pen" r="3.5" cx="0" cy="0">
              <animateMotion
                dur={DRAW_DURATION}
                repeatCount="indefinite"
                rotate="auto"
                calcMode="linear"
              >
                <mpath href="#material-loading-loop" />
              </animateMotion>
            </circle>
          )}
        </svg>
      </div>
    </motion.div>
  )
}
