import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { ArrowRight, CheckCircle, XCircle, Calendar, Users, Bell, MessageSquare, TrendingUp, Phone } from 'lucide-react'

export default function ClinicPage() {
  return (
    <main style={{ background: '#050505', overflowX: 'hidden', paddingTop: 80 }}>
      <SEO
        title="ZOVEN CLINIC – Software Gestione Appuntamenti per Cliniche e Studi Medici"
        description="ZOVEN CLINIC automatizza prenotazioni, reminder WhatsApp, recupero chiamate perse e riattivazione pazienti per cliniche dentali, studi medici e centri estetici. Booking online 24/7, CRM pazienti, centralino AI. Aumenta il fatturato del 43%."
        keywords="software gestione clinica, appuntamenti online clinica, CRM pazienti, reminder appuntamenti WhatsApp, recupero chiamate perse clinica, software studio dentistico, gestione pazienti studio medico, prenotazioni online studio medico, centralino AI clinica, riattivazione pazienti inattivi, software centro estetico, booking online 24h clinica, ZOVEN CLINIC, gestionale clinico Italia"
        canonical="/clinic"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ZOVEN CLINIC",
          "applicationCategory": "MedicalApplication",
          "operatingSystem": "Web",
          "description": "Sistema di gestione completo per cliniche: prenotazioni online 24/7, reminder automatici WhatsApp, CRM pazienti, recupero chiamate perse e riattivazione pazienti.",
          "offers": { "@type": "Offer", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
          "provider": { "@type": "Organization", "name": "ZOVEN", "url": "https://zoven.it" }
        }}
      />
      {/* HERO */}
      <section style={{ position: 'relative', padding: '100px 0 80px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at top, rgba(37,99,235,0.15) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 80%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 780 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.3)',
              borderRadius: 9999, padding: '6px 16px',
              fontSize: 12, fontWeight: 700, color: '#3b82f6',
              letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24,
            }}>
              🏥 ZOVEN CLINIC
            </span>
            <h1 style={{
              fontSize: 'clamp(38px, 6vw, 76px)',
              fontWeight: 800, color: 'white',
              letterSpacing: '-0.04em', lineHeight: 1.05,
              marginBottom: 28,
            }}>
              Trasforma il Centralino<br />
              <span style={{
                background: 'linear-gradient(135deg, #1e40af, #2563eb, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>in una Macchina<br />di Appuntamenti</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 600, marginBottom: 44 }}>
              Ogni chiamata persa è un paziente perso. Il nostro sistema cattura, conferma e segue ogni appuntamento automaticamente — 24 ore su 24, 7 giorni su 7.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#2563eb', color: 'white',
                fontSize: 15, fontWeight: 700, padding: '15px 32px', borderRadius: 14,
                textDecoration: 'none', boxShadow: '0 0 40px rgba(37,99,235,0.4)',
              }}>
                Richiedi Audit Gratuito <ArrowRight size={16} />
              </Link>
              <Link to="/demo/clinic" style={{
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

      {/* COST OF CHAOS */}
      <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.08))',
              border: '1px solid rgba(37,99,235,0.2)',
              borderRadius: 24, padding: '40px',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, alignItems: 'center',
            }}
          >
            <div>
              <p style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Il costo reale del caos
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
                Ogni giorno senza<br />sistema automatico
              </h3>
            </div>
            {[
              { label: 'Chiamate perse/giorno', value: '4–8' },
              { label: 'Valore medio paziente', value: '€ 280' },
              { label: 'Pazienti persi/mese', value: '60+' },
              { label: 'Fatturato perso/anno', value: '€ 20.000+', highlight: true },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: item.highlight ? 28 : 22,
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
              Il caos che stai subendo ogni giorno.
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              'Chiamate perse perché la reception è occupata',
              'Appuntamenti dimenticati senza nessun reminder',
              'Reception sommersa da telefonate ripetitive',
              'Nessun sistema per recuperare i pazienti inattivi',
              'Agenda cartacea o su Excel impossibile da gestire',
              'Zero automazione post-visita per follow-up e recensioni',
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
            <p style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
              Il sistema
            </p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
              Automazione completa.<br />Zero pazienti persi.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {[
              {
                icon: Calendar, title: 'Booking Intelligente 24/7',
                desc: 'I pazienti prenotano online in qualsiasi momento. Nessun telefono necessario, conferma automatica immediata.',
                features: ['Calendario disponibilità live', 'Selezione specialista', 'Conferma email + WhatsApp'],
              },
              {
                icon: Phone, title: 'Recupero Chiamate Perse',
                desc: 'Ogni chiamata senza risposta genera un messaggio WhatsApp automatico entro 2 minuti.',
                features: ['Rilevamento chiamata persa', 'WhatsApp automatico', 'Link prenotazione diretta'],
              },
              {
                icon: Bell, title: 'Reminder Automatici',
                desc: '48h prima, 24h prima, 2h prima: ogni paziente riceve reminder personalizzati che riducono i no-show.',
                features: ['Multi-canale (SMS/WhatsApp)', 'Conferma con un click', 'Riduzione disdette'],
              },
              {
                icon: MessageSquare, title: 'WhatsApp Conferme',
                desc: 'Sistema di comunicazione WhatsApp completamente automatizzato per ogni fase del percorso paziente.',
                features: ['Template personalizzati', 'Raccolta conferme', 'Messaggi post-visita'],
              },
              {
                icon: Users, title: 'CRM Pazienti',
                desc: 'Database completo di ogni paziente con storico visite, trattamenti, note mediche e comunicazioni.',
                features: ['Profilo paziente completo', 'Storico clinico', 'Segmentazione automatica'],
              },
              {
                icon: TrendingUp, title: 'Campagne Riattivazione',
                desc: 'Identifica pazienti inattivi da 3-6-12 mesi e invia campagne WhatsApp/email automatizzate.',
                features: ['Filtro inattività', 'Messaggi personalizzati', 'ROI tracciato'],
              },
            ].map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'rgba(37,99,235,0.06)',
                  border: '1px solid rgba(37,99,235,0.15)',
                  borderRadius: 20, padding: '28px',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(37,99,235,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <mod.icon size={22} color="#3b82f6" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10 }}>{mod.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 18 }}>{mod.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {mod.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle size={13} color="#3b82f6" />
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
              { value: '+67%', label: 'Appuntamenti confermati' },
              { value: '-45%', label: 'No-show ridotti' },
              { value: '24/7', label: 'Prenotazioni attive' },
              { value: '€0', label: 'Personale extra necessario' },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  textAlign: 'center',
                  background: 'rgba(37,99,235,0.08)',
                  border: '1px solid rgba(37,99,235,0.15)',
                  borderRadius: 20, padding: '32px 20px',
                }}
              >
                <div style={{ fontSize: 48, fontWeight: 800, color: '#3b82f6', letterSpacing: '-0.04em', marginBottom: 8 }}>{r.value}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{r.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.1))',
              border: '1px solid rgba(37,99,235,0.25)',
              borderRadius: 28, padding: '56px 48px', textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Ogni chiamata persa<br />è un paziente perso per sempre.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 36 }}>
              Scopri quanti pazienti stai perdendo ogni mese. Audit gratuito, nessun impegno.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#2563eb', color: 'white',
                fontSize: 15, fontWeight: 700, padding: '15px 32px', borderRadius: 14,
                textDecoration: 'none',
              }}>
                Richiedi Audit Gratuito <ArrowRight size={16} />
              </Link>
              <Link to="/demo/clinic" style={{
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
    </main>
  )
}
