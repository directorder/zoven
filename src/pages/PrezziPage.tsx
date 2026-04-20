import { motion } from 'motion/react'
import { plans } from '../data/marketing'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { MarketingLayout } from '../layouts/MarketingLayout'
import { cn } from '../utils/cn'

export function PrezziPage() {
  return (
    <MarketingLayout>
      <section className="section">
        <div className="container section-head" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3rem' }}>
          <span className="kicker">Prezzi</span>
          <h1>Pagamento unico. Il sistema resta tuo.</h1>
          <p>
            Nessun canone mensile obbligatorio. Nessun abbonamento che continua se smetti di usarlo.
            Investi una volta — e il software rimane al 100% tuo.
          </p>
        </div>

        <div className="container grid grid-3" style={{ alignItems: 'end', gap: '1.25rem' }}>
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{ paddingTop: plan.featured ? '0.5rem' : 0 }}
            >
              <Card className={cn(plan.featured && 'card-featured')}>
                <p className="kicker">{plan.name}</p>
                <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.2rem)', color: plan.featured ? 'var(--gold)' : 'var(--text)', margin: '0.4rem 0' }}>
                  {plan.price}
                </h2>
                <p style={{ marginBottom: '1rem' }}>{plan.target}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  {plan.features.map((feature) => (
                    <div key={feature} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--leaf-bright)', flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  to="/audit"
                  variant={plan.featured ? 'primary' : 'ghost'}
                  className=""
                >
                  Richiedi audit gratuito
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container grid grid-2" style={{ gap: '1.25rem' }}>
          <Card>
            <h3>Servizi opzionali</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.6rem' }}>
                <span>Manutenzione Zero Pensieri</span>
                <strong style={{ color: 'var(--gold)' }}>€150/anno</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Interventi extra (su richiesta)</span>
                <strong style={{ color: 'var(--gold)' }}>€50/ora</strong>
              </div>
            </div>
          </Card>
          <Card style={{ background: 'linear-gradient(150deg, rgba(31,42,35,0.9), rgba(13,20,17,0.98))', borderColor: 'rgba(217,177,110,0.3)' }}>
            <h3>Il principio è semplice</h3>
            <p>Paghi una volta. Il software ti appartiene. Nessuna fattura mensile silenziosa. Nessun canone che ti tiene ostaggio.</p>
            <p style={{ marginTop: '0.6rem' }}>Se vuoi supporto, c'è. Se non ti serve, non lo paghi.</p>
            <div style={{ marginTop: '0.8rem' }}><Button to="/audit">Richiedi audit gratuito</Button></div>
          </Card>
        </div>
      </section>
    </MarketingLayout>
  )
}
