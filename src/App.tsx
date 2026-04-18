import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Demo from './pages/Demo'
import BeautyMilano from './pages/demos/BeautyMilano'
import BarberMilano from './pages/demos/BarberMilano'
import BookingExperience from './pages/demos/BookingExperience'
import ClinicMilano from './pages/demos/ClinicMilano'

export default function App() {
  return (
    <BrowserRouter>
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
