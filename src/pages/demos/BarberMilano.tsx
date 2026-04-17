import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import DemoNav from '../../components/demo/DemoNav'
import PoweredByZoven from '../../components/demo/PoweredByZoven'
import BarberScene from '../../components/demo/scenes/BarberScene'

const BG = '#080808'
const ACCENT = '#e8e0d0'
const MUTED = '#666666'
const MUTED2 = '#444444'

const waBase = 'https://wa.me/393505383769?text='
const msgTaglio = encodeURIComponent('Ciao NERO DISTRETTO! Vorrei prenotare un taglio. Quando avete disponibilità questa settimana?')
const msgInfo = encodeURIComponent('Ciao! Ho visto il vostro sito e vorrei sapere di più sui vostri servizi e prezzi.')

const services = [
  {
    name: 'Classic Cut',
    price: '€28',
    duration: '45 min',
    desc: 'Il taglio su misura per la tua forma viso. Analisi del viso, taglio personalizzato, finishing professionale.',
    popular: false,
  },
  {
    name: 'Fade Maestro',
    price: '€32',
    duration: '50 min',
    desc: 'Degradé impeccabile eseguito a mano con transizioni ultra-morbide. La firma di NERO DISTRETTO.',
    popular: true,
  },
  {
    name: 'Barba Scultura',
    price: '€22',
    duration: '30 min',
    desc: 'Definizione, rasatura e styling della barba con oli essenziali e strumenti professionali.',
    popular: false,
  },
  {
    name: 'Royal Shave',
    price: '€35',
    duration: '40 min',
    desc: 'Rasatura tradizionale con lame aperte, asciugamani caldi e balsami premium. Un rituale.',
    popular: false,
  },
  {
    name: 'Premium Combo',
    price: '€52',
    duration: '80 min',
    desc: 'Taglio + Barba Scultura + Styling completo. La scelta di chi vuole il meglio, ogni volta.',
    popular: true,
  },
]

const team = [
  {
    initial: 'M',
    name: 'Marco B.',
    role: 'Master Barber',
    exp: '12 anni',
    desc: 'Specializzato in fade e texturizzazioni. Ha lavorato a Milano, Londra e New York prima di fondare NERO.',
  },
  {
    initial: 'L',
    name: 'Luca D.',
    role: 'Senior Stylist',
    exp: '8 anni',
    desc: 'Esperto in tagli classici e beard styling. Preferisce l\'ascolto alla fretta. Il cliente prima di tutto.',
  },
  {
    initial: 'A',
    name: 'Alessio C.',
    role: 'Barber Artist',
    exp: '5 anni',
    desc: 'Specialist in skin fade e disegni su capelli. Porta l\'arte nel barbiere, ogni taglio è unico.',
  },
]

const lookbook = [
  { label: 'Skin Fade', tag: 'Signature', grad: 'linear-gradient(135deg,#1a1a1a,#2a2a2a)' },
  { label: 'Classic Pompadour', tag: 'Evergreen', grad: 'linear-gradient(135deg,#141414,#222)' },
  { label: 'Textured Crop', tag: 'Trending', grad: 'linear-gradient(135deg,#1c1c1c,#2e2e2e)' },
  { label: 'Hard Part', tag: 'Sharp', grad: 'linear-gradient(135deg,#111,#1e1e1e)' },
  { label: 'Barba Lunga', tag: 'Maestro', grad: 'linear-gradient(135deg,#161616,#242424)' },
  { label: 'Buzz Cut', tag: 'Bold', grad: 'linear-gradient(135deg,#181818,#262626)' },
]

const reviews = [
  {
    name: 'Andrea P.',
    rating: 5,
    text: 'Il migliore della zona, senza dubbio. Marco capisce immediatamente cosa vuoi e lo esegue alla perfezione. Dopo anni di barbieri mediocri, ho trovato casa.',
    style: 'Fade Maestro',
  },
  {
    name: 'Matteo G.',
    rating: 5,
    text: 'Finalmente un posto dove capiscono davvero cosa vuoi. Ho spiegato il taglio in 30 secondi e il risultato era esattamente quello. Raro trovare questa competenza.',
    style: 'Premium Combo',
  },
  {
    name: 'Francesco L.',
    rating: 5,
    text: 'Royal Shave da manuale. L\'asciugamano caldo, il profumo dei balsami, la precisione della lama. Non tornerò mai più da un barbiere normale.',
    style: 'Royal Shave',
  },
]

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function BarberMilano() {
  const [activeService, setActiveService] = useState<number | null>(null)

  const openTaglio = () => window.open(waBase + msgTaglio, '_blank')
  const openInfo = () => window.open(waBase + msgInfo, '_blank')
  const openZoven = () =>
    window.open('https://wa.me/393505383769?text=' + encodeURIComponent('Ciao ZOVEN! Ho visto la demo di NERO DISTRETTO e voglio qualcosa di simile per la mia attività. Possiamo parlarne?'), '_blank')

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div style={{ background: BG, color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <DemoNav brand="NERO DISTRETTO" accent={ACCENT} ctaLabel="Prenota" onCta={openTaglio} />
      <PoweredByZoven accent={ACCENT} onCta={openZoven} />

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: 90 }}
        ref={heroRef}
      >
        {/* Fine grain grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* 3D Canvas — background centered element */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none" style={{ right: '-5%' }}>
          <div style={{ width: 480, height: 480, opacity: 0.55 }}>
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 40 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <BarberScene />
              </Suspense>
            </Canvas>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 680 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10"
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(232,224,208,0.07)',
                  color: ACCENT,
                  border: '1px solid rgba(232,224,208,0.15)',
                }}
              >
                Barbiere d'eccellenza · Brera, Milano
              </span>
            </motion.div>

            {['TAGLIO.', 'BARBA.', 'IDENTITÀ.'].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%', opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease }}
                  className="font-display leading-none font-black"
                  style={{
                    fontSize: 'clamp(3.5rem,8vw,7.5rem)',
                    letterSpacing: '-0.02em',
                    color: i === 2 ? 'rgba(255,255,255,0.25)' : '#ffffff',
                    WebkitTextStroke: i === 2 ? '1px rgba(255,255,255,0.2)' : 'none',
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-base md:text-lg leading-relaxed mt-8 mb-10"
              style={{ color: MUTED, maxWidth: 480 }}
            >
              Il tuo stile affilato al millimetro. Artigianato moderno,
              cura dei dettagli, zero compromessi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={openTaglio}
                className="px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-100"
                style={{ background: ACCENT, color: '#080808' }}
              >
                Prenota il tuo taglio
              </button>
              <button
                onClick={openInfo}
                className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase border transition-all duration-300"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
              >
                Vedi i servizi
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="flex items-center gap-10 mt-12"
            >
              {[['1.800+', 'Tagli eseguiti'], ['4.9★', 'Su Google'], ['3', 'Mastri barbieri']].map(([num, lbl]) => (
                <div key={lbl}>
                  <p className="text-2xl font-extrabold font-display" style={{ color: ACCENT }}>{num}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '100px 0', background: '#0c0c0c' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <ServiceSectionHeader />
          <div className="flex flex-col gap-3">
            {services.map((s, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={s.name}
                  ref={ref}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="relative group cursor-pointer"
                  onClick={() => setActiveService(activeService === i ? null : i)}
                  style={{
                    background: activeService === i ? 'rgba(232,224,208,0.05)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${activeService === i ? 'rgba(232,224,208,0.2)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                >
                  <div className="flex items-center justify-between p-6 md:p-7">
                    <div className="flex items-center gap-5">
                      <span
                        className="text-xs font-bold tracking-widest"
                        style={{ color: 'rgba(255,255,255,0.2)', width: 24 }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-3 mb-0.5">
                          <h3 className="text-lg font-bold text-white">{s.name}</h3>
                          {s.popular && (
                            <span
                              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{ background: `rgba(232,224,208,0.1)`, color: ACCENT }}
                            >
                              Più richiesto
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: MUTED }}>{s.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="text-2xl font-extrabold font-display" style={{ color: ACCENT }}>{s.price}</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                          color: 'rgba(255,255,255,0.3)',
                          transform: activeService === i ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeService === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <div className="px-6 md:px-7 pb-6 pt-4">
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.desc}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); openTaglio() }}
                            className="mt-4 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:opacity-90"
                            style={{ background: ACCENT, color: '#080808' }}
                          >
                            Prenota {s.name}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <TeamSectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {team.map((t, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={t.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.1, ease }}
                  className="p-7 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-6"
                    style={{ background: `rgba(232,224,208,0.06)`, color: ACCENT, fontFamily: 'serif' }}
                  >
                    {t.initial}
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">{t.name}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>{t.role}</span>
                    <span className="text-xs" style={{ color: MUTED }}>{t.exp} di esperienza</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{t.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK ── */}
      <section style={{ padding: '80px 0', background: '#0c0c0c' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <LookbookSectionHeader />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {lookbook.map((item, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={item.label}
                  ref={ref}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.06, ease }}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ aspectRatio: '3/4', background: item.grad }}
                >
                  {/* Abstract lines for visual texture */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        border: '1px solid rgba(232,224,208,0.08)',
                      }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'rgba(232,224,208,0.04)' }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest mb-1 block"
                      style={{ color: 'rgba(232,224,208,0.4)' }}
                    >
                      {item.tag}
                    </span>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <ReviewSectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {reviews.map((r, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={r.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.1, ease }}
                  className="p-7 rounded-2xl flex flex-col"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <span key={k} style={{ color: ACCENT, fontSize: 15 }}>★</span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    "{r.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black"
                      style={{ background: 'rgba(232,224,208,0.1)', color: ACCENT }}
                    >
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{r.name}</p>
                      <p className="text-xs" style={{ color: MUTED }}>{r.style}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        style={{
          padding: '120px 0',
          background: '#0a0a0a',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <FinalCTASectionHeader ACCENT={ACCENT} MUTED={MUTED} onCta={openTaglio} />
        </div>
      </section>

      {/* Footer strip */}
      <div style={{ padding: '28px 0', textAlign: 'center' }}>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
          © 2025 NERO DISTRETTO · Via Brera 28, Milano · P.IVA 09876543210
        </p>
      </div>
    </div>
  )
}

// ── Sub-section headers ──────────────────────────────────────

function ServiceSectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="mb-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#e8e0d0' }}>Servizi &amp; Prezzi</p>
      <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white">
        Scegli il tuo servizio.
      </h2>
    </motion.div>
  )
}

function TeamSectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#e8e0d0' }}>Chi siamo</p>
      <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white">
        I mastri barbieri.
      </h2>
    </motion.div>
  )
}

function LookbookSectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#e8e0d0' }}>Portfolio</p>
      <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white">
        Il nostro stile.
      </h2>
    </motion.div>
  )
}

function ReviewSectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#e8e0d0' }}>Google Reviews</p>
      <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white">
        Loro hanno scelto NERO.
      </h2>
    </motion.div>
  )
}

function FinalCTASectionHeader({ ACCENT, MUTED, onCta }: { ACCENT: string; MUTED: string; onCta: () => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-none mb-6">
        PRENOTA.<br />
        <span style={{ color: ACCENT }}>ARRIVA PUNTUALE.</span>
      </h2>
      <p className="text-base leading-relaxed mb-10" style={{ color: MUTED }}>
        Disponibilità immediata. Risposta su WhatsApp entro 1 ora.
        Il tuo taglio ti aspetta.
      </p>
      <button
        onClick={onCta}
        className="px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-100"
        style={{ background: ACCENT, color: '#080808' }}
      >
        Prenota ora su WhatsApp
      </button>
      <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
        Cancellazione gratuita fino a 2 ore prima
      </p>
    </motion.div>
  )
}
