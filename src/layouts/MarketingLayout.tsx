import type { ReactNode } from 'react'
import { MarketingFooter } from '../components/marketing/MarketingFooter'
import { MarketingNavbar } from '../components/marketing/MarketingNavbar'
import { FloatingLeaves } from '../components/ui/FloatingLeaves'

type MarketingLayoutProps = {
  children: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="page">
      <FloatingLeaves />
      <MarketingNavbar />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  )
}
