import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useInView } from 'framer-motion'
import DemoNav from '../../components/demo/DemoNav'
import PoweredByZoven from '../../components/demo/PoweredByZoven'
import BeautyScene from '../../components/demo/scenes/BeautyScene'

const BG = '#0c0a10'
const ACCENT = '#c9a882'
const ROSE = '#e8b4c0'
const MUTED = '#9a8892'

const waBase = 'https://wa.me/393505383769?text='
const msgConsulenza = encodeURIComponent('Ciao LUNEA STUDIO! Vorrei prenotare una consulenza per capire qual è il trattamento più adatto a me.')
const msgDemo = encodeURIComponent('Ciao! Ho visto il vostro sito e vorrei sapere di più sui vostri trattamenti estetici.')

const services = [
  {
    name: 'Laser Viso',
    desc: 'Ringiovanimento cutaneo e riduzione delle macchie solari con tecnologia laser di ultima generazione.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    name: 'Epilazione Laser',
    desc: 'Tecnologia diodo a 808nm per risultati permanenti su tutti i fototipi. Protocollo personalizzato.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22V8M12 8l-3 3M12 8l3 3M5 12C5 8.13 8.13 5 12 5s7 3.13 7 7" />
        <path d="M3 19h18" />
      </svg>
    ),
  },
  {
    name: 'Peeling Chimico',
    desc: 'Esfoliazione profonda con acidi certificati. Rimuove le imperfezioni e uniforma il tono della pelle.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
  },
  {
    name: 'Biorivitalizzazione',
    desc: 'Iniezioni di acido ialuronico per un\'idratazione profonda e un effetto rimpolpante immediato.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22c4.97 0 9-3.58 9-8 0-3.73-4.5-8-9-13C7.5 6 3 10.27 3 14c0 4.42 4.03 8 9 8z" />
      </svg>
    ),
  },
  {
    name: 'Trattamento Corpo',
    desc: 'Protocolli di rassodamento, rimodellamento e trattamento della cellulite con tecnologie avanzate.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: 'Radiofrequenza',
    desc: 'Lifting non invasivo con radiofrequenza monopolare. Tonifica i tessuti e stimola il collagene.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
]

const trust = [
  {
    title: 'Certificazione Medica',
    desc: 'Tutti i trattamenti sono eseguiti da medici estetici e operatori certificati con anni di specializzazione.',
  },
  {
    title: 'Tecnologia Avanzata',
    desc: 'Utilizziamo solo macchinari di ultima generazione, certificati CE e approvati dal Ministero della Salute.',
  },
  {
    title: 'Protocolli Personalizzati',
    desc: 'Ogni percorso nasce da una consulenza approfondita. Non esiste una soluzione uguale per tutti.',
  },
]

const testimonials = [
  {
    name: 'Sofia M.',
    location: 'Milano',
    text: 'Finalmente ho trovato un centro dove il risultato è garantito. Dopo 5 sedute di laser viso la mia pelle è completamente trasformata. La consulenza iniziale è stata molto dettagliata.',
    service: 'Laser Viso',
    rating: 5,
  },
  {
    name: 'Claudia R.',
    location: 'Monza',
    text: 'Professionalità e discrezione assoluta. Ho fatto l\'epilazione laser completa e sono commossa dai risultati. Il team è straordinario e mi ha messa sempre a mio agio.',
    service: 'Epilazione Laser',
    rating: 5,
  },
  {
    name: 'Valentina A.',
    location: 'Milano',
    text: 'Il trattamento di biorivitalizzazione ha letteralmente ringiovanito il mio viso. Risultati visibili sin dalla prima seduta. Lo consiglio a tutte le mie amiche.',
    service: 'Biorivitalizzazione',
    rating: 5,
  },
]

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function BeautyMilano() {
  const openConsulenza = () => window.open(waBase + msgConsulenza, '_blank')
  const openDemo = () => window.open(waBase + msgDemo, '_blank')
  const openZoven = () =>
    window.open('https://wa.me/393505383769?text=' + encodeURIComponent('Ciao ZOVEN! Ho visto la demo di LUNEA STUDIO e voglio qualcosa di simile per la mia attività. Possiamo parlarne?'), '_blank')

  return (
    <div style={{ background: BG, color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <DemoNav brand="LUNEA STUDIO" accent={ACCENT} ctaLabel="Prenota" onCta={openConsulenza} />
      <PoweredByZoven accent={ACCENT} onCta={openZoven} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: 90 }}>
        {/* Ambient gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', background: `radial-gradient(ellipse 80% 80% at 80% 40%, rgba(201,168,130,0.12) 0%, transparent 70%)` }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40%', height: '60%', background: `radial-gradient(ellipse 60% 60% at 20% 80%, rgba(232,180,192,0.08) 0%, transparent 70%)` }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="flex items-center gap-2 mb-8"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: ACCENT }}
                >
                  Medicina Estetica Avanzata · Milano
                </span>
              </motion.div>

              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease }}
                  className="font-display leading-none"
                  style={{ fontSize: 'clamp(3rem,6vw,5.5rem)', fontWeight: 900 }}
                >
                  La tua bellezza.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease }}
                  className="font-display leading-none"
                  style={{
                    fontSize: 'clamp(3rem,6vw,5.5rem)',
                    fontWeight: 900,
                    color: ACCENT,
                  }}
                >
                  Il tuo rituale.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-base md:text-lg leading-relaxed mb-10"
                style={{ color: MUTED, maxWidth: 480 }}
              >
                Trattamenti laser certificati e protocolli estetici d'eccellenza.
                Nel cuore di Milano, per chi non scende a compromessi.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={openConsulenza}
                  className="px-8 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-100"
                  style={{ background: ACCENT, color: '#0c0a10', boxShadow: `0 8px 32px ${ACCENT}40` }}
                >
                  Prenota una consulenza
                </button>
                <button
                  onClick={openDemo}
                  className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase border transition-all duration-300 hover:border-[#c9a882] hover:text-[#c9a882]"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                >
                  Scopri i trattamenti
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-6 mt-10"
              >
                {['Medici certificati', 'Tecnologia avanzata', 'Risultati garantiti'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <span style={{ color: ACCENT, fontSize: 14 }}>✓</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{t}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              style={{ height: 480, position: 'relative' }}
            >
              <Canvas
                camera={{ position: [0, 0, 5.5], fov: 42 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
              >
                <Suspense fallback={null}>
                  <BeautyScene />
                </Suspense>
              </Canvas>

              {/* Floating info pill */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 left-6 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: 'rgba(12,10,16,0.85)',
                  border: `1px solid ${ACCENT}30`,
                  backdropFilter: 'blur(12px)',
                  color: ACCENT,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
                }}
              >
                ✦ &nbsp;Più di 2.400 trattamenti eseguiti
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <Section>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>
                I nostri trattamenti
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white leading-tight">
                Protocolli d'eccellenza
              </h2>
            </div>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={s.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.07, ease }}
                  className="p-7 rounded-2xl group hover:-translate-y-1 transition-transform duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid rgba(201,168,130,0.12)`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `rgba(201,168,130,0.1)`, color: ACCENT }}
                  >
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1">
                    <span className="text-xs font-semibold" style={{ color: ACCENT }}>Scopri →</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHY LUNEA ── */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Section>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ROSE }}>
                Perché sceglierci
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white leading-tight mb-6">
                Non un centro estetico.<br />Il tuo percorso.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: MUTED }}>
                LUNEA STUDIO nasce dalla convinzione che ogni pelle sia unica. 
                Ogni protocollo è costruito su misura, con risultati misurabili e documentati 
                nel tempo.
              </p>
              <button
                onClick={openConsulenza}
                className="px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:opacity-90"
                style={{ background: `rgba(201,168,130,0.12)`, color: ACCENT, border: `1px solid rgba(201,168,130,0.25)` }}
              >
                Prenota la tua consulenza gratuita
              </button>
            </Section>

            <div className="flex flex-col gap-5">
              {trust.map((t, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true, margin: '-40px' })
                return (
                  <motion.div
                    key={t.title}
                    ref={ref}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.1, ease }}
                    className="flex gap-5 p-6 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid rgba(201,168,130,0.1)` }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold mt-0.5"
                      style={{ background: `rgba(201,168,130,0.12)`, color: ACCENT }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">{t.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{t.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <Section>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>
                Recensioni
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white">
                Loro ci hanno scelto
              </h2>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={t.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.1, ease }}
                  className="p-7 rounded-2xl flex flex-col"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(201,168,130,0.1)` }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <span key={k} style={{ color: ACCENT, fontSize: 16 }}>★</span>
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    "{t.text}"
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `rgba(201,168,130,0.2)`, color: ACCENT }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs" style={{ color: MUTED }}>{t.location} · {t.service}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <Section>
            <motion.div
              className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{ background: `rgba(201,168,130,0.12)`, border: `1px solid rgba(201,168,130,0.25)` }}
              animate={{ scale: [1, 1.06, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span style={{ color: ACCENT, fontSize: 24 }}>✦</span>
            </motion.div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-white leading-tight mb-6">
              Inizia il tuo<br />
              <span style={{ color: ACCENT }}>percorso di bellezza.</span>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: MUTED }}>
              Prenota una consulenza gratuita. In 30 minuti analizziamo la tua pelle
              e costruiamo insieme il tuo protocollo personalizzato.
            </p>
            <button
              onClick={openConsulenza}
              className="px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-100"
              style={{ background: ACCENT, color: '#0c0a10', boxShadow: `0 12px 48px ${ACCENT}40` }}
            >
              Prenota la consulenza gratuita
            </button>
            <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Risposta entro 2 ore · Disponibile anche su WhatsApp
            </p>
          </Section>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div
        style={{
          borderTop: '1px solid rgba(201,168,130,0.1)',
          padding: '28px 0',
          textAlign: 'center',
        }}
      >
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2025 LUNEA STUDIO · Via della Spiga 12, Milano · P.IVA 12345678901
        </p>
      </div>
    </div>
  )
}
