import { useRef, useEffect } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const stats = [
  {
    value: 3,
    suffix: 'x',
    prefix: '',
    label: 'più lead',
    sub: 'vs siti standard',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.06)',
    border: 'rgba(0,212,255,0.15)',
  },
  {
    value: 48,
    suffix: 'h',
    prefix: '',
    label: 'dal brief al live',
    sub: 'setup garantito',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.15)',
  },
  {
    value: 100,
    suffix: '%',
    prefix: '',
    label: 'su misura',
    sub: 'zero template usati',
    color: '#25d366',
    bg: 'rgba(37,211,102,0.06)',
    border: 'rgba(37,211,102,0.15)',
  },
  {
    value: 24,
    suffix: '/7',
    prefix: '',
    label: 'sistemi attivi',
    sub: 'anche mentre dormi',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.15)',
  },
]

function Counter({
  to,
  suffix,
  prefix,
  color,
}: {
  to: number
  suffix: string
  prefix: string
  color: string
}) {
  const numRef = useRef<HTMLSpanElement>(null)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(wrapRef, { once: true })

  useEffect(() => {
    if (!inView || !numRef.current) return
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      onUpdate(v) {
        if (numRef.current) numRef.current.textContent = Math.round(v).toString()
      },
    })
    return controls.stop
  }, [inView, to])

  return (
    <span ref={wrapRef} className="font-display leading-none" style={{ color }}>
      {prefix}
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  )
}

export default function ResultsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#06080f 0%,#08101a 50%,#06080f 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="block h-px w-8 bg-gradient-to-r from-transparent to-[#00d4ff]" />
            <span className="text-xs text-[#00d4ff] font-semibold uppercase tracking-widest">
              Performance reali
            </span>
            <span className="block h-px w-8 bg-gradient-to-l from-transparent to-[#00d4ff]" />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] text-white leading-tight"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              I numeri parlano.{' '}
              <span className="text-gradient">Da soli.</span>
            </motion.h2>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 48, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.12,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="relative rounded-2xl p-6 md:p-8 text-center group overflow-hidden"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${s.color}18, transparent 70%)`,
                }}
              />

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top right, ${s.color}, transparent 70%)`,
                }}
              />

              {/* Number */}
              <div className="text-[clamp(3rem,6vw,5rem)] mb-2">
                <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} color={s.color} />
              </div>

              <p className="text-white font-semibold text-base mb-1">{s.label}</p>
              <p className="text-[#8892a4] text-xs leading-snug">{s.sub}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
