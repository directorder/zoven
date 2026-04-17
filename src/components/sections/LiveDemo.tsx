import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { openWhatsApp } from '../../lib/whatsapp'

type MsgDir = 'in' | 'out'
interface Msg {
  dir: MsgDir
  text: string
  delay: number
}

const scenarios: Record<string, { label: string; color: string; icon: string; intent: 'website' | 'ecommerce' | 'automation'; msgs: Msg[] }> = {
  sito: {
    label: 'Sito Web',
    color: '#00d4ff',
    icon: '🌐',
    intent: 'website',
    msgs: [
      { dir: 'out', text: 'Ciao! 👋 Benvenuto su ZOVEN.\nCosa posso fare per te?', delay: 400 },
      { dir: 'in', text: 'Vorrei un sito web per la mia attività', delay: 1300 },
      { dir: 'out', text: 'Perfetto! Che tipo di attività hai? 🏢', delay: 2200 },
      { dir: 'in', text: 'Un ristorante nel centro storico', delay: 3200 },
      {
        dir: 'out',
        text: 'Ottimo! Per i ristoranti creo:\n✓ Prenotazione online integrata\n✓ Menu digitale aggiornabile\n✓ SEO locale ottimizzato\n\nVuoi ricevere una proposta in 24h? 🎯',
        delay: 4400,
      },
      { dir: 'in', text: 'Sì, mandami la proposta!', delay: 5600 },
      {
        dir: 'out',
        text: '✅ Perfetto! Sarai ricontattato entro domani mattina.\n\nClicca sotto per parlare direttamente con me 👇',
        delay: 6600,
      },
    ],
  },
  ecommerce: {
    label: 'Ecommerce',
    color: '#7c3aed',
    icon: '🛍️',
    intent: 'ecommerce',
    msgs: [
      { dir: 'out', text: 'Ciao! 👋 Benvenuto su ZOVEN.\nCosa posso fare per te?', delay: 400 },
      { dir: 'in', text: 'Ho bisogno di un ecommerce su misura', delay: 1300 },
      { dir: 'out', text: 'Ecommerce su misura! 🛍️\nQuanti prodotti hai circa?', delay: 2100 },
      { dir: 'in', text: 'Circa 80-100 prodotti', delay: 3000 },
      {
        dir: 'out',
        text: 'Perfetto! Includerò:\n✓ Checkout ultra-ottimizzato\n✓ Stripe + PayPal integrati\n✓ Gestione ordini automatica\n\nSei già su Instagram?',
        delay: 4100,
      },
      { dir: 'in', text: 'Sì, solo Instagram per ora', delay: 5100 },
      {
        dir: 'out',
        text: 'Integriamo il tuo feed direttamente nel sito! 📲\n\nTi preparo una proposta personalizzata.\nClicca sotto per iniziare subito 👇',
        delay: 6200,
      },
    ],
  },
  automazione: {
    label: 'Automazione',
    color: '#25d366',
    icon: '🤖',
    intent: 'automation',
    msgs: [
      { dir: 'out', text: 'Ciao! 👋 Benvenuto su ZOVEN.\nCosa posso fare per te?', delay: 400 },
      { dir: 'in', text: 'Voglio automatizzare i contatti WhatsApp', delay: 1300 },
      {
        dir: 'out',
        text: 'Automazione intelligente! 🤖\nCosa vuoi gestire in automatico?\n\n• Risposta ai nuovi contatti\n• Qualificazione lead\n• Follow-up clienti',
        delay: 2200,
      },
      { dir: 'in', text: 'Tutto, soprattutto la qualificazione!', delay: 3300 },
      {
        dir: 'out',
        text: 'Con il sistema ZOVEN:\n✓ Risposta immediata H24\n✓ Lead già qualificata\n✓ Pronta alla chiusura\n\nI clienti risparmiano 3-4h al giorno 💪',
        delay: 4500,
      },
      { dir: 'in', text: 'Interessante! Come funziona esattamente?', delay: 5500 },
      {
        dir: 'out',
        text: 'Te lo spiego in 5 minuti su WhatsApp! 🎯\n\nClicca sotto — la conversazione vera inizia adesso 👇',
        delay: 6500,
      },
    ],
  },
}

export default function LiveDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [activeKey, setActiveKey] = useState('sito')
  const [visible, setVisible] = useState<(Msg & { id: number })[]>([])
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  // Start when in view
  useEffect(() => {
    if (inView && !started) setStarted(true)
  }, [inView, started])

  useEffect(() => {
    if (!started) return
    setVisible([])
    setTyping(false)
    setDone(false)

    const scenario = scenarios[activeKey]
    const timers: ReturnType<typeof setTimeout>[] = []
    let uid = 0

    scenario.msgs.forEach((msg) => {
      if (msg.dir === 'out') {
        timers.push(setTimeout(() => setTyping(true), msg.delay - 800))
      }
      timers.push(
        setTimeout(() => {
          setTyping(false)
          const id = uid++
          setVisible((prev) => [...prev, { ...msg, id }])
        }, msg.delay),
      )
    })

    const last = scenario.msgs[scenario.msgs.length - 1].delay
    timers.push(setTimeout(() => setDone(true), last + 600))

    return () => timers.forEach(clearTimeout)
  }, [activeKey, started])

  // Auto-scroll chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [visible, typing])

  const tabs = Object.entries(scenarios).map(([key, s]) => ({ key, ...s }))
  const activeScenario = scenarios[activeKey]

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#06080f' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#25d366]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_50%,rgba(37,211,102,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_50%,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text + controls */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="block h-px w-8 bg-gradient-to-r from-transparent to-[#25d366]" />
              <span className="text-xs text-[#25d366] font-semibold uppercase tracking-widest">
                Demo interattiva
              </span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h2
                className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-tight text-white"
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                Prova il sistema.
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h2
                className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-tight text-gradient"
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                Adesso.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-[#8892a4] text-lg leading-relaxed mb-8"
            >
              Seleziona il tuo caso e guarda come il funnel ZOVEN gestisce il cliente in tempo reale — qualificazione automatica, risposta immediata, zero attrito.
            </motion.p>

            {/* Scenario tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveKey(t.key)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={
                    activeKey === t.key
                      ? {
                          background: `${t.color}18`,
                          color: t.color,
                          border: `1px solid ${t.color}40`,
                          boxShadow: `0 0 16px ${t.color}20`,
                        }
                      : {
                          background: 'rgba(255,255,255,0.03)',
                          color: '#8892a4',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }
                  }
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            >
              <button
                onClick={() => openWhatsApp(activeScenario.intent)}
                className="wa-btn text-base px-7 py-3.5 group"
              >
                <WaIcon />
                Inizia la conversazione vera
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="ml-1"
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          </div>

          {/* Right — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -8 }}
            animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
            className="flex justify-center lg:justify-end"
            style={{ perspective: 1200 }}
          >
            {/* Phone shell */}
            <div
              className="relative w-[300px] flex flex-col rounded-[44px] overflow-hidden"
              style={{
                border: '8px solid rgba(255,255,255,0.07)',
                background: '#1a1a1e',
                boxShadow:
                  '0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(37,211,102,0.12)',
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[100px] h-[28px] rounded-b-2xl"
                style={{ background: '#1a1a1e' }}
              />

              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-4 pb-1 text-[10px] text-white/50 font-medium relative z-10">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor"><rect x="0" y="3" width="2" height="5" rx="0.5"/><rect x="3" y="2" width="2" height="6" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5"/></svg>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 2C6.5 2 7.8 2.7 8.7 3.8M1.3 3.8C2.2 2.7 3.5 2 5 2M3 5.5C3.7 4.8 4.3 4.5 5 4.5s1.3.3 2 1M5 7h.01"/></svg>
                  <span>🔋</span>
                </span>
              </div>

              {/* WhatsApp header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: '#128C7E' }}
              >
                <div className="flex items-center gap-1 text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#075e54] flex items-center justify-center border-2 border-white/10">
                  <span className="font-display text-white text-xs font-bold">Z</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold leading-tight">ZOVEN</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                    <p className="text-white/60 text-[10px]">online</p>
                  </div>
                </div>
                <div className="flex gap-3 text-white/60">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                </div>
              </div>

              {/* Chat body */}
              <div
                ref={chatBodyRef}
                className="flex-1 overflow-y-auto px-3 py-4 space-y-2"
                style={{
                  background: '#0d1117',
                  backgroundImage:
                    'radial-gradient(rgba(37,211,102,0.03) 1px,transparent 1px)',
                  backgroundSize: '20px 20px',
                  minHeight: '380px',
                  maxHeight: '380px',
                  scrollbarWidth: 'none',
                }}
              >
                <AnimatePresence mode="sync">
                  {visible.map((msg) => (
                    <motion.div
                      key={`${activeKey}-${msg.id}`}
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      className={`flex ${msg.dir === 'in' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-[82%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed whitespace-pre-line"
                        style={
                          msg.dir === 'in'
                            ? { background: '#005c4b', color: '#e9edef', borderRadius: '12px 12px 2px 12px' }
                            : { background: '#202c33', color: '#e9edef', borderRadius: '12px 12px 12px 2px' }
                        }
                      >
                        {msg.text}
                        <span className="block text-right text-[9px] mt-1 opacity-40">
                          {msg.dir === 'in' ? '✓✓' : ''}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div
                        className="px-4 py-3 rounded-2xl flex items-center gap-1"
                        style={{ background: '#202c33', borderRadius: '12px 12px 12px 2px' }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-white/40"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Chat input bar */}
              <div
                className="flex items-center gap-2 px-3 py-3"
                style={{ background: '#202c33' }}
              >
                <div className="flex-1 bg-[#2a3942] rounded-3xl px-4 py-2.5 text-[11px] text-white/30">
                  Messaggio
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: '#00a884' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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
