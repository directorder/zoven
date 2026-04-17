/**
 * ZOVEN Brand & Global Configuration
 *
 * FREE MODE (default): No paid API required. Uses click-to-WhatsApp links
 * with prefilled messages + WhatsApp Business App auto-replies.
 *
 * API-READY MODE: Set VITE_WHATSAPP_MODE=cloud_api in .env when ready to
 * integrate WhatsApp Cloud API (requires WHATSAPP_ACCESS_TOKEN etc. on backend).
 *
 * Phone format: international number without + or spaces
 * Italy example: 393505383769
 */

export const brand = {
  name: 'ZOVEN',
  tagline: 'Sistemi che convertono.',
  description:
    'Progettiamo siti, ecommerce e funnel WhatsApp su misura per trasformare visitatori in clienti.',
  whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE ?? '393505383769',
  whatsappMode: (import.meta.env.VITE_WHATSAPP_MODE ?? 'free') as 'free' | 'cloud_api',
  email: 'info@zoven.it',
  socialLinks: {
    instagram: 'https://instagram.com/zoven',
    linkedin: 'https://linkedin.com/company/zoven',
  },
} as const

export type Brand = typeof brand

/**
 * API-READY: Future environment variables for Cloud API mode
 *
 * Backend (.env — never expose to client):
 *   WHATSAPP_ACCESS_TOKEN=
 *   WHATSAPP_PHONE_NUMBER_ID=
 *   WHATSAPP_VERIFY_TOKEN=
 *   WHATSAPP_WEBHOOK_SECRET=
 *   WHATSAPP_BUSINESS_ACCOUNT_ID=
 *
 * Frontend (.env):
 *   VITE_WHATSAPP_MODE=cloud_api
 *   VITE_API_BASE_URL=https://api.zoven.it
 */
