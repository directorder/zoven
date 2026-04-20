import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { customers } from '../../data/demo'
import type { Customer } from '../../types'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

type CrmPanelProps = {
  onOpenCustomer: (customer: Customer) => void
}

export function CrmPanel({ onOpenCustomer }: CrmPanelProps) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'Tutti' | 'Consenso ON' | 'Consenso OFF'>('Tutti')

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesText = [c.nome, c.paese, c.ultimoOrdine].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesFilter =
        filter === 'Tutti' || (filter === 'Consenso ON' && c.consensoMarketing) || (filter === 'Consenso OFF' && !c.consensoMarketing)
      return matchesText && matchesFilter
    })
  }, [query, filter])

  return (
    <div className="grid" style={{ gap: '1rem' }}>
      <Card>
        <div className="grid grid-2" style={{ alignItems: 'center' }}>
          <label style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 11, opacity: 0.7 }} />
            <input
              style={{ paddingLeft: '2rem' }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cerca cliente, paese o ultimo ordine"
            />
          </label>
          <select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)}>
            <option>Tutti</option>
            <option>Consenso ON</option>
            <option>Consenso OFF</option>
          </select>
        </div>
      </Card>

      <Card className="desktop-only">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Canale</th>
                <th>Ultimo ordine</th>
                <th>Valore</th>
                <th>Tag</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome} <small style={{ opacity: 0.6 }}>({c.paese})</small></td>
                  <td>{c.canale}</td>
                  <td>{c.ultimoOrdine}</td>
                  <td>€{c.valore}</td>
                  <td>{c.tags[0]}</td>
                  <td>
                    <button className="btn btn-ghost" onClick={() => onOpenCustomer(c)}>Dettaglio</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mobile-only grid">
        {filtered.map((c) => (
          <Card key={c.id}>
            <h4>{c.nome}</h4>
            <p style={{ margin: '0.3rem 0' }}>{c.ultimoOrdine}</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <Badge>{c.canale}</Badge>
              <Badge>{c.consensoMarketing ? 'Consenso ON' : 'Consenso OFF'}</Badge>
            </div>
            <button className="btn btn-ghost" style={{ marginTop: '0.7rem' }} onClick={() => onOpenCustomer(c)}>
              Apri scheda cliente
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
