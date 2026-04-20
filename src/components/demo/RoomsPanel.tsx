import { roomBookings } from '../../data/demo'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

export function RoomsPanel() {
  return (
    <div className="grid" style={{ gap: '1rem' }}>
      <Card>
        <h3>Planning prenotazioni camere</h3>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Camera</th>
                <th>Ospite</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {roomBookings.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.camera}</td>
                  <td>{item.ospite}</td>
                  <td>{item.checkIn}</td>
                  <td>{item.checkOut}</td>
                  <td><Badge>{item.stato}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid grid-3">
        {['Pulita', 'Da preparare', 'In manutenzione'].map((status, idx) => (
          <Card key={status}>
            <h4>{status}</h4>
            <p>{idx === 0 ? '7 camere pronte' : idx === 1 ? '2 camere da rifare' : '1 camera bloccata'}</p>
          </Card>
        ))}
      </div>
      <Card>
        <p style={{ margin: 0 }}>
          Nota: predisposizione tecnica per integrazione futura con Alloggiati Web.
        </p>
      </Card>
    </div>
  )
}
