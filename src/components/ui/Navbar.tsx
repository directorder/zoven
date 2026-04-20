import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const products = [
  { label: 'ZOVEN RADICI', href: '/radici', desc: 'Per agriturismi e aziende agricole', color: '#4a7c59' },
  { label: 'ZOVEN A TAVOLA', href: '/a-tavola', desc: 'Per ristoranti e pizzerie', color: '#e05c2a' },
  { label: 'ZOVEN CLINIC', href: '/clinic', desc: 'Per cliniche e studi medici', color: '#2563eb' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx('navbar', scrolled && 'navbar--scrolled')}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled
          ? 'rgba(5,5,5,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 900, color: 'white', fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.05em',
          }}>Z</div>
          <span style={{
            fontSize: 20, fontWeight: 800, color: 'white',
            letterSpacing: '-0.04em',
          }}>ZOVEN</span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {/* Products Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button style={{
              display: 'flex', alignItems: 'center', gap: 4,
              color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 500,
              padding: '8px 14px', borderRadius: 8, transition: 'all 0.2s',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              Prodotti <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute', top: '100%', left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: 8, width: 280,
                    background: 'rgba(15,15,15,0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16, overflow: 'hidden', padding: 8,
                  }}
                >
                  {products.map(p => (
                    <Link key={p.href} to={p.href} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '12px 14px', borderRadius: 10,
                      textDecoration: 'none', transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: p.color, marginTop: 4, flexShrink: 0,
                      }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{p.label}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{p.desc}</div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact" style={{
            color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 500,
            padding: '8px 14px', borderRadius: 8, transition: 'color 0.2s',
            textDecoration: 'none',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
          >
            Contatti
          </Link>

          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: 'white', fontSize: 13, fontWeight: 600,
            padding: '10px 20px', borderRadius: 10,
            textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: '0 0 30px rgba(124,58,237,0.3)',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Richiedi Audit Gratuito
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', color: 'white', padding: 8,
            background: 'none', border: 'none', cursor: 'pointer',
          }}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(5,5,5,0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ padding: '16px 24px 24px' }}>
              <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Prodotti</div>
              {products.map(p => (
                <Link key={p.href} to={p.href} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  textDecoration: 'none',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{p.label}</span>
                </Link>
              ))}
              <Link to="/contact" style={{
                display: 'block', padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: 15, fontWeight: 600, color: 'white', textDecoration: 'none',
              }}>Contatti</Link>
              <Link to="/contact" style={{
                display: 'block', marginTop: 16,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white', fontSize: 14, fontWeight: 600,
                padding: '14px 20px', borderRadius: 12,
                textDecoration: 'none', textAlign: 'center',
              }}>Richiedi Audit Gratuito</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.header>
  )
}
