import { Card } from '../ui/Card'

export function SettingsPanel() {
  return (
    <div className="grid" style={{ gap: '1rem' }}>
      <Card>
        <h3>Dati azienda e branding</h3>
        <div className="form-grid">
          <input defaultValue="Agriturismo Le Radici del Sole" />
          <input defaultValue="Greve in Chianti (FI)" />
          <input defaultValue="booking@leradicidelsole.it" />
        </div>
      </Card>
      <Card>
        <h3>Moduli attivi</h3>
        <div className="grid grid-3">
          {['Core', 'Stanze', 'Tavoli', 'Bottega', 'Promo'].map((module) => (
            <label key={module} className="card" style={{ padding: '0.8rem' }}>
              <input type="checkbox" defaultChecked style={{ width: 'auto', marginRight: '0.6rem' }} />
              {module}
            </label>
          ))}
        </div>
      </Card>
      <Card>
        <h3>Pagamenti simulati e notifiche</h3>
        <div className="form-grid">
          <select defaultValue="Stripe simulato">
            <option>Stripe simulato</option>
            <option>SumUp simulato</option>
          </select>
          <label>
            <input type="checkbox" defaultChecked style={{ width: 'auto', marginRight: '0.5rem' }} />
            Avviso check-in su WhatsApp interno
          </label>
          <label>
            <input type="checkbox" defaultChecked style={{ width: 'auto', marginRight: '0.5rem' }} />
            Report giornaliero vendite bottega
          </label>
        </div>
      </Card>
    </div>
  )
}
