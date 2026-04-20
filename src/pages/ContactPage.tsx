import { useState } from 'react'
import { motion } from 'motion/react'
import SEO from '../components/ui/SEO'
import { Send, CheckCircle, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefono: '', settore: '', messaggio: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.email || !form.settore) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <main style={{ background: '#050505', minHeight: '100vh', paddingTop: 80 }}>
      <SEO
        title="Contatti – Richiedi il tuo Audit Digitale Gratuito | ZOVEN"
        description="Contatta ZOVEN per ricevere un audit digitale gratuito della tua attività. Analizziamo la tua situazione e proponiamo un sistema su misura per agriturismo, ristorante o clinica. Nessun impegno, risposta entro 24 ore."
        keywords="contatta ZOVEN, audit digitale gratuito, consulenza digitale gratuita imprese, richiedi demo ZOVEN, consulenza software agriturismo, consulenza software ristorante, consulenza gestionale clinica, sistema digitale su misura, preventivo software gestionale Italia"
        canonical="/contact"
      />
      <section style={{ position: 'relative', padding: '80px 0', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at top, rgba(124,58,237,0.12) 0%, transparent 60%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: 72 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 9999, padding: '6px 16px',
              fontSize: 12, fontWeight: 700, color: '#a855f7',
              letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20,
            }}>
              Audit Gratuito
            </span>
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800, color: 'white',
              letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20,
            }}>
              Parliamo della tua<br />
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>crescita digitale</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto' }}>
              Richiedi il tuo audit gratuito. Analizziamo la tua attività e ti mostriamo dove stai perdendo opportunità.
            </p>
          </motion.div>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 20 }}>
                Cosa succede dopo
              </h2>
              {[
                { num: '01', title: 'Riceviamo la tua richiesta', desc: 'Il team ZOVEN esamina la tua situazione entro 24 ore.' },
                { num: '02', title: 'Audit approfondito', desc: 'Analizziamo la tua operatività attuale, i punti deboli e le opportunità.' },
                { num: '03', title: 'Proposta su misura', desc: 'Ti presentiamo un sistema personalizzato con ROI stimato e piano di implementazione.' },
                { num: '04', title: 'Nessun impegno', desc: 'L\'audit è completamente gratuito. Decidi tu se andare avanti.' },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    display: 'flex', gap: 16, marginBottom: 24,
                    padding: '20px', borderRadius: 16,
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(124,58,237,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800, color: '#a855f7',
                  }}>{step.num}</div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>{step.title}</h4>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}

              <div style={{ marginTop: 32, padding: '24px', borderRadius: 16, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Contatti diretti</h4>
                {[
                  { icon: Phone, text: '+39 350 538 3769' },
                  { icon: MapPin, text: 'Italia' },
                ].map(c => (
                  <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <c.icon size={14} color="rgba(255,255,255,0.35)" />
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: 'rgba(74,124,89,0.08)',
                    border: '1px solid rgba(74,124,89,0.25)',
                    borderRadius: 24, padding: '60px 40px',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle size={56} color="#6aad7e" style={{ margin: '0 auto 20px' }} />
                  <h3 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 12 }}>Richiesta inviata!</h3>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                    Grazie, {form.nome}. Il team ZOVEN ti contatterà entro 24 ore per il tuo audit gratuito.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24, padding: '40px',
                  }}
                >
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 32 }}>
                    Richiedi il tuo Audit Gratuito
                  </h3>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        value={form.nome}
                        onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                        placeholder="Mario Rossi"
                        required
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="mario@esempio.it"
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                        Telefono
                      </label>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                        placeholder="+39 333 1234567"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                        Settore *
                      </label>
                      <select
                        value={form.settore}
                        onChange={e => setForm(f => ({ ...f, settore: e.target.value }))}
                        required
                        style={{ ...inputStyle, appearance: 'none' as any }}
                      >
                        <option value="">Seleziona...</option>
                        <option value="agriturismo">Agriturismo / Azienda Agricola</option>
                        <option value="ristorante">Ristorante / Pizzeria</option>
                        <option value="clinica">Clinica / Studio Medico</option>
                        <option value="altro">Altro</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                      Descrivi brevemente la tua situazione
                    </label>
                    <textarea
                      value={form.messaggio}
                      onChange={e => setForm(f => ({ ...f, messaggio: e.target.value }))}
                      placeholder="Raccontaci la tua attività, i problemi che vuoi risolvere, gli obiettivi..."
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      background: loading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                      color: 'white', fontSize: 15, fontWeight: 700,
                      padding: '16px', borderRadius: 14,
                      border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 0 40px rgba(124,58,237,0.35)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {loading ? (
                      <>
                        <div style={{
                          width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: 'white', borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                        Invio in corso...
                      </>
                    ) : (
                      <>Richiedi Audit Gratuito <Send size={16} /></>
                    )}
                  </button>

                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 16 }}>
                    Nessun impegno. Risposta entro 24 ore.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 14,
  color: 'white',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'border-color 0.2s',
}
