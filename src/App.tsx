import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import HomePage from './pages/HomePage'
import RadiciPage from './pages/RadiciPage'
import ATavolaPage from './pages/ATavolaPage'
import ClinicPage from './pages/ClinicPage'
import DemoRadici from './pages/demos/DemoRadici'
import DemoATavola from './pages/demos/DemoATavola'
import DemoClinic from './pages/demos/DemoClinic'
import ContactPage from './pages/ContactPage'

function AppRoutes() {
  const location = useLocation()
  const isDemoPage = location.pathname.startsWith('/demo/')

  return (
    <>
      {!isDemoPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/radici" element={<RadiciPage />} />
          <Route path="/a-tavola" element={<ATavolaPage />} />
          <Route path="/clinic" element={<ClinicPage />} />
          <Route path="/demo/radici" element={<DemoRadici />} />
          <Route path="/demo/a-tavola" element={<DemoATavola />} />
          <Route path="/demo/clinic" element={<DemoClinic />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AnimatePresence>
      {!isDemoPage && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
