import { useState, type FormEvent } from 'react'
import { useTranslations } from '../../i18n/utils'

export default function ContactForm({
  lang,
  contactTitle,
  whatsappNumber,
}: {
  lang: 'en' | 'es'
  contactTitle?: string
  whatsappNumber?: string
}) {
  const t = useTranslations(lang)
  const title = contactTitle ?? t('contact.title')
  const waNum = (whatsappNumber ?? '').replace(/\D/g, '') || '1234567890'
  const whatsappUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(lang === 'es' ? '¡Hola! Quisiera más información.' : 'Hello! I would like more information.')}`
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSending(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('phone') || undefined,
        message: fd.get('message') || undefined,
        source: 'contact',
      }),
    })
    const data = await res.json().catch(() => ({}))
    setSending(false)
    if (!res.ok) {
      const errorMsg = data.details 
        ? `${data.error}: ${data.details}` 
        : (typeof data.error === 'object' ? (lang === 'es' ? 'Datos inválidos' : 'Invalid data') : data.error ?? t('form.error'))
      setError(errorMsg)
      return
    }
    setSuccess(true)
    form.reset()
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-gray-200 bg-surface-gray/30 px-4 py-3 text-on-surface transition-all duration-300 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300'

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-surface-muted py-16 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Photo: hidden on mobile, left on desktop */}
          <div className="reveal-fade-left order-2 lg:order-1 hidden lg:flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm">
              <img
                src="/images/eliana.png"
                alt="Eliana Velez"
                className="w-full max-w-[320px] mx-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-2xl"
              />
            </div>
          </div>
          {/* Form: full width on mobile, right column on desktop */}
          <div className="reveal-fade-right order-1 lg:order-2 min-w-0">
            <h2 data-edit-key="contact.title" className="font-serif text-3xl font-semibold text-on-surface md:text-4xl">
              {title}
            </h2>
            {success ? (
              <p className="mt-6 max-w-md rounded-xl bg-accent-muted p-4 text-on-surface border border-accent/20">
                {t('form.success')}
              </p>
            ) : (
              <form onSubmit={submit} className="mt-8 w-full space-y-5">
                {error && (
                  <p className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-on-surface">
                      {t('form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      minLength={2}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-on-surface">
                      {t('form.phone')}
                    </label>
                    <input type="tel" id="phone" name="phone" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-on-surface">
                    {t('form.email')}
                  </label>
                  <input type="email" id="email" name="email" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-on-surface">
                    {t('form.message')}
                  </label>
                  <textarea id="message" name="message" rows={4} className={inputClass} />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="group relative w-full overflow-hidden rounded-xl bg-primary px-5 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {sending ? '…' : t('form.submit')}
                </button>
              </form>
            )}
            <p className="mt-6 text-sm text-on-surface-muted">
              {lang === 'es' ? '¿Prefieres escribir por WhatsApp?' : 'Prefer to message on WhatsApp?'}{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                {lang === 'es' ? 'Escríbeme aquí' : 'Message me here'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
