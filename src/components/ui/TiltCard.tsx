import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  intensity?: number
}

export function TiltCard({ children, className, style, intensity = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 180, damping: 22 })
  const y = useSpring(rawY, { stiffness: 180, damping: 22 })

  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity])
  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity])
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100])
  const shimmerOpacity = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
    shimmerOpacity.set(1)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    shimmerOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`card ${className ?? ''}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Glare layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          opacity: shimmerOpacity,
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]: number[]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          ),
          zIndex: 2,
        }}
      />
      {/* Content raised in 3D */}
      <div style={{ position: 'relative', zIndex: 3, transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  )
}
