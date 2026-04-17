/**
 * ZOVEN WhatsApp Utility — Free Mode
 *
 * Generates wa.me click-to-WhatsApp links with prefilled messages.
 * No API required. Works entirely on the client side.
 *
 * API-READY: When mode is 'cloud_api', route through backend service
 * at /api/whatsapp/send instead of generating wa.me links.
 */

import { brand } from '../config/brand'

export type FunnelIntent =
  | 'generic'
  | 'website'
  | 'ecommerce'
  | 'booking'
  | 'automation'
  | 'funnel'
  | 'demo'

const MESSAGES: Record<FunnelIntent, string> = {
  generic:
    'Ciao ZOVEN, ho visitato il vostro sito e vorrei capire come potete aiutarmi con il mio business.',
  website:
    'Ciao ZOVEN, voglio rifare il mio sito in modo che converta di più. Possiamo parlarne?',
  ecommerce:
    'Ciao ZOVEN, vorrei capire come potete aiutarmi con un ecommerce su misura per la mia attività.',
  booking:
    'Ciao ZOVEN, vorrei una demo per un sistema di prenotazione automatizzato.',
  automation:
    'Ciao ZOVEN, sono interessato a sistemi di automazione e funnel per la mia attività.',
  funnel:
    'Ciao ZOVEN, voglio capire come creare un funnel WhatsApp per convertire più clienti.',
  demo:
    'Ciao ZOVEN, vorrei ricevere una demo del vostro sistema per vedere come potrebbe funzionare per il mio business.',
}

/** Returns a wa.me URL with the correct phone and prefilled message */
export function getWhatsAppLink(intent: FunnelIntent = 'generic'): string {
  const phone = brand.whatsappPhone
  const text = encodeURIComponent(MESSAGES[intent])
  return `https://wa.me/${phone}?text=${text}`
}

/** Open WhatsApp in new tab */
export function openWhatsApp(intent: FunnelIntent = 'generic'): void {
  window.open(getWhatsAppLink(intent), '_blank', 'noopener,noreferrer')
}

export { MESSAGES }
