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

export function AppRouter() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
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
