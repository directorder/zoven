import { useState } from 'react'
import { brand } from '../config/brand'
import { MESSAGES } from '../lib/whatsapp'
import type { FunnelIntent } from '../lib/whatsapp'

type Config = {
  brandName: string
  phone: string
  mode: 'free' | 'cloud_api'
  messages: Record<FunnelIntent, string>
}

const defaultConfig: Config = {
  brandName: brand.name,
  phone: brand.whatsappPhone,
  mode: brand.whatsappMode,
  messages: { ...MESSAGES },
}

export default function Admin() {
  const [cfg, setCfg] = useState<Config>(defaultConfig)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'brand' | 'messages' | 'api'>('brand')

  function handleSave() {
    // In a real setup, persist to .env or backend
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function updateMessage(key: FunnelIntent, val: string) {
    setCfg((c) => ({ ...c, messages: { ...c.messages, [key]: val } }))
  }

  const messageKeys: FunnelIntent[] = ['generic', 'website', 'ecommerce', 'booking', 'automation', 'funnel', 'demo']
  const messageLabels: Record<FunnelIntent, string> = {
    generic: 'Generico',
    website: 'Sito web',
    ecommerce: 'Ecommerce',
    booking: 'Prenotazione',
    automation: 'Automazione',
    funnel: 'Funnel WhatsApp',
    demo: 'Demo',
  }

  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="text-[#8892a4] hover:text-white transition-colors text-sm">← Torna al sito</a>
          <span className="text-white/20">|</span>
          <span className="font-display text-lg text-white">ZOVEN <span className="text-[#00d4ff]">Admin</span></span>
        </div>
        <button
          onClick={handleSave}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            saved
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 hover:bg-[#00d4ff]/20'
          }`}
        >
          {saved ? '✓ Salvato' : 'Salva modifiche'}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-1 bg-white/4 border border-white/8 rounded-xl p-1 mb-8 w-fit">
          {(['brand', 'messages', 'api'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === t ? 'bg-white/10 text-white' : 'text-[#8892a4] hover:text-white'
              }`}
            >
              {t === 'brand' ? 'Brand & Config' : t === 'messages' ? 'Messaggi WA' : 'API Mode'}
            </button>
          ))}
        </div>

        {/* Brand tab */}
        {activeTab === 'brand' && (
          <div className="space-y-6">
            <Section title="Informazioni brand">
              <Field label="Nome brand">
                <input
                  type="text"
                  value={cfg.brandName}
                  onChange={(e) => setCfg((c) => ({ ...c, brandName: e.target.value }))}
                  className="admin-input"
                />
              </Field>
              <Field label="Numero WhatsApp (formato: 393XXXXXXXXX)">
                <input
                  type="text"
                  value={cfg.phone}
                  onChange={(e) => setCfg((c) => ({ ...c, phone: e.target.value }))}
                  className="admin-input"
                  placeholder="393505383769"
                />
                <p className="text-[#4a5568] text-xs mt-1.5">
                  Numero attuale: <span className="text-[#00d4ff]">+{cfg.phone}</span>
                  {' — '}
                  <a
                    href={`https://wa.me/${cfg.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d4ff] hover:underline"
                  >
                    Testa link
                  </a>
                </p>
              </Field>
            </Section>

            <Section title="Modalità sistema">
              <div className="grid grid-cols-2 gap-3">
                {(['free', 'cloud_api'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setCfg((c) => ({ ...c, mode: m }))}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      cfg.mode === m
                        ? 'border-[#00d4ff]/40 bg-[#00d4ff]/8 text-white'
                        : 'border-white/8 text-[#8892a4] hover:border-white/15'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">
                      {m === 'free' ? 'Free Mode' : 'Cloud API Mode'}
                    </div>
                    <div className="text-xs opacity-70">
                      {m === 'free'
                        ? 'Click-to-WhatsApp. Nessuna API richiesta.'
                        : 'Integrazione WhatsApp Cloud API. Richiede backend.'}
                    </div>
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Link WhatsApp generati">
              <div className="bg-white/3 rounded-xl p-4 space-y-2">
                {messageKeys.map((k) => (
                  <div key={k} className="flex items-center justify-between text-xs">
                    <span className="text-[#8892a4]">{messageLabels[k]}</span>
                    <a
                      href={`https://wa.me/${cfg.phone}?text=${encodeURIComponent(cfg.messages[k])}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00d4ff] hover:underline"
                    >
                      Testa →
                    </a>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Messages tab */}
        {activeTab === 'messages' && (
          <div className="space-y-5">
            <p className="text-[#8892a4] text-sm mb-6">
              Modifica i messaggi preimpostati che vengono inviati quando un utente clicca un CTA specifico.
            </p>
            {messageKeys.map((k) => (
              <Section key={k} title={messageLabels[k]}>
                <textarea
                  value={cfg.messages[k]}
                  onChange={(e) => updateMessage(k, e.target.value)}
                  rows={3}
                  className="admin-input resize-none"
                />
                <p className="text-[#4a5568] text-xs mt-1.5">
                  Caratteri: {cfg.messages[k].length} —{' '}
                  <a
                    href={`https://wa.me/${cfg.phone}?text=${encodeURIComponent(cfg.messages[k])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d4ff] hover:underline"
                  >
                    Anteprima WhatsApp
                  </a>
                </p>
              </Section>
            ))}
          </div>
        )}

        {/* API tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <Section title="Variabili d'ambiente — Free Mode">
              <EnvBlock vars={{
                VITE_WHATSAPP_MODE: 'free',
                VITE_WHATSAPP_PHONE: cfg.phone,
              }} />
            </Section>
            <Section title="Variabili d'ambiente — Cloud API Mode (future)">
              <EnvBlock vars={{
                VITE_WHATSAPP_MODE: 'cloud_api',
                VITE_WHATSAPP_PHONE: cfg.phone,
                WHATSAPP_ACCESS_TOKEN: '<token>',
                WHATSAPP_PHONE_NUMBER_ID: '<id>',
                WHATSAPP_VERIFY_TOKEN: '<verify_token>',
                WHATSAPP_WEBHOOK_SECRET: '<webhook_secret>',
              }} />
            </Section>
            <Section title="Architettura futura">
              <div className="text-[#8892a4] text-sm space-y-3 leading-relaxed">
                <p>
                  Per abilitare la <strong className="text-white">Cloud API Mode</strong>, sarà necessario:
                </p>
                <ul className="list-none space-y-2 pl-0">
                  {[
                    'Creare un account Meta for Developers',
                    'Configurare un WhatsApp Business Account (WABA)',
                    'Ottenere Access Token e Phone Number ID',
                    'Deployare il webhook su /api/whatsapp/webhook',
                    'Abilitare i template di messaggio su Meta',
                    'Cambiare VITE_WHATSAPP_MODE=cloud_api',
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span className="text-[#00d4ff] mt-0.5">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-[#4a5568] text-xs pt-2">
                  Il layer di astrazione in <code className="bg-white/5 px-1 rounded">src/lib/whatsapp.ts</code> è già pronto per gestire entrambe le modalità tramite il flag VITE_WHATSAPP_MODE.
                </p>
              </div>
            </Section>
          </div>
        )}
      </div>

      <style>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.625rem;
          padding: 0.625rem 0.875rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-input:focus {
          border-color: rgba(0,212,255,0.4);
        }
      `}</style>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/3 border border-white/7 rounded-xl p-5">
      <h3 className="text-white text-sm font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="block text-[#8892a4] text-xs font-medium mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function EnvBlock({ vars }: { vars: Record<string, string> }) {
  return (
    <pre className="bg-[#06080f] rounded-xl p-4 text-xs text-[#8892a4] overflow-x-auto border border-white/5">
      {Object.entries(vars).map(([k, v]) => (
        <div key={k}>
          <span className="text-[#00d4ff]">{k}</span>
          <span className="text-white/30">=</span>
          <span className="text-[#f59e0b]">{v}</span>
        </div>
      ))}
    </pre>
  )
}
