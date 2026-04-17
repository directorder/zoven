import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WhatsAppButton from '../ui/WhatsAppButton'
import { openWhatsApp } from '../../lib/whatsapp'
import type { FunnelIntent } from '../../lib/whatsapp'

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    label: 'Sito web custom',
    desc: 'Design e sviluppo su misura per la tua identità. Zero template, zero compromessi.',
    intent: 'website' as FunnelIntent,
    accent: '#00d4ff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    label: 'Ecommerce su misura',
    desc: 'Negozi digitali che vendono davvero. UX ottimizzata per la conversione, non solo per la vetrina.',
    intent: 'ecommerce' as FunnelIntent,
    accent: '#7c3aed',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    label: 'Sistema di prenotazione',
    desc: 'Automatizza le prenotazioni. Il cliente prenota da solo, tu ricevi il lead qualificato.',
    intent: 'booking' as FunnelIntent,
    accent: '#60a5fa',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: 'Funnel WhatsApp',
    desc: 'Ogni click porta su WhatsApp con messaggio preimpostato. La lead è già calda prima che tu risponda.',
    intent: 'funnel' as FunnelIntent,
    accent: '#25d366',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    label: 'Automazione & CRM',
    desc: 'Sistemi che lavorano anche quando non sei online. Notifiche, qualificazione, follow-up automatici.',
    intent: 'automation' as FunnelIntent,
    accent: '#f59e0b',
  },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function SolutionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servizi" className="section-padding relative overflow-hidden" style={{ background: '#080b12' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs text-[#00d4ff] font-semibold uppercase tracking-widest mb-4">
            La soluzione
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white mb-5">
            Costruiamo sistemi
            <br />
            <span className="text-gradient">che generano clienti.</span>
          </h2>
          <p className="text-[#8892a4] text-lg max-w-xl mx-auto leading-relaxed">
            Non siti vetrina. Non template. Sistemi digitali costruiti attorno al tuo processo
            di acquisizione clienti.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
        >
          {services.map((s) => (
            <motion.div key={s.label} variants={item}>
              <button
                onClick={() => openWhatsApp(s.intent)}
                className="glass-card glass-card-hover rounded-2xl p-7 text-left w-full group"
                style={{ ['--hover-accent' as string]: s.accent }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ background: `${s.accent}15`, color: s.accent, border: `1px solid ${s.accent}30` }}
                >
                  {s.icon}
                </div>
                <h3 className="text-white font-semibold text-base mb-2.5">{s.label}</h3>
                <p className="text-[#8892a4] text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors duration-200" style={{ color: s.accent }}>
                  Scopri di più
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[#8892a4] mb-6">
            Non sai da dove iniziare? Scrivici: valutiamo insieme la soluzione giusta per te.
          </p>
          <WhatsAppButton intent="generic" label="Parliamone su WhatsApp" variant="primary" className="text-base px-8 py-3.5" />
        </motion.div>
      </div>
    </section>
  )
}
