import { openWhatsApp } from '../../lib/whatsapp'
import { brand } from '../../config/brand'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-[#06080f]">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] opacity-60 blur-sm" />
                <div className="relative w-8 h-8 rounded-full border border-[#00d4ff]/40 flex items-center justify-center bg-[#06080f]">
                  <span className="text-xs font-display text-gradient leading-none">Z</span>
                </div>
              </div>
              <span className="font-display text-xl text-white tracking-wider">ZOVEN</span>
            </div>
            <p className="text-[#8892a4] text-sm leading-relaxed max-w-xs">
              Sistemi digitali su misura che trasformano visitatori in clienti.
              Siti, ecommerce, booking e funnel WhatsApp.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {brand.socialLinks.instagram !== '#' && (
                <a
                  href={brand.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8892a4] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              )}
              {brand.socialLinks.tiktok !== '#' && (
                <a
                  href={brand.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8892a4] hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">Servizi</h3>
            <ul className="space-y-3">
              {['Siti web custom', 'Ecommerce su misura', 'Sistemi di prenotazione', 'Funnel WhatsApp', 'Automazione & CRM'].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => openWhatsApp('generic')}
                    className="text-[#8892a4] hover:text-[#00d4ff] text-sm transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">Inizia ora</h3>
            <p className="text-[#8892a4] text-sm mb-5 leading-relaxed">
              Hai un progetto in mente? Scrivici su WhatsApp e valutiamo insieme come costruire il tuo sistema.
            </p>
            <button
              onClick={() => openWhatsApp('generic')}
              className="wa-btn text-sm w-full justify-center mb-3"
            >
              <WaIcon />
              Apri WhatsApp
            </button>
            <button
              onClick={() => openWhatsApp('demo')}
              className="btn-ghost text-sm w-full justify-center"
            >
              Richiedi demo gratuita
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#4a5568] text-xs">
            © {year} ZOVEN. Tutti i diritti riservati.
          </p>
          <p className="text-[#4a5568] text-xs">
            Sistemi digitali su misura — Made in Italy
          </p>
        </div>
      </div>
    </footer>
  )
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.24v13.18a2.87 2.87 0 1 1-1.98-2.72v-3.3a6.18 6.18 0 1 0 5.22 6.1v-6.7a8.15 8.15 0 0 0 4.77 1.54V6.86c-.34 0-.67-.06-1-.17z" />
    </svg>
  )
}
