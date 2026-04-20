import { tableBookings } from '../../data/demo'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

const mapTables = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']

export function TablesPanel() {
  return (
    <div className="grid" style={{ gap: '1rem' }}>
      <Card>
        <h3>Prenotazioni ristorante e turni</h3>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Coperti</th>
                <th>Turno</th>
                <th>Tavolo</th>
                <th>Richieste</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {tableBookings.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.coperti}</td>
                  <td>{item.turno}</td>
                  <td>{item.tavolo}</td>
                  <td>{item.richiesta}</td>
                  <td><Badge>{item.stato}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3>Mappa tavoli semplificata</h3>
        <div className="grid grid-4">
          {mapTables.map((name, idx) => {
            const tone = idx % 4 === 0 ? '#d9b16e' : idx % 3 === 0 ? '#82c48a' : '#b7b3a4'
            return (
              <div key={name} style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', padding: '0.7rem', background: 'rgba(255,255,255,0.02)' }}>
                <p style={{ margin: 0 }}>{name}</p>
                <div style={{ width: 10, height: 10, borderRadius: 999, background: tone }} />
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
