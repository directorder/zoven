import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { MarketingLayout } from '../layouts/MarketingLayout'

const benefici = [
  'Una sola scheda cliente raccoglie soggiorni, cene, ordini bottega e preferenze.',
  'Promo WhatsApp e reminder riacquisto partono da dati reali, non da liste fredde.',
  'Planning camere, tavoli e bottega coordinati — senza fogli Excel o app separate.',
  'Ogni modulo si accende quando serve: puoi partire da un solo blocco.',
  'Il sistema rimane tuo. Nessun canone che ti tiene in ostaggio.',
  'Setup e formazione inclusi: il team operativo parte in pochi giorni.',
]

const forChi = [
  'Agriturismo con camere, ristorante e bottega',
  'Azienda agricola con vendita diretta e degustazioni',
  'Cantina con ospitalità, spedizioni e fidelizzazione',
  'Produttori locali con e-commerce e distribuzione',
  'Fattoria didattica con esperienze, prenotazioni e famiglie',
]

export function RadiciPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge>Prodotto</Badge>
            <h1 style={{ maxWidth: 780, marginTop: '0.7rem' }}>ZOVEN RADICI</h1>
            <p style={{ maxWidth: 620, fontSize: '1.15rem', marginTop: '0.7rem' }}>
              Il software all-in-one per agriturismi, aziende agricole, cantine, produttori locali e fattorie didattiche italiane.
              Gestisci clienti, camere, tavoli, bottega e riacquisto da un unico sistema.
            </p>
            <p style={{ marginTop: '0.5rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'var(--gold)' }}>
              Zero canoni mensili. Paghi una volta e basta.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginTop: '1.3rem' }}>
              <Button to="/audit">Richiedi audit gratuito</Button>
              <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cos'è / per chi è / cosa risolve */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3" style={{ gap: '1.1rem' }}>
          {([
            ['Cos\'è', 'Un sistema operativo unificato per l\'intera azienda agricola: CRM, ospitalità, ristorante, bottega e marketing di riacquisto in un unico strumento.'],
            ['Perché paghi una volta', 'Il modello SaaS ti fa pagare per sempre un software che non possiedi. Con RADICI paghi un\'unica volta: il sistema è tuo, i dati sono tuoi, il controllo è tuo.'],
            ['Cosa risolve', 'Il caos di strumenti separati, i no-show non gestiti, le vendite bottega slegate dal CRM, i clienti che scompaiono dopo il soggiorno senza un follow-up strutturato.'],
          ] as const).map(([title, text], idx) => (
            <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}>
              <Card style={{ height: '100%' }}>
                <h3>{title}</h3>
                <p>{text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Per chi è */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-2" style={{ gap: '1.25rem', alignItems: 'start' }}>
          <Card>
            <h3>Per chi è RADICI</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.7rem' }}>
              {forChi.map((item) => (
                <div key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <Check size={15} color="var(--leaf-bright)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: '0.93rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3>Benefici concreti</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.7rem' }}>
              {benefici.map((item) => (
                <div key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <Check size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: '0.93rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container card" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto', padding: '2.4rem 2rem' }}>
          <h2>Pronto a vedere RADICI in azione?</h2>
          <p>Audit gratuito, demo completa o conversazione diretta. Scegli il primo passo.</p>
          <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.2rem' }}>
            <Button to="/audit">Richiedi audit gratuito</Button>
            <Button to="/demo/dashboard" variant="ghost">Guarda la demo</Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
