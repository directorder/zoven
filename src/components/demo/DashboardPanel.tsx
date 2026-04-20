import { motion } from 'motion/react'
import { Bell, CalendarClock, TrendingUp, Zap } from 'lucide-react'
import { kpiCards, timeline } from '../../data/demo'
import { Card } from '../ui/Card'

const MONTHS = ['Nov', 'Dic', 'Gen', 'Feb', 'Mar', 'Apr']

// Camere + Tavoli + Bottega — andamento mensile mock
const goldPoints = '0,88 60,72 120,78 180,55 240,62 300,24'
const leafPoints = '0,96 60,90 120,76 180,72 240,70 300,52'

const goldArea = `${goldPoints} 300,120 0,120`
const leafArea = `${leafPoints} 300,120 0,120`

export function DashboardPanel() {
  return (
    <div className="grid" style={{ gap: '1rem' }}>
      {/* KPI row */}
      <div className="grid grid-4" style={{ gap: '0.75rem' }}>
        {kpiCards.map((kpi, index) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
            <Card style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca795' }}>{kpi.label}</p>
              <p style={{ margin: 0, fontSize: '1.9rem', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#f7f4ea', lineHeight: 1 }}>
                {kpi.value}
              </p>
              <span className="badge" style={{ width: 'fit-content' }}>{kpi.delta}</span>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-2" style={{ gap: '0.75rem' }}>
        {/* Chart */}
        <Card>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.9rem' }}>Andamento combinato — ultimi 6 mesi</h3>
          <svg viewBox="0 0 300 120" width="100%" height="120" aria-label="grafico andamento">
            <defs>
              <linearGradient id="gold-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d9b16e" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#d9b16e" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="leaf-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#82c48a" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#82c48a" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[30, 60, 90].map((y) => (
              <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            {/* Area fills */}
            <polygon fill="url(#leaf-fill)" points={leafArea} />
            <polygon fill="url(#gold-fill)" points={goldArea} />
            {/* Lines */}
            <polyline fill="none" stroke="#82c48a" strokeWidth="1.5" points={leafPoints} />
            <polyline fill="none" stroke="#d9b16e" strokeWidth="2.5" points={goldPoints} />
            {/* Month labels */}
            {MONTHS.map((m, i) => (
              <text key={m} x={i * 60} y="116" fontSize="8" fill="rgba(183,179,164,0.65)" textAnchor="middle">{m}</text>
            ))}
          </svg>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.6rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#d9b16e' }}>
              <span style={{ width: 12, height: 2, background: '#d9b16e', borderRadius: 2 }} /> Prenotazioni + Bottega
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#82c48a' }}>
              <span style={{ width: 12, height: 2, background: '#82c48a', borderRadius: 2 }} /> Clienti ricorrenti
            </span>
          </div>
        </Card>

        {/* Notifiche */}
        <Card>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.9rem' }}>Notifiche e azioni rapide</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {([
              [Bell, '2 richieste camere in attesa di conferma', 'rgba(217,177,110,0.18)'],
              [CalendarClock, 'Check-in multipli nelle prossime 4 ore', 'rgba(130,196,138,0.14)'],
              [TrendingUp, 'Segmento Wine Lover: +14% conversione', 'rgba(130,196,138,0.14)'],
              [Zap, 'Azione rapida: invia promo riacquisto olio', 'rgba(217,177,110,0.18)'],
            ] as const).map(([Icon, label, bg], idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex', gap: '0.65rem', alignItems: 'center',
                  background: bg, borderRadius: 10, padding: '0.55rem 0.7rem',
                }}
              >
                <Icon size={15} color="#d9b16e" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.87rem' }}>{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.9rem' }}>Timeline attività recenti</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {timeline.map((item, idx) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: idx === 0 ? '#d9b16e' : '#82c48a', flexShrink: 0, marginTop: 5 }} />
              <span style={{ fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
