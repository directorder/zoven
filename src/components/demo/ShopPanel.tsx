import { products } from '../../data/demo'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

export function ShopPanel() {
  return (
    <div className="grid" style={{ gap: '1rem' }}>
      <div className="grid grid-2">
        <Card>
          <h3>Catalogo prodotti</h3>
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Prodotto</th>
                  <th>Categoria</th>
                  <th>Prezzo</th>
                  <th>Stock</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.categoria}</td>
                    <td>€{p.prezzo}</td>
                    <td>{p.stock}</td>
                    <td><Badge>{p.trend}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <h3>Ordini recenti</h3>
          <div className="grid">
            {[
              'BT-442 · 6 bottiglie Chianti · spedizione DE',
              'BT-443 · 4 Olio EVO 500ml · ritiro in azienda',
              'BT-444 · Cesto Sapori Toscani · consegna Milano',
            ].map((order) => (
              <div key={order} className="card" style={{ padding: '0.8rem' }}>
                <p style={{ margin: 0 }}>{order}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3>Vendite recenti e POS simulato</h3>
        <p>Ticket medio giornaliero: €48. Vendite in loco + online sincronizzate nel CRM.</p>
      </Card>
    </div>
  )
}
