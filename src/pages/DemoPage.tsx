import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { CrmPanel } from '../components/demo/CrmPanel'
import { DashboardPanel } from '../components/demo/DashboardPanel'
import { DemoShell } from '../components/demo/DemoShell'
import { PromoPanel } from '../components/demo/PromoPanel'
import { RoomsPanel } from '../components/demo/RoomsPanel'
import { SettingsPanel } from '../components/demo/SettingsPanel'
import { ShopPanel } from '../components/demo/ShopPanel'
import { TablesPanel } from '../components/demo/TablesPanel'
import type { Customer, DemoSectionKey } from '../types'
import { Button } from '../components/ui/Button'

const titleMap: Record<DemoSectionKey, string> = {
  dashboard: 'Dashboard',
  crm: 'CRM Clienti',
  stanze: 'Stanze',
  tavoli: 'Tavoli',
  bottega: 'Bottega',
  promo: 'Promo',
  impostazioni: 'Impostazioni',
}

export function DemoPage() {
  const { section } = useParams()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const current = (section ?? 'dashboard') as DemoSectionKey
  const pageTitle = titleMap[current] ?? titleMap.dashboard

  const content = useMemo(() => {
    switch (current) {
      case 'crm':
        return <CrmPanel onOpenCustomer={setSelectedCustomer} />
      case 'stanze':
        return <RoomsPanel />
      case 'tavoli':
        return <TablesPanel />
      case 'bottega':
        return <ShopPanel />
      case 'promo':
        return <PromoPanel />
      case 'impostazioni':
        return <SettingsPanel />
      default:
        return <DashboardPanel />
    }
  }, [current])

  return (
    <DemoShell
      sectionTitle={`Demo • ${pageTitle}`}
      rightPanel={
        <AnimatePresence>
          {selectedCustomer && (
            <motion.aside
              className="detail-panel"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
            >
              <h3>{selectedCustomer.nome}</h3>
              <p><strong>Paese:</strong> {selectedCustomer.paese}</p>
              <p><strong>Canale:</strong> {selectedCustomer.canale}</p>
              <p><strong>Ultimo ordine:</strong> {selectedCustomer.ultimoOrdine}</p>
              <p><strong>Valore storico:</strong> €{selectedCustomer.valore}</p>
              <p><strong>Consenso marketing:</strong> {selectedCustomer.consensoMarketing ? 'Sì' : 'No'}</p>
              <p><strong>Tag segmenti:</strong> {selectedCustomer.tags.join(', ')}</p>
              <CardNote label="Note cliente" value={selectedCustomer.note} />
              <CardNote
                label="Storico ordini"
                value="Weekend coppia + box degustazione, ordine olio EVO, cena degustazione vino."
              />
              <Button variant="ghost" onClick={() => setSelectedCustomer(null)}>
                Chiudi scheda
              </Button>
            </motion.aside>
          )}
        </AnimatePresence>
      }
    >
      {content}
    </DemoShell>
  )
}

function CardNote({ label, value }: { label: string; value: string }) {
  return (
    <div className="card" style={{ marginBottom: '0.8rem' }}>
      <p style={{ margin: 0 }}><strong>{label}</strong></p>
      <p style={{ margin: '0.2rem 0 0' }}>{value}</p>
    </div>
  )
}
