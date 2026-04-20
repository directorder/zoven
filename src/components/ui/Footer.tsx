import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 0 40px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          marginBottom: 64,
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, textDecoration: 'none' }}>
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 900, color: 'white',
              }}>Z</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: '-0.04em' }}>ZOVEN</span>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 240 }}>
              Sistemi digitali su misura che eliminano caos, abbonamenti inutili e clienti persi.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Prodotti</h4>
            {[
              { label: 'ZOVEN RADICI', href: '/radici' },
              { label: 'ZOVEN A TAVOLA', href: '/a-tavola' },
              { label: 'ZOVEN CLINIC', href: '/clinic' },
            ].map(l => (
              <Link key={l.href} to={l.href} style={{
                display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)',
                marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >{l.label}</Link>
            ))}
          </div>

          {/* Demo */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Demo</h4>
            {[
              { label: 'Demo RADICI', href: '/demo/radici' },
              { label: 'Demo A TAVOLA', href: '/demo/a-tavola' },
              { label: 'Demo CLINIC', href: '/demo/clinic' },
            ].map(l => (
              <Link key={l.href} to={l.href} style={{
                display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)',
                marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Azienda</h4>
            <Link to="/contact" style={{
              display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)',
              marginBottom: 10, textDecoration: 'none',
            }}>Contatti</Link>
            <a href="tel:+393505383769" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, color: 'rgba(255,255,255,0.6)',
              marginBottom: 16, textDecoration: 'none',
            }}>
              <Phone size={13} color="rgba(255,255,255,0.4)" />
              +39 350 538 3769
            </a>
            <Link to="/contact" style={{
              display: 'inline-flex', marginTop: 8,
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white', fontSize: 13, fontWeight: 600,
              padding: '10px 18px', borderRadius: 10,
              textDecoration: 'none',
            }}>Audit Gratuito</Link>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} ZOVEN. Tutti i diritti riservati.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            Sistemi digitali. Non abbonamenti.
          </p>
        </div>
      </div>
    </footer>
  )
}
