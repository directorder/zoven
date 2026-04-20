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
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
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

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <motion.div key={activeNav} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {renderContent()}
          </motion.div>
        </div>
      </div>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, marginBottom: 24 }}>
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
  const [filter, setFilter] = useState('tutti')
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Gestione Ordini</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {['tutti', 'nuovo', 'in preparazione', 'pronto'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? `${accent}33` : 'transparent',
              border: `1px solid ${filter === f ? accent : 'rgba(255,255,255,0.1)'}`,
              color: filter === f ? accentLight : 'rgba(255,255,255,0.45)',
              fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tavolaOrdini
          .filter(o => filter === 'tutti' || o.stato === filter)
          .map(o => (
            <div key={o.id} style={{
              background: 'rgba(255,255,255,0.025)',
              border: `1px solid ${o.stato === 'nuovo' ? `${accent}33` : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 14, padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🍕</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>#{o.id} – {o.cliente}</span>
                  <Badge color={o.canale === 'Online' ? '#3b82f6' : '#22c55e'}>{o.canale}</Badge>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{o.items}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: accentLight, marginBottom: 4 }}>€ {o.totale}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
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

      <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
