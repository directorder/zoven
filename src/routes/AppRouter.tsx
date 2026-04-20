import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { useEffect } from 'react'
import { HomePage } from '../pages/HomePage'
import { RadiciPage } from '../pages/RadiciPage'
import { ModuliPage } from '../pages/ModuliPage'
import { PrezziPage } from '../pages/PrezziPage'
import { AuditPage } from '../pages/AuditPage'
import { ContattiPage } from '../pages/ContattiPage'
import { DemoPage } from '../pages/DemoPage'

type RouteSeo = {
  title: string
  description: string
  keywords: string
  subject: string
  robots?: string
}

const SEO_BY_ROUTE: Record<string, RouteSeo> = {
  '/': {
    title: 'ZOVEN RADICI | Sistema operativo per agriturismi e aziende agricole',
    description: 'ZOVEN RADICI unifica clienti, camere, tavoli, bottega e riacquisto in un solo software.',
    keywords: 'software agriturismo, gestionale agriturismo, software aziende agricole, CRM agriturismo, prenotazioni agriturismo',
    subject: 'Software per agriturismi e aziende agricole',
  },
  '/radici': {
    title: 'ZOVEN RADICI | Prodotto e metodo operativo',
    description: 'Scopri come ZOVEN RADICI centralizza operativita e vendite per agriturismi e aziende agricole.',
    keywords: 'zoven radici, sistema operativo agriturismo, digitalizzazione agriturismo, gestione clienti agriturismo',
    subject: 'Prodotto software verticale per agriturismi',
  },
  '/moduli': {
    title: 'Moduli ZOVEN RADICI | CRM, Camere, Tavoli, Bottega, Promo',
    description: 'Tutti i moduli operativi per gestire prenotazioni, clienti, vendite dirette e riacquisto.',
    keywords: 'crm agriturismo, gestione camere agriturismo, gestione tavoli ristorante agriturismo, bottega ecommerce agricolo',
    subject: 'Moduli software operativi',
  },
  '/prezzi': {
    title: 'Prezzi ZOVEN RADICI | Nessun canone mensile',
    description: 'Prezzo moderato su richiesta, implementazione concreta e sistema di proprieta.',
    keywords: 'prezzo software agriturismo, costo gestionale agriturismo, no canone mensile, prezzo su richiesta',
    subject: 'Prezzi e modello commerciale',
  },
  '/audit': {
    title: 'Audit gratuito | ZOVEN RADICI',
    description: 'Richiedi un audit gratuito e ricevi una roadmap operativa per aumentare margine e controllo.',
    keywords: 'audit agriturismo, consulenza software agriturismo, roadmap digitale azienda agricola',
    subject: 'Audit operativo gratuito',
  },
  '/contatti': {
    title: 'Contatti ZOVEN | Parla con il team',
    description: 'Contatta ZOVEN per una demo guidata e una valutazione operativa del tuo agriturismo.',
    keywords: 'contatti zoven, demo software agriturismo, richiesta informazioni gestionale agriturismo',
    subject: 'Contatti commerciali',
  },
}

function setMeta(selector: string, attribute: string, value: string) {
  const node = document.querySelector(selector)
  if (node) {
    node.setAttribute(attribute, value)
  }
}

export function AppRouter() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const isDemo = location.pathname.startsWith('/demo')
    const seo = isDemo
      ? {
          title: 'Demo ZOVEN RADICI | Flusso operativo unificato',
          description: 'Demo interattiva del sistema ZOVEN RADICI per agriturismi e aziende agricole.',
          keywords: 'demo software agriturismo, demo crm agriturismo, demo gestionale aziende agricole',
          subject: 'Demo prodotto',
          robots: 'noindex,follow',
        }
      : SEO_BY_ROUTE[location.pathname] ?? SEO_BY_ROUTE['/']

    document.title = seo.title

    setMeta('meta[name="description"]', 'content', seo.description)
    setMeta('meta[name="keywords"]', 'content', seo.keywords)
    setMeta('meta[name="subject"]', 'content', seo.subject)
    setMeta('meta[name="language"]', 'content', 'it')
    setMeta('meta[property="og:locale"]', 'content', 'it_IT')
    setMeta('meta[property="og:title"]', 'content', seo.title)
    setMeta('meta[property="og:description"]', 'content', seo.description)
    setMeta('meta[name="twitter:title"]', 'content', seo.title)
    setMeta('meta[name="twitter:description"]', 'content', seo.description)

    const canonicalUrl = `https://zoven.it${location.pathname === '/' ? '/' : location.pathname}`
    setMeta('link[rel="canonical"]', 'href', canonicalUrl)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)

    const robots = seo.robots ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    setMeta('meta[name="robots"]', 'content', robots)
    setMeta('meta[name="googlebot"]', 'content', robots)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/radici" element={<RadiciPage />} />
        <Route path="/moduli" element={<ModuliPage />} />
        <Route path="/prezzi" element={<PrezziPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/contatti" element={<ContattiPage />} />
        <Route path="/demo" element={<Navigate to="/demo/dashboard" replace />} />
        <Route path="/demo/:section" element={<DemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
