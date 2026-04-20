import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, Calendar, Users, Phone,
  Bell, TrendingUp, BarChart2, Settings, ArrowLeft,
  CheckCircle, Clock, AlertCircle
} from 'lucide-react'
import {
  clinicStats, clinicAppuntamenti, clinicPazienti,
  clinicChartData
} from '../../data/mockData'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appuntamenti', label: 'Appuntamenti', icon: Calendar },
  { id: 'pazienti', label: 'Pazienti', icon: Users },
  { id: 'centralino', label: 'Centralino AI', icon: Phone },
  { id: 'reminder', label: 'Reminder', icon: Bell },
  { id: 'followup', label: 'Follow-up', icon: TrendingUp },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'settings', label: 'Impostazioni', icon: Settings },
]

const accent = '#2563eb'
const accentLight = '#3b82f6'

function Badge({ children, color = accent }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: `${color}22`, color: color,
      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
    }}>{children}</span>
  )
}

function KPICard({ label, value, sub, trend, alert }: any) {
  return (
    <div style={{
      background: alert ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${alert ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 16, padding: '20px 22px',
    }}>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: alert ? '#ef4444' : 'white', letterSpacing: '-0.03em', marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{sub}</div>}
      {trend !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
          <TrendingUp size={13} color="#22c55e" />
          <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>+{trend}% vs mese scorso</span>
        </div>
      )}
    </div>
  )
}

export default function DemoClinic() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return <DashboardView />
      case 'appuntamenti': return <AppuntamentiView />
      case 'pazienti': return <PazientiView />
      case 'centralino': return <CentralinoView />
      case 'analytics': return <AnalyticsView />
      default: return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>Sezione disponibile nella versione completa</p>
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
            background: `linear-gradient(135deg, #1e3a8a, ${accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900, color: 'white',
          }}>C</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>ZOVEN CLINIC</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Studio Demo</div>
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
          <Link to="/clinic" style={{
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
              background: `linear-gradient(135deg, #1e3a8a, ${accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: 'white',
            }}>D</div>
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
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 4 }}>Buongiorno, Dr. Ferri 👨‍⚕️</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Lunedì 20 Aprile 2026 — 18 appuntamenti oggi</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Appuntamenti Oggi" value={clinicStats.appuntamentiOggi} />
        <KPICard label="Nuovi Pazienti" value={clinicStats.nuoviPazienti} sub="questo mese" trend={15} />
        <KPICard label="Chiamate Perse" value={clinicStats.chiamatePerse} alert />
        <KPICard label="Tasso Conferma" value={`${clinicStats.tassoConferma}%`} trend={6} />
        <KPICard label="Fatturato Mese" value={`€ ${clinicStats.fatturatoMese.toLocaleString('it-IT')}`} trend={11} />
      </div>

      {/* Today's Schedule */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16, padding: 24,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 20 }}>Agenda di Oggi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {clinicAppuntamenti.slice(0, 5).map(a => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 12,
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${a.stato === 'nuovo' ? `${accent}44` : 'rgba(255,255,255,0.05)'}`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(37,99,235,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: accentLight,
                }}>{a.ora}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{a.paziente}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{a.tipo} · {a.medico}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Badge color={
                    a.stato === 'confermato' ? '#22c55e' :
                    a.stato === 'in attesa' ? '#f59e0b' : accent
                  }>{a.stato}</Badge>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{a.durata} min</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 16, padding: 20, flex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <AlertCircle size={16} color="#ef4444" />
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>Chiamate Perse ({clinicStats.chiamatePerse})</h4>
            </div>
            {['+39 340 111 2233 – ore 08:47', '+39 347 555 6677 – ore 09:12', '+39 331 888 9900 – ore 10:04'].map(c => (
              <div key={c} style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {c}
              </div>
            ))}
            <button style={{
              marginTop: 12, width: '100%',
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444', fontSize: 12, fontWeight: 600,
              padding: '8px', borderRadius: 8, cursor: 'pointer',
            }}>Invia WhatsApp di recupero</button>
          </div>

          <div style={{
            background: 'rgba(34,197,94,0.06)',
            border: '1px solid rgba(34,197,94,0.15)',
            borderRadius: 16, padding: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <CheckCircle size={16} color="#22c55e" />
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#22c55e' }}>Reminder Inviati</h4>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 4 }}>{clinicStats.richiamiInviati}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>oggi via WhatsApp</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppuntamentiView() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Appuntamenti</h1>
        <button style={{
          background: accent, color: 'white', fontSize: 13, fontWeight: 600,
          padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
        }}>+ Nuovo Appuntamento</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Oggi" value={clinicStats.appuntamentiOggi} />
        <KPICard label="Confermati" value="15" sub="su 18" />
        <KPICard label="In Attesa" value="3" />
        <KPICard label="No-show Previsti" value="1" sub="storico" />
      </div>

      <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Ora', 'Paziente', 'Tipo Visita', 'Medico', 'Durata', 'Stato'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clinicAppuntamenti.map(a => (
              <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: accentLight }}>{a.ora}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: 'white' }}>{a.paziente}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{a.tipo}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{a.medico}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} color="rgba(255,255,255,0.35)" />
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{a.durata} min</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <Badge color={
                    a.stato === 'confermato' ? '#22c55e' :
                    a.stato === 'in attesa' ? '#f59e0b' : accent
                  }>{a.stato}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PazientiView() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Database Pazienti</h1>
        <button style={{
          background: accent, color: 'white', fontSize: 13, fontWeight: 600,
          padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
        }}>+ Nuovo Paziente</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Totale Pazienti" value="1.284" />
        <KPICard label="Attivi (90gg)" value="486" />
        <KPICard label="Da Riattivare" value="298" sub="6+ mesi" />
        <KPICard label="Nuovi Mese" value={clinicStats.nuoviPazienti} trend={15} />
      </div>

      <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Paziente', 'Età', 'Telefono', 'Ultima Visita', 'Prossima Visita', 'Valore Totale'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clinicPazienti.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: `linear-gradient(135deg, #1e3a8a, ${accent})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: 'white',
                    }}>{p.nome[0]}</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{p.nome}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{p.eta}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{p.telefono}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{p.ultimaVisita}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: accentLight, fontWeight: 600 }}>{p.prossimaVisita}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#22c55e', fontWeight: 700 }}>€ {p.valore.toLocaleString('it-IT')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CentralinoView() {
  const chiamatePerse = [
    { numero: '+39 340 111 2233', ora: '08:47', stato: 'WhatsApp inviato', minuti: 3 },
    { numero: '+39 347 555 6677', ora: '09:12', stato: 'WhatsApp inviato', minuti: 3 },
    { numero: '+39 331 888 9900', ora: '10:04', stato: 'In attesa risposta', minuti: 2 },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8 }}>Centralino AI</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Recupero automatico chiamate perse. Ogni chiamata senza risposta → WhatsApp entro 3 minuti.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Chiamate Oggi" value="24" />
        <KPICard label="Perse" value={clinicStats.chiamatePerse} alert />
        <KPICard label="Recuperate (30gg)" value="87%" sub="tasso successo" />
        <KPICard label="Prenotazioni via WA" value="34" sub="questo mese" trend={28} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{
          background: 'rgba(239,68,68,0.05)',
          border: '1px solid rgba(239,68,68,0.15)',
          borderRadius: 16, padding: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <AlertCircle size={18} color="#ef4444" />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Chiamate Perse Oggi</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {chiamatePerse.map((c, i) => (
              <div key={i} style={{
                padding: '14px', borderRadius: 12,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{c.numero}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{c.ora}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge color={c.stato === 'WhatsApp inviato' ? '#22c55e' : '#f59e0b'}>{c.stato}</Badge>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>dopo {c.minuti} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(37,99,235,0.06)',
          border: '1px solid rgba(37,99,235,0.15)',
          borderRadius: 16, padding: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <CheckCircle size={18} color="#22c55e" />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Template WhatsApp</h3>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '16px',
            fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7,
            fontFamily: 'monospace',
          }}>
            Salve! 👋 Abbiamo visto la sua chiamata ma eravamo momentaneamente occupati.
            <br /><br />
            Clicchi qui per prenotare il suo appuntamento:
            <br />
            <span style={{ color: accentLight }}>→ [link prenotazione]</span>
            <br /><br />
            Oppure ci risponda qui. Siamo disponibili!
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Badge color={accent}>Personalizzabile</Badge>
            <Badge color="#22c55e">Invio Automatico</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsView() {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 24 }}>Analytics</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Fatturato Mese" value={`€ ${clinicStats.fatturatoMese.toLocaleString('it-IT')}`} trend={11} />
        <KPICard label="Appuntamenti Mese" value={clinicChartData[clinicChartData.length - 1].appuntamenti} trend={5} />
        <KPICard label="Richiami Inviati" value={clinicStats.richiamiInviati} sub="questo mese" />
        <KPICard label="Tasso Conferma" value={`${clinicStats.tassoConferma}%`} trend={6} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 24 }}>Fatturato 6 Mesi</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
            {clinicChartData.map((d, i) => {
              const max = Math.max(...clinicChartData.map(x => x.fatturato))
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.fatturato / max) * 120}px` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    style={{
                      width: '100%',
                      background: i === clinicChartData.length - 1
                        ? `linear-gradient(180deg, ${accentLight}, ${accent})`
                        : `${accent}55`,
                      borderRadius: '6px 6px 0 0',
                    }}
                  />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{d.mese}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 20 }}>Conversion Funnel</h3>
          {[
            { label: 'Chiamate/Visite Web', value: 480, pct: 100 },
            { label: 'Prenotazioni Iniziate', value: 312, pct: 65 },
            { label: 'Appuntamenti Confermati', value: 267, pct: 56 },
            { label: 'Visite Completate', value: 251, pct: 52 },
            { label: 'Ritorni Programmati', value: 168, pct: 35 },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                <span style={{ fontSize: 12, color: 'white', fontWeight: 600 }}>{item.value} ({item.pct}%)</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8 }}
                  style={{ height: '100%', background: accentLight, borderRadius: 2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
