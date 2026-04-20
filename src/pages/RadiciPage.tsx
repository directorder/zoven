import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { ArrowRight, CheckCircle, XCircle, Calendar, Users, ShoppingBag, Gift, LayoutDashboard } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
}

export default function RadiciPage() {
  return (
    <main style={{ background: '#050505', overflowX: 'hidden', paddingTop: 80 }}>
      <SEO
        title="ZOVEN RADICI – Software Gestionale per Agriturismi e Aziende Agricole"
        description="ZOVEN RADICI è il sistema operativo per agriturismi, aziende vitivinicole e aziende agricole. Gestisci prenotazioni camere, tavoli, bottega online, CRM clienti e campagne fidelizzazione in un unico sistema. Prova la demo gratuita."
        keywords="software agriturismo, gestionale agriturismo, CRM agriturismo, prenotazioni agriturismo online, software azienda agricola, gestione camere agriturismo, bottega online agriturismo, software cantina vitivinicola, sistema prenotazioni tavoli agriturismo, fidelizzazione clienti agriturismo, ZOVEN RADICI, agriturismo digitale Italia"
        canonical="/radici"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ZOVEN RADICI",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "description": "Sistema gestionale completo per agriturismi e aziende agricole italiane. CRM, prenotazioni, bottega online, campagne fidelizzazione.",
          "offers": { "@type": "Offer", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
          "provider": { "@type": "Organization", "name": "ZOVEN", "url": "https://zoven.it" }
        }}
      />
      {/* HERO */}
      <section style={{ position: 'relative', padding: '100px 0 80px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at top, rgba(74,124,89,0.15) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(74,124,89,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,124,89,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 80%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp} style={{ maxWidth: 760 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(74,124,89,0.12)', border: '1px solid rgba(74,124,89,0.3)',
              borderRadius: 9999, padding: '6px 16px',
              fontSize: 12, fontWeight: 700, color: '#6aad7e',
              letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24,
            }}>
              🌿 ZOVEN RADICI
            </span>
            <h1 style={{
              fontSize: 'clamp(38px, 6vw, 76px)',
              fontWeight: 800, color: 'white',
              letterSpacing: '-0.04em', lineHeight: 1.05,
              marginBottom: 28,
            }}>
              Il Sistema Operativo<br />
              <span style={{
                background: 'linear-gradient(135deg, #4a7c59, #6aad7e, #c9a84c)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>per Agriturismi e<br />Aziende Agricole</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 580, marginBottom: 44 }}>
              Un sistema unico che gestisce prenotazioni, CRM, vendita diretta, fidelizzazione e comunicazione. Smetti di perdere clienti e fatturato per mancanza di strumenti.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a href="https://wa.me/393505383769?text=Ciao!+Vorrei+richiedere+un+audit+gratuito+per+il+mio+agriturismo." target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#4a7c59', color: 'white',
                fontSize: 15, fontWeight: 700, padding: '15px 32px', borderRadius: 14,
                textDecoration: 'none', boxShadow: '0 0 40px rgba(74,124,89,0.4)',
              }}>
                Richiedi Audit Gratuito <ArrowRight size={16} />
              </a>
              <Link to="/demo/radici" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'white', fontSize: 15, fontWeight: 600,
                padding: '15px 32px', borderRadius: 14, textDecoration: 'none',
              }}>
                Guarda la Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <p style={{ fontSize: 13, color: '#6aad7e', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
              Il problema
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Ogni giorno perdi clienti<br />e fatturato. Senza saperlo.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { text: 'Prenotazioni sparse su WhatsApp, telefono, email' },
              { text: 'Nessuna traccia dei clienti abituali e delle loro preferenze' },
              { text: 'Vendita diretta disconnessa dalla gestione' },
              { text: 'Zero follow-up dopo la visita o il soggiorno' },
              { text: 'Camere e tavoli gestiti su fogli Excel o carta' },
              { text: 'Promozioni stagionali mandate a caso o mai' },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: 'rgba(220,38,38,0.05)',
                  border: '1px solid rgba(220,38,38,0.12)',
                  borderRadius: 14, padding: '18px 20px',
                }}
              >
                <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{p.text}</span>
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
            <p style={{ fontSize: 13, color: '#6aad7e', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
              Il sistema
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
              Tutto ciò di cui hai bisogno.<br />In un unico sistema.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {[
              {
                icon: LayoutDashboard, title: 'Dashboard Operativa',
                desc: 'Panoramica completa in tempo reale: occupazione, prenotazioni del giorno, KPI settimanali, ordini pendenti.',
                features: ['KPI in tempo reale', 'Allerte automatiche', 'Vista settimanale/mensile'],
              },
              {
                icon: Users, title: 'CRM Clienti',
                desc: 'Scheda completa per ogni cliente con storico visite, preferenze, spesa media, e comunicazioni.',
                features: ['Profilo cliente 360°', 'Storico prenotazioni', 'Tag e segmentazione'],
              },
              {
                icon: Calendar, title: 'Prenotazioni Camere',
                desc: 'Sistema di booking camere con disponibilità in tempo reale, conferme automatiche e pagamento.',
                features: ['Calendario visivo', 'Conferme via email/WhatsApp', 'Gestione depositi'],
              },
              {
                icon: Calendar, title: 'Prenotazioni Tavoli',
                desc: 'Gestisci la sala ristorante con prenotazioni online, turni, diete speciali e allestimenti.',
                features: ['Mappa sala interattiva', 'Liste attesa', 'Note speciali'],
              },
              {
                icon: ShoppingBag, title: 'Bottega Digitale',
                desc: 'Vendi prodotti del tuo agriturismo online: vini, oli, conserve, box regalo con spedizione.',
                features: ['Catalogo prodotti', 'Stock automatico', 'Ordini online'],
              },
              {
                icon: Gift, title: 'Promo & Fidelizzazione',
                desc: 'Crea campagne email/WhatsApp per riportare i clienti. Offerte stagionali, compleanno, ritorni.',
                features: ['Campagne automatiche', 'Segmentazione clienti', 'ROI tracciato'],
              },
            ].map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  background: 'rgba(74,124,89,0.06)',
                  border: '1px solid rgba(74,124,89,0.15)',
                  borderRadius: 20, padding: '28px',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(74,124,89,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <mod.icon size={22} color="#6aad7e" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10 }}>{mod.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 18 }}>{mod.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {mod.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle size={13} color="#6aad7e" />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 80 }}>
            {[
              { value: '+43%', label: 'Prenotazioni dirette in più' },
              { value: '8h', label: 'Risparmiate a settimana in gestione' },
              { value: '3x', label: 'Più clienti che ritornano' },
              { value: '0€', label: 'Commissioni a terzi' },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  textAlign: 'center',
                  background: 'rgba(74,124,89,0.08)',
                  border: '1px solid rgba(74,124,89,0.15)',
                  borderRadius: 20, padding: '32px 20px',
                }}
              >
                <div style={{ fontSize: 48, fontWeight: 800, color: '#6aad7e', letterSpacing: '-0.04em', marginBottom: 8 }}>{r.value}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{r.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(74,124,89,0.15) 0%, rgba(201,168,76,0.1) 100%)',
              border: '1px solid rgba(74,124,89,0.25)',
              borderRadius: 28, padding: '56px 48px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Inizia a crescere davvero.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 36 }}>
              Audit gratuito. Analizziamo la tua operatività e ti mostriamo il potenziale nascosto.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <a href="https://wa.me/393505383769?text=Ciao!+Vorrei+richiedere+un+audit+gratuito+per+il+mio+agriturismo." target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#4a7c59', color: 'white',
                fontSize: 15, fontWeight: 700, padding: '15px 32px', borderRadius: 14,
                textDecoration: 'none',
              }}>
                Richiedi Audit Gratuito <ArrowRight size={16} />
              </a>
              <Link to="/demo/radici" style={{
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
