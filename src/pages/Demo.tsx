import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const demos = [
  {
    path: '/demo/beauty-milano',
    label: '01',
    category: 'Centro Estetico',
    brand: 'LUNEA STUDIO',
    location: 'Milano',
    tagline: 'Medicina estetica avanzata e trattamenti laser certificati nel cuore di Milano.',
    accent: '#c9a882',
    accentSoft: 'rgba(201,168,130,0.10)',
    accentBorder: 'rgba(201,168,130,0.22)',
    accentGlow: 'rgba(201,168,130,0.15)',
    features: ['Laser Viso', 'Epilazione Laser', 'Biorivitalizzazione', 'Radiofrequenza'],
    bg: 'radial-gradient(ellipse at 60% 40%, rgba(201,168,130,0.08) 0%, transparent 70%)',
  },
  {
    path: '/demo/barber-milano',
    label: '02',
    category: 'Barbiere Premium',
    brand: 'NERO DISTRETTO',
    location: 'Brera, Milano',
    tagline: 'Il barbiere per chi non scende a compromessi. Stile affilato al millimetro.',
    accent: '#d8d0c4',
    accentSoft: 'rgba(216,208,196,0.07)',
    accentBorder: 'rgba(216,208,196,0.18)',
    accentGlow: 'rgba(216,208,196,0.10)',
    features: ['Classic Cut', 'Fade Maestro', 'Barba Scultura', 'Royal Shave'],
    bg: 'radial-gradient(ellipse at 40% 60%, rgba(216,208,196,0.06) 0%, transparent 70%)',
  },
  {
    path: '/demo/booking-experience',
    label: '03',
    category: 'Esperienze Marine',
    brand: 'AUREA SEA',
    location: 'Costa Ligure',
    tagline: 'Uscite private, crociere al tramonto e tour esclusivi tra le isole. Solo per chi sa cosa vuole.',
    accent: '#00d4f0',
    accentSoft: 'rgba(0,212,240,0.08)',
    accentBorder: 'rgba(0,212,240,0.20)',
    accentGlow: 'rgba(0,212,240,0.12)',
    features: ['Day Charter', 'Sunset Cruise', 'Island Hopping', 'Booking integrato'],
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,240,0.06) 0%, transparent 70%)',
  },
  {
    path: '/demo/clinic',
    label: '04',
    category: 'Medicina Estetica',
    brand: 'AURORA CLINIC',
    location: 'Milano',
    tagline: 'Sistema di prenotazione intelligente per cliniche estetiche: booking online, dashboard e simulazione 3D.',
    accent: '#c4607a',
    accentSoft: 'rgba(31,79,255,0.09)',
    accentBorder: 'rgba(31,79,255,0.22)',
    accentGlow: 'rgba(31,79,255,0.14)',
    features: ['Booking 3-step', 'Dashboard live', 'Simulazione 3D', 'Team medici'],
    bg: 'radial-gradient(ellipse at 50% 40%, rgba(31,79,255,0.08) 0%, transparent 70%)',
  },
]

function DemoCard({ demo, index }: { demo: typeof demos[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.14,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      <Link to={demo.path} className="block group">
        <motion.div
          className="relative rounded-3xl overflow-hidden transition-all duration-500"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${demo.accentBorder}`,
          }}
          whileHover={{ y: -6, scale: 1.006 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Background glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: demo.bg }}
          />

          <div className="relative z-10 p-8 md:p-10">
            {/* Top row */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                  style={{
                    background: demo.accentSoft,
                    color: demo.accent,
                    border: `1px solid ${demo.accentBorder}`,
                  }}
                >
                  {demo.category}
                </span>
                <p className="text-[#4a5568] text-xs tracking-widest uppercase">{demo.location}</p>
              </div>
              <span
                className="font-display text-5xl font-extrabold leading-none opacity-15 group-hover:opacity-30 transition-opacity duration-500"
                style={{ color: demo.accent }}
              >
                {demo.label}
              </span>
            </div>

            {/* Brand name */}
            <h3
              className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold tracking-tight leading-none mb-4 transition-colors duration-300"
              style={{ color: '#ffffff' }}
            >
              {demo.brand}
            </h3>

            {/* Tagline */}
            <p className="text-[#8892a4] text-base leading-relaxed mb-8 max-w-md">
              {demo.tagline}
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {demo.features.map((f) => (
                <span
                  key={f}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: demo.accentSoft,
                    color: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-bold tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                style={{ color: demo.accent }}
              >
                Apri demo
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </span>
            </div>
          </div>

          {/* Accent line bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${demo.accent}60, transparent)` }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function Demo() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const openZovenWA = () => {
    window.open('https://wa.me/393505383769?text=Ciao%20ZOVEN!%20Ho%20visto%20le%20demo%20e%20vorrei%20un%20sistema%20simile%20per%20la%20mia%20attivit%C3%A0.%20Possiamo%20parlarne%3F', '_blank')
  }

  return (
    <div className="min-h-screen bg-[#06080f]" style={{ overflow: 'hidden' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(0,212,255,0.05)_0%,transparent_70%)]" />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }} ref={headerRef}>
          <div className="text-center max-w-3xl mx-auto">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="block h-px w-8 bg-gradient-to-r from-transparent to-[#00d4ff]" />
              <span className="text-xs text-[#00d4ff] font-semibold uppercase tracking-widest">
                Sistemi reali
              </span>
              <span className="block h-px w-8 bg-gradient-to-l from-transparent to-[#00d4ff]" />
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-tight text-white"
                initial={{ y: '110%', opacity: 0 }}
                animate={headerInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                Demo reali, progettate
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-tight text-gradient"
                initial={{ y: '110%', opacity: 0 }}
                animate={headerInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                per convertire.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-[#8892a4] text-lg md:text-xl leading-relaxed"
            >
              Non template. Sistemi digitali costruiti per portare clienti,
              prenotazioni e vendite reali.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Demo cards */}
      <section className="pb-24">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="grid grid-cols-1 gap-5">
            {demos.map((demo, i) => (
              <DemoCard key={demo.path} demo={demo} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-white/5">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }} className="text-center">
          <p className="text-[#8892a4] text-lg mb-6">
            Vuoi un sistema così per la tua attività?
          </p>
          <button
            onClick={openZovenWA}
            className="wa-btn text-base px-8 py-3.5 inline-flex"
          >
            <WaIcon />
            Parliamone su WhatsApp
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 6 }}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}
