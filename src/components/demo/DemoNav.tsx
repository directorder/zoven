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

  const baseBg = light ? 'rgba(255,255,255,0.8)' : 'rgba(6,8,15,0.62)'
  const scrolledBg = light ? 'rgba(255,255,255,0.94)' : 'rgba(6,8,15,0.92)'
  const navBg = scrolled ? scrolledBg : baseBg
  const navBorder = light ? '1px solid rgba(196,96,122,0.14)' : '1px solid rgba(255,255,255,0.07)'
  const textColor = light ? 'rgba(26,15,31,0.66)' : 'rgba(255,255,255,0.62)'
  const ctaTextColor = light ? '#fff' : '#05070f'

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: navBorder,
        boxShadow: light
          ? '0 10px 40px rgba(196,96,122,0.08)'
          : '0 12px 42px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }} className="flex items-center justify-between h-[72px]">
        {/* Back */}
        <Link
          to="/demo"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-200"
          style={{
            color: textColor,
            border: light ? '1px solid rgba(196,96,122,0.2)' : '1px solid rgba(255,255,255,0.12)',
            background: light ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.02)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Demo
        </Link>

        {/* Brand */}
        <span
          className="font-display text-[12px] md:text-[15px] font-extrabold tracking-[0.18em] uppercase"
          style={{ color: accent }}
        >
          {brand}
        </span>

        {/* CTA */}
        <button
          onClick={onCta}
          className="inline-flex items-center justify-center text-[11px] font-bold px-4.5 py-2.5 rounded-full tracking-[0.1em] uppercase transition-all duration-200 hover:opacity-95 active:scale-95"
          style={{
            background: accent,
            color: ctaTextColor,
            boxShadow: light
              ? '0 8px 24px rgba(196,96,122,0.28)'
              : '0 8px 24px rgba(0,212,240,0.22)',
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </motion.nav>
  )
}
