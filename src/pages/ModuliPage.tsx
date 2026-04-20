import { motion } from 'motion/react'
import { moduleList } from '../data/marketing'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { MarketingLayout } from '../layouts/MarketingLayout'

export function ModuliPage() {
  return (
    <MarketingLayout>
      <section className="section">
        <div className="container section-head">
          <Badge>Moduli</Badge>
          <h1>Ogni modulo è operativo, non teorico.</h1>
          <p>Componenti pensati per uso quotidiano in azienda agricola e agriturismo.</p>
        </div>
        <div className="container grid grid-2">
          {moduleList.map((m, idx) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} whileHover={{ y: -5 }}>
              <Card>
                <h3>{m.name}</h3>
                <p>{m.subtitle}</p>
                <p><strong style={{ color: '#e6c991' }}>Vantaggio concreto:</strong> {m.advantage}</p>
                <p><strong style={{ color: '#95d4a0' }}>Stato d'uso:</strong> {m.usage}</p>
                <div className="grid" style={{ marginTop: '0.7rem' }}>
                  {m.bullets.map((b) => (
                    <span key={b} className="badge">{b}</span>
                  ))}
                </div>
                <Card style={{ marginTop: '0.8rem' }}>
                  <p style={{ margin: 0, fontSize: '0.86rem' }}>Mock schermata premium pronta per vendita demo.</p>
                </Card>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container card" style={{ textAlign: 'center' }}>
          <h2>Scopri il modulo giusto per la tua realtà.</h2>
          <Button to="/audit">Richiedi audit gratuito</Button>
        </div>
      </section>
    </MarketingLayout>
  )
}
