import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import HeroScene from '../hero/HeroScene'
import MagneticButton from '../ui/MagneticButton'
import { openWhatsApp } from '../../lib/whatsapp'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#06080f]">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,212,255,0.06)_0%,transparent_70%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.12)_0%,transparent_70%)]" />

      <div className="container-max w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 pt-32 md:pt-36 pb-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse-glow" />
              <span className="text-xs text-[#8892a4] font-medium tracking-wide uppercase">
                Sistemi digitali su misura
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.05] tracking-tight text-white mb-6"
            >
              Non ti serve solo
              <br />
              <span className="text-gradient">un sito.</span>
              <br />
              Ti serve un sistema
              <br />
              che <span className="text-gradient">converte.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[#8892a4] text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
            >
              ZOVEN progetta siti, ecommerce e funnel WhatsApp{' '}
              <span className="text-white font-medium">su misura</span> per trasformare
              visitatori in clienti reali.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <MagneticButton
                onClick={() => openWhatsApp('generic')}
                className="wa-btn w-full sm:w-auto text-base px-7 py-3.5"
              >
                <WaIcon />
                Apri WhatsApp
              </MagneticButton>
              <Link
                to="/demo"
                className="btn-ghost w-full sm:w-auto text-base px-7 py-3.5 inline-flex items-center justify-center gap-2 font-medium"
              >
                Vedi le demo live
                <span className="text-[#00d4ff]">→</span>
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
            >
              <div className="flex flex-col">
                <span className="text-white font-display text-2xl">100%</span>
                <span className="text-[#8892a4] text-xs">Custom build</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white font-display text-2xl">48h</span>
                <span className="text-[#8892a4] text-xs">Risposta garantita</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white font-display text-2xl">∞</span>
                <span className="text-[#8892a4] text-xs">Scalabilità</span>
              </div>
            </motion.div>
          </div>

          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-sm lg:max-w-none h-[420px] lg:h-[600px] relative"
          >
            {/* Glow behind canvas */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.12)_0%,transparent_70%)] pointer-events-none" />

            {/* Floating proof notifications */}
            <div className="absolute right-2 top-[15%] z-20 flex flex-col gap-3 hidden lg:flex">
              {[
                { text: 'Lead ricevuta', sub: '2 minuti fa', icon: '🎯', color: '#00d4ff', delay: 0 },
                { text: '+47 contatti', sub: 'questo mese', icon: '📈', color: '#25d366', delay: 0.7 },
                { text: 'Sistema attivo', sub: 'H24 • 7 giorni', icon: '⚡', color: '#7c3aed', delay: 1.4 },
              ].map((n, i) => (
                <motion.div
                  key={n.text}
                  initial={{ opacity: 0, x: 48, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 + n.delay, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] }}
                  className="glass-card rounded-xl pl-3 pr-4 py-2.5 flex items-center gap-2.5"
                  style={{
                    border: `1px solid ${n.color}25`,
                    animationDelay: `${i * 0.8}s`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                  }}
                >
                  <span className="text-base">{n.icon}</span>
                  <div>
                    <p className="text-white text-[11px] font-semibold leading-tight">{n.text}</p>
                    <p className="text-[#8892a4] text-[10px]">{n.sub}</p>
                  </div>
                  <motion.div
                    className="w-2 h-2 rounded-full ml-1"
                    style={{ background: n.color, boxShadow: `0 0 8px ${n.color}` }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                </motion.div>
              ))}
            </div>

            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <HeroScene />
                <Environment preset="city" />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.4}
                  maxPolarAngle={Math.PI / 1.8}
                  minPolarAngle={Math.PI / 3}
                />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#4a5568] text-xs tracking-widest uppercase">Scopri</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#00d4ff]/40 to-transparent animate-pulse-glow" />
        </motion.div>
      </div>
    </section>
  )
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}
