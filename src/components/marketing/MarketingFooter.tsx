import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { whatsappNumber } from '../../data/marketing'

export function MarketingFooter() {
  return (
    <footer className="footer">
      <div className="container grid grid-2">
        <div>
          <h3>Parla con ZOVEN</h3>
          <p>Ti mostriamo dove stai perdendo clienti, prenotazioni e vendite. Audit gratuito, concreto, senza impegno.</p>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <Button to="/audit">Richiedi audit gratuito</Button>
            <Button href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=Ciao%20ZOVEN,%20voglio%20capire%20come%20funziona%20RADICI`} variant="ghost">
              WhatsApp diretto
            </Button>
          </div>
        </div>
        <div>
          <p><strong>ZOVEN RADICI</strong></p>
          <p>Gestisci clienti, camere, tavoli, vendite dirette e riacquisto da un unico sistema.</p>
          <p>Zero canoni mensili obbligatori. Paghi una volta e basta.</p>
          <p style={{ marginTop: '0.8rem' }}>© {new Date().getFullYear()} ZOVEN.it</p>
          <p><Link to="/contatti">Contatti</Link> · <Link to="/demo">Demo</Link> · <Link to="/prezzi">Prezzi</Link></p>
        </div>
      </div>
    </footer>
  )
}
