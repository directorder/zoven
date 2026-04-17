import { useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  style?: React.CSSProperties
  strength?: number
}

/**
 * Magnetic button — the element subtly follows the cursor within its bounds.
 * Strength: 0.0–1.0 (default 0.3)
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  style,
  strength = 0.3,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    animate(x, 0, { type: 'spring', stiffness: 350, damping: 22 })
    animate(y, 0, { type: 'spring', stiffness: 350, damping: 22 })
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      style={{ x, y, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
