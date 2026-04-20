import { useState } from 'react'
import { whatsappNumber } from '../data/marketing'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { MarketingLayout } from '../layouts/MarketingLayout'

export function ContattiPage() {
  const [sent, setSent] = useState(false)

  return (
    <MarketingLayout>
      <section className="section">
        <div className="container grid grid-2">
          <div>
            <span className="kicker">Contatti</span>
            <h1>Parla con ZOVEN</h1>
            <p>
              Ti aiutiamo a eliminare il caos operativo e ad aumentare prenotazioni dirette, vendite e clienti ricorrenti.
            </p>
            <Card>
              <p><strong>WhatsApp:</strong> {whatsappNumber}</p>
              <p><strong>CTA:</strong> Ti mostriamo dove stai perdendo clienti.</p>
            </Card>
            <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <Button to="/audit">Richiedi audit gratuito</Button>
              <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
            </div>
          </div>

          <Card>
            <h3>Contattaci ora</h3>
            {!sent ? (
              <form
                className="form-grid"
                onSubmit={(event) => {
                  event.preventDefault()
                  setSent(true)
                }}
              >
                <input placeholder="Nome e cognome" required />
                <input placeholder="Telefono" required />
                <input placeholder="Azienda" required />
                <textarea placeholder="Obiettivo principale" rows={4} required />
                <button className="btn btn-primary" type="submit">Invia richiesta</button>
              </form>
            ) : (
              <p>Messaggio inviato. Ti ricontattiamo presto con i prossimi step.</p>
            )}
          </Card>
        </div>
      </section>
    </MarketingLayout>
  )
}
