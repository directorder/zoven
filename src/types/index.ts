export type RouteMeta = {
  title: string
  description: string
}

export type ModuleInfo = {
  name: string
  subtitle: string
  bullets: string[]
  advantage: string
  usage: string
  icon?: string
}

export type PricePlan = {
  name: 'LITE' | 'FULL' | 'ELITE'
  price: string
  target: string
  features: string[]
  featured?: boolean
}

export type DemoSectionKey =
  | 'dashboard'
  | 'crm'
  | 'stanze'
  | 'tavoli'
  | 'bottega'
  | 'promo'
  | 'impostazioni'

export type Customer = {
  id: string
  nome: string
  paese: string
  canale: 'WhatsApp' | 'Sito' | 'Telefono' | 'Fiera'
  ultimoOrdine: string
  valore: number
  consensoMarketing: boolean
  tags: string[]
  note: string
}

export type RoomBooking = {
  id: string
  camera: string
  ospite: string
  checkIn: string
  checkOut: string
  stato: 'Confermata' | 'In Arrivo' | 'In Casa' | 'Check-out'
}

export type TableBooking = {
  id: string
  nome: string
  coperti: number
  turno: 'Pranzo' | 'Cena'
  tavolo: string
  richiesta: string
  stato: 'Confermato' | 'In attesa' | 'Arrivato'
}

export type Product = {
  id: string
  nome: string
  categoria: string
  prezzo: number
  stock: number
  trend: 'Su' | 'Stabile' | 'Giù'
}

export type Campaign = {
  id: string
  nome: string
  target: string
  canale: 'WhatsApp' | 'Email'
  aperture: string
  conversioni: string
  stato: 'Attiva' | 'Pianificata' | 'Bozza'
}
