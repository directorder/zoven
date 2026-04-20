import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, Users, Calendar, BedDouble, Utensils,
  ShoppingBag, Gift, Settings, ArrowLeft, TrendingUp,
  TrendingDown
} from 'lucide-react'
import {
  radiciStats, radiciPrenotazioni, radiciClienti,
  radiciProdottiBottega, radiciChartData
} from '../../data/mockData'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clienti', label: 'Clienti', icon: Users },
  { id: 'prenotazioni', label: 'Prenotazioni', icon: Calendar },
  { id: 'camere', label: 'Camere', icon: BedDouble },
  { id: 'tavoli', label: 'Tavoli', icon: Utensils },
  { id: 'bottega', label: 'Bottega', icon: ShoppingBag },
  { id: 'promo', label: 'Promo', icon: Gift },
  { id: 'impostazioni', label: 'Impostazioni', icon: Settings },
]

const accent = '#4a7c59'
const accentLight = '#6aad7e'

function Badge({ children, color = accent }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: `${color}22`,
      color: color,
      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
      letterSpacing: '0.03em',
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
      <div style={{ fontSize: 30, fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{sub}</div>}
      {trend !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
          {trend > 0
            ? <TrendingUp size={13} color="#22c55e" />
            : <TrendingDown size={13} color="#ef4444" />}
          <span style={{ fontSize: 12, color: trend > 0 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
            {trend > 0 ? '+' : ''}{trend}% vs mese scorso
          </span>
        </div>
      )}
    </div>
  )
}

function BarChart({ data }: { data: typeof radiciChartData }) {
  const max = Math.max(...data.map(d => d.fatturato))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.fatturato / max) * 100}px` }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            style={{
              width: '100%', minWidth: 24,
              background: i === data.length - 1
                ? `linear-gradient(180deg, ${accentLight}, ${accent})`
                : `${accent}55`,
              borderRadius: '6px 6px 0 0',
            }}
          />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{d.mese}</span>
        </div>
      ))}
    </div>
  )
}

export default function DemoRadici() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return <DashboardView />
      case 'clienti': return <ClientiView />
      case 'prenotazioni': return <PrenotazioniView />
      case 'camere': return <CamereView />
      case 'bottega': return <BottegaView />
      default: return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
              Sezione "{navItems.find(n => n.id === activeNav)?.label}" disponibile nella versione completa
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
          background: '#0a0a0a',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div style={{
          padding: '20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900, color: 'white',
          }}>R</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.2 }}>ZOVEN RADICI</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Agriturismo Demo</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: 10, padding: '10px 12px', borderRadius: 10,
                marginBottom: 2,
                background: activeNav === item.id ? `${accent}22` : 'transparent',
                border: activeNav === item.id ? `1px solid ${accent}33` : '1px solid transparent',
                color: activeNav === item.id ? accentLight : 'rgba(255,255,255,0.45)',
                fontSize: 13, fontWeight: activeNav === item.id ? 600 : 500,
                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
              }}
            >
              <item.icon size={16} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Back link */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link to="/radici" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 12px', borderRadius: 10,
            color: 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: 500,
            textDecoration: 'none', transition: 'color 0.2s',
          }}>
            <ArrowLeft size={14} />
            {sidebarOpen && 'Esci dalla Demo'}
          </Link>
        </div>
      </motion.aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
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
              background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: 'white',
            }}>M</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <motion.div
            key={activeNav}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
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
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 4 }}>Buongiorno, Marco 👋</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Domenica 20 Aprile 2026 — Agriturismo Il Casale</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Fatturato Mese" value={`€ ${radiciStats.fatturatoMese.toLocaleString('it-IT')}`} trend={18} />
        <KPICard label="Prenotazioni" value={radiciStats.prenotazioniMese} sub="questo mese" trend={12} />
        <KPICard label="Clienti Attivi" value={radiciStats.clientiAttivi} sub="nel database" trend={7} />
        <KPICard label="Camere Occupate" value={`${radiciStats.camereOccupate}/${radiciStats.totaleCamere}`} sub="oggi" />
        <KPICard label="Ordini Bottega" value={radiciStats.ordiniBottega} sub="questo mese" trend={23} />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, marginBottom: 28 }}>
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16, padding: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Fatturato 6 mesi</h3>
            <span style={{ fontSize: 13, color: accentLight, fontWeight: 600 }}>+18% vs anno scorso</span>
          </div>
          <BarChart data={radiciChartData} />
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16, padding: 24,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 20 }}>Occupazione Camere</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Camera 1', 'Camera 2', 'Camera 3', 'Suite Vigneto', 'Camera 5'].map((cam, i) => (
              <div key={cam} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', width: 80 }}>{cam}</span>
                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                  <div style={{
                    height: '100%',
                    width: i < 3 ? '100%' : i === 3 ? '100%' : '0%',
                    background: i < 4 ? accentLight : 'transparent',
                    borderRadius: 3,
                    transition: 'width 1s ease',
                  }} />
                </div>
                <Badge color={i < 4 ? accent : '#555'}>{i < 4 ? 'Occupata' : 'Libera'}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: 24,
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 20 }}>Prenotazioni Recenti</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Cliente', 'Tipo', 'Check-in', 'Persone', 'Valore', 'Stato'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {radiciPrenotazioni.slice(0, 5).map(p => (
                <tr key={p.id}>
                  <td style={{ padding: '12px', fontSize: 14, color: 'white', fontWeight: 500 }}>{p.cliente}</td>
                  <td style={{ padding: '12px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{p.tipo}</td>
                  <td style={{ padding: '12px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{p.check_in}</td>
                  <td style={{ padding: '12px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{p.persone}</td>
                  <td style={{ padding: '12px', fontSize: 14, color: accentLight, fontWeight: 600 }}>€ {p.valore}</td>
                  <td style={{ padding: '12px' }}>
                    <Badge color={
                      p.stato === 'confermata' ? accent :
                      p.stato === 'completata' ? '#555' : '#c9a84c'
                    }>{p.stato}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ClientiView() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Clienti</h1>
        <button style={{
          background: accent, color: 'white', fontSize: 13, fontWeight: 600,
          padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
        }}>+ Nuovo Cliente</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Totale Clienti" value={radiciStats.clientiAttivi} />
        <KPICard label="VIP" value="28" sub="spesa > €2.000" />
        <KPICard label="Nuovi Mese" value="14" trend={8} />
        <KPICard label="Tasso Ritorno" value="67%" trend={5} />
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Nome', 'Email', 'Telefono', 'Visite', 'Spesa Totale', 'Ultima Visita', 'Tag'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {radiciClienti.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: 'white',
                    }}>{c.nome[0]}</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{c.nome}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{c.email}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{c.telefono}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'white', fontWeight: 600 }}>{c.visite}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: accentLight, fontWeight: 700 }}>€ {c.spesaTotale.toLocaleString('it-IT')}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{c.ultimaVisita}</td>
                <td style={{ padding: '14px 16px' }}>
                  <Badge color={c.tag === 'VIP' ? '#c9a84c' : c.tag === 'Fedele' ? accent : '#555'}>{c.tag}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PrenotazioniView() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [checkin, setCheckin] = useState('2026-04-25')
  const [checkout, setCheckout] = useState('2026-04-28')
  const [guests, setGuests] = useState(2)
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)

  const availableRooms = [
    { id: 4, nome: 'Suite Vigneto', posti: 4, prezzo: 220, desc: 'Vista panoramica sul vigneto, vasca idromassaggio' },
    { id: 5, nome: 'Camera 5 – Mansarda', posti: 2, prezzo: 130, desc: 'Travi a vista, atmosfera romantica, letto king size' },
  ]

  const nights = Math.max(1, Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000))
  const room = availableRooms.find(r => r.id === selectedRoom)
  const total = room ? room.prezzo * nights : 0

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Prenotazioni</h1>
      </div>

      {/* LIVE BOOKING WIZARD */}
      <div style={{
        background: `${accent}0d`, border: `1px solid ${accent}33`,
        borderRadius: 20, padding: 28, marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Simulatore Prenotazione Live</span>
          <Badge color={accent}>Demo interattiva</Badge>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {['Cerca', 'Scegli Camera', 'Riepilogo', 'Conferma'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                background: step > i + 1 ? '#22c55e' : step === i + 1 ? accent : 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: 'white',
              }}>{step > i + 1 ? '✓' : i + 1}</div>
              <span style={{ fontSize: 12, color: step === i + 1 ? 'white' : 'rgba(255,255,255,0.35)', fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
              {i < 3 && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>›</span>}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key="step1">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, alignItems: 'end', marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Check-in</label>
                <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} style={{
                  width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 14, boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  color: 'white', outline: 'none', colorScheme: 'dark',
                }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Check-out</label>
                <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} style={{
                  width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 14, boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  color: 'white', outline: 'none', colorScheme: 'dark',
                }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ospiti</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, overflow: 'hidden' }}>
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18, padding: '10px 14px', lineHeight: 1 }}>−</button>
                  <span style={{ flex: 1, textAlign: 'center', color: 'white', fontWeight: 600, fontSize: 14 }}>{guests} ospiti</span>
                  <button onClick={() => setGuests(Math.min(6, guests + 1))} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18, padding: '10px 14px', lineHeight: 1 }}>+</button>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(2)} style={{
              background: accent, color: 'white', fontSize: 14, fontWeight: 700,
              padding: '12px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
            }}>Cerca camere disponibili →</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key="step2">
            <p style={{ fontSize: 13, color: accentLight, marginBottom: 16, fontWeight: 600 }}>
              🏡 {nights} notti · {guests} ospiti · {checkin} → {checkout}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 20 }}>
              {availableRooms.map(r => (
                <div key={r.id} onClick={() => setSelectedRoom(r.id)} style={{
                  padding: 18, borderRadius: 14, cursor: 'pointer',
                  background: selectedRoom === r.id ? `${accent}22` : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${selectedRoom === r.id ? accent : 'rgba(255,255,255,0.08)'}`,
                  transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{r.nome}</span>
                    <span style={{ fontSize: 17, fontWeight: 800, color: accentLight }}>€{r.prezzo}<span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>/notte</span></span>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>{r.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge color="#22c55e">{r.posti} posti</Badge>
                    <span style={{ fontSize: 13, fontWeight: 700, color: selectedRoom === r.id ? accentLight : 'rgba(255,255,255,0.35)' }}>
                      Totale: € {r.prezzo * nights}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 13, padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>← Indietro</button>
              <button onClick={() => { if (selectedRoom) setStep(3) }} style={{
                background: selectedRoom ? accent : 'rgba(255,255,255,0.1)',
                color: 'white', fontSize: 14, fontWeight: 700, padding: '10px 24px', borderRadius: 10, border: 'none',
                cursor: selectedRoom ? 'pointer' : 'not-allowed', opacity: selectedRoom ? 1 : 0.5,
              }}>Continua →</button>
            </div>
          </motion.div>
        )}

        {step === 3 && room && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key="step3">
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: 20, marginBottom: 16, border: '1px solid rgba(255,255,255,0.07)' }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 14 }}>Riepilogo Prenotazione</h4>
              {[
                ['Camera', room.nome],
                ['Check-in', checkin],
                ['Check-out', checkout],
                ['Ospiti', `${guests} persone`],
                ['Durata', `${nights} notti`],
                ['Prezzo/notte', `€ ${room.prezzo}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                  <span style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>Totale</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: accentLight }}>€ {total}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(2)} style={{ background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 13, padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>← Indietro</button>
              <button onClick={() => setStep(4)} style={{ flex: 1, background: accent, color: 'white', fontSize: 14, fontWeight: 700, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
                ✓ Conferma Prenotazione
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && room && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key="step4" style={{ textAlign: 'center', padding: '16px 0' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} style={{ fontSize: 52, marginBottom: 16 }}>🎉</motion.div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 8 }}>Prenotazione Confermata!</h3>
            <p style={{ fontSize: 15, color: accentLight, marginBottom: 4, fontWeight: 600 }}>{room.nome} · {nights} notti · € {total}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Notifiche automatiche inviate al cliente via WhatsApp e SMS.</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
              <Badge color="#22c55e">✓ SMS inviato</Badge>
              <Badge color="#22c55e">✓ WhatsApp inviato</Badge>
              <Badge color={accent}>✓ Calendario aggiornato</Badge>
              <Badge color="#3b82f6">✓ Pagamento registrato</Badge>
            </div>
            <button onClick={() => { setStep(1); setSelectedRoom(null) }} style={{
              background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
              fontSize: 13, padding: '10px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
            }}>Nuova ricerca</button>
          </motion.div>
        )}
      </div>

      {/* EXISTING BOOKINGS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Totale Mese" value={radiciStats.prenotazioniMese} trend={12} />
        <KPICard label="Camere Attive" value={`${radiciStats.camereOccupate}/${radiciStats.totaleCamere}`} />
        <KPICard label="Tavoli Oggi" value={radiciStats.tavoliRiservati} />
        <KPICard label="Valore Totale" value="€ 8.240" trend={18} />
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['#', 'Cliente', 'Tipo', 'Check-in', 'Check-out', 'Persone', 'Valore', 'Stato'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {radiciPrenotazioni.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 16px', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>#{p.id}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: 'white' }}>{p.cliente}</td>
                <td style={{ padding: '14px 16px' }}>
                  <Badge color={p.tipo === 'Camera' ? '#3b82f6' : p.tipo === 'Tavolo' ? accent : '#c9a84c'}>{p.tipo}</Badge>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{p.check_in}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{p.check_out}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{p.persone}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: accentLight, fontWeight: 700 }}>€ {p.valore}</td>
                <td style={{ padding: '14px 16px' }}>
                  <Badge color={
                    p.stato === 'confermata' ? accent :
                    p.stato === 'completata' ? '#555' : '#c9a84c'
                  }>{p.stato}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CamereView() {
  const camere = [
    { id: 1, nome: 'Camera 1 – Vista Giardino', posti: 2, prezzo: 120, stato: 'occupata', cliente: 'Marco Ferretti', checkin: '20 Apr', checkout: '23 Apr' },
    { id: 2, nome: 'Camera 2 – Standard', posti: 2, prezzo: 100, stato: 'occupata', cliente: 'Giacomo Ricci', checkin: '22 Apr', checkout: '25 Apr' },
    { id: 3, nome: 'Camera 3 – Vista Vigneto', posti: 3, prezzo: 140, stato: 'occupata', cliente: 'Alessio Mancini', checkin: '24 Apr', checkout: '27 Apr' },
    { id: 4, nome: 'Suite Vigneto', posti: 4, prezzo: 220, stato: 'libera', cliente: null, checkin: null, checkout: null },
    { id: 5, nome: 'Camera 5 – Mansarda', posti: 2, prezzo: 130, stato: 'libera', cliente: null, checkin: null, checkout: null },
    { id: 6, nome: 'Camera 6 – Terrazza', posti: 2, prezzo: 150, stato: 'manutenzione', cliente: null, checkin: null, checkout: null },
  ]

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 24 }}>Gestione Camere</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {camere.map(cam => (
          <div key={cam.id} style={{
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${cam.stato === 'occupata' ? `${accent}33` : cam.stato === 'libera' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 16, padding: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>{cam.nome}</h3>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{cam.posti} posti · € {cam.prezzo}/notte</span>
              </div>
              <Badge color={cam.stato === 'occupata' ? accent : cam.stato === 'libera' ? '#22c55e' : '#f59e0b'}>
                {cam.stato}
              </Badge>
            </div>
            {cam.cliente && (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
                <div><strong style={{ color: 'white' }}>{cam.cliente}</strong></div>
                <div>{cam.checkin} → {cam.checkout}</div>
              </div>
            )}
            {cam.stato === 'libera' && (
              <button style={{
                marginTop: 12, width: '100%',
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                color: '#22c55e', fontSize: 12, fontWeight: 600,
                padding: '8px', borderRadius: 8, cursor: 'pointer',
              }}>Prenota</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function BottegaView() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Bottega</h1>
        <button style={{
          background: accent, color: 'white', fontSize: 13, fontWeight: 600,
          padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
        }}>+ Nuovo Prodotto</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Prodotti" value="24" />
        <KPICard label="Ordini Mese" value={radiciStats.ordiniBottega} trend={23} />
        <KPICard label="Fatturato" value="€ 2.840" trend={15} />
        <KPICard label="Stock Basso" value="2" sub="da riordinare" />
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Prodotto', 'Categoria', 'Stock', 'Prezzo', 'Venduti', 'Stato'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {radiciProdottiBottega.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: 'white' }}>{p.nome}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{p.categoria}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: p.stock < 10 ? '#f59e0b' : 'white', fontWeight: 600 }}>{p.stock}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: accentLight, fontWeight: 700 }}>€ {p.prezzo}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{p.venduti}</td>
                <td style={{ padding: '14px 16px' }}>
                  <Badge color={p.stock > 10 ? accent : p.stock > 5 ? '#f59e0b' : '#ef4444'}>
                    {p.stock > 10 ? 'OK' : p.stock > 5 ? 'Scarso' : 'Urgente'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
