import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { ArrowRight, CheckCircle, TrendingUp, Shield, Zap, Users, Star } from 'lucide-react'
import { useInView, useCounter } from '../hooks/useInView'
import Button from '../components/ui/Button'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
}

function StatCard({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(value, 1800, start)
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {count.toLocaleString('it-IT')}<span style={{ color: '#7c3aed' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 8, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const { ref: statsRef, inView: statsInView } = useInView(0.3)
  const { ref: productsRef, inView: productsInView } = useInView(0.1)
  const { ref: whyRef, inView: whyInView } = useInView(0.1)
  const { ref: resultsRef, inView: resultsInView } = useInView(0.2)

  return (
    <main style={{ background: '#050505', overflowX: 'hidden' }}>
      <SEO
        title="ZOVEN – Sistemi Digitali che Fanno Crescere le Imprese Italiane"
        description="ZOVEN costruisce sistemi digitali su misura per agriturismi, ristoranti, pizzerie e cliniche. Eliminiamo caos, abbonamenti inutili e clienti persi. CRM, prenotazioni, ordini online, automazioni WhatsApp."
        keywords="ZOVEN, sistemi digitali imprese, software gestionale personalizzato, CRM agriturismo, software ristorante ordini online, gestione clinica appuntamenti, automazione processi aziendali, eliminare deliveroo ristorante, software prenotazioni online Italia, digital system PMI italiane"
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://zoven.it/#organization",
              "name": "ZOVEN",
              "url": "https://zoven.it",
              "description": "Sistemi digitali su misura per agriturismi, ristoranti e cliniche italiane.",
              "areaServed": "IT",
              "contactPoint": { "@type": "ContactPoint", "telephone": "+39-350-538-3769", "contactType": "customer service", "availableLanguage": "Italian" },
              "sameAs": ["https://zoven.it"]
            },
            {
              "@type": "WebSite",
              "@id": "https://zoven.it/#website",
              "url": "https://zoven.it",
              "name": "ZOVEN",
              "publisher": { "@id": "https://zoven.it/#organization" }
            },
            {
              "@type": "ItemList",
              "name": "Sistemi ZOVEN",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ZOVEN RADICI", "url": "https://zoven.it/radici" },
                { "@type": "ListItem", "position": 2, "name": "ZOVEN A TAVOLA", "url": "https://zoven.it/a-tavola" },
                { "@type": "ListItem", "position": 3, "name": "ZOVEN CLINIC", "url": "https://zoven.it/clinic" }
              ]
            }
          ]
        }}
      />
      {/* HERO */}
      <section
        ref={heroRef}
        style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        {/* Animated background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Radial glow */}
          <div style={{
            position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
            width: '140%', height: '80%',
            background: 'radial-gradient(ellipse at center top, rgba(124,58,237,0.18) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }} />
          {/* Product color orbs */}
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '20%', left: '10%',
              width: 400, height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(74,124,89,0.12) 0%, transparent 70%)',
            }}
          />
          <motion.div
            animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute', top: '30%', right: '10%',
              width: 350, height: 350,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(224,92,42,0.1) 0%, transparent 70%)',
            }}
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            style={{
              position: 'absolute', bottom: '15%', left: '30%',
              width: 450, height: 450,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
            }}
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, width: '100%', zIndex: 1 }}
        >
          <div className="container" style={{ paddingTop: 120, paddingBottom: 80 }}>
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              style={{ maxWidth: 820 }}
            >
              {/* Badge */}
              <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  borderRadius: 9999, padding: '6px 16px',
                  fontSize: 12, fontWeight: 600, color: '#a855f7',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', display: 'inline-block' }} />
                  Sistemi Digitali su Misura
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                style={{
                  fontSize: 'clamp(42px, 7vw, 88px)',
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.04,
                  marginBottom: 28,
                }}
              >
                Sistemi Digitali che<br />
                <span style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #c084fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Fanno Crescere<br />le Imprese</span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: 'clamp(17px, 2.2vw, 21px)',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65,
                  maxWidth: 580,
                  marginBottom: 44,
                  fontWeight: 400,
                }}
              >
                Eliminiamo caos, abbonamenti inutili e clienti persi.<br />
                Creiamo sistemi proprietari che aumentano prenotazioni,<br />
                ordini e fatturato.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <Link to="/radici" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white', fontSize: 15, fontWeight: 600,
                  padding: '15px 30px', borderRadius: 14,
                  textDecoration: 'none',
                  boxShadow: '0 0 40px rgba(124,58,237,0.35)',
                }}>
                  Scopri i Sistemi <ArrowRight size={16} />
                </Link>
                <Link to="/demo/clinic" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'white', fontSize: 15, fontWeight: 600,
                  padding: '15px 30px', borderRadius: 14,
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                }}>
                  Guarda le Demo
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 24, height: 40,
              border: '2px solid rgba(255,255,255,0.15)',
              borderRadius: 12,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              paddingTop: 6,
            }}
          >
            <div style={{ width: 4, height: 8, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section ref={statsRef as any} style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 48,
              textAlign: 'center',
            }}
          >
            <StatCard value={340} suffix="+" label="Clienti attivi" start={statsInView} />
            <StatCard value={2800} suffix="+" label="Prenotazioni gestite" start={statsInView} />
            <StatCard value={94} suffix="%" label="Tasso soddisfazione" start={statsInView} />
            <StatCard value={68} suffix="%" label="Riduzione caos operativo" start={statsInView} />
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Scelto da imprese italiane di settore
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px 48px' }}>
            {['Agriturismi', 'Aziende Vitivinicole', 'Pizzerie', 'Ristoranti', 'Cliniche Dentali', 'Centri Estetici', 'Studi Medici'].map(name => (
              <span key={name} style={{ fontSize: 14, color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" ref={productsRef as any}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 72 }}
          >
            <p style={{ fontSize: 13, color: '#7c3aed', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
              I Nostri Sistemi
            </p>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Un sistema per ogni settore.<br />Zero compromessi.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              {
                name: 'ZOVEN RADICI',
                tagline: 'Il sistema operativo per agriturismi e aziende agricole',
                desc: 'Gestisci prenotazioni camere, tavoli, vendita diretta, CRM e campagne fidelizzazione in un unico sistema.',
                href: '/radici',
                demoHref: '/demo/radici',
                color: '#4a7c59',
                colorLight: '#6aad7e',
                gradient: 'linear-gradient(135deg, #0d2b1a 0%, #1a4a2e 50%, #2d6b44 100%)',
                features: ['CRM clienti', 'Camere & tavoli', 'Bottega online', 'Promo automatiche'],
                icon: '🌿',
              },
              {
                name: 'ZOVEN A TAVOLA',
                tagline: 'Più ordini diretti. Meno commissioni.',
                desc: 'Elimina Deliveroo e JustEat. Crea il tuo canale di ordini proprietario con WhatsApp, SEO locale e CRM.',
                href: '/a-tavola',
                demoHref: '/demo/a-tavola',
                color: '#e05c2a',
                colorLight: '#f07a4a',
                gradient: 'linear-gradient(135deg, #2b0f06 0%, #4a1a0a 50%, #7a2d10 100%)',
                features: ['Ordini diretti', 'Zero commissioni', 'SEO locale', 'Mini CRM'],
                icon: '🍕',
              },
              {
                name: 'ZOVEN CLINIC',
                tagline: 'Trasforma il centralino in una macchina di appuntamenti',
                desc: 'Appuntamenti automatici 24/7, reminder WhatsApp, CRM pazienti, reattivazione e conversione chiamate perse.',
                href: '/clinic',
                demoHref: '/demo/clinic',
                color: '#2563eb',
                colorLight: '#3b82f6',
                gradient: 'linear-gradient(135deg, #050d24 0%, #0c1e4a 50%, #1a3a8a 100%)',
                features: ['Booking 24/7', 'Reminder automatici', 'CRM pazienti', 'Recupero chiamate perse'],
                icon: '🏥',
              },
            ].map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 50 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{
                  background: product.gradient,
                  border: `1px solid ${product.color}22`,
                  borderRadius: 24,
                  padding: 36,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Glow */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 200, height: 200,
                  background: `radial-gradient(circle, ${product.color}20 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 40, marginBottom: 20 }}>{product.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: product.colorLight, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                    {product.name}
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 14, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                    {product.tagline}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 28 }}>
                    {product.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                    {product.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle size={14} color={product.colorLight} />
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Link to={product.href} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: product.color,
                      color: 'white', fontSize: 13, fontWeight: 600,
                      padding: '10px 20px', borderRadius: 10,
                      textDecoration: 'none',
                    }}>
                      Scopri <ArrowRight size={14} />
                    </Link>
                    <Link to={product.demoHref} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'white', fontSize: 13, fontWeight: 600,
                      padding: '10px 20px', borderRadius: 10,
                      textDecoration: 'none',
                    }}>
                      Demo
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ZOVEN */}
      <section className="section" ref={whyRef as any} style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={whyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p style={{ fontSize: 13, color: '#7c3aed', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                Perché ZOVEN
              </p>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>
                Non vendiamo software.<br />
                <span style={{ color: '#7c3aed' }}>Costruiamo sistemi.</span>
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 36 }}>
                Ogni impresa che lavora con ZOVEN smette di pagare abbonamenti inutili,
                smette di perdere clienti per mancanza di follow-up, e smette di
                dipendere da piattaforme che erodono i margini.
              </p>
              <Button href="https://wa.me/393505383769?text=Ciao!+Vorrei+richiedere+un+audit+gratuito+per+la+mia+attivit%C3%A0." size="lg">
                Richiedi Audit Gratuito <ArrowRight size={16} />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={whyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {[
                { icon: Shield, title: 'Nessun lock-in', desc: 'Il sistema è tuo. Nessun abbonamento mensile che cresce ogni anno.' },
                { icon: Zap, title: 'Operatività più veloce', desc: 'I tuoi team lavorano meglio. Meno telefonate, meno errori, meno caos.' },
                { icon: TrendingUp, title: 'Più conversioni', desc: 'Ogni sistema è ottimizzato per trasformare interesse in prenotazione o ordine.' },
                { icon: Users, title: 'Clienti fidelizzati', desc: 'CRM e automazioni mantengono vivo il rapporto con ogni cliente nel tempo.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{
                    display: 'flex', gap: 18,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 16, padding: '20px 24px',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(124,58,237,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.icon size={20} color="#a855f7" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>{item.title}</h4>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* RESULTS */}
      <section className="section" ref={resultsRef as any}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <p style={{ fontSize: 13, color: '#7c3aed', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
              Risultati reali
            </p>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
              I numeri parlano chiaro.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { value: '+43%', label: 'Aumento prenotazioni dirette', color: '#4a7c59', context: 'Agriturismi' },
              { value: '-28%', label: 'Riduzione commissioni esterne', color: '#e05c2a', context: 'Ristoranti' },
              { value: '+67%', label: 'Appuntamenti confermati', color: '#2563eb', context: 'Cliniche' },
              { value: '0 ore', label: 'Perse in telefonate caotiche', color: '#7c3aed', context: 'Tutti i settori' },
            ].map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={resultsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: `linear-gradient(135deg, ${r.color}10 0%, transparent 100%)`,
                  border: `1px solid ${r.color}22`,
                  borderRadius: 20, padding: '32px 28px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 48, fontWeight: 800, color: r.color, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 12 }}>
                  {r.value}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 6 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{r.context}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Chi ha scelto ZOVEN.
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 8 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>4.9/5 media clienti</span>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              {
                quote: "In sei mesi abbiamo quasi raddoppiato le prenotazioni dirette. Niente più caos su WhatsApp, tutto centralizzato.",
                name: "Matteo R.",
                role: "Agriturismo, Toscana",
                color: '#4a7c59',
              },
              {
                quote: "Abbiamo eliminato le commissioni Deliveroo. I clienti ora ordinano direttamente da noi e ritornano grazie al CRM.",
                name: "Carla B.",
                role: "Pizzeria, Milano",
                color: '#e05c2a',
              },
              {
                quote: "Il centralino automatico ha trasformato le chiamate perse in appuntamenti. Risultati in 30 giorni.",
                name: "Dr. Alessandro V.",
                role: "Clinica Dentale, Roma",
                color: '#2563eb',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '28px',
                }}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}88 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 700, color: 'white',
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.15) 100%)',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 32,
              padding: 'clamp(48px, 8vw, 96px)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 20 }}>
                Pronto a eliminare il caos<br />
                <span style={{
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>e far crescere il fatturato?</span>
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 44, maxWidth: 500, margin: '0 auto 44px' }}>
                Inizia con un audit gratuito. Analizziamo la tua operatività e ti mostriamo dove stai perdendo soldi.
              </p>
              <a href="https://wa.me/393505383769?text=Ciao!+Vorrei+richiedere+un+audit+gratuito+per+la+mia+attivit%C3%A0." target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white', fontSize: 16, fontWeight: 700,
                padding: '18px 40px', borderRadius: 16,
                textDecoration: 'none',
                boxShadow: '0 0 60px rgba(124,58,237,0.5)',
              }}>
                Richiedi Audit Gratuito <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
