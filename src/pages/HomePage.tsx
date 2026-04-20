import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Layers, Smartphone, TrendingDown, Check } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ZovenOrbitalMark } from '../components/ui/ZovenOrbitalMark'
import { MarketingLayout } from '../layouts/MarketingLayout'
import { moduleList, plans } from '../data/marketing'

const problemi = [
  {
    icon: AlertTriangle,
    title: 'Prenotazioni nel caos',
    desc: 'Chiamate, WhatsApp, email e quaderno cartaceo. Ogni canale e separato, niente e centralizzato.',
  },
  {
    icon: Smartphone,
    title: 'Clienti senza memoria',
    desc: 'Ogni soggiorno riparte da zero. Nessuno sa chi ha gia dormito qui, cosa ha comprato, cosa preferisce.',
  },
  {
    icon: TrendingDown,
    title: 'Vendite bottega isolate',
    desc: 'Gli ordini diretti non parlano con il CRM. Nessuna promo mirata, nessun riacquisto programmato.',
  },
  {
    icon: Layers,
    title: 'App diverse, nessuna visione',
    desc: 'Booking, gestionale, fogli Excel, messaggi. Nessun sistema sa tutto di un cliente.',
  },
]

const steps = ['Intro', 'Problema', 'Soluzione', 'Prezzi', 'Azione']

export function HomePage() {
  const immersiveRef = useRef<HTMLElement>(null)
  const settleTimer = useRef<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isSettling, setIsSettling] = useState(false)
  const { scrollYProgress } = useScroll({
    target: immersiveRef,
    offset: ['start start', 'end end'],
  })

  const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.22]), { stiffness: 56, damping: 26 })
  const bgRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-4, 5]), { stiffness: 56, damping: 26 })
  const stageOpacity = useTransform(scrollYProgress, [0.985, 1], [1, 0])
  const natureFloatY = useSpring(useTransform(scrollYProgress, [0, 1], [26, -56]), { stiffness: 38, damping: 24 })
  const natureFloatX = useSpring(useTransform(scrollYProgress, [0, 1], [-24, 24]), { stiffness: 34, damping: 24 })
  const natureRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-7, 10]), { stiffness: 34, damping: 24 })
  const natureDepth = useSpring(useTransform(scrollYProgress, [0, 1], [0.96, 1.08]), { stiffness: 36, damping: 24 })
  const logoOpacity = useTransform(scrollYProgress, [0, 0.24, 0.5, 1], [0.5, 0.36, 0.2, 0.12])
  const logoScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.08]), { stiffness: 36, damping: 24 })

  const introOpacity = useTransform(scrollYProgress, [0, 0.2, 0.28, 0.36, 1], [1, 1, 0.3, 0, 0])
  const introY = useSpring(useTransform(scrollYProgress, [0, 0.32], [0, -36]), { stiffness: 52, damping: 25 })

  const problemOpacity = useTransform(scrollYProgress, [0.22, 0.3, 0.46, 0.56, 1], [0, 1, 1, 0, 0])
  const problemY = useSpring(useTransform(scrollYProgress, [0.16, 0.56], [52, -36]), { stiffness: 46, damping: 27 })

  const solutionOpacity = useTransform(scrollYProgress, [0.5, 0.58, 0.72, 0.82, 1], [0, 1, 1, 0, 0])
  const solutionY = useSpring(useTransform(scrollYProgress, [0.46, 0.84], [52, -36]), { stiffness: 46, damping: 27 })

  const pricingOpacity = useTransform(scrollYProgress, [0.74, 0.8, 0.86, 0.92, 1], [0, 1, 1, 0, 0])
  const pricingY = useSpring(useTransform(scrollYProgress, [0.62, 0.92], [58, -42]), { stiffness: 52, damping: 25 })

  const ctaOpacity = useTransform(scrollYProgress, [0.84, 0.9, 1], [0, 1, 1])
  const ctaY = useSpring(useTransform(scrollYProgress, [0.84, 1], [40, -10]), { stiffness: 44, damping: 28 })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }

    mq.addListener(onChange)
    return () => mq.removeListener(onChange)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const hashTargets: Record<string, number> = {
      // Snap to the center of each scene plateau to avoid overlap between chapters.
      '#problema': 0.34,
      '#soluzione': 0.58,
      '#prezzi': 0.78,
    }

    function scrollToHash() {
      const progress = hashTargets[window.location.hash]
      if (progress === undefined || !immersiveRef.current) return

      const section = immersiveRef.current
      const start = section.offsetTop
      const end = section.offsetTop + section.offsetHeight - window.innerHeight
      const target = start + (end - start) * progress

      // Instant jump prevents the user from seeing blended intermediate scenes.
      window.scrollTo({ top: target, behavior: 'auto' })

      // Micro settle after jump: quick deblur + opacity settle without blending chapters.
      if (settleTimer.current) {
        window.clearTimeout(settleTimer.current)
      }
      setIsSettling(false)
      requestAnimationFrame(() => {
        setIsSettling(true)
        settleTimer.current = window.setTimeout(() => setIsSettling(false), 340)
      })
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      window.removeEventListener('hashchange', scrollToHash)
      if (settleTimer.current) {
        window.clearTimeout(settleTimer.current)
      }
    }
  }, [isMobile])

  return (
    <MarketingLayout>
      <section ref={immersiveRef} className="immersive-index">
        <motion.div className={`immersive-index-sticky ${isSettling ? 'is-settling' : ''}`} style={{ opacity: isMobile ? 1 : stageOpacity }}>
          <motion.div className="immersive-index-bg" style={{ scale: bgScale, rotate: bgRotate }} />
          <motion.div className="immersive-noise" animate={{ opacity: [0.25, 0.35, 0.25] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          {!isMobile && (
            <motion.div
              className="immersive-nature-float"
              aria-hidden="true"
              style={{ y: natureFloatY, x: natureFloatX, rotate: natureRotate, scale: natureDepth }}
            >
              <div className="nature-3d-core">
                <span className="nature-ring ring-a" />
                <span className="nature-ring ring-b" />
                <span className="nature-ring ring-c" />
                <span className="nature-leaf leaf-a" />
                <span className="nature-leaf leaf-b" />
                <span className="nature-leaf leaf-c" />
                <span className="nature-leaf leaf-d" />
                <span className="nature-seed" />
              </div>
            </motion.div>
          )}

          {!isMobile && (
            <>
              <motion.div
                className="immersive-logo-core"
                style={{ opacity: logoOpacity, scale: logoScale }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <ZovenOrbitalMark />
                <motion.div
                  className="immersive-logo-glow"
                  animate={{ opacity: [0.22, 0.45, 0.22], scale: [0.88, 1.15, 0.88] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              <div className="immersive-stepper" aria-hidden="true">
                {steps.map((s, i) => (
                  <div key={s} className="immersive-step-item">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <p>{s}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {isMobile && (
            <div className="immersive-mobile-scroll-cue" aria-hidden="true">
              <span>Scorri</span>
              <i />
            </div>
          )}

          <motion.article className="immersive-scene" style={{ opacity: isMobile ? 1 : introOpacity, y: isMobile ? 0 : introY }}>
            <Badge>ZOVEN RADICI</Badge>
            <h1>Il sistema operativo per agriturismi e aziende agricole italiane.</h1>
            <p>
              Clienti, camere, tavoli, bottega e riacquisto. Tutto in un unico sistema. Senza canoni mensili.
            </p>
            <div className="immersive-actions">
              <Button to="/audit">Richiedi audit gratuito</Button>
              <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
            </div>
            <div className="immersive-kpis">
              {[
                ['Prenotazioni', '+18%'],
                ['Riacquisto', '+31%'],
                ['Bottega', '+24%'],
              ].map(([label, value]) => (
                <div key={label} className="immersive-kpi-card">
                  <p>{label}</p>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article className="immersive-scene" style={{ opacity: isMobile ? 1 : problemOpacity, y: isMobile ? 0 : problemY }}>
            <span className="kicker">Il problema</span>
            <h2>Il caos operativo blocca crescita e margine.</h2>
            <div className="immersive-grid two">
              {problemi.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="immersive-panel">
                    <div className="immersive-icon-wrap">
                      <Icon size={18} color="var(--gold)" />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.article>

          <motion.article className="immersive-scene" style={{ opacity: isMobile ? 1 : solutionOpacity, y: isMobile ? 0 : solutionY }}>
            <span className="kicker">La soluzione</span>
            <h2>ZOVEN RADICI unifica ogni flusso operativo.</h2>
            <div className="immersive-grid three">
              {moduleList.map((m) => (
                <div key={m.name} className="immersive-panel">
                  <div className="immersive-module-icon">{m.icon ?? '*'} </div>
                  <h3>{m.name}</h3>
                  <p>{m.subtitle}</p>
                  <p><strong>Vantaggio:</strong> {m.advantage}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article className="immersive-scene" style={{ opacity: isMobile ? 1 : pricingOpacity, y: isMobile ? 0 : pricingY }}>
            <span className="kicker">Prezzi</span>
            <h2>Senza abbonamento. Prezzo moderato su richiesta.</h2>
            <div className="immersive-grid two">
              <div className="immersive-panel">
                <h3>Perche e diverso</h3>
                <div className="immersive-checklist">
                  {[
                    'Pagamento unico, nessun canone mensile obbligatorio.',
                    'Il sistema resta di proprieta del cliente.',
                    'Infrastruttura leggera e rapida da adottare.',
                    'Approccio concreto orientato al margine operativo.',
                  ].map((text) => (
                    <div key={text} className="immersive-check-item">
                      <Check size={14} color="var(--leaf-bright)" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="immersive-panel">
                <h3>Piani RADICI</h3>
                <div className="immersive-plan-list">
                  {plans.map((p) => (
                    <div key={p.name} className="immersive-plan-row">
                      <strong style={{ color: p.featured ? 'var(--gold)' : 'var(--text)' }}>{p.name}</strong>
                      <span>Su richiesta</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '0.9rem' }}>
                  <Button to="/prezzi" variant="gold">Scegli il piano giusto</Button>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article className="immersive-scene cta" style={{ opacity: isMobile ? 1 : ctaOpacity, y: isMobile ? 0 : ctaY }}>
            <h2>Ti mostriamo dove stai perdendo clienti, prenotazioni e vendite.</h2>
            <p>Audit gratuito con analisi concreta del tuo flusso operativo attuale. Nessun impegno.</p>
            <div className="immersive-actions">
              <Button to="/audit">Richiedi audit gratuito</Button>
              <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
            </div>
            <p className="immersive-cta-link"><Link to="/contatti">Parla direttamente con ZOVEN</Link></p>
          </motion.article>
        </motion.div>
      </section>
    </MarketingLayout>
  )
}

