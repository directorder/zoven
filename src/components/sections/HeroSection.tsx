import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import HeroScene from '../hero/HeroScene'
import WhatsAppButton from '../ui/WhatsAppButton'
import { openWhatsApp } from '../../lib/whatsapp'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
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
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 pt-24 pb-16">
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
              <WhatsAppButton intent="generic" label="Apri WhatsApp" variant="primary" className="w-full sm:w-auto text-base px-7 py-3.5" />
              <button
                onClick={() => openWhatsApp('demo')}
                className="btn-ghost w-full sm:w-auto text-base px-7 py-3.5"
              >
                Richiedi demo
              </button>
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
