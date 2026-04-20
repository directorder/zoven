import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  to?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  fullWidth?: boolean
  style?: React.CSSProperties
}

const sizeMap = {
  sm: { fontSize: 13, padding: '9px 18px', borderRadius: 9 },
  md: { fontSize: 14, padding: '12px 24px', borderRadius: 11 },
  lg: { fontSize: 16, padding: '16px 32px', borderRadius: 13 },
}

export default function Button({
  children, href, to, variant = 'primary', size = 'md',
  color, onClick, type = 'button', fullWidth, style,
}: ButtonProps) {
  const { fontSize, padding, borderRadius } = sizeMap[size]

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontSize,
    padding,
    borderRadius,
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    width: fullWidth ? '100%' : undefined,
    transition: 'all 0.2s ease',
    letterSpacing: '-0.01em',
    ...style,
  }

  const variantStyle: React.CSSProperties = (() => {
    switch (variant) {
      case 'primary': return {
        background: color
          ? `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`
          : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        color: 'white',
        boxShadow: color
          ? `0 0 30px ${color}44`
          : '0 0 30px rgba(124,58,237,0.3)',
      }
      case 'secondary': return {
        background: 'rgba(255,255,255,0.08)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(10px)',
      }
      case 'ghost': return {
        background: 'transparent',
        color: 'rgba(255,255,255,0.75)',
        border: '1px solid rgba(255,255,255,0.1)',
      }
      case 'outline': return {
        background: 'transparent',
        color: color || 'white',
        border: `1px solid ${color || 'rgba(255,255,255,0.2)'}`,
      }
      default: return {}
    }
  })()

  const finalStyle = { ...baseStyle, ...variantStyle }

  const motionProps = {
    whileHover: { scale: 1.02, opacity: 0.92 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15 },
  }

  if (to) return (
    <motion.div {...motionProps} style={{ display: fullWidth ? 'block' : 'inline-block' }}>
      <Link to={to} style={finalStyle}>{children}</Link>
    </motion.div>
  )
  if (href) return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" {...motionProps} style={finalStyle}>{children}</motion.a>
  )
  return (
    <motion.button type={type} onClick={onClick} {...motionProps} style={finalStyle}>
      {children}
    </motion.button>
  )
}
