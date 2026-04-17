import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const problems = [
  {
    icon: '📉',
    title: 'Il tuo sito esiste, ma non converte',
    desc: 'Hai traffico, ma nessuno acquista, prenota o ti contatta. Il problema non è la visibilità — è il sistema.',
  },
  {
    icon: '💬',
    title: 'DM e messaggi infiniti e ripetitivi',
    desc: 'Rispondi ogni giorno alle stesse domande. Il tuo tempo si disperde in conversazioni che non portano da nessuna parte.',
  },
  {
    icon: '🕳️',
    title: 'Lead persi nel nulla',
    desc: 'Qualcuno ti ha scritto, non hai risposto in tempo. Opportunity gone. Senza un sistema, ogni lead non seguito è denaro perso.',
  },
  {
    icon: '⏳',
    title: 'Nessun processo, tutto manuale',
    desc: 'Niente automazione, niente qualificazione. Ogni vendita parte da zero e dipende da te in prima persona.',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="problema" className="section-padding bg-[#06080f] relative overflow-hidden">
      {/* Subtle top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs text-[#00d4ff] font-semibold uppercase tracking-widest mb-4">
            Il problema
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white mb-5">
            Stai perdendo clienti
            <br />
            <span className="text-gradient">prima ancora di parlarci.</span>
          </h2>
          <p className="text-[#8892a4] text-lg max-w-xl mx-auto leading-relaxed">
            La maggior parte delle attività ha gli strumenti giusti, ma nessun sistema che li connette.
            Il risultato? Opportunità perse ogni giorno.
          </p>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              className="glass-card glass-card-hover rounded-2xl p-7"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-[#8892a4] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <blockquote className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-white/70 font-light italic max-w-2xl mx-auto leading-relaxed">
            "Non ti serve più traffico. Ti serve un sistema che trasforma quello che già hai."
          </blockquote>
          <span className="inline-block mt-3 text-[#00d4ff] text-sm font-semibold tracking-wide">— ZOVEN</span>
        </motion.div>
      </div>
    </section>
  )
}
