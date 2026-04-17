import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { openWhatsApp } from '../../lib/whatsapp'
import { lineGrow } from '../../lib/animations'

const steps = [
  {
    n: '01',
    title: 'Atterri sul sito',
    desc: 'Il visitatore scopre ZOVEN e vede chiaramente cosa può ottenere per il suo business.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18" /><circle cx="7.5" cy="6" r="0.5" fill="currentColor" /><circle cx="10.5" cy="6" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Clicca il CTA',
    desc: 'Un click apre WhatsApp con un messaggio preimpostato sul servizio che l\'ha interessato.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13 12H3" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'WhatsApp si apre',
    desc: 'Il messaggio è già scritto. Zero attrito. Il cliente deve solo premere "Invia".',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Messaggio automatico',
    desc: 'Il sistema risponde immediatamente con un messaggio di benvenuto e un menu guidato.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h8M8 14h5" />
      </svg>
    ),
  },
  {
    n: '05',
    title: 'Lead qualificato',
    desc: 'L\'utente sceglie il suo obiettivo. Sai già cosa vuole prima ancora di rispondere.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    n: '06',
    title: 'Conversione',
    desc: 'Tu ricevi una richiesta chiara e qualificata. Puoi chiudere la vendita senza sprecare tempo.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
]

const funnelMessages = [
  { type: 'in', text: 'Ciao ZOVEN, vorrei capire come potete aiutarmi con un ecommerce su misura.' },
  { type: 'out', text: 'Ciao! Benvenuto su ZOVEN 👋\nScegli cosa ti interessa:\n1. Più prenotazioni\n2. Vendere online\n3. Sito su misura\n4. Demo gratuita' },
  { type: 'in', text: '2' },
  { type: 'out', text: 'Perfetto. Che tipo di prodotti vendi? Hai già un sito o vendi solo tramite social?' },
  { type: 'in', text: 'Vendo abbigliamento, solo Instagram per ora.' },
  { type: 'out', text: 'Capito. Ti mandiamo una proposta personalizzata entro 24 ore. Vuoi anche una demo dal vivo? 🎯' },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const chatRef = useRef(null)
  const chatInView = useInView(chatRef, { once: true, margin: '-80px' })

  return (
    <section id="come-funziona" className="section-padding bg-[#06080f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_80%_50%,rgba(124,58,237,0.06)_0%,transparent_70%)] pointer-events-none" />

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
            <span className="text-xs text-[#00d4ff] font-semibold uppercase tracking-widest">Come funziona</span>
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
              Dal sito al cliente:
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-5">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.22 }}
            >
              <span className="text-gradient">6 passi automatizzati.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="text-[#8892a4] text-lg max-w-xl mx-auto leading-relaxed"
          >
            Il sistema funziona anche mentre dormi. Ogni visitatore diventa una lead qualificata
            prima che tu risponda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                className="flex items-start gap-5 group"
              >
                {/* Number + animated connector */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00d4ff] group-hover:border-[#00d4ff]/30 transition-colors"
                  >
                    {s.icon}
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="relative w-px flex-1 min-h-[2rem] mt-2 overflow-hidden">
                      <div className="absolute inset-0 bg-white/5" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/40 to-transparent"
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                      />
                    </div>
                  )}
                </div>
                {/* Text */}
                <div className="pb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-[#00d4ff] font-bold tracking-widest">{s.n}</span>
                    <h3 className="text-white font-semibold text-base">{s.title}</h3>
                  </div>
                  <p className="text-[#8892a4] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="pt-4"
            >
              <button
                onClick={() => openWhatsApp('demo')}
                className="wa-btn"
              >
                <WaIcon />
                Prova il sistema
              </button>
            </motion.div>
          </div>

          {/* WhatsApp mockup */}
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.92, y: 30, rotateX: 8 }}
            animate={chatInView ? { opacity: 1, scale: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="glass-card rounded-3xl overflow-hidden max-w-sm mx-auto lg:mx-0 lg:ml-auto w-full"
            style={{ perspective: 1000, transformStyle: 'preserve-3d', border: '1px solid rgba(37,211,102,0.15)' }}
          >
            {/* WhatsApp header */}
            <div className="bg-[#075e54] px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#128c7e] flex items-center justify-center">
                <span className="text-xs font-display text-white">Z</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">ZOVEN</p>
                <p className="text-[#a8d5b5] text-xs">Online</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                <span className="text-[#a8d5b5] text-[10px]">Risposta automatica attiva</span>
              </div>
            </div>

            {/* Chat body */}
            <div className="bg-[#0b1a13] px-4 py-5 space-y-3 min-h-[360px]">
              {funnelMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={chatInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.18 }}
                  className={`flex ${msg.type === 'in' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.type === 'in'
                        ? 'bg-[#005c4b] text-white rounded-tr-sm'
                        : 'bg-[#1f2c34] text-[#d1d7db] rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                    <span className="block text-right text-[9px] mt-1 opacity-50">
                      {msg.type === 'in' ? '✓✓' : ''}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}
