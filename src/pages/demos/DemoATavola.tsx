import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, BookOpen, Users,
  MapPin, Gift, BarChart2, Settings, ArrowLeft,
  TrendingUp, TrendingDown, Clock
} from 'lucide-react'
import {
  tavolaStats, tavolaOrdini, tavolaMenu,
  tavolaClienti, tavolaChartData
} from '../../data/mockData'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ordini', label: 'Ordini', icon: ShoppingCart },
  { id: 'menu', label: 'Menu', icon: BookOpen },
  { id: 'clienti', label: 'Clienti', icon: Users },
  { id: 'seo', label: 'SEO Locale', icon: MapPin },
  { id: 'promo', label: 'Promo', icon: Gift },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'settings', label: 'Impostazioni', icon: Settings },
]

const accent = '#e05c2a'
const accentLight = '#f07a4a'

function Badge({ children, color = accent }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: `${color}22`, color: color,
      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
    }}>{children}</span>
  )
}

function KPICard({ label, value, sub, trend }: any) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: '20px 22px',
    }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{sub}</div>}
      {trend !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
          {trend > 0 ? <TrendingUp size={13} color="#22c55e" /> : <TrendingDown size={13} color="#ef4444" />}
          <span style={{ fontSize: 12, color: trend > 0 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
            {trend > 0 ? '+' : ''}{trend}% oggi
          </span>
        </div>
      )}
    </div>
  )
}

export default function DemoATavola() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return <DashboardView />
      case 'ordini': return <OrdiniView />
      case 'menu': return <MenuView />
      case 'clienti': return <ClientiView />
      case 'analytics': return <AnalyticsView />
      default: return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
              Sezione disponibile nella versione completa
            </p>
          </div>
        </div>
      )
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#050505', overflow: 'hidden' }}>
      {/* Sidebar */}
      <motion.aside
        className="demo-sidebar"
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: sidebarOpen ? 240 : 64, flexShrink: 0,
          background: '#0a0a0a', borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column',
          transition: 'width 0.3s ease', overflow: 'hidden',
        }}
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: `linear-gradient(135deg, #8b1a0a, ${accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900, color: 'white',
          }}>T</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>ZOVEN A TAVOLA</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Pizzeria Demo</div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center',
              gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 2,
              background: activeNav === item.id ? `${accent}22` : 'transparent',
              border: activeNav === item.id ? `1px solid ${accent}33` : '1px solid transparent',
              color: activeNav === item.id ? accentLight : 'rgba(255,255,255,0.45)',
              fontSize: 13, fontWeight: activeNav === item.id ? 600 : 500,
              cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
            }}>
              <item.icon size={16} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link to="/a-tavola" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 12px', borderRadius: 10,
            color: 'rgba(255,255,255,0.35)', fontSize: 12, textDecoration: 'none',
          }}>
            <ArrowLeft size={14} />
            {sidebarOpen && 'Esci dalla Demo'}
          </Link>
        </div>
      </motion.aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          height: 56, borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4 }}>
              <LayoutDashboard size={16} />
            </button>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
              {navItems.find(n => n.id === activeNav)?.label}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Badge color={accent}>Demo Live</Badge>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: `linear-gradient(135deg, #8b1a0a, ${accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: 'white',
            }}>C</div>
          </div>
        </div>

        <div className="demo-content" style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <motion.div key={activeNav} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {renderContent()}
          </motion.div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="demo-bottom-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'none', alignItems: 'stretch', zIndex: 100,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {navItems.slice(0, 4).map(item => (
          <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 4, padding: '10px 4px', background: 'none', border: 'none', cursor: 'pointer',
            color: activeNav === item.id ? accentLight : 'rgba(255,255,255,0.35)', transition: 'color 0.2s',
          }}>
            <item.icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
          </button>
        ))}
        <Link to="/a-tavola" style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 4, padding: '10px 4px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
        }}>
          <ArrowLeft size={20} />
          <span style={{ fontSize: 10, fontWeight: 600 }}>Esci</span>
        </Link>
      </nav>
      <style>{`
        @media (max-width: 768px) {
          .demo-sidebar { display: none !important; }
          .sidebar-toggle { display: none !important; }
          .demo-content { padding-bottom: 80px !important; }
          .demo-bottom-nav { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

function DashboardView() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 4 }}>Dashboard 🍕</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Domenica 20 Aprile 2026 — Pranzo in corso</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Ordini Oggi" value={tavolaStats.ordiniOggi} trend={12} />
        <KPICard label="Fatturato Oggi" value={`€ ${tavolaStats.fatturatoOggi}`} trend={18} />
        <KPICard label="Risparmio Commissioni" value={`€ ${tavolaStats.risparmioCommissioni}`} sub="vs Deliveroo oggi" />
        <KPICard label="Ordini Online" value={tavolaStats.ordiniOnline} sub="canale diretto" />
        <KPICard label="Ordini WhatsApp" value={tavolaStats.ordiniWhatsapp} />
      </div>

      {/* Live Orders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 24 }}>
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16, padding: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Ordini Live</h3>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tavolaOrdini.map(o => (
              <div key={o.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 10,
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${o.stato === 'nuovo' ? `${accent}44` : 'rgba(255,255,255,0.05)'}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{o.cliente}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{o.items}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: accentLight }}>€ {o.totale}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{o.ora}</div>
                </div>
                <Badge color={
                  o.stato === 'nuovo' ? accent :
                  o.stato === 'in preparazione' ? '#f59e0b' :
                  o.stato === 'pronto' ? '#3b82f6' : '#22c55e'
                }>{o.stato}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Calculator */}
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16, padding: 24,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 6 }}>Risparmio Commissioni</h3>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>vs Deliveroo (30%)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {tavolaChartData.slice(-5).map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', width: 28 }}>{d.giorno}</span>
                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.risparmio / 356) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    style={{ height: '100%', background: accentLight, borderRadius: 3 }}
                  />
                </div>
                <span style={{ fontSize: 12, color: accentLight, fontWeight: 600, width: 48, textAlign: 'right' }}>€{d.risparmio}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 20, padding: '14px', borderRadius: 12,
            background: `${accent}15`, border: `1px solid ${accent}33`,
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Risparmio questa settimana</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: accentLight }}>€ 1.484</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrdiniView() {
  const [orders, setOrders] = useState([...tavolaOrdini])
  const [cart, setCart] = useState<Record<number, number>>({})
  const [showBuilder, setShowBuilder] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [filter, setFilter] = useState('tutti')

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = tavolaMenu.find(m => m.id === Number(id))
    return sum + (item ? item.prezzo * qty : 0)
  }, 0)
  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0)
  const deliverooFee = (cartTotal * 0.3).toFixed(2)

  const updateCart = (id: number, delta: number) => {
    setCart(prev => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }
      if (next[id] === 0) delete next[id]
      return next
    })
  }

  const placeOrder = () => {
    if (cartCount === 0) return
    const itemNames = Object.entries(cart)
      .map(([id, qty]) => `${qty}x ${tavolaMenu.find(m => m.id === Number(id))?.nome}`)
      .join(', ')
    const newOrder = {
      id: orders.length + 1,
      cliente: 'Cliente Demo',
      canale: 'Online',
      items: itemNames,
      totale: Math.round(cartTotal * 100) / 100,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      stato: 'nuovo',
    }
    setOrders([newOrder, ...orders])
    setCart({})
    setShowBuilder(false)
    setOrderPlaced(true)
    setTimeout(() => setOrderPlaced(false), 4000)
  }

  const categories = [...new Set(tavolaMenu.map(m => m.categoria))]

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* Left: Orders list */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Gestione Ordini</h1>
          <button onClick={() => setShowBuilder(!showBuilder)} style={{
            background: showBuilder ? 'rgba(255,255,255,0.08)' : accent,
            color: 'white', fontSize: 13, fontWeight: 600,
            padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
          }}>
            {showBuilder ? '← Chiudi' : '+ Nuovo Ordine Live'}
          </button>
        </div>

        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: 12, padding: '12px 20px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <span style={{ fontSize: 20 }}>🎉</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#22c55e' }}>Ordine inviato in cucina!</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Risparmio: € {deliverooFee} rispetto a Deliveroo (30%)</div>
            </div>
          </motion.div>
        )}

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {['tutti', 'nuovo', 'in preparazione', 'pronto'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? `${accent}33` : 'transparent',
              border: `1px solid ${filter === f ? accent : 'rgba(255,255,255,0.1)'}`,
              color: filter === f ? accentLight : 'rgba(255,255,255,0.45)',
              fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
            }}>{f}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {orders
            .filter(o => filter === 'tutti' || o.stato === filter)
            .map(o => (
              <div key={o.id} style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${o.stato === 'nuovo' ? `${accent}44` : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 14, padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🍕</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>#{o.id} – {o.cliente}</span>
                    <Badge color={o.canale === 'Online' ? '#3b82f6' : '#22c55e'}>{o.canale}</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: accentLight, marginBottom: 4 }}>€ {o.totale}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                    <Clock size={11} /> {o.ora}
                  </div>
                </div>
                <Badge color={
                  o.stato === 'nuovo' ? accent :
                  o.stato === 'in preparazione' ? '#f59e0b' :
                  o.stato === 'pronto' ? '#3b82f6' : '#22c55e'
                }>{o.stato}</Badge>
              </div>
            ))}
        </div>
      </div>

      {/* Right: Live order builder */}
      {showBuilder && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            width: 300, flexShrink: 0,
            background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column',
            maxHeight: 'calc(100vh - 110px)', position: 'sticky', top: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Nuovo Ordine</h3>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Canale diretto — zero commissioni</p>

          <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16 }}>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{cat}</div>
                {tavolaMenu.filter(m => m.categoria === cat && m.disponibile).map(item => (
                  <div key={item.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{item.nome}</div>
                      <div style={{ fontSize: 12, color: accentLight, fontWeight: 600 }}>€ {item.prezzo.toFixed(2)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button onClick={() => updateCart(item.id, -1)} style={{
                        width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.08)',
                        border: 'none', color: 'white', cursor: 'pointer', fontSize: 16,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>−</button>
                      <span style={{ width: 20, textAlign: 'center', fontSize: 13, fontWeight: 700, color: cart[item.id] ? 'white' : 'rgba(255,255,255,0.2)' }}>
                        {cart[item.id] || 0}
                      </span>
                      <button onClick={() => updateCart(item.id, 1)} style={{
                        width: 26, height: 26, borderRadius: 7, background: `${accent}44`,
                        border: 'none', color: 'white', cursor: 'pointer', fontSize: 16,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Cart summary */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: 16,
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{cartCount} prodotti</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>€ {cartTotal.toFixed(2)}</span>
            </div>
            {cartCount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: '#22c55e' }}>💰 Risparmio vs Deliveroo</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e' }}>+ € {deliverooFee}</span>
              </div>
            )}
            <button onClick={placeOrder} disabled={cartCount === 0} style={{
              width: '100%', background: cartCount > 0 ? accent : 'rgba(255,255,255,0.1)',
              color: 'white', fontSize: 13, fontWeight: 700, padding: '11px',
              borderRadius: 10, border: 'none', cursor: cartCount > 0 ? 'pointer' : 'not-allowed',
              opacity: cartCount > 0 ? 1 : 0.5,
            }}>
              {cartCount > 0 ? `🍕 Invia in Cucina — € ${cartTotal.toFixed(2)}` : 'Aggiungi prodotti'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function MenuView() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Gestione Menu</h1>
        <button style={{
          background: accent, color: 'white', fontSize: 13, fontWeight: 600,
          padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
        }}>+ Aggiungi Piatto</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {tavolaMenu.map(item => (
          <div key={item.id} style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14, padding: '20px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{item.nome}</h3>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{item.categoria}</span>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: accentLight }}>€ {item.prezzo.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>🔥 {item.ordini} ordini</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge color={item.disponibile ? '#22c55e' : '#ef4444'}>
                  {item.disponibile ? 'Disponibile' : 'Non disp.'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClientiView() {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 24 }}>CRM Clienti</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Clienti Totali" value="284" />
        <KPICard label="Clienti Fedeli" value="68" sub="≥10 ordini" />
        <KPICard label="Punti Emessi" value="12.400" />
        <KPICard label="Coupon Usati" value="94%" sub="tasso utilizzo" />
      </div>

      <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Cliente', 'Ordini', 'Spesa Totale', 'Ultimo Ordine', 'Punti Fedeltà'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tavolaClienti.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: `linear-gradient(135deg, #8b1a0a, ${accent})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: 'white',
                    }}>{c.nome[0]}</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{c.nome}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: 'white' }}>{c.ordini}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: accentLight, fontWeight: 700 }}>€ {c.spesaTotale}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{c.ultimoOrdine}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>{c.fedeltaPunti}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>pt</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnalyticsView() {
  const totalRisparmio = tavolaChartData.reduce((s, d) => s + d.risparmio, 0)
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 24 }}>Analytics</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Ordini Settimana" value={tavolaChartData.reduce((s, d) => s + d.ordini, 0)} trend={14} />
        <KPICard label="Risparmio Commissioni" value={`€ ${totalRisparmio}`} sub="questa settimana" />
        <KPICard label="Canale Diretto %" value="66%" trend={8} />
        <KPICard label="WhatsApp %" value="34%" />
      </div>

      <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 24 }}>Ordini per Giorno</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
          {tavolaChartData.map((d, i) => {
            const max = Math.max(...tavolaChartData.map(x => x.ordini))
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.ordini / max) * 120}px` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  style={{
                    width: '100%', minWidth: 20,
                    background: i === 5 || i === 6
                      ? `linear-gradient(180deg, ${accentLight}, ${accent})`
                      : `${accent}55`,
                    borderRadius: '6px 6px 0 0',
                  }}
                />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{d.giorno}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
