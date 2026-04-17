import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { lineGrow } from '../../lib/animations'

const reasons = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Custom al 100%',
    desc: 'Nessun template. Ogni sistema è progettato da zero per il tuo business e il tuo processo di acquisizione clienti.',
    color: '#00d4ff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: 'Conversion-first',
    desc: 'Ogni scelta di design e UX è orientata a una sola cosa: trasformare i visitatori in clienti che pagano.',
    color: '#25d366',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Automazione nativa',
    desc: 'I nostri sistemi lavorano anche quando non sei davanti al telefono. Lead qualificate, risposte automatiche, follow-up.',
    color: '#7c3aed',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Affidabilità',
    desc: 'Tecnologia moderna, codice pulito, infrastruttura scalabile. Il sistema tiene anche con volume alto.',
    color: '#f59e0b',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Partner, non fornitore',
    desc: 'Non sparisco dopo la consegna. Ti supporto nella crescita del sistema e ti aiuto a ottimizzare nel tempo.',
    color: '#ec4899',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Mobile-first',
    desc: 'Il 70%+ dei tuoi clienti viene da mobile. Ogni sistema è ottimizzato prima per il telefono, poi per il desktop.',
    color: '#60a5fa',
  },
]

const traditional = [
  'Template con logo cambiato',
  'Nessuna strategia di conversione',
  'Nessun supporto post-lancio',
  'Tempi lunghi, costi fissi',
  'Non misura i risultati',
]
const zoven = [
  'Sistema custom costruito per te',
  'Ogni elemento orientato alla conversione',
  'Partner attivo nel tempo',
  'Processo snello, risultati rapidi',
  'KPI chiari e misurabili',
]

export default function WhyZoven() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const tableRef = useRef(null)
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' })

  return (
    <section id="perche-zoven" className="section-padding bg-[#06080f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.span variants={lineGrow} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="block h-px w-8 bg-gradient-to-r from-transparent to-[#00d4ff]" style={{ originX: 0 }} />
            <span className="text-xs text-[#00d4ff] font-semibold uppercase tracking-widest">Perché ZOVEN</span>
            <motion.span variants={lineGrow} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="block h-px w-8 bg-gradient-to-l from-transparent to-[#00d4ff]" style={{ originX: 1 }} />
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.1 }}
            >
              Non siamo un'agenzia.
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-5">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.22 }}
            >
              <span className="text-gradient">Siamo un sistema.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="text-[#8892a4] text-lg max-w-xl mx-auto leading-relaxed"
          >
            La differenza tra un sito e un sistema che converte è nella strategia, nell'architettura
            e nell'esecuzione. Ecco perché scelgono ZOVEN.
          </motion.p>
        </div>

        {/* Grid — shimmer cards staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.1,
                ease: [0.16, 1, 0.3, 1] as [number,number,number,number],
              }}
              className="glass-card glass-card-hover rounded-2xl p-7 group shimmer-card"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] }}
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${r.color}12`, color: r.color, border: `1px solid ${r.color}25` }}
              >
                {r.icon}
              </motion.div>
              <h3 className="text-white font-semibold text-base mb-2.5">{r.title}</h3>
              <p className="text-[#8892a4] text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison strip — two sides sliding from opposite directions */}
        <div ref={tableRef} className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 gap-8">
              {/* Left col */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={tableInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              >
                <h4 className="text-[#8892a4] text-sm font-semibold uppercase tracking-wider mb-5">Agenzia tradizionale</h4>
                <ul className="space-y-3">
                  {traditional.map((x, i) => (
                    <motion.li
                      key={x}
                      initial={{ opacity: 0, x: -20 }}
                      animate={tableInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                      className="flex items-center gap-2.5 text-[#4a5568] text-sm"
                    >
                      <span className="text-red-500/70 flex-shrink-0">✕</span>
                      {x}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              {/* Right col */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={tableInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              >
                <h4 className="text-[#00d4ff] text-sm font-semibold uppercase tracking-wider mb-5">ZOVEN</h4>
                <ul className="space-y-3">
                  {zoven.map((x, i) => (
                    <motion.li
                      key={x}
                      initial={{ opacity: 0, x: 20 }}
                      animate={tableInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                      className="flex items-center gap-2.5 text-white text-sm"
                    >
                      <span className="text-[#00d4ff] flex-shrink-0">✓</span>
                      {x}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
