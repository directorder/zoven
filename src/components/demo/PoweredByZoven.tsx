import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Props {
  accent: string
  onCta: () => void
}

export default function PoweredByZoven({ accent, onCta }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
    >
      <button
        onClick={onCta}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold tracking-wide uppercase transition-all duration-200 hover:scale-105"
        style={{
          background: accent,
          color: '#000',
          boxShadow: `0 4px 20px ${accent}40`,
        }}
      >
        Voglio questo →
      </button>
      <Link
        to="/demo"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-medium tracking-wide"
        style={{
          background: 'rgba(255,255,255,0.06)',
          color: 'rgba(255,255,255,0.4)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <span style={{ color: accent }}>Z</span>
        <span>Powered by ZOVEN</span>
      </Link>
    </motion.div>
  )
}
