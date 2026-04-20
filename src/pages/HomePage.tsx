import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
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
const anchors = ['intro', 'problema', 'soluzione', 'prezzi', 'azione'] as const

type HudContent = {
  kicker: string
  title: string
  body: string
  panel: ReactNode
  mobilePoints: string[]
}

function chapterIndexFromProgress(progress: number) {
  if (progress < 0.2) return 0
  if (progress < 0.42) return 1
  if (progress < 0.64) return 2
  if (progress < 0.82) return 3
  return 4
}

export function HomePage() {
  const immersiveRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const { scrollYProgress } = useScroll({
    target: immersiveRef,
    offset: ['start start', 'end end'],
  })

  const stageOpacity = useTransform(scrollYProgress, [0.97, 1], [1, 0])
  const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.16]), { stiffness: 56, damping: 28 })
  const bgRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-2.4, 3.8]), { stiffness: 56, damping: 28 })
  const worldGlowX = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 42]), { stiffness: 34, damping: 24 })
  const worldGridY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -34]), { stiffness: 34, damping: 24 })
  const worldOrbY = useSpring(useTransform(scrollYProgress, [0, 1], [14, -28]), { stiffness: 36, damping: 24 })
  const worldOrbRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-6, 12]), { stiffness: 34, damping: 24 })
  const trackShift = useTransform(scrollYProgress, [0, 1], [0, 72])
  const trackTransform = useMotionTemplate`translate3d(-${trackShift}%, 0, 0)`

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setActiveChapter(chapterIndexFromProgress(value))
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
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
      '#intro': 0.05,
      '#problema': 0.28,
      '#soluzione': 0.52,
      '#prezzi': 0.74,
      '#azione': 0.92,
    }

    function scrollToHash() {
      const progress = hashTargets[window.location.hash]
      if (progress === undefined || !immersiveRef.current) return

      const section = immersiveRef.current
      const start = section.offsetTop
      const end = section.offsetTop + section.offsetHeight - window.innerHeight
      const target = start + (end - start) * progress

      window.scrollTo({ top: target, behavior: 'auto' })
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [isMobile])

  const hudContent = useMemo<HudContent[]>(() => {
    return [
      {
        kicker: 'ZOVEN RADICI',
        title: 'Il sistema operativo per agriturismi e aziende agricole italiane.',
        body: 'Clienti, camere, tavoli, bottega e riacquisto in un unico ecosistema operativo. Zero dispersione, piu margine.',
        panel: (
          <div className="journey-hud-grid three">
            {[
              ['Prenotazioni', '+18%'],
              ['Riacquisto', '+31%'],
              ['Bottega', '+24%'],
            ].map(([label, value]) => (
              <div key={label} className="journey-chip">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        ),
        mobilePoints: [
          'Un solo sistema per clienti, camere, tavoli e bottega.',
          'Dati centralizzati, decisioni piu rapide, meno errori.',
          'Focalizzato su margine operativo reale, non vanity metrics.',
        ],
      },
      {
        kicker: 'Problema',
        title: 'Il caos operativo ti fa perdere clienti e valore ad ogni passaggio.',
        body: 'Prenotazioni sparse, CRM frammentato, vendite bottega scollegate. Ogni canale lavora da solo e il margine scende.',
        panel: (
          <div className="journey-hud-grid two">
            {problemi.slice(0, 4).map((item) => (
              <div key={item.title} className="journey-chip">
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            ))}
          </div>
        ),
        mobilePoints: [
          'Prenotazioni e richieste sparse su canali diversi.',
          'Storico cliente frammentato e poco utilizzabile.',
          'Upsell e riacquisto lasciati al caso.',
        ],
      },
      {
        kicker: 'Soluzione',
        title: 'ZOVEN RADICI unisce tutte le operazioni in un unico flusso.',
        body: 'Dal primo contatto al riacquisto: tutto connesso, misurabile, orientato alla crescita reale.',
        panel: (
          <div className="journey-hud-grid two">
            {moduleList.slice(0, 4).map((module) => (
              <div key={module.name} className="journey-chip">
                <strong>{module.name}</strong>
                <span>{module.advantage}</span>
              </div>
            ))}
          </div>
        ),
        mobilePoints: [
          'Dashboard unificata per operativita quotidiana.',
          'CRM vivo con segmenti e azioni immediate.',
          'Automazioni pratiche per vendite dirette e ritorni.',
        ],
      },
      {
        kicker: 'Prezzi',
        title: 'Nessun abbonamento. Prezzo moderato su richiesta.',
        body: 'Implementazione concreta, ownership del sistema e ritorno operativo rapido senza canoni ricorrenti forzati.',
        panel: (
          <div className="journey-hud-grid two">
            {plans.map((plan) => (
              <div key={plan.name} className="journey-chip compact">
                <strong>{plan.name}</strong>
                <span>Su richiesta</span>
              </div>
            ))}
          </div>
        ),
        mobilePoints: [
          'Nessun canone mensile obbligatorio.',
          'Progetto dimensionato sulla tua realta operativa.',
          'Piano e setup definiti in audit con stima chiara.',
        ],
      },
      {
        kicker: 'Azione',
        title: 'Ti mostriamo dove stai perdendo clienti, prenotazioni e vendite.',
        body: 'Audit gratuito con analisi operativa del tuo flusso attuale: concreto, rapido, senza impegno.',
        panel: (
          <div className="journey-hud-grid two">
            <div className="journey-chip">
              <strong>Analisi operativa</strong>
              <span>Identifichiamo perdite e opportunita reali.</span>
            </div>
            <div className="journey-chip">
              <strong>Roadmap chiara</strong>
              <span>Priorita, stima impatto economico, piano di intervento.</span>
            </div>
          </div>
        ),
        mobilePoints: [
          'Analisi flusso operativo attuale.',
          'Roadmap con priorita e impatto economico.',
          'Nessun impegno, output concreto e azionabile.',
        ],
      },
    ]
  }, [])

  return (
    <MarketingLayout>
      <section ref={immersiveRef} className={`journey-home ${isMobile ? 'is-mobile' : ''}`}>
        {!isMobile && (
          <motion.div className="journey-stage" style={{ opacity: stageOpacity }}>
            <motion.div className="journey-bg" style={{ scale: bgScale, rotate: bgRotate }} />
            <motion.div className="journey-grid" style={{ y: worldGridY }} />
            <motion.div className="journey-glow" style={{ x: worldGlowX }} />

            <motion.div className="journey-world-mark" style={{ y: worldOrbY, rotate: worldOrbRotate }}>
              <ZovenOrbitalMark />
            </motion.div>

            <motion.div className="journey-track" style={{ transform: trackTransform }}>
              <div className="journey-rail" />
              {steps.map((step, index) => {
                const Icon = [AlertTriangle, Smartphone, Layers, Check, TrendingDown][index]
                return (
                  <article
                    key={step}
                    id={anchors[index]}
                    className={`journey-node ${activeChapter === index ? 'is-active' : ''}`}
                    style={{ left: `${10 + index * 22}%` }}
                  >
                    <div className="journey-node-dot" />
                    <div className="journey-node-card">
                      <span>{String(index + 1).padStart(2, '0')} • {step}</span>
                      <h3>{hudContent[index].title}</h3>
                      <p>{hudContent[index].body}</p>
                      <Icon size={15} />
                    </div>
                  </article>
                )
              })}
            </motion.div>

            <aside className="journey-hud">
              <Badge>{hudContent[activeChapter].kicker}</Badge>
              <h1>{hudContent[activeChapter].title}</h1>
              <p>{hudContent[activeChapter].body}</p>
              {hudContent[activeChapter].panel}
              <div className="journey-cta-actions">
                <Button to="/audit">Richiedi audit gratuito</Button>
                <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
              </div>
              <p className="journey-contact-link"><Link to="/contatti">Parla direttamente con ZOVEN</Link></p>
            </aside>
          </motion.div>
        )}

        {isMobile && (
          <div className="journey-mobile-flow">
            <section className="journey-mobile-hero" id="intro">
              <Badge>ZOVEN RADICI</Badge>
              <h1>Il sistema operativo per agriturismi e aziende agricole.</h1>
              <p>Una demo pensata per farti vedere in 2 minuti dove stai perdendo margine e come recuperarlo.</p>
              <div className="journey-cta-actions">
                <Button to="/audit">Richiedi audit gratuito</Button>
                <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
              </div>
            </section>

            <div className="journey-mobile-cue" aria-hidden="true">
              <span>Scorri</span>
              <i />
            </div>

            <nav className="journey-mobile-steps" aria-label="Percorso demo">
              {steps.map((step, index) => (
                <a key={step} href={`#${anchors[index]}`}>{step}</a>
              ))}
            </nav>

            {hudContent.slice(1).map((chapter, index) => (
              <article key={anchors[index + 1]} className="journey-mobile-card" id={anchors[index + 1]}>
                <Badge>{chapter.kicker}</Badge>
                <h2>{chapter.title}</h2>
                <p>{chapter.body}</p>
                <ul className="journey-mobile-points">
                  {chapter.mobilePoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                {index === hudContent.slice(1).length - 1 ? (
                  <div className="journey-cta-actions">
                    <Button to="/audit">Richiedi audit gratuito</Button>
                    <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
                  </div>
                ) : (
                  <p className="journey-next-step">Continua verso: {steps[index + 2]}</p>
                )}
              </article>
            ))}

            <div className="journey-mobile-final-link">
              <Link to="/contatti">Parla direttamente con ZOVEN</Link>
            </div>
          </div>
        )}
      </section>
    </MarketingLayout>
  )
}

