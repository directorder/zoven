import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import DemoNav from '../../components/demo/DemoNav'
import PoweredByZoven from '../../components/demo/PoweredByZoven'
import BookingScene from '../../components/demo/scenes/BookingScene'

const BG = '#050a18'
const ACCENT = '#00d4f0'
const GOLD = '#d4a060'
const MUTED = '#7a8fa6'
const MUTED2 = '#4a5e72'

const waBase = 'https://wa.me/393505383769?text='

type ExpId = 'charter' | 'sunset' | 'hopping'

const experiences = [
  {
    id: 'charter' as ExpId,
    name: 'Day Charter',
    tagline: 'A bordo tutto il giorno',
    duration: '8 ore',
    maxGuests: 8,
    price: '€490',
    priceNote: 'a barca · fino a 8 persone',
    color: ACCENT,
    features: ['Equipaggio incluso', 'Snorkeling attrezzato', 'Pranzo a bordo incluso', 'Sosta alle isole'],
    desc: "L'intera giornata in mare con il tuo equipaggio privato. Esplori calette segrete, fai snorkeling e pranzi a bordo mentre il sole tramonta sulle acque liguri.",
  },
  {
    id: 'sunset' as ExpId,
    name: 'Sunset Cruise',
    tagline: 'Il tramonto sul mare',
    duration: '3 ore',
    maxGuests: 6,
    price: '€290',
    priceNote: 'a barca · fino a 6 persone',
    color: GOLD,
    features: ['Aperitivo incluso', 'Musica ambient', 'Rotta panoramica', 'Foto professionali'],
    desc: "La rotta più bella alle 17:00. Vino, tramonto sulle isole e musica a bassa voce. Perfetto per celebrare, per una serata speciale o semplicemente perché lo meriti.",
  },
  {
    id: 'hopping' as ExpId,
    name: 'Island Hopping',
    tagline: 'Esplora le isole',
    duration: 'Full day',
    maxGuests: 8,
    price: '€690',
    priceNote: 'a barca · fino a 8 persone',
    color: '#60c8e0',
    features: ['3 isole in programma', 'Guida esperto locale', 'Pranzo su isola privata', 'Attrezzatura snorkeling'],
    desc: "Il giro esclusivo tra le isole con una guida locale. Approdi privati, calette inaccessibili via terra e pranzo su un'isola. Un'esperienza che non esiste nei cataloghi.",
  },
]

const timeSlots = ['09:00', '10:30', '14:00', '15:30', '17:00']

const testimonials = [
  {
    name: 'Marco e Giada',
    location: 'Milano',
    rating: 5,
    text: "Una giornata indimenticabile. L'equipaggio straordinario, le calette stupende. Siamo tornati per il sunset cruise il mese dopo. Consigliamo a tutti.",
    exp: 'Day Charter',
  },
  {
    name: 'Lorenzo F.',
    location: 'Torino',
    rating: 5,
    text: "Sunset cruise perfetto per il compleanno di mia moglie. L'aperitivo, il tramonto, la musica. Lei ha pianto di gioia. Torneremo ogni anno.",
    exp: 'Sunset Cruise',
  },
  {
    name: 'Valeria G.',
    location: 'Roma',
    rating: 5,
    text: "L'island hopping è stato il momento più bello della nostra estate. La guida conosceva ogni caletta, ogni storia. Impagabile.",
    exp: 'Island Hopping',
  },
]

const faqs = [
  {
    q: "Cosa include il noleggio?",
    a: "Ogni esperienza include l'equipaggio completo, il carburante, l'assicurazione e l'attrezzatura base. I pacchetti premium includono anche catering e bevande.",
  },
  {
    q: "Posso portare cibo e bevande?",
    a: "Assolutamente sì. Puoi portare il tuo pranzo al sacco o richiedere il nostro servizio catering con prodotti locali selezionati (€18/persona).",
  },
  {
    q: "Cosa succede in caso di maltempo?",
    a: "La sicurezza viene prima di tutto. In caso di condizioni avverse, puoi spostare gratuitamente la data o ricevere un rimborso completo. Decidiamo insieme la mattina stessa.",
  },
  {
    q: "Come funziona la prenotazione?",
    a: "Seleziona l'esperienza, la data e il numero di persone qui sotto, poi confermaci su WhatsApp. Chiediamo solo un acconto del 30% per garantire la tua data.",
  },
]

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function BookingExperience() {
  const [selectedExp, setSelectedExp] = useState<ExpId | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [guests, setGuests] = useState(2)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const exp = experiences.find((e) => e.id === selectedExp)

  const handleBook = () => {
    if (!selectedExp || !exp) {
      window.open(waBase + encodeURIComponent('Ciao AUREA SEA! Vorrei informazioni sulle vostre esperienze in barca.'), '_blank')
      return
    }
    const datePart = selectedDate ? ` per il ${selectedDate}` : ''
    const timePart = selectedTime ? ` alle ${selectedTime}` : ''
    const msg = `Ciao AUREA SEA! Vorrei prenotare: ${exp.name}${datePart}${timePart} per ${guests} persone. Potete confermare disponibilità?`
    window.open(waBase + encodeURIComponent(msg), '_blank')
  }

  const openZoven = () =>
    window.open('https://wa.me/393505383769?text=' + encodeURIComponent('Ciao ZOVEN! Ho visto la demo di AUREA SEA e voglio qualcosa di simile per la mia attività. Possiamo parlarne?'), '_blank')

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const today = new Date().toISOString().split('T')[0]

  return (
    <div style={{ background: BG, color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <DemoNav brand="AUREA SEA" accent={ACCENT} ctaLabel="Prenota" onCta={handleBook} />
      <PoweredByZoven accent={ACCENT} onCta={openZoven} />

      {/* ── HERO — full screen 3D background ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* 3D full background */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0.5, 6], fov: 44 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false }}
            style={{ background: BG }}
          >
            <Suspense fallback={null}>
              <BookingScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, rgba(5,10,24,0.92) 50%, rgba(5,10,24,0.4) 100%),
                         linear-gradient(to top, rgba(5,10,24,1) 0%, transparent 40%)`,
          }}
        />

        {/* Hero content */}
        <div
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', width: '100%', position: 'relative', zIndex: 20, paddingTop: 90 }}
        >
          <div style={{ maxWidth: 640 }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-8"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                Esperienze Marine Esclusive · Costa Ligure
              </span>
            </motion.div>

            {['IL MARE.', 'SENZA COMPROMESSI.'].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%', opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.14, ease }}
                  className="font-display font-black leading-none"
                  style={{
                    fontSize: 'clamp(3.2rem,7vw,6.5rem)',
                    letterSpacing: '-0.02em',
                    color: i === 1 ? ACCENT : '#ffffff',
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base md:text-lg leading-relaxed mt-8 mb-10"
              style={{ color: MUTED, maxWidth: 480 }}
            >
              Uscite private in barca, tour guidati tra le isole e crociere al tramonto.
              Solo per chi sa cosa vuole.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => {
                  document.getElementById('prenota')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-100"
                style={{ background: ACCENT, color: '#050a18', boxShadow: `0 8px 36px ${ACCENT}40` }}
              >
                Esplora le esperienze
              </button>
              <button
                onClick={handleBook}
                className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide uppercase border transition-all duration-300 hover:border-[#00d4f0]/40"
                style={{ borderColor: 'rgba(0,212,240,0.18)', color: 'rgba(255,255,255,0.4)' }}
              >
                Parla con noi
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="flex items-center gap-8 mt-12"
            >
              {[['96+', 'Uscite in mare'], ['4.9★', 'Su Google'], ['100%', 'Rimborso garantito']].map(([num, lbl]) => (
                <div key={lbl}>
                  <p className="text-2xl font-extrabold font-display" style={{ color: ACCENT }}>{num}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(0,212,240,0.4)' }}>Scorri</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ color: ACCENT, opacity: 0.5 }}>
            <path d="M8 1v18M1 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section id="esperienze" style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <ExpSectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {experiences.map((ex, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={ex.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                  className="p-7 rounded-2xl flex flex-col group hover:-translate-y-1 transition-transform duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid rgba(0,212,240,0.1)`,
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest mb-2 block"
                        style={{ color: ex.color }}
                      >
                        {ex.tagline}
                      </span>
                      <h3 className="text-xl font-extrabold text-white">{ex.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black font-display" style={{ color: ex.color }}>{ex.price}</p>
                      <p className="text-[10px] leading-tight" style={{ color: MUTED }}>{ex.priceNote}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: MUTED }}>
                    {ex.desc}
                  </p>

                  <div className="flex flex-col gap-2 mb-6">
                    {ex.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span style={{ color: ex.color, fontSize: 12 }}>✓</span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xs" style={{ color: MUTED }}>⏱ {ex.duration}</span>
                    <span className="text-xs" style={{ color: MUTED }}>👥 Max {ex.maxGuests}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BOOKING UI ── */}
      <section
        id="prenota"
        style={{ padding: '100px 0', background: 'rgba(0,180,220,0.03)', borderTop: '1px solid rgba(0,212,240,0.08)', borderBottom: '1px solid rgba(0,212,240,0.08)' }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
          <BookingSectionHeader />

          <div className="mt-12 p-8 md:p-10 rounded-3xl" style={{ background: 'rgba(0,180,220,0.04)', border: '1px solid rgba(0,212,240,0.15)' }}>
            {/* Step 1 — Select experience */}
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
                01 · Scegli l'esperienza
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {experiences.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExp(selectedExp === ex.id ? null : ex.id)}
                    className="p-4 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: selectedExp === ex.id ? `rgba(0,212,240,0.12)` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${selectedExp === ex.id ? ACCENT : 'rgba(255,255,255,0.08)'}`,
                      color: selectedExp === ex.id ? '#fff' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    <p className="text-sm font-bold mb-1" style={{ color: selectedExp === ex.id ? ACCENT : 'rgba(255,255,255,0.6)' }}>
                      {ex.name}
                    </p>
                    <p className="text-xs">{ex.price} · {ex.duration}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Date */}
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
                02 · Scegli la data
              </p>
              <input
                type="date"
                value={selectedDate}
                min={today}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(0,212,240,0.2)',
                  color: selectedDate ? '#fff' : MUTED,
                  colorScheme: 'dark',
                }}
              />
            </div>

            {/* Step 3 — Time */}
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
                03 · Orario di partenza
              </p>
              <div className="flex flex-wrap gap-3">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(selectedTime === t ? null : t)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
                    style={{
                      background: selectedTime === t ? ACCENT : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selectedTime === t ? ACCENT : 'rgba(255,255,255,0.08)'}`,
                      color: selectedTime === t ? '#050a18' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4 — Guests */}
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
                04 · Numero di persone
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 rounded-full text-xl font-bold transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{ background: 'rgba(0,212,240,0.1)', color: ACCENT, border: '1px solid rgba(0,212,240,0.2)' }}
                >
                  −
                </button>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={guests}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-3xl font-black font-display w-12 text-center"
                    style={{ color: ACCENT }}
                  >
                    {guests}
                  </motion.span>
                </AnimatePresence>
                <button
                  onClick={() => setGuests(Math.min(exp?.maxGuests ?? 8, guests + 1))}
                  className="w-10 h-10 rounded-full text-xl font-bold transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{ background: 'rgba(0,212,240,0.1)', color: ACCENT, border: '1px solid rgba(0,212,240,0.2)' }}
                >
                  +
                </button>
                <span className="text-sm ml-2" style={{ color: MUTED }}>
                  {exp ? `max ${exp.maxGuests}` : 'Seleziona prima un\'esperienza'}
                </span>
              </div>
            </div>

            {/* Booking summary + CTA */}
            {selectedExp && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="p-5 rounded-2xl mb-6"
                style={{
                  background: 'rgba(0,212,240,0.06)',
                  border: '1px solid rgba(0,212,240,0.2)',
                }}
              >
                <p className="text-sm font-semibold text-white mb-2">Riepilogo</p>
                <p className="text-sm" style={{ color: MUTED }}>
                  <span style={{ color: ACCENT }}>{exp?.name}</span>
                  {selectedDate && <> · <span>{selectedDate}</span></>}
                  {selectedTime && <> alle <span>{selectedTime}</span></>}
                  {' '}· <span>{guests} {guests === 1 ? 'persona' : 'persone'}</span>
                </p>
                <p className="text-lg font-black font-display mt-2" style={{ color: ACCENT }}>
                  {exp?.price}
                </p>
              </motion.div>
            )}

            <button
              onClick={handleBook}
              className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-100"
              style={{
                background: selectedExp ? ACCENT : 'rgba(255,255,255,0.08)',
                color: selectedExp ? '#050a18' : MUTED,
                boxShadow: selectedExp ? `0 8px 32px ${ACCENT}40` : 'none',
              }}
            >
              {selectedExp ? 'Conferma su WhatsApp →' : 'Seleziona un\'esperienza per procedere'}
            </button>
            <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Nessun pagamento ora · Conferma in 5 minuti · Cancellazione gratuita
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <TestimonialSectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {testimonials.map((t, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={t.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.1, ease }}
                  className="p-7 rounded-2xl flex flex-col"
                  style={{ background: 'rgba(0,180,220,0.04)', border: '1px solid rgba(0,212,240,0.1)' }}
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <span key={k} style={{ color: GOLD, fontSize: 15 }}>★</span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `rgba(0,212,240,0.15)`, color: ACCENT }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs" style={{ color: MUTED }}>{t.location} · {t.exp}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{ padding: '80px 0', borderTop: '1px solid rgba(0,212,240,0.06)' }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1.5rem' }}>
          <FaqSectionHeader />
          <div className="flex flex-col gap-3 mt-10">
            {faqs.map((faq, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true })
              return (
                <motion.div
                  key={faq.q}
                  ref={ref}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: openFaq === i ? 'rgba(0,212,240,0.05)' : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${openFaq === i ? 'rgba(0,212,240,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-semibold text-white">{faq.q}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        color: ACCENT,
                        flexShrink: 0,
                        marginLeft: 16,
                        transform: openFaq === i ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <p className="px-6 pb-6 pt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <FinalCtaSection ACCENT={ACCENT} GOLD={GOLD} MUTED={MUTED} onCta={handleBook} />
        </div>
      </section>

      {/* Footer strip */}
      <div style={{ padding: '28px 0', textAlign: 'center', borderTop: '1px solid rgba(0,212,240,0.06)' }}>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
          © 2025 AUREA SEA · Porto di Levante, Liguria · P.IVA 11223344556
        </p>
      </div>
    </div>
  )
}

// ── Section headers ──────────────────────────────────────────

function ExpSectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>
        Le nostre esperienze
      </p>
      <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white">
        Scegli la tua avventura.
      </h2>
    </motion.div>
  )
}

function BookingSectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>
        Prenota in 2 minuti
      </p>
      <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white">
        Configura la tua esperienza.
      </h2>
    </motion.div>
  )
}

function TestimonialSectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>
        Recensioni
      </p>
      <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-white">
        Chi ha già salpato con noi.
      </h2>
    </motion.div>
  )
}

function FaqSectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>
        Domande frequenti
      </p>
      <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-white">
        Tutto quello che vuoi sapere.
      </h2>
    </motion.div>
  )
}

function FinalCtaSection({ ACCENT, GOLD, MUTED, onCta }: { ACCENT: string; GOLD: string; MUTED: string; onCta: () => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <motion.div
        className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center"
        style={{ background: 'rgba(0,212,240,0.1)', border: `1px solid rgba(0,212,240,0.2)` }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span style={{ color: ACCENT, fontSize: 26 }}>⚓</span>
      </motion.div>
      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-white leading-tight mb-6">
        Il tuo mare<br />
        <span style={{ color: ACCENT }}>ti aspetta.</span>
      </h2>
      <p className="text-base leading-relaxed mb-10" style={{ color: MUTED }}>
        Date disponibili questa settimana. Prenota adesso e ricevi
        la conferma in 5 minuti su WhatsApp.
      </p>
      <button
        onClick={onCta}
        className="px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-100"
        style={{ background: ACCENT, color: '#050a18', boxShadow: `0 12px 48px ${ACCENT}40` }}
      >
        Prenota la tua esperienza
      </button>
      <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
        Nessun pagamento anticipato · Cancellazione gratuita
      </p>
    </motion.div>
  )
}
