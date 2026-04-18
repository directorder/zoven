import { useState, useRef, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'
import DemoNav from '../../components/demo/DemoNav'
import PoweredByZoven from '../../components/demo/PoweredByZoven'
import { openWhatsApp } from '../../lib/whatsapp'

// ── TOKENS — light, feminine, luxury clinic ───────────────────
const A     = '#c4607a'
const AG    = (o: number) => `rgba(196,96,122,${o})`
const BG    = '#fdf8f6'
const BG_ALT = '#f5ede9'
const BG_DARK = '#130f12'
const TEXT  = '#1a0f1f'
const CARD  = '#ffffff'
const BORD  = 'rgba(196,96,122,0.14)'
const ABORD = 'rgba(196,96,122,0.32)'
const MUTED = '#9a808c'

const ease   = [0.16, 1, 0.3, 1] as [number, number, number, number]
const spring = { type: 'spring' as const, stiffness: 280, damping: 24 }
const fade   = (delay = 0) => ({ duration: 0.72, ease, delay })

// ── DATA ──────────────────────────────────────────────────────
const TREATMENTS = [
  { id: 't1', name: 'Filler Labbra',      desc: 'Volumizzazione naturale con acido ialuronico premium',          price: 'da €250', dur: '45 min', emoji: '💉', tag: 'Bestseller' },
  { id: 't2', name: 'Botulino',            desc: 'Riduzione rughe con tossina botulinica certificata',             price: 'da €290', dur: '30 min', emoji: '✨', tag: '' },
  { id: 't3', name: 'Biorivitalizzazione', desc: 'Biostimolazione profonda con microiniezioni di HA',             price: 'da €180', dur: '60 min', emoji: '🌿', tag: '' },
  { id: 't4', name: 'Microneedling RF',    desc: 'Rinnovamento cutaneo con tecnologia radiofrequenza avanzata',   price: 'da €220', dur: '50 min', emoji: '🔬', tag: 'Nuovo' },
  { id: 't5', name: 'Criolipolisi',        desc: 'Eliminazione adiposità localizzate con tecnologia certificata', price: 'da €350', dur: '90 min', emoji: '❄️', tag: '' },
  { id: 't6', name: 'Laser CO₂',           desc: 'Ringiovanimento con laser frazionato di ultima generazione',    price: 'da €400', dur: '60 min', emoji: '⚡', tag: 'Premium' },
]

const DOCTORS = [
  { name: 'Dr.ssa Laura Ferretti', spec: 'Medicina Estetica',     exp: '12 anni', initials: 'LF' },
  { name: 'Dr. Marco Romano',      spec: 'Chirurgia Plastica',    exp: '15 anni', initials: 'MR' },
  { name: 'Dr.ssa Elena Rossi',    spec: 'Laser & Tecnologie',    exp: '9 anni',  initials: 'ER' },
  { name: 'Dr. Andrea Costa',      spec: 'Biorivitalizzazione',   exp: '11 anni', initials: 'AC' },
]

const TIMES = ['09:00', '10:30', '11:45', '14:00', '15:30', '17:00']

const DAYS = (() => {
  const days: { label: string; num: number }[] = []
  const d = new Date()
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
  for (let i = 1; i <= 5; i++) {
    const dt = new Date(d)
    dt.setDate(d.getDate() + i)
    if (dt.getDay() !== 0 && dt.getDay() !== 6) days.push({ label: dayNames[dt.getDay()], num: dt.getDate() })
    if (days.length === 5) break
  }
  return days
})()

// ── TINY UTILS ────────────────────────────────────────────────
function useCounter(target: number, once = true) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1400
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])
  return { ref, val }
}

function FadeUp({
  children, delay = 0, className = '', as: Tag = 'div',
}: {
  children: React.ReactNode; delay?: number; className?: string; as?: keyof React.JSX.IntrinsicElements
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-48px' })
  const C = motion[Tag as 'div'] as typeof motion.div
  return (
    <C
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={fade(delay)}
      className={className}
    >
      {children}
    </C>
  )
}

// ── HERO ──────────────────────────────────────────────────────
function HeroClinic() {
  const heroRef = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 80, damping: 20 })
  const smy = useSpring(my, { stiffness: 80, damping: 20 })

  const card1x = useTransform(smx, [-1, 1], [-18, 18])
  const card1y = useTransform(smy, [-1, 1], [-12, 12])
  const card2x = useTransform(smx, [-1, 1], [12, -12])
  const card2y = useTransform(smy, [-1, 1], [-8, 8])
  const card3x = useTransform(smx, [-1, 1], [-10, 10])
  const card3y = useTransform(smy, [-1, 1], [10, -10])

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  function handleLeave() { mx.set(0); my.set(0) }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG, paddingTop: 80 }}
    >
      {/* Soft floral texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 80% 20%, ${AG(0.07)} 0%, transparent 50%),
          radial-gradient(circle at 10% 80%, rgba(232,160,180,0.05) 0%, transparent 45%)`,
      }} />

      {/* Delicate grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(${BORD} 1px,transparent 1px),linear-gradient(90deg,${BORD} 1px,transparent 1px)`,
        backgroundSize: '72px 72px',
        opacity: 0.5,
      }} />

      <div className="container-max w-full relative z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left — text */}
          <div className="flex-1 max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest"
              style={{ background: AG(0.08), border: `1px solid ${ABORD}`, color: A }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: A, boxShadow: `0 0 8px ${AG(0.6)}` }} />
              Aurora Clinic · Medicina Estetica Avanzata
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={fade(0.2)}
              className="font-display leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.6rem,5.5vw,4.5rem)', color: TEXT }}
            >
              La bellezza
              <br />
              che meriti,{' '}
              <span style={{
                background: `linear-gradient(135deg, ${A} 0%, #e8628a 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                adesso.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={fade(0.35)}
              className="text-lg leading-relaxed mb-10"
              style={{ color: MUTED }}
            >
              Trattamenti certificati. Medici specializzati.
              <br />
              <span style={{ color: TEXT }} className="font-medium">Risultati naturali e duraturi.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={fade(0.45)}
              className="flex flex-col sm:flex-row items-start gap-3 mb-12"
            >
              <button
                onClick={() => openWhatsApp('generic')}
                className="wa-btn text-sm px-6 py-3"
                style={{ background: `linear-gradient(135deg, ${A}, #e8628a)`, boxShadow: `0 4px 24px ${AG(0.35)}` }}
              >
                Prenota consulto gratuito
              </button>
              <a
                href="#trattamenti"
                className="btn-ghost text-sm px-6 py-3"
                style={{ borderColor: ABORD, color: A }}
              >
                Scopri i trattamenti
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={fade(0.6)}
              className="flex items-center gap-8"
            >
              {[['247+', 'Pazienti soddisfatte'], ['98%', 'Soddisfazione'], ['12+', 'Anni di esperienza']].map(([v, l]) => (
                <div key={l} className="flex flex-col gap-0.5">
                  <span className="font-display text-2xl font-extrabold" style={{ color: A }}>{v}</span>
                  <span className="text-xs" style={{ color: MUTED }}>{l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — floating cards */}
          <div className="flex-1 relative w-full h-[500px] hidden lg:block">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(ellipse at 60% 50%, ${AG(0.12)} 0%, transparent 65%)`,
            }} />

            {/* Booking card */}
            <motion.div
              style={{ x: card1x, y: card1y, position: 'absolute', top: 40, left: 40 }}
              initial={{ opacity: 0, y: 40, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...spring, delay: 0.7 }}
            >
              <div className="p-5 rounded-2xl w-72"
                style={{
                  background: CARD,
                  border: `1px solid ${ABORD}`,
                  boxShadow: `0 24px 60px ${AG(0.12)}, 0 4px 16px rgba(0,0,0,0.06)`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: MUTED }}>Prossima consulenza</p>
                <p className="font-bold text-xl mb-1" style={{ color: TEXT }}>Domani, 10:30</p>
                <p className="text-sm mb-4" style={{ color: MUTED }}>Dr.ssa Laura Ferretti</p>
                <div className="h-px mb-4" style={{ background: BORD }} />
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: MUTED }}>Filler Labbra · Studio A</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: AG(0.1), border: `1px solid ${ABORD}`, color: A }}>
                    Confermata
                  </span>
                </div>
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              </div>
            </motion.div>

            {/* Stats card */}
            <motion.div
              style={{ x: card2x, y: card2y, position: 'absolute', top: 200, right: 0 }}
              initial={{ opacity: 0, y: 60, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...spring, delay: 0.95 }}
            >
              <div className="p-5 rounded-2xl w-60"
                style={{
                  background: CARD,
                  border: `1px solid ${BORD}`,
                  boxShadow: `0 20px 50px rgba(0,0,0,0.08), 0 4px 12px ${AG(0.08)}`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Questo mese</p>
                <div className="flex gap-4 mb-4">
                  <div><p className="text-2xl font-bold" style={{ color: TEXT }}>247</p><p className="text-xs" style={{ color: MUTED }}>Prenotazioni</p></div>
                  <div><p className="text-2xl font-bold" style={{ color: A }}>98%</p><p className="text-xs" style={{ color: MUTED }}>Soddisfazione</p></div>
                </div>
                <div className="h-8 rounded-md overflow-hidden" style={{ background: AG(0.06) }}>
                  <svg viewBox="0 0 120 32" className="w-full h-full" preserveAspectRatio="none">
                    <polyline points="0,28 20,22 40,18 60,10 80,14 100,6 120,10"
                      fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" />
                    <polyline points="0,32 0,28 20,22 40,18 60,10 80,14 100,6 120,10 120,32"
                      fill={AG(0.15)} strokeWidth="0" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Treatment mini card */}
            <motion.div
              style={{ x: card3x, y: card3y, position: 'absolute', bottom: 40, left: 80 }}
              initial={{ opacity: 0, y: 40, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...spring, delay: 1.2 }}
            >
              <div className="p-4 rounded-xl w-52"
                style={{
                  background: CARD,
                  border: `1px solid ${BORD}`,
                  boxShadow: `0 12px 32px rgba(0,0,0,0.07)`,
                }}
              >
                <p className="font-semibold text-sm mb-0.5" style={{ color: TEXT }}>Botulino Frontale</p>
                <p className="text-xs mb-3" style={{ color: MUTED }}>45 min · Dr. Romano</p>
                <div className="h-px mb-3" style={{ background: BORD }} />
                <p className="font-bold text-base" style={{ color: A }}>€ 290</p>
              </div>
            </motion.div>

            {/* Orbit ring decoration */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
              style={{ border: `1px solid ${AG(0.1)}` }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none animate-spin-slow"
              style={{ border: `1px dashed ${AG(0.07)}` }} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${BG})` }} />
    </section>
  )
}

// ── TREATMENTS ────────────────────────────────────────────────
function TreatmentsClinic() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="trattamenti" className="section-padding" style={{ background: BG_ALT }}>
      <div className="container-max">
        <FadeUp className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: A }}>
            I Nostri Trattamenti
          </span>
        </FadeUp>
        <FadeUp delay={0.08} className="mb-12">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight tracking-tight" style={{ color: TEXT }}>
            Trattamenti certificati<br />per ogni obiettivo
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TREATMENTS.map((t, i) => {
            const isHov = hovered === t.id
            return (
              <FadeUp key={t.id} delay={i * 0.07}>
                <motion.div
                  onHoverStart={() => setHovered(t.id)}
                  onHoverEnd={() => setHovered(null)}
                  animate={{
                    borderColor: isHov ? A : BORD,
                    boxShadow: isHov
                      ? `0 12px 40px ${AG(0.12)}, 0 0 0 1px ${ABORD}`
                      : `0 2px 12px rgba(0,0,0,0.04)`,
                    y: isHov ? -4 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className="relative overflow-hidden p-5 rounded-2xl cursor-default"
                  style={{
                    background: CARD,
                    border: `1px solid ${BORD}`,
                  }}
                >
                  {/* Top shimmer line on hover */}
                  <motion.div
                    className="absolute top-0 inset-x-0 h-[2px]"
                    animate={{
                      background: isHov
                        ? `linear-gradient(90deg, transparent, ${A}, transparent)`
                        : 'transparent',
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Tag */}
                  {t.tag && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: AG(0.1), color: A, border: `1px solid ${ABORD}` }}>
                      {t.tag}
                    </span>
                  )}

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
                    style={{ background: isHov ? AG(0.12) : AG(0.07), transition: 'background 0.25s' }}>
                    {t.emoji}
                  </div>

                  <h3 className="font-display font-bold text-lg mb-1.5" style={{ color: TEXT }}>{t.name}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{t.desc}</p>

                  <div className="h-px mb-4" style={{ background: BORD }} />

                  <div className="flex items-center justify-between">
                    <span className="font-bold" style={{ color: A }}>{t.price}</span>
                    <span className="text-xs" style={{ color: MUTED }}>{t.dur}</span>
                  </div>

                  {/* Hover CTA */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isHov ? 1 : 0, y: isHov ? 0 : 6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3"
                  >
                    <button
                      onClick={() => openWhatsApp('generic')}
                      className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-all"
                      style={{ background: `linear-gradient(135deg, ${A}, #e8628a)`, boxShadow: `0 4px 16px ${AG(0.3)}` }}
                    >
                      Prenota questo trattamento →
                    </button>
                  </motion.div>
                </motion.div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── BOOKING WIDGET ─────────────────────────────────────────────
type BookingStep = 1 | 2 | 3 | 4

function BookingWidget() {
  const [step, setStep] = useState<BookingStep>(1)
  const [selectedTreatment, setSelectedTreatment] = useState<string>('')
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  function handleConfirm() {
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setStep(4) }, 1200)
  }
  function handleReset() {
    setStep(1)
    setSelectedTreatment('')
    setSelectedDay(0)
    setSelectedTime('')
    setName('')
    setPhone('')
  }

  const stepDefs = [
    { n: 1, label: 'Trattamento' },
    { n: 2, label: 'Orario' },
    { n: 3, label: 'Conferma' },
  ]

  const stepVariants = {
    enter:  { opacity: 0, x: 40,  filter: 'blur(4px)' },
    center: { opacity: 1, x: 0,   filter: 'blur(0px)' },
    exit:   { opacity: 0, x: -40, filter: 'blur(4px)' },
  }

  return (
    <section ref={sectionRef} style={{ background: BG_DARK, borderTop: `1px solid rgba(196,96,122,0.12)`, borderBottom: `1px solid rgba(196,96,122,0.12)` }}>
      <div className="container-max py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left — description */}
          <motion.div
            initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={fade(0.1)}
            className="lg:w-80 flex-shrink-0"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-3 block" style={{ color: A }}>
              Prenota online
            </span>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-white mb-4">
              La tua<br />consulenza<br />
              <span style={{ color: A }}>in 3 passi.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Scegli il trattamento, seleziona data e orario, e conferma.
              Ricevi la conferma su WhatsApp.
            </p>

            {/* Step list */}
            <div className="flex flex-col gap-4">
              {stepDefs.map((s) => {
                const done = step > s.n
                const active = step === s.n
                return (
                  <div key={s.n} className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        background: done ? '#22c55e' : active ? A : 'rgba(255,255,255,0.08)',
                        boxShadow: active ? `0 0 16px ${AG(0.5)}` : 'none',
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    >
                      {done ? '✓' : s.n}
                    </motion.div>
                    <span className="text-sm font-medium" style={{ color: active ? '#fff' : done ? '#22c55e' : 'rgba(255,255,255,0.4)' }}>
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — widget */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={fade(0.2)}
            className="flex-1 w-full min-h-[420px] rounded-2xl overflow-hidden relative"
            style={{
              background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(196,96,122,0.18)`,
              boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 40px ${AG(0.05)}`,
            }}
          >
            {/* Progress bar */}
            {step < 4 && (
              <div className="h-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5, ease }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${A}, #e8628a)`, boxShadow: `0 0 10px ${AG(0.6)}` }}
                />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.35, ease }}>
                    <h3 className="font-display text-xl font-bold text-white mb-2">Quale trattamento?</h3>
                    <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>Seleziona il trattamento che desideri prenotare.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {TREATMENTS.map((t) => {
                        const sel = selectedTreatment === t.id
                        return (
                          <motion.button
                            key={t.id}
                            onClick={() => setSelectedTreatment(t.id)}
                            whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
                            className="flex items-center gap-3 p-3.5 rounded-xl text-left transition-all"
                            style={{
                              background: sel ? AG(0.15) : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${sel ? ABORD : 'rgba(255,255,255,0.07)'}`,
                              boxShadow: sel ? `0 0 20px ${AG(0.15)}` : 'none',
                            }}
                          >
                            <span className="text-xl">{t.emoji}</span>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-white leading-tight">{t.name}</p>
                              <p className="text-xs mt-0.5" style={{ color: sel ? A : 'rgba(255,255,255,0.35)' }}>{t.price}</p>
                            </div>
                            {sel && (
                              <motion.span
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="ml-auto text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center text-white flex-shrink-0"
                                style={{ background: A }}
                              >✓</motion.span>
                            )}
                          </motion.button>
                        )
                      })}
                    </div>
                    <motion.button
                      onClick={() => selectedTreatment && setStep(2)}
                      whileHover={{ scale: selectedTreatment ? 1.02 : 1 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl font-semibold text-white transition-all"
                      style={{
                        background: selectedTreatment ? `linear-gradient(135deg, ${A}, #e8628a)` : 'rgba(255,255,255,0.06)',
                        color: selectedTreatment ? '#fff' : 'rgba(255,255,255,0.3)',
                        cursor: selectedTreatment ? 'pointer' : 'not-allowed',
                        boxShadow: selectedTreatment ? `0 4px 20px ${AG(0.4)}` : 'none',
                      }}
                    >
                      Avanti →
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.35, ease }}>
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setStep(1)} className="text-xs font-medium" style={{ color: A }}>← Indietro</button>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-1">Scegli data e orario</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: AG(0.15), color: A, border: `1px solid ${ABORD}` }}>
                        ✓ {TREATMENTS.find(t => t.id === selectedTreatment)?.name}
                      </span>
                    </div>

                    {/* Days */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                      {DAYS.map((d, i) => {
                        const sel = selectedDay === i
                        return (
                          <motion.button
                            key={i} onClick={() => setSelectedDay(i)}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl font-medium text-sm"
                            style={{
                              background: sel ? AG(0.18) : 'rgba(255,255,255,0.04)',
                              border: `1px solid ${sel ? ABORD : 'rgba(255,255,255,0.07)'}`,
                              color: sel ? '#fff' : 'rgba(255,255,255,0.4)',
                              boxShadow: sel ? `0 0 16px ${AG(0.2)}` : 'none',
                            }}
                          >
                            <span className="text-xs font-semibold uppercase">{d.label}</span>
                            <span className="text-lg font-bold" style={{ color: sel ? A : 'inherit' }}>{d.num}</span>
                          </motion.button>
                        )
                      })}
                    </div>

                    {/* Times */}
                    <div className="grid grid-cols-3 gap-2 mb-8">
                      {TIMES.map((t) => {
                        const sel = selectedTime === t
                        return (
                          <motion.button
                            key={t} onClick={() => setSelectedTime(t)}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            className="py-3 rounded-xl font-semibold text-sm"
                            style={{
                              background: sel ? AG(0.18) : 'rgba(255,255,255,0.04)',
                              border: `1px solid ${sel ? ABORD : 'rgba(255,255,255,0.07)'}`,
                              color: sel ? '#fff' : 'rgba(255,255,255,0.4)',
                              boxShadow: sel ? `0 0 16px ${AG(0.2)}` : 'none',
                            }}
                          >
                            {t}
                          </motion.button>
                        )
                      })}
                    </div>

                    <motion.button
                      onClick={() => selectedTime && setStep(3)}
                      whileHover={{ scale: selectedTime ? 1.02 : 1 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl font-semibold text-white"
                      style={{
                        background: selectedTime ? `linear-gradient(135deg, ${A}, #e8628a)` : 'rgba(255,255,255,0.06)',
                        color: selectedTime ? '#fff' : 'rgba(255,255,255,0.3)',
                        cursor: selectedTime ? 'pointer' : 'not-allowed',
                        boxShadow: selectedTime ? `0 4px 20px ${AG(0.4)}` : 'none',
                      }}
                    >
                      Conferma orario →
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.35, ease }}>
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setStep(2)} className="text-xs font-medium" style={{ color: A }}>← Indietro</button>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-6">I tuoi dati</h3>

                    {/* Summary mini card */}
                    <div className="p-4 rounded-xl mb-6" style={{ background: AG(0.08), border: `1px solid ${ABORD}` }}>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div><p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Trattamento</p>
                          <p className="text-white font-semibold leading-tight">{TREATMENTS.find(t => t.id === selectedTreatment)?.name}</p></div>
                        <div><p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Data</p>
                          <p className="text-white font-semibold">{DAYS[selectedDay]?.label} {DAYS[selectedDay]?.num}</p></div>
                        <div><p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Orario</p>
                          <p className="font-bold" style={{ color: A }}>{selectedTime}</p></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-6">
                      {[
                        { label: 'Nome e cognome', value: name, setter: setName, placeholder: 'Mario Rossi', type: 'text' },
                        { label: 'WhatsApp', value: phone, setter: setPhone, placeholder: '+39 333 000 0000', type: 'tel' },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'rgba(255,255,255,0.4)' }}>{field.label}</label>
                          <input
                            type={field.type}
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[rgba(255,255,255,0.2)] outline-none transition-all"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: `1px solid rgba(255,255,255,0.07)`,
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = ABORD; e.currentTarget.style.boxShadow = `0 0 0 3px ${AG(0.1)}` }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
                          />
                        </div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => name.trim() && phone.trim() && handleConfirm()}
                      disabled={submitting || !name.trim() || !phone.trim()}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl font-semibold text-white relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${A}, #e8628a)`,
                        boxShadow: `0 4px 24px ${AG(0.45)}`,
                        opacity: !name.trim() || !phone.trim() ? 0.5 : 1,
                      }}
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Invio in corso...
                        </span>
                      ) : 'Conferma prenotazione →'}
                    </motion.button>
                    <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Riceverai una conferma su WhatsApp entro 5 minuti.
                    </p>
                  </motion.div>
                )}

                {/* STEP 4 — SUCCESS */}
                {step === 4 && (
                  <motion.div key="s4" variants={stepVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.4, ease }}
                    className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                      transition={{ ...spring, delay: 0.1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: AG(0.15), border: `2px solid ${A}`, boxShadow: `0 0 40px ${AG(0.3)}` }}
                    >
                      <span className="text-3xl font-bold" style={{ color: A }}>✓</span>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={fade(0.2)}
                      className="font-display text-2xl font-bold text-white mb-2"
                    >
                      Prenotazione confermata!
                    </motion.h3>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fade(0.35)}
                      className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Riceverai un messaggio su WhatsApp a breve.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={fade(0.45)}
                      className="p-4 rounded-xl mb-8 text-left"
                      style={{ background: AG(0.08), border: `1px solid ${ABORD}` }}>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div><p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Trattamento</p>
                          <p className="text-white font-semibold leading-tight">{TREATMENTS.find(t => t.id === selectedTreatment)?.name}</p></div>
                        <div><p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Data</p>
                          <p className="text-white font-semibold">{DAYS[selectedDay]?.label} {DAYS[selectedDay]?.num}</p></div>
                        <div><p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Orario</p>
                          <p className="font-bold" style={{ color: A }}>{selectedTime}</p></div>
                      </div>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fade(0.55)}
                      onClick={handleReset}
                      className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      ← Effettua un'altra prenotazione
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── DASHBOARD PREVIEW ──────────────────────────────────────────
const ROWS = [
  { name: 'Sofia Ricci',    service: 'Filler Labbra',      time: '09:30', status: 'ok'  },
  { name: 'Marco Esposito', service: 'Botulino',            time: '10:15', status: 'ok'  },
  { name: 'Giulia Neri',    service: 'Laser CO₂',           time: '11:00', status: 'wait'},
  { name: 'Anna Mancini',   service: 'Biorivitalizzazione', time: '14:30', status: 'ok'  },
  { name: 'Luca Ferrari',   service: 'Criolipolisi',        time: '16:00', status: 'ok'  },
]

const statusMap = {
  ok:   { label: 'Confermata', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.2)',  text: '#16a34a' },
  wait: { label: 'In attesa',  bg: 'rgba(234,179,8,0.08)',  border: 'rgba(234,179,8,0.2)',  text: '#b45309' },
}

function DashboardPreview() {
  const { ref: r1, val: v1 } = useCounter(247)
  const { ref: r2, val: v2 } = useCounter(24800)
  const { ref: r3, val: v3 } = useCounter(98)

  return (
    <section className="section-padding" style={{ background: BG }}>
      <div className="container-max">
        <FadeUp className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: A }}>Sistema Live</span>
        </FadeUp>
        <FadeUp delay={0.08} className="mb-12">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight tracking-tight" style={{ color: TEXT }}>
            Il tuo sistema<br />in tempo reale
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="rounded-2xl overflow-hidden" style={{
            border: `1px solid ${BORD}`,
            boxShadow: `0 20px 60px ${AG(0.06)}, 0 4px 16px rgba(0,0,0,0.04)`,
          }}>
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4" style={{ background: BG_ALT, borderBottom: `1px solid ${BORD}` }}>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-wider" style={{ color: TEXT }}>AURORA</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: A, boxShadow: `0 0 6px ${AG(0.5)}` }} />
                <span className="text-xs font-semibold" style={{ color: A }}>CLINIC</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: '0 0 6px #22c55e' }} />
                <span className="text-xs" style={{ color: MUTED }}>Sistema attivo</span>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 divide-x" style={{ borderBottom: `1px solid ${BORD}` }}>
              {[
                { label: 'Prenotazioni oggi', valRef: r1, val: v1, suffix: '' },
                { label: 'Fatturato mese',    valRef: r2, val: v2, prefix: '€', suffix: '' },
                { label: 'Soddisfazione',     valRef: r3, val: v3, suffix: '%' },
              ].map((kpi, i) => (
                <div key={kpi.label} className="px-6 py-5" style={{ borderColor: BORD, background: CARD }}>
                  <p className="text-xs mb-2" style={{ color: MUTED }}>{kpi.label}</p>
                  <p className="font-display text-3xl font-extrabold" style={{ color: i === 0 ? A : TEXT }}>
                    <span ref={kpi.valRef}>
                      {kpi.prefix}{i === 1 ? (kpi.val >= 1000 ? `${(kpi.val / 1000).toFixed(1)}k` : kpi.val) : kpi.val}{kpi.suffix}
                    </span>
                  </p>
                  <p className="text-xs mt-1 font-semibold" style={{ color: '#16a34a' }}>↑ +12% vs. mese scorso</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto" style={{ background: CARD }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: BG_ALT, borderBottom: `1px solid ${BORD}` }}>
                    {['Cliente', 'Trattamento', 'Orario', 'Stato'].map((h) => (
                      <th key={h} className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: MUTED }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r, i) => {
                    const s = statusMap[r.status as keyof typeof statusMap]
                    return (
                      <motion.tr
                        key={r.name}
                        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4, ease }}
                        viewport={{ once: true }}
                        style={{ borderBottom: `1px solid ${BORD}` }}
                      >
                        <td className="px-6 py-4 font-medium" style={{ color: TEXT }}>{r.name}</td>
                        <td className="px-6 py-4" style={{ color: MUTED }}>{r.service}</td>
                        <td className="px-6 py-4 font-semibold" style={{ color: MUTED }}>{r.time}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
                            {s.label}
                          </span>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ── TEAM ──────────────────────────────────────────────────────
function TeamClinic() {
  return (
    <section className="section-padding" style={{ background: BG_ALT, borderTop: `1px solid ${BORD}` }}>
      <div className="container-max">
        <FadeUp className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: A }}>Il Nostro Team</span>
        </FadeUp>
        <FadeUp delay={0.08} className="mb-12">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight tracking-tight" style={{ color: TEXT }}>
            I medici<br />che ti seguono
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DOCTORS.map((d, i) => (
            <FadeUp key={d.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, boxShadow: `0 20px 50px ${AG(0.1)}, 0 0 0 1px ${ABORD}` }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-2xl"
                style={{ background: CARD, border: `1px solid ${BORD}`, boxShadow: `0 4px 16px rgba(0,0,0,0.04)` }}
              >
                {/* Avatar area */}
                <div className="relative h-52 flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${AG(0.07)} 0%, rgba(232,162,180,0.05) 100%)` }}>
                  {/* Initials circle */}
                  <div className="w-20 h-20 rounded-full flex items-center justify-center font-display font-bold text-xl text-white"
                    style={{ background: `linear-gradient(135deg, ${A}, #e8628a)`, boxShadow: `0 8px 24px ${AG(0.25)}` }}>
                    {d.initials}
                  </div>
                  {/* Decorative rings */}
                  <div className="absolute w-36 h-36 rounded-full pointer-events-none"
                    style={{ border: `1px solid ${AG(0.12)}` }} />
                  <div className="absolute w-48 h-48 rounded-full pointer-events-none"
                    style={{ border: `1px solid ${AG(0.06)}` }} />
                </div>

                <div className="p-4">
                  <div className="w-8 h-0.5 rounded-full mb-3" style={{ background: A }} />
                  <h3 className="font-display font-bold text-sm leading-tight mb-1" style={{ color: TEXT }}>{d.name}</h3>
                  <p className="text-xs font-semibold mb-1" style={{ color: A }}>{d.spec}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{d.exp} di esperienza</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FINAL CTA ─────────────────────────────────────────────────
function FinalCTAClinic() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: BG_DARK }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${AG(0.12)} 0%, transparent 65%)` }} />
      </div>

      {/* Orbital rings */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden
      >
        <div className="w-[560px] h-[560px] rounded-full animate-spin-slow" style={{ border: `1px solid ${AG(0.08)}` }} />
        <div className="absolute inset-10 rounded-full animate-spin-reverse" style={{ border: `1px dashed ${AG(0.05)}` }} />
        <div className="absolute inset-20 rounded-full" style={{ border: `1px solid ${AG(0.03)}` }} />
      </motion.div>

      <div className="container-max relative z-10 text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest"
          style={{ background: AG(0.1), border: `1px solid ${ABORD}`, color: A }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: A, boxShadow: `0 0 6px ${AG(0.6)}` }} />
          Consulto gratuito — Risposta in 24h
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={fade(0.15)}
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: A }}
        >
          Aurora Clinic
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={fade(0.2)}
          className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-tight tracking-tight text-white mb-4"
        >
          Non è un sito.
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${A} 0%, #e8628a 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            È un sistema.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={fade(0.35)}
          className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Ogni richiesta trasformata in consulenza. Ogni paziente accompagnata.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={fade(0.45)}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            onClick={() => openWhatsApp('generic')}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl font-bold text-white text-base"
            style={{
              background: `linear-gradient(135deg, ${A}, #e8628a)`,
              boxShadow: `0 8px 40px ${AG(0.4)}, 0 0 60px ${AG(0.12)}`,
            }}
          >
            Prenota ora
          </motion.button>
          <motion.button
            onClick={() => openWhatsApp('demo')}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="btn-ghost px-8 py-4 text-base"
            style={{ borderColor: ABORD, color: A }}
          >
            Scopri il sistema →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// ── MAIN ──────────────────────────────────────────────────────
export default function ClinicMilano() {
  return (
    <div className="min-h-screen" style={{ background: BG }}>
      <DemoNav
        brand="AURORA CLINIC"
        accent={A}
        ctaLabel="Prenota"
        onCta={() => openWhatsApp('generic')}
        light
      />
      <HeroClinic />
      <TreatmentsClinic />
      <BookingWidget />
      <DashboardPreview />
      <TeamClinic />
      <FinalCTAClinic />
      <PoweredByZoven accent={A} onCta={() => openWhatsApp('generic')} />
    </div>
  )
}
