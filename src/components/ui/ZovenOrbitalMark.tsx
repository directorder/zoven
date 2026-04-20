import { motion } from 'motion/react'

type ZovenOrbitalMarkProps = {
  className?: string
}

export function ZovenOrbitalMark({ className }: ZovenOrbitalMarkProps) {
  return (
    <div className={`zoven-orbit ${className ?? ''}`.trim()} aria-hidden="true">
      <motion.div
        className="zoven-orbit-ring outer"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="zoven-orbit-ring middle"
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="zoven-orbit-ring inner"
        animate={{ rotate: 360, scale: [1, 1.04, 1] }}
        transition={{ rotate: { duration: 10, repeat: Infinity, ease: 'linear' }, scale: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' } }}
      />

      <motion.div
        className="zoven-orbit-dot dot-a"
        animate={{ rotate: 360 }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
      >
        <span />
      </motion.div>
      <motion.div
        className="zoven-orbit-dot dot-b"
        animate={{ rotate: -360 }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'linear' }}
      >
        <span />
      </motion.div>
      <motion.div
        className="zoven-orbit-dot dot-c"
        animate={{ rotate: 360 }}
        transition={{ duration: 9.2, repeat: Infinity, ease: 'linear' }}
      >
        <span />
      </motion.div>

      <motion.div
        className="zoven-orbit-core"
        animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
