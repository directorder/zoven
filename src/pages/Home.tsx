import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import ProblemSection from '../components/sections/ProblemSection'
import SolutionSection from '../components/sections/SolutionSection'
import HowItWorks from '../components/sections/HowItWorks'
import Showcase from '../components/sections/Showcase'
import WhyZoven from '../components/sections/WhyZoven'
import FinalCTA from '../components/sections/FinalCTA'
import FloatingWA from '../components/ui/FloatingWA'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06080f] noise-overlay">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <Showcase />
        <WhyZoven />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  )
}
