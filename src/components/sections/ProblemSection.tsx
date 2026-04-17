import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import RevealText from '../ui/RevealText'
import { fadeUp, lineGrow } from '../../lib/animations'

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

export default function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="problema" className="section-padding bg-[#06080f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          {/* Label with line draw */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.span
              variants={lineGrow}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="block h-px w-8 bg-gradient-to-r from-transparent to-[#00d4ff]"
              style={{ originX: 0 }}
            />
            <span className="text-xs text-[#00d4ff] font-semibold uppercase tracking-widest">
              Il problema
            </span>
            <motion.span
              variants={lineGrow}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="block h-px w-8 bg-gradient-to-l from-transparent to-[#00d4ff]"
              style={{ originX: 1 }}
            />
          </motion.div>

          {/* Curtain headline */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.1 }}
            >
              Stai perdendo clienti
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-5">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.2 }}
            >
              <span className="text-gradient">prima ancora di parlarci.</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.35 }}
            className="text-[#8892a4] text-lg max-w-xl mx-auto leading-relaxed"
          >
            La maggior parte delle attività ha gli strumenti giusti, ma nessun sistema che li connette.
            Il risultato? Opportunità perse ogni giorno.
          </motion.p>
        </div>

        {/* Problem cards — alternating slide directions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((p, i) => {
            const fromLeft = i % 2 === 0
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: fromLeft ? -52 : 52, rotate: fromLeft ? -1 : 1 }}
                animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1] as [number,number,number,number],
                }}
                className="glass-card glass-card-hover rounded-2xl p-7 shimmer-card border-glow-enter"
                style={{ '--shimmer-delay': `${0.3 + i * 0.12}s` } as React.CSSProperties}
              >
                <div className="flex items-start gap-5">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] }}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl"
                  >
                    {p.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                    <p className="text-[#8892a4] text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Divider quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          className="mt-16 text-center"
        >
          <div className="inline-block relative">
            <span className="absolute -left-6 top-0 text-[#00d4ff]/30 text-5xl font-serif leading-none select-none">"</span>
            <blockquote className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-white/70 font-light italic max-w-2xl mx-auto leading-relaxed px-4">
              Non ti serve più traffico. Ti serve un sistema che trasforma quello che già hai.
            </blockquote>
            <span className="absolute -right-4 bottom-0 text-[#00d4ff]/30 text-5xl font-serif leading-none select-none">"</span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-[#00d4ff]/50" />
            <span className="text-[#00d4ff] text-sm font-semibold tracking-wide">ZOVEN</span>
            <span className="w-4 h-px bg-[#00d4ff]/50" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
