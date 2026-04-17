import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function WhyZoven() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="perche-zoven" className="section-padding bg-[#06080f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs text-[#00d4ff] font-semibold uppercase tracking-widest mb-4">
            Perché ZOVEN
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white mb-5">
            Non siamo un'agenzia.
            <br />
            <span className="text-gradient">Siamo un sistema.</span>
          </h2>
          <p className="text-[#8892a4] text-lg max-w-xl mx-auto leading-relaxed">
            La differenza tra un sito e un sistema che converte è nella strategia, nell'architettura
            e nell'esecuzione. Ecco perché scelgono ZOVEN.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={item}
              className="glass-card glass-card-hover rounded-2xl p-7 group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${r.color}12`, color: r.color, border: `1px solid ${r.color}25` }}
              >
                {r.icon}
              </div>
              <h3 className="text-white font-semibold text-base mb-2.5">{r.title}</h3>
              <p className="text-[#8892a4] text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-card rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[#8892a4] text-sm font-semibold uppercase tracking-wider mb-5">Agenzia tradizionale</h4>
              <ul className="space-y-3">
                {[
                  'Template con logo cambiato',
                  'Nessuna strategia di conversione',
                  'Nessun supporto post-lancio',
                  'Tempi lunghi, costi fissi',
                  'Non misura i risultati',
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2.5 text-[#4a5568] text-sm">
                    <span className="text-red-500/70">✕</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#00d4ff] text-sm font-semibold uppercase tracking-wider mb-5">ZOVEN</h4>
              <ul className="space-y-3">
                {[
                  'Sistema custom costruito per te',
                  'Ogni elemento orientato alla conversione',
                  'Partner attivo nel tempo',
                  'Processo snello, risultati rapidi',
                  'KPI chiari e misurabili',
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2.5 text-white text-sm">
                    <span className="text-[#00d4ff]">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
