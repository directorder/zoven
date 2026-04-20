import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../../data/marketing'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export function MarketingNavbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const immersiveTargets: Record<string, string> = {
    '/radici': '#problema',
    '/moduli': '#soluzione',
    '/prezzi': '#prezzi',
  }

  function handleNav(itemTo: string) {
    const hash = immersiveTargets[itemTo]
    if (!hash) {
      navigate(itemTo)
      return
    }

    if (location.pathname === '/') {
      window.history.replaceState(null, '', hash)
      window.dispatchEvent(new HashChangeEvent('hashchange'))
      return
    }

    navigate(`/${hash}`)
  }

  return (
    <header className="marketing-nav">
      <div className="container nav-inner">
        <Logo />

        <nav className="nav-links">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={(event) => {
                event.preventDefault()
                handleNav(item.to)
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-cta">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button to="/audit" variant="gold">
                Richiedi audit gratuito
              </Button>
            </motion.div>
          </div>
          <button
            className="nav-hamburger"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-mobile-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="container nav-mobile-inner">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNav(item.to)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
              <Button to="/audit" onClick={() => setOpen(false)}>
                Richiedi audit gratuito
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
