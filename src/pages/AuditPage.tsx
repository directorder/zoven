import { useState } from 'react'
import { faqAudit } from '../data/marketing'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { MarketingLayout } from '../layouts/MarketingLayout'

export function AuditPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <MarketingLayout>
      <section className="section">
        <div className="container grid grid-2">
          <div>
            <span className="kicker">Audit gratuito</span>
            <h1>Ti mostriamo dove stai perdendo clienti, prenotazioni e vendite.</h1>
            <p>Analizziamo flussi reali, sprechi operativi e opportunità immediate di crescita.</p>
            <div className="grid" style={{ marginTop: '1rem' }}>
              {[
                'Prenotazioni gestite senza visione centralizzata',
                'Clienti persi dopo il soggiorno o la cena',
                'Bottega scollegata da CRM e promo',
                'Nessuna strategia di riacquisto strutturata',
              ].map((point) => (
                <Card key={point}><p style={{ margin: 0 }}>{point}</p></Card>
              ))}
            </div>
          </div>

          <Card>
            <h3>Richiedi audit gratuito</h3>
            {!submitted ? (
              <form
                className="form-grid"
                onSubmit={(event) => {
                  event.preventDefault()
                  setSubmitted(true)
                }}
              >
                <input placeholder="Nome e cognome" required />
                <input placeholder="Azienda" required />
                <input placeholder="Telefono" required />
                <input placeholder="Email" required type="email" />
                <textarea placeholder="Descrivi in breve il problema principale" rows={4} required />
                <button className="btn btn-primary" type="submit">Richiedi audit gratuito</button>
              </form>
            ) : (
              <p>Richiesta registrata. Ti contatteremo con una proposta oraria entro 24 ore.</p>
            )}
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>FAQ</h2>
          <div className="grid" style={{ marginTop: '1rem' }}>
            {faqAudit.map((item) => (
              <Card key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
