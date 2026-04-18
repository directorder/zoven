import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const demos = [
  {
    path: '/demo/beauty-milano',
    num: '01',
    category: 'Centro Estetico',
    brand: 'LUNEA STUDIO',
    tagline: 'Prenota trattamenti laser, scorri il menù servizi, vivi la UX che porta clienti.',
    accent: '#c9a882',
    accentSoft: 'rgba(201,168,130,0.09)',
    accentBorder: 'rgba(201,168,130,0.20)',
    icon: '✦',
  },
  {
    path: '/demo/barber-milano',
    num: '02',
    category: 'Barbiere Premium',
    brand: 'NERO DISTRETTO',
    tagline: 'Stile affilato al millimetro. Un sito che fa sentire il cliente già dentro.',
    accent: '#d8d0c4',
    accentSoft: 'rgba(216,208,196,0.07)',
    accentBorder: 'rgba(216,208,196,0.16)',
    icon: '◆',
  },
  {
    path: '/demo/booking-experience',
    num: '03',
    category: 'Esperienze Marine',
    brand: 'AUREA SEA',
    tagline: 'Booking integrato per charter privati. Il cliente prenota senza chiamare.',
    accent: '#00d4f0',
    accentSoft: 'rgba(0,212,240,0.08)',
    accentBorder: 'rgba(0,212,240,0.18)',
    icon: '⬡',
  },
  {
    path: '/demo/clinic',
    num: '04',
    category: 'Clinica Estetica',
    brand: 'AURORA CLINIC',
    tagline: 'Wizard di prenotazione 3 step, dashboard real-time, simulazione 3D del trattamento.',
    accent: '#1f4fff',
    accentSoft: 'rgba(31,79,255,0.09)',
    accentBorder: 'rgba(31,79,255,0.22)',
    icon: '◈',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function DemoPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="demo" className="section-padding relative overflow-hidden bg-[#06080f]">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(0,212,255,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(124,58,237,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="container-max relative z-10" ref={ref}>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="inline-flex items-center gap-2 bg-white/5 border border-[#00d4ff]/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse-glow" />
            <span className="text-xs text-[#00d4ff] font-semibold tracking-widest uppercase">
              Demo live — funzionanti
            </span>
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.1] tracking-tight text-white mb-4"
          >
            Non screenshot.
            <br />
            <span className="text-gradient">Sistemi reali.</span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-[#8892a4] text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          >
            Aprile, naviga, prenota. Ogni demo è un sito vero costruito con il sistema ZOVEN —
            <span className="text-white font-medium"> esattamente come il tuo.</span>
          </motion.p>
        </div>

        {/* Demo cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.path}
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <Link to={demo.path} className="block group" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="relative rounded-2xl overflow-hidden h-full"
                  style={{
                    background: 'rgba(255,255,255,0.018)',
                    border: `1px solid ${demo.accentBorder}`,
                  }}
                  whileHover={{ y: -5, scale: 1.008 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  {/* Hover glow bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 30%, ${demo.accentSoft.replace('0.09', '0.14')} 0%, transparent 70%)` }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${demo.accent}90, transparent)` }}
                  />

                  <div className="relative z-10 p-7 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span
                          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
                          style={{
                            background: demo.accentSoft,
                            color: demo.accent,
                            border: `1px solid ${demo.accentBorder}`,
                          }}
                        >
                          {demo.category}
                        </span>
                      </div>
                      <span
                        className="font-display text-4xl font-extrabold opacity-10 group-hover:opacity-25 transition-opacity duration-500 select-none"
                        style={{ color: demo.accent }}
                      >
                        {demo.num}
                      </span>
                    </div>

                    {/* Brand */}
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3 leading-none">
                      {demo.brand}
                    </h3>

                    {/* Tagline */}
                    <p className="text-[#8892a4] text-sm leading-relaxed mb-7 max-w-sm">
                      {demo.tagline}
                    </p>

                    {/* CTA row */}
                    <div className="flex items-center justify-between">
                      <motion.span
                        className="text-sm font-bold tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                        style={{ color: demo.accent }}
                      >
                        Apri demo live
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          →
                        </motion.span>
                      </motion.span>

                      {/* Live badge */}
                      <span className="flex items-center gap-1.5 text-[10px] text-[#8892a4] font-medium">
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: demo.accent, boxShadow: `0 0 6px ${demo.accent}` }}
                        />
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent line on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${demo.accent}50, transparent)` }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Urgency / social proof line */}
          <p className="text-[#8892a4] text-sm mb-6">
            <span className="text-white font-medium">Ogni demo è stata costruita in meno di 5 giorni.</span>
            {' '}Il tuo sistema può essere online prima di quanto pensi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 text-white font-semibold px-7 py-3.5 text-sm transition-all duration-300 group"
            >
              Esplora tutte le demo
              <span className="text-[#00d4ff] group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
            </Link>

            <button
              onClick={() => window.open(
                `https://wa.me/393920000000?text=${encodeURIComponent('Ciao! Ho visto le demo sul sito. Vorrei capire cosa puoi costruire per la mia attività.')}`,
                '_blank'
              )}
              className="wa-btn inline-flex items-center gap-2 text-sm px-7 py-3.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Voglio il mio sistema
            </button>
          </div>
        </motion.div>

      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  )
}
