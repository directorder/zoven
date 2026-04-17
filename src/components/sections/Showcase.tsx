import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { openWhatsApp } from '../../lib/whatsapp'

const tabs = [
  { id: 'website', label: 'Sito web' },
  { id: 'ecommerce', label: 'Ecommerce' },
  { id: 'booking', label: 'Booking' },
  { id: 'whatsapp', label: 'Funnel WA' },
]

function WebsiteMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#0d1117]">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111722] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 mx-4 h-5 rounded bg-white/5 flex items-center justify-center">
          <span className="text-[10px] text-[#4a5568]">tuosito.it</span>
        </div>
      </div>
      {/* Page content mockup */}
      <div className="p-6 space-y-5">
        <div className="h-2 w-1/3 bg-[#00d4ff]/20 rounded" />
        <div className="h-8 w-2/3 bg-white/8 rounded" />
        <div className="h-3 w-full bg-white/4 rounded" />
        <div className="h-3 w-4/5 bg-white/4 rounded" />
        <div className="flex gap-3 mt-2">
          <div className="h-8 w-28 bg-[#00d4ff]/20 rounded-lg border border-[#00d4ff]/30" />
          <div className="h-8 w-24 bg-white/5 rounded-lg border border-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-square bg-white/4 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

function EcommerceMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#0d1117]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111722] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 mx-4 h-5 rounded bg-white/5 flex items-center justify-center">
          <span className="text-[10px] text-[#4a5568]">shop.tuonegozio.it</span>
        </div>
        <div className="text-[#00d4ff]/60">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </div>
      </div>
      <div className="p-5">
        <div className="flex gap-2 mb-4">
          {['Tutto', 'Nuovi', 'Promo'].map(t => (
            <div key={t} className={`px-3 py-1 rounded-full text-[10px] border ${t === 'Tutto' ? 'border-[#00d4ff]/40 text-[#00d4ff]' : 'border-white/10 text-[#4a5568]'}`}>{t}</div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white/4 rounded-xl p-3 border border-white/5">
              <div className="aspect-square bg-white/6 rounded-lg mb-2" />
              <div className="h-2 w-3/4 bg-white/10 rounded mb-1.5" />
              <div className="h-2.5 w-1/2 bg-[#00d4ff]/20 rounded" />
            </div>
          ))}
        </div>
        <div className="mt-4 h-9 bg-[#00d4ff]/15 rounded-xl border border-[#00d4ff]/20 flex items-center justify-center">
          <span className="text-[11px] text-[#00d4ff] font-semibold">Acquista ora</span>
        </div>
      </div>
    </div>
  )
}

function BookingMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#0d1117]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111722] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 mx-4 h-5 rounded bg-white/5 flex items-center justify-center">
          <span className="text-[10px] text-[#4a5568]">prenota.tuoservizio.it</span>
        </div>
      </div>
      <div className="p-5">
        <div className="h-6 w-40 bg-white/8 rounded mb-4" />
        {/* Calendar mini */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['L','M','M','G','V','S','D'].map(d => (
            <div key={d} className="text-center text-[9px] text-[#4a5568] pb-1">{d}</div>
          ))}
          {Array.from({length: 28}, (_, i) => (
            <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] ${
              i === 14 ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30' :
              i % 5 === 0 ? 'text-[#4a5568]' : 'text-white/50 hover:bg-white/5'
            }`}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {['10:00', '11:30', '14:00', '16:30'].map(t => (
            <div key={t} className="flex items-center justify-between bg-white/4 rounded-lg px-3 py-2 border border-white/5">
              <span className="text-[11px] text-white/70">{t}</span>
              <div className="h-4 w-14 bg-[#00d4ff]/15 rounded border border-[#00d4ff]/20 flex items-center justify-center">
                <span className="text-[9px] text-[#00d4ff]">Prenota</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WhatsAppFunnelMockup() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#25d366]/20 bg-[#0b1a13]">
      <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#128c7e] flex items-center justify-center">
          <span className="text-xs font-bold text-white">Z</span>
        </div>
        <div>
          <p className="text-white text-sm font-semibold">ZOVEN Business</p>
          <p className="text-[#a8d5b5] text-[11px]">✓ Account verificato</p>
        </div>
      </div>
      <div className="p-4 space-y-2.5">
        <div className="bg-[#1f2c34] rounded-2xl rounded-tl-sm p-3 max-w-[88%]">
          <p className="text-[#d1d7db] text-[11px] leading-relaxed">
            Ciao! 👋 Benvenuto su ZOVEN.<br />
            Come posso aiutarti oggi?<br /><br />
            <span className="text-[#25d366]">1.</span> Più prenotazioni<br />
            <span className="text-[#25d366]">2.</span> Vendere online<br />
            <span className="text-[#25d366]">3.</span> Sito su misura<br />
            <span className="text-[#25d366]">4.</span> Demo gratuita
          </p>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#005c4b] rounded-2xl rounded-tr-sm p-2.5 max-w-[60%]">
            <p className="text-white text-[11px]">3 — Sito su misura</p>
            <p className="text-[9px] text-right text-white/40 mt-0.5">✓✓</p>
          </div>
        </div>
        <div className="bg-[#1f2c34] rounded-2xl rounded-tl-sm p-3 max-w-[88%]">
          <p className="text-[#d1d7db] text-[11px] leading-relaxed">
            Ottima scelta! 🚀<br />
            Hai già un sito attivo o parti da zero?
          </p>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#005c4b] rounded-2xl rounded-tr-sm p-2.5 max-w-[70%]">
            <p className="text-white text-[11px]">Parto da zero</p>
            <p className="text-[9px] text-right text-white/40 mt-0.5">✓✓</p>
          </div>
        </div>
        <div className="bg-[#1f2c34] rounded-2xl rounded-tl-sm p-3 max-w-[88%]">
          <p className="text-[#d1d7db] text-[11px] leading-relaxed">
            Perfetto! Ti contatto entro 24h con una proposta su misura. Puoi anche richiedere una demo gratuita 👇
          </p>
        </div>
      </div>
    </div>
  )
}

const mockups: Record<string, React.FC> = {
  website: WebsiteMockup,
  ecommerce: EcommerceMockup,
  booking: BookingMockup,
  whatsapp: WhatsAppFunnelMockup,
}

export default function Showcase() {
  const [active, setActive] = useState('website')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const ActiveMockup = mockups[active]

  return (
    <section id="showcase" className="section-padding relative overflow-hidden" style={{ background: '#080b12' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_60%,rgba(124,58,237,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs text-[#00d4ff] font-semibold uppercase tracking-widest mb-4">
            Showcase
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-white mb-5">
            Ogni sistema costruito
            <br />
            <span className="text-gradient">per il tuo obiettivo.</span>
          </h2>
          <p className="text-[#8892a4] text-lg max-w-xl mx-auto leading-relaxed">
            Esempi reali di cosa costruiamo. Ogni progetto è unico, ogni sistema è progettato
            per convertire.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-white/4 border border-white/8 rounded-2xl p-1.5 gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active === t.id
                    ? 'bg-[#00d4ff] text-black shadow-[0_2px_20px_rgba(0,212,255,0.35)]'
                    : 'text-[#8892a4] hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Mockup display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ActiveMockup />
            </motion.div>
          </AnimatePresence>

          {/* CTA under mockup */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-[#8892a4] text-sm mb-4">
              Vuoi qualcosa del genere per la tua attività?
            </p>
            <button
              onClick={() => openWhatsApp('demo')}
              className="wa-btn mx-auto"
            >
              <WaIcon />
              Parliamone su WhatsApp
            </button>
          </motion.div>
        </motion.div>
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
