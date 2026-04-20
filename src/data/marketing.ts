import type { ModuleInfo, PricePlan } from '../types'

export const whatsappNumber = '+393505383769'

export const navLinks = [
  { label: 'Radici', to: '/radici' },
  { label: 'Moduli', to: '/moduli' },
  { label: 'Prezzi', to: '/prezzi' },
  { label: 'Demo', to: '/demo' },
  { label: 'Contatti', to: '/contatti' },
]

export const moduleList: ModuleInfo[] = [
  {
    name: 'RADICI Core',
    subtitle: 'Cliente unico, storico unico, controllo totale.',
    bullets: ['CRM', 'anagrafica clienti', 'storico ordini', 'preferenze', 'gestione contatti', 'consenso marketing / GDPR'],
    advantage: 'Smetti di perdere informazioni tra WhatsApp, quaderno e fogli sparsi.',
    usage: 'Uso quotidiano: reception, bottega, amministrazione.',
    icon: '🌿',
  },
  {
    name: 'Stanze',
    subtitle: 'Planning camere e soggiorni senza attriti.',
    bullets: ['planning camere', 'prenotazioni', 'check-in/check-out', 'stato camere', 'placeholder integrazione Alloggiati Web'],
    advantage: 'Visibilità immediata su arrivi, partenze e disponibilità reale.',
    usage: 'Uso giornaliero in struttura e front desk.',
    icon: '🏡',
  },
  {
    name: 'Tavoli',
    subtitle: 'Ristorante gestito con ordine e turni chiari.',
    bullets: ['prenotazioni ristorante', 'mappa tavoli semplificata', 'turni', 'menù QR'],
    advantage: 'Riduci no-show e sovrapposizioni nei picchi del weekend.',
    usage: 'Uso operativo per sala e cassa.',
    icon: '🍽️',
  },
  {
    name: 'Bottega',
    subtitle: 'Vendita diretta integrata con ospitalità.',
    bullets: ['catalogo prodotti', 'ordini diretti', 'giacenze mock', 'vendite in loco e online', 'POS simulato'],
    advantage: 'Ogni visita può diventare ordine, regalo o riacquisto.',
    usage: 'Uso continuativo in negozio aziendale e online.',
    icon: '🫒',
  },
  {
    name: 'Promo',
    subtitle: 'Riacquisto automatico, non occasionale.',
    bullets: ['campagne WhatsApp', 'follow-up soggiorno', 'riacquisto vino/olio/conserve', 'reminder', 'segmentazione clienti'],
    advantage: 'Trasformi clienti occasionali in clienti ricorrenti.',
    usage: 'Uso settimanale marketing e commerciale.',
    icon: '📲',
  },
]

export const plans: PricePlan[] = [
  {
    name: 'LITE',
    price: 'Su richiesta',
    target: 'Ideale per piccole aziende con sola vendita prodotti o solo ristorante.',
    features: ['Core + Bottega oppure Tavoli', 'setup iniziale', 'formazione iniziale'],
  },
  {
    name: 'FULL',
    price: 'Su richiesta',
    target: 'Per l\'agriturismo standard con camere.',
    featured: true,
    features: ['Core + Stanze + Tavoli + Bottega', 'integrazione pagamenti digitali simulata', 'avvio operativo completo'],
  },
  {
    name: 'ELITE',
    price: 'Su richiesta',
    target: 'Per chi vuole trasformare l\'azienda in un brand.',
    features: ['Tutti i moduli + Promo', 'sito vetrina alte prestazioni integrato nel CRM', 'pacchetto onboarding avanzato'],
  },
]

export const faqAudit = [
  {
    q: 'Quanto dura l\'audit gratuito?',
    a: 'Tra 25 e 35 minuti. Analizziamo flusso clienti, prenotazioni, vendita diretta e riacquisto.',
  },
  {
    q: 'Ricevo un documento concreto?',
    a: 'Sì. Ti inviamo una sintesi operativa con priorità, perdite stimate e piano di intervento.',
  },
  {
    q: 'È obbligatorio acquistare dopo l\'audit?',
    a: 'No. L\'audit è gratuito e non vincolante.',
  },
]
