import { Link } from 'react-router-dom'

type LogoProps = {
  compact?: boolean
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link to="/" className="logo-wrap" aria-label="ZOVEN home">
      <img src="/favicon.svg" alt="Logo ZOVEN" className="logo-img" />
      {!compact && (
        <span className="logo-text">
          ZOVEN <small>RADICI</small>
        </span>
      )}
    </Link>
  )
}
