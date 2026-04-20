import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'gold'
  className?: string
}

const base = 'btn'

export function Button({ children, to, href, onClick, variant = 'primary', className }: ButtonProps) {
  const classes = cn(base, `btn-${variant}`, className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
