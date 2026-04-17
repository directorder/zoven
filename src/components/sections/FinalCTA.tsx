import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { openWhatsApp } from '../../lib/whatsapp'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#080b12' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,212,255,0.07)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_30%_50%,rgba(124,58,237,0.07)_0%,transparent_70%)]" />
      </div>

      {/* Orbital decorative rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <div className="w-[500px] h-[500px] rounded-full border border-[#00d4ff]/6 animate-spin-slow" />
        <div className="absolute inset-8 rounded-full border border-[#7c3aed]/6 animate-spin-reverse" />
        <div className="absolute inset-16 rounded-full border border-[#00d4ff]/4 animate-spin-slow" style={{ animationDuration: '30s' }} />
      </div>

      <div className="container-max relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Label */}
          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse-glow" />
            <span className="text-xs text-[#8892a4] font-medium tracking-wide uppercase">
              Inizia ora — è gratuito
            </span>
          </span>

          {/* Headline */}
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-white mb-6">
            Vuoi vedere come potrebbe
            <br />
            <span className="text-gradient">funzionare per il tuo business?</span>
          </h2>

          {/* Subtext */}
          <p className="text-[#8892a4] text-lg md:text-xl leading-relaxed mb-10">
            Scrivici su WhatsApp. In pochi minuti valutiamo insieme la situazione
            e ti mostriamo cosa può fare un sistema ZOVEN per te.
            <br />
            <span className="text-white font-medium">Nessun impegno. Solo chiarezza.</span>
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => openWhatsApp('generic')}
              className="wa-btn text-base px-8 py-4 w-full sm:w-auto"
            >
              <WaIcon />
              Apri WhatsApp
            </button>
            <button
              onClick={() => openWhatsApp('demo')}
              className="btn-ghost text-base px-8 py-4 w-full sm:w-auto"
            >
              Richiedi demo gratuita
            </button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12"
          >
            {[
              { icon: '🔒', text: 'Nessun contratto' },
              { icon: '⚡', text: 'Risposta in 24h' },
              { icon: '🎯', text: 'Solo soluzioni su misura' },
              { icon: '🇮🇹', text: 'Made in Italy' },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2 text-[#8892a4] text-sm">
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}
