import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Demo from './pages/Demo'
import BeautyMilano from './pages/demos/BeautyMilano'
import BarberMilano from './pages/demos/BarberMilano'
import BookingExperience from './pages/demos/BookingExperience'
import ClinicMilano from './pages/demos/ClinicMilano'

type RouteSeo = {
  title: string
  description: string
}

const BASE_URL = 'https://zoven.it'

const routeSeo: Record<string, RouteSeo> = {
  '/': {
    title: 'ZOVEN - Sistemi Digitali Che Convertono Clienti',
    description: 'ZOVEN progetta sistemi digitali su misura: siti web, ecommerce, funnel WhatsApp e booking che trasformano visitatori in clienti reali.',
  },
  '/demo': {
    title: 'Demo Live ZOVEN - Sistemi Reali Per Convertire',
    description: 'Guarda le demo live dei sistemi ZOVEN: centro estetico, barbiere premium, booking experience e clinica estetica.',
  },
  '/demo/beauty-milano': {
    title: 'Demo Beauty Milano - LUNEA STUDIO | ZOVEN',
    description: 'Demo live per centro estetico: prenotazioni, presentazione trattamenti e UX orientata alla conversione.',
  },
  '/demo/barber-milano': {
    title: 'Demo Barber Milano - NERO DISTRETTO | ZOVEN',
    description: 'Demo live per barbiere premium: struttura vendita, branding forte e conversione contatti su WhatsApp.',
  },
  '/demo/booking-experience': {
    title: 'Demo Booking Experience - AUREA SEA | ZOVEN',
    description: 'Demo live con booking online per esperienze marine: selezione servizio, slot e richiesta conferma.',
  },
  '/demo/clinic': {
    title: 'Demo Clinic Milano - AURORA CLINIC | ZOVEN',
    description: 'Demo live per clinica estetica con wizard di prenotazione, dashboard e UI conversion-oriented.',
  },
}

function SeoMetaManager() {
  const location = useLocation()

  useEffect(() => {
    const seo = routeSeo[location.pathname] ?? routeSeo['/']
    const canonical = `${BASE_URL}${location.pathname}`

    document.title = seo.title

    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector)
      if (el) el.content = value
    }

    const canonicalEl = document.getElementById('link-canonical') as HTMLLinkElement | null
    if (canonicalEl) canonicalEl.href = canonical

    setMeta('meta[name="description"]', seo.description)
    setMeta('#meta-og-title', seo.title)
    setMeta('#meta-og-description', seo.description)
    setMeta('#meta-og-url', canonical)
    setMeta('#meta-twitter-title', seo.title)
    setMeta('#meta-twitter-description', seo.description)
    setMeta('#meta-robots', location.pathname === '/admin' ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
  }, [location.pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <SeoMetaManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/beauty-milano" element={<BeautyMilano />} />
        <Route path="/demo/barber-milano" element={<BarberMilano />} />
        <Route path="/demo/booking-experience" element={<BookingExperience />} />
        <Route path="/demo/clinic" element={<ClinicMilano />} />
      </Routes>
    </BrowserRouter>
  )
}
