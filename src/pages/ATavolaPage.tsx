import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { ArrowRight, CheckCircle, XCircle, ShoppingCart, MessageSquare, MapPin, Users, TrendingUp, Tag } from 'lucide-react'

export default function ATavolaPage() {
  return (
    <main style={{ background: '#050505', overflowX: 'hidden', paddingTop: 80 }}>
      <SEO
        title="ZOVEN A TAVOLA – Ordini Online Diretti per Pizzerie e Ristoranti senza Commissioni"
        description="ZOVEN A TAVOLA elimina Deliveroo, JustEat e Glovo. Crea il tuo canale di ordini online diretto via WhatsApp e sito proprietario. Zero commissioni, CRM clienti, fidelizzazione e SEO locale. Risparmia fino a €20.000/anno."
        keywords="ordini online ristorante, sistema ordini pizzeria, alternativa deliveroo, eliminare just eat, eliminare glovo ristorante, zero commissioni food delivery, ordini WhatsApp ristorante, sito ordini online pizzeria, menu digitale ristorante, fidelizzazione clienti pizzeria, SEO locale ristorante, CRM ristorante, ZOVEN A TAVOLA, software ristorazione Italia"
        canonical="/a-tavola"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ZOVEN A TAVOLA",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "description": "Sistema di ordini online diretto per pizzerie e ristoranti. Elimina le commissioni delle piattaforme food delivery con ordini via WhatsApp e canale proprietario.",
          "offers": { "@type": "Offer", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
          "provider": { "@type": "Organization", "name": "ZOVEN", "url": "https://zoven.it" }
        }}
      />
      {/* HERO */}
      <section style={{ position: 'relative', padding: '100px 0 80px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at top, rgba(224,92,42,0.15) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(224,92,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(224,92,42,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 80%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 760 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(224,92,42,0.12)', border: '1px solid rgba(224,92,42,0.3)',
              borderRadius: 9999, padding: '6px 16px',
              fontSize: 12, fontWeight: 700, color: '#f07a4a',
              letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24,
            }}>
              🍕 ZOVEN A TAVOLA
            </span>
            <h1 style={{
              fontSize: 'clamp(38px, 6vw, 76px)',
              fontWeight: 800, color: 'white',
              letterSpacing: '-0.04em', lineHeight: 1.05,
              marginBottom: 28,
            }}>
              Più Ordini Diretti.<br />
              <span style={{
                background: 'linear-gradient(135deg, #e05c2a, #f07a4a, #f5a623)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Meno Commissioni.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 580, marginBottom: 44 }}>
              Basta pagare il 30% a Deliveroo e JustEat. Il tuo canale di ordini online, WhatsApp e SEO locale che ti porta clienti diretti, fidelizzati, tuoi.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a href="https://wa.me/393505383769?text=Ciao!+Vorrei+richiedere+un+audit+gratuito+per+il+mio+ristorante." target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#e05c2a', color: 'white',
                fontSize: 15, fontWeight: 700, padding: '15px 32px', borderRadius: 14,
                textDecoration: 'none', boxShadow: '0 0 40px rgba(224,92,42,0.4)',
              }}>
                Richiedi Audit Gratuito <ArrowRight size={16} />
              </a>
              <Link to="/demo/a-tavola" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'white', fontSize: 15, fontWeight: 600,
                padding: '15px 32px', borderRadius: 14, textDecoration: 'none',
              }}>
                Scopri la Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMMISSION CALCULATOR */}
      <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(224,92,42,0.1), rgba(192,57,43,0.1))',
              border: '1px solid rgba(224,92,42,0.2)',
              borderRadius: 24, padding: '40px',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, alignItems: 'center',
            }}
          >
            <div>
              <p style={{ fontSize: 13, color: '#f07a4a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Calcolo reale
              </p>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
                Quanto stai pagando<br />alle piattaforme?
              </h3>
            </div>
            {[
              { label: 'Ordini/mese su Deliveroo', value: '200 ordini' },
              { label: 'Scontrino medio', value: '€ 28' },
              { label: 'Commissione media (30%)', value: '€ 1.680/mese' },
              { label: 'In un anno perdi', value: '€ 20.160', highlight: true },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: item.highlight ? 32 : 22,
                  fontWeight: 800,
                  color: item.highlight ? '#ef4444' : 'white',
                  letterSpacing: '-0.03em', marginBottom: 4,
                }}>{item.value}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
              I problemi che risolviamo.
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              'Commissioni 30% che erodono i margini ogni giorno',
              'Nessun database clienti proprio – i dati restano a Deliveroo',
              'Scarsa visibilità su Google per le ricerche locali',
              'Nessun sistema di fidelizzazione o offerte ai clienti fedeli',
              'Ordini WhatsApp caotici senza gestione strutturata',
              'Zero automazione per recuperare clienti inattivi',
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.12)',
                  borderRadius: 14, padding: '18px 20px',
                }}
              >
                <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 72 }}
          >
            <p style={{ fontSize: 13, color: '#f07a4a', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
              Moduli inclusi
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
              Il tuo sistema di ordini completo.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {[
              {
                icon: ShoppingCart, title: 'Pagina Ordini Diretta',
                desc: 'Il tuo sito di ordinazione brandizzato. Clienti ordinano direttamente da te senza intermediari.',
                features: ['Menu digitale personalizzato', 'Pagamento integrato', 'Conferma automatica'],
              },
              {
                icon: MessageSquare, title: 'Ordini WhatsApp',
                desc: 'Canale WhatsApp strutturato per ricevere e gestire ordini in modo organizzato.',
                features: ['Template messaggi', 'Lista ordini centralizzata', 'Notifiche cucina'],
              },
              {
                icon: MapPin, title: 'SEO Locale',
                desc: 'Ottimizzazione Google My Business, parole chiave locali e recensioni per dominare le ricerche vicine.',
                features: ['Google Business ottimizzato', 'Parole chiave locali', 'Gestione recensioni'],
              },
              {
                icon: Users, title: 'Mini CRM',
                desc: 'Database completo dei tuoi clienti con storico ordini, preferenze e frequenza.',
                features: ['Scheda cliente', 'Storico ordini', 'Segmentazione'],
              },
              {
                icon: Tag, title: 'Offerte Fedeltà',
                desc: 'Sistema punti e coupon automatici per incentivare i ritorni e aumentare la frequenza.',
                features: ['Programma punti', 'Coupon automatici', 'Offerte compleanno'],
              },
              {
                icon: TrendingUp, title: 'Campagne di Ritorno',
                desc: 'WhatsApp e email automatiche per riportare i clienti inattivi con offerte mirate.',
                features: ['Segmentazione automatica', 'Messaggi personalizzati', 'ROI tracciato'],
              },
            ].map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'rgba(224,92,42,0.06)',
                  border: '1px solid rgba(224,92,42,0.15)',
                  borderRadius: 20, padding: '28px',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(224,92,42,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <mod.icon size={22} color="#f07a4a" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10 }}>{mod.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 18 }}>{mod.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {mod.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle size={13} color="#f07a4a" />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS + CTA */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 80 }}>
            {[
              { value: '-28%', label: 'Riduzione commissioni esterne' },
              { value: '+52%', label: 'Ordini diretti in più' },
              { value: '2x', label: 'Più clienti fidelizzati' },
              { value: '+31%', label: 'Visibilità Google locale' },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  textAlign: 'center',
                  background: 'rgba(224,92,42,0.08)',
                  border: '1px solid rgba(224,92,42,0.15)',
                  borderRadius: 20, padding: '32px 20px',
                }}
              >
                <div style={{ fontSize: 48, fontWeight: 800, color: '#f07a4a', letterSpacing: '-0.04em', marginBottom: 8 }}>{r.value}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{r.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(224,92,42,0.15), rgba(192,57,43,0.1))',
              border: '1px solid rgba(224,92,42,0.25)',
              borderRadius: 28, padding: '56px 48px', textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Basta pagare commissioni.<br />Inizia a incassare di più.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 36 }}>
              Mostriamo nel nostro audit esattamente quanto stai perdendo e come recuperarlo.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <a href="https://wa.me/393505383769?text=Ciao!+Vorrei+richiedere+un+audit+gratuito+per+il+mio+ristorante." target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#e05c2a', color: 'white',
                fontSize: 15, fontWeight: 700, padding: '15px 32px', borderRadius: 14,
                textDecoration: 'none',
              }}>
                Richiedi Audit Gratuito <ArrowRight size={16} />
              </a>
              <Link to="/demo/a-tavola" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'white', fontSize: 15, fontWeight: 600,
                padding: '15px 32px', borderRadius: 14, textDecoration: 'none',
              }}>
                Esplora la Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
