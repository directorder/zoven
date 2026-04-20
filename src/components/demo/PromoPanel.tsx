import { campaigns } from '../../data/demo'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

export function PromoPanel() {
  return (
    <div className="grid" style={{ gap: '1rem' }}>
      <Card>
        <h3>Campagne preimpostate</h3>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Campagna</th>
                <th>Target</th>
                <th>Canale</th>
                <th>Aperture</th>
                <th>Conversioni</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.target}</td>
                  <td>{c.canale}</td>
                  <td>{c.aperture}</td>
                  <td>{c.conversioni}</td>
                  <td><Badge>{c.stato}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-3">
        <Card>
          <h4>Reminder post soggiorno</h4>
          <p>Invio automatico dopo 7 giorni con proposta riacquisto vino e olio.</p>
        </Card>
        <Card>
          <h4>Flusso riacquisto</h4>
          <p>Segmentazione clienti per preferenze: rossi, EVO, conserve artigianali.</p>
        </Card>
        <Card>
          <h4>Metriche mock</h4>
          <p>CTR 31%, conversione media 9.4%, ordine medio €64.</p>
        </Card>
      </div>
    </div>
  )
}
