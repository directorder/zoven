import { motion } from 'motion/react'
import { Link, NavLink } from 'react-router-dom'
import { Home, Users, BedDouble, UtensilsCrossed, ShoppingBag, Megaphone, Settings } from 'lucide-react'
import type { ReactNode } from 'react'
import { Logo } from '../ui/Logo'

type DemoShellProps = {
  sectionTitle: string
  children: ReactNode
  rightPanel?: ReactNode
}

const links = [
  { to: '/demo/dashboard', label: 'Dashboard', icon: Home },
  { to: '/demo/crm', label: 'CRM Clienti', icon: Users },
  { to: '/demo/stanze', label: 'Stanze', icon: BedDouble },
  { to: '/demo/tavoli', label: 'Tavoli', icon: UtensilsCrossed },
  { to: '/demo/bottega', label: 'Bottega', icon: ShoppingBag },
  { to: '/demo/promo', label: 'Promo', icon: Megaphone },
  { to: '/demo/impostazioni', label: 'Impostazioni', icon: Settings },
]

export function DemoShell({ sectionTitle, children, rightPanel }: DemoShellProps) {
  return (
    <div className="demo-shell">
      <aside className="demo-sidebar">
        <Logo />
        <p style={{ marginTop: '0.6rem' }}>Demo completa ZOVEN RADICI</p>
        <p className="demo-mobile-nav-hint">Scorri i moduli →</p>
        <nav className="demo-nav">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
              </NavLink>
            )
          })}
        </nav>
        <Link to="/" style={{ marginTop: '1.5rem', display: 'inline-block', color: '#d9b16e' }}>← Torna al sito</Link>
      </aside>

      <main className="demo-main">
        <div className="demo-topbar">
          <h2 style={{ fontSize: '1.45rem' }}>{sectionTitle}</h2>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            <span className="badge">Modalità Demo</span>
            <span className="badge">Nessun canone mensile</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {children}
        </motion.div>
      </main>

      {rightPanel}
    </div>
  )
}
