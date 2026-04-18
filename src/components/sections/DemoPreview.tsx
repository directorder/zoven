import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { lineGrow } from '../../lib/animations'
import { openWhatsApp } from '../../lib/whatsapp'

const demos = [
  {
    path: '/demo/beauty-milano',
    num: '01',
    category: 'Centro Estetico',
    brand: 'LUNEA STUDIO',
    tagline: 'Prenota trattamenti laser, scorri il menù servizi, vivi la UX che porta clienti.',
    accent: '#c9a882',
    bg: 'rgba(201,168,130,0.07)',
    border: 'rgba(201,168,130,0.18)',
  },
  {
    path: '/demo/barber-milano',
    num: '02',
    category: 'Barbiere Premium',
    brand: 'NERO DISTRETTO',
    tagline: 'Stile affilato al millimetro. Un sito che fa sentire il cliente già dentro.',
    accent: '#d8d0c4',
    bg: 'rgba(216,208,196,0.06)',
    border: 'rgba(216,208,196,0.15)',
  },
  {
    path: '/demo/booking-experience',
    num: '03',
    category: 'Esperienze Marine',
    brand: 'AUREA SEA',
    tagline: 'Booking integrato per charter privati. Il cliente prenota senza chiamare.',
    accent: '#00d4f0',
    bg: 'rgba(0,212,240,0.07)',
    border: 'rgba(0,212,240,0.18)',
  },
  {
    path: '/demo/clinic',
    num: '04',
    category: 'Clinica Estetica',
    brand: 'AURORA CLINIC',
    tagline: 'Wizard di prenotazione 3-step, dashboard real-time, simulazione 3D del trattamento.',
    accent: '#5b8cff',
    bg: 'rgba(91,140,255,0.07)',
    border: 'rgba(91,140,255,0.18)',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.95, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function DemoPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="demo" className="section-padding relative overflow-hidden" style={{ background: '#080b12' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-max" ref={ref}>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.span
              variants={lineGrow} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="block h-px w-8 bg-gradient-to-r from-transparent to-[#00d4ff]"
              style={{ originX: 0 }}
            />
            <span className="text-xs text-[#00d4ff] font-semibold uppercase tracking-widest">Demo live</span>
            <motion.span
              variants={lineGrow} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="block h-px w-8 bg-gradient-to-l from-transparent to-[#00d4ff]"
              style={{ originX: 1 }}
            />
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
            >
              Non screenshot.
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-5">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.22 }}
            >
              <span className="text-gradient">Sistemi reali, funzionanti.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="text-[#8892a4] text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
          >
            Ogni demo è un sito vero costruito con il sistema ZOVEN —
            aprilo, naviga, prenota.{' '}
            <span className="text-white font-medium">Esattamente come il tuo.</span>
          </motion.p>
        </div>

        {/* Demo cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14"
        >
          {demos.map((demo) => (
            <motion.div key={demo.path} variants={item} className="h-full">
              <Link to={demo.path} target="_blank" rel="noopener noreferrer" className="block group h-full">
                <div
                  className="relative rounded-2xl overflow-hidden h-full transition-all duration-300 group-hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid ${demo.border}`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 20%, ${demo.bg} 0%, transparent 65%)` }}
                  />
                  {/* Top line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${demo.accent}80, transparent)` }}
                  />

                  <div className="relative z-10 p-7 md:p-8 flex flex-col h-full">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ background: demo.bg, color: demo.accent, border: `1px solid ${demo.border}` }}
                      >
                        {demo.category}
                      </span>
                      <span
                        className="font-display text-4xl font-extrabold leading-none select-none opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                        style={{ color: demo.accent }}
                      >
                        {demo.num}
                      </span>
                    </div>

                    {/* Brand */}
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold text-white tracking-tight leading-none mb-3">
                      {demo.brand}
                    </h3>

                    {/* Tagline */}
                    <p className="text-[#8892a4] text-sm leading-relaxed mb-8 flex-1">
                      {demo.tagline}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-auto">
                      <span
                        className="text-sm font-bold flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                        style={{ color: demo.accent }}
                      >
                        Apri demo live →
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-[#4a5568] font-medium uppercase tracking-widest">
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                          style={{ background: demo.accent }}
                        />
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Bottom line on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${demo.accent}40, transparent)` }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-[#8892a4] text-sm mb-8">
            <span className="text-white font-medium">Ogni sistema è costruito in meno di 5 giorni.</span>
            {' '}Il tuo può essere online prima di quanto pensi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="btn-ghost text-sm px-7 py-3.5 inline-flex items-center gap-2"
            >
              Vedi tutte le demo
              <span className="text-[#00d4ff]">→</span>
            </Link>
            <button
              onClick={() => openWhatsApp('demo')}
              className="wa-btn text-sm px-7 py-3.5"
            >
              <WaIcon />
              Voglio il mio sistema
            </button>
          </div>
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  )
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 4 }}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}
