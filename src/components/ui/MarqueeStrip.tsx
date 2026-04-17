import { motion } from 'framer-motion'

const row1 = [
  '✦ Sito web custom',
  '✦ Funnel WhatsApp',
  '✦ Ecommerce su misura',
  '✦ Lead generation',
  '✦ Automazione CRM',
  '✦ Prenotazioni online',
  '✦ Dashboard analytics',
  '✦ SEO ottimizzato',
  '✦ Integrazione WhatsApp',
  '✦ Mobile-first design',
]

const row2 = [
  '⚡ Setup in 48h',
  '🎯 Zero template',
  '📱 Mobile-first',
  '🤖 H24 attivo',
  '💬 WhatsApp integrato',
  '🔒 GDPR compliant',
  '📈 Conversion-first',
  '🇮🇹 Made in Italy',
  '⚙️ Scalabile',
  '✅ 100% su misura',
]

function Track({
  items,
  reverse = false,
}: {
  items: string[]
  reverse?: boolean
}) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden py-2.5 select-none">
      <motion.div
        className="flex gap-10 whitespace-nowrap will-change-transform"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-medium text-[#8892a4] flex-shrink-0 hover:text-[#00d4ff] transition-colors duration-200 cursor-default"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-white/5" style={{ background: '#080b12' }}>
      {/* Fade left */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#080b12] to-transparent z-10 pointer-events-none" />
      {/* Fade right */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080b12] to-transparent z-10 pointer-events-none" />

      <Track items={row1} reverse={false} />
      <Track items={row2} reverse={true} />
    </div>
  )
}
