import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Props {
  brand: string
  accent: string
  ctaLabel: string
  onCta: () => void
  light?: boolean
}

export default function DemoNav({ brand, accent, ctaLabel, onCta, light = false }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrolledBg = light ? 'rgba(255,255,255,0.96)' : 'rgba(6,8,15,0.94)'
  const scrolledBorder = light ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)'
  const linkColor = scrolled
    ? (light ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.4)')
    : (light ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)')

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? scrolledBg : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? scrolledBorder : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }} className="flex items-center justify-between py-4">
        {/* Back */}
        <Link
          to="/demo"
          className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase transition-opacity duration-200 hover:opacity-100"
          style={{ color: linkColor }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Demo
        </Link>

        {/* Brand */}
        <span
          className="font-display text-xs font-extrabold tracking-[0.2em] uppercase"
          style={{ color: accent }}
        >
          {brand}
        </span>

        {/* CTA */}
        <button
          onClick={onCta}
          className="text-xs font-bold px-4 py-2 rounded-lg tracking-wide uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: accent, color: '#fff' }}
        >
          {ctaLabel}
        </button>
      </div>
    </motion.nav>
  )
}
