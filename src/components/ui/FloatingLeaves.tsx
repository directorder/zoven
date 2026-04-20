import { motion } from 'motion/react'

// Three distinct leaf shapes centered at origin
const LEAF_PATHS = [
  // Narrow olive/agriturismo leaf
  'M0,-16 C3,-9 5,-2 3,6 C1,12 0,16 0,16 C0,16 -1,12 -3,6 C-5,-2 -3,-9 0,-16 Z',
  // Broader fig/grape leaf
  'M0,-13 C7,-10 11,-2 9,6 C7,12 2,14 0,14 C-2,14 -7,12 -9,6 C-11,-2 -7,-10 0,-13 Z',
  // Asymmetric windblown leaf
  'M2,-15 C8,-8 11,1 8,8 C5,13 1,16 0,15 C-2,13 -4,8 -3,1 C-2,-5 -5,-11 2,-15 Z',
]

const VEIN_PATHS = [
  'M0,-13 L0,13',
  'M0,-11 L0,11',
  'M1,-12 L-1,12',
]

type Leaf = {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
  initialRot: number
  drift: number
  pathIdx: number
  color: string
}

// Pre-computed deterministic leaves (no Math.random at render time)
const LEAVES: Leaf[] = [
  { id: 0,  x: 4,  delay: 0,  duration: 26, size: 1.1, opacity: 0.11, initialRot: 0,   drift: 30,  pathIdx: 0, color: '#82c48a' },
  { id: 1,  x: 11, delay: 4,  duration: 20, size: 0.75,opacity: 0.09, initialRot: 55,  drift: -36, pathIdx: 1, color: '#d9b16e' },
  { id: 2,  x: 19, delay: 9,  duration: 30, size: 1.4, opacity: 0.07, initialRot: 130, drift: 44,  pathIdx: 2, color: '#5f8d63' },
  { id: 3,  x: 27, delay: 2,  duration: 23, size: 0.9, opacity: 0.13, initialRot: 210, drift: -28, pathIdx: 0, color: '#82c48a' },
  { id: 4,  x: 36, delay: 12, duration: 18, size: 1.0, opacity: 0.10, initialRot: 80,  drift: 38,  pathIdx: 1, color: '#d9b16e' },
  { id: 5,  x: 44, delay: 6,  duration: 28, size: 0.7, opacity: 0.08, initialRot: 300, drift: -42, pathIdx: 2, color: '#82c48a' },
  { id: 6,  x: 53, delay: 15, duration: 22, size: 1.25,opacity: 0.09, initialRot: 165, drift: 32,  pathIdx: 0, color: '#5f8d63' },
  { id: 7,  x: 61, delay: 7,  duration: 25, size: 0.85,opacity: 0.12, initialRot: 245, drift: -40, pathIdx: 1, color: '#d9b16e' },
  { id: 8,  x: 69, delay: 18, duration: 19, size: 1.35,opacity: 0.07, initialRot: 30,  drift: 26,  pathIdx: 2, color: '#82c48a' },
  { id: 9,  x: 76, delay: 3,  duration: 27, size: 0.8, opacity: 0.11, initialRot: 100, drift: -34, pathIdx: 0, color: '#5f8d63' },
  { id: 10, x: 83, delay: 10, duration: 21, size: 1.0, opacity: 0.10, initialRot: 275, drift: 48,  pathIdx: 1, color: '#d9b16e' },
  { id: 11, x: 90, delay: 1,  duration: 24, size: 0.7, opacity: 0.09, initialRot: 50,  drift: -30, pathIdx: 2, color: '#82c48a' },
  { id: 12, x: 96, delay: 14, duration: 17, size: 1.15,opacity: 0.08, initialRot: 185, drift: 36,  pathIdx: 0, color: '#5f8d63' },
  { id: 13, x: 15, delay: 20, duration: 29, size: 0.9, opacity: 0.13, initialRot: 330, drift: -26, pathIdx: 1, color: '#d9b16e' },
  { id: 14, x: 40, delay: 8,  duration: 23, size: 1.1, opacity: 0.10, initialRot: 70,  drift: 42,  pathIdx: 2, color: '#82c48a' },
  { id: 15, x: 57, delay: 16, duration: 20, size: 0.75,opacity: 0.12, initialRot: 220, drift: -38, pathIdx: 0, color: '#5f8d63' },
  { id: 16, x: 73, delay: 5,  duration: 26, size: 1.3, opacity: 0.07, initialRot: 145, drift: 30,  pathIdx: 1, color: '#d9b16e' },
  { id: 17, x: 87, delay: 11, duration: 18, size: 0.95,opacity: 0.11, initialRot: 290, drift: -44, pathIdx: 2, color: '#82c48a' },
  { id: 18, x: 32, delay: 22, duration: 31, size: 0.65,opacity: 0.09, initialRot: 10,  drift: 24,  pathIdx: 0, color: '#d9b16e' },
  { id: 19, x: 65, delay: 13, duration: 16, size: 1.2, opacity: 0.10, initialRot: 195, drift: -32, pathIdx: 1, color: '#82c48a' },
]

export function FloatingLeaves() {
  return (
    <div
      className="floating-leaves-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {LEAVES.map((leaf) => {
        const px = leaf.size * 26
        return (
          <motion.div
            key={leaf.id}
            style={{
              position: 'absolute',
              left: `${leaf.x}%`,
              top: '100vh',
              width: px,
              height: px,
              originX: '50%',
              originY: '50%',
            }}
            animate={{
              y: [0, -2800],
              x: [0, leaf.drift, leaf.drift * 0.4, leaf.drift * 0.8, leaf.drift * 0.1, 0],
              rotate: [leaf.initialRot, leaf.initialRot + 400],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg
              width={px}
              height={px}
              viewBox="-14 -20 28 40"
              style={{ overflow: 'visible' }}
            >
              <path
                d={LEAF_PATHS[leaf.pathIdx]}
                fill={leaf.color}
                opacity={leaf.opacity}
              />
              <path
                d={VEIN_PATHS[leaf.pathIdx]}
                stroke={leaf.color}
                strokeWidth="0.6"
                fill="none"
                opacity={leaf.opacity * 0.6}
              />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}
