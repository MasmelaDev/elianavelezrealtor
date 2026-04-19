import { useState, useEffect } from 'react'
import { useTranslations } from '../../i18n/utils'

interface Slot {
  id: string
  date: string
  timeStart: string
  timeEnd: string
  isBooked: boolean
}

interface Props {
  lang: 'en' | 'es'
}

export default function AppointmentForm({ lang }: Props) {
  const t = useTranslations(lang)
  const [month, setMonth] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/availability?month=${month}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSlots(data)
        else setSlots([])
      })
      .catch(() => setSlots([]))
      .finally(() => setLoading(false))
  }, [month])

  const available = slots.filter((s) => !s.isBooked)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selected) return
    setError(null)
    setSending(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slotId: selected,
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('phone') || undefined,
        message: fd.get('message') || undefined,
      }),
    })
    const data = await res.json().catch(() => ({}))
    setSending(false)
    if (!res.ok) {
      setError(data.error ?? (lang === 'es' ? 'No se pudo agendar' : 'Could not book'))
      return
    }
    setSuccess(true)
    setSelected(null)
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-gray-200 bg-surface-gray/30 px-4 py-3 text-on-surface transition-all duration-300 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300'

  return (
    <section className="py-20 md:py-28" id="appointment">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold text-on-surface md:text-4xl">
          {t('appointment.title')}
        </h2>
        {success ? (
          <p className="mt-6 max-w-md rounded-xl bg-accent-muted/50 p-4 text-on-surface">
            {lang === 'es' ? 'Cita agendada. Revisa tu correo.' : 'Appointment booked. Check your email.'}
          </p>
        ) : (
          <>
            <div className="mt-8 flex items-center gap-4">
              <label className="text-sm font-medium text-on-surface">
                {lang === 'es' ? 'Mes' : 'Month'}
              </label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={inputClass}
              />
            </div>
            {loading ? (
              <p className="mt-4 text-on-surface-muted">Loading…</p>
            ) : available.length === 0 ? (
              <p className="mt-4 text-on-surface-muted">
                {lang === 'es' ? 'No hay horarios disponibles este mes.' : 'No slots available this month.'}
              </p>
            ) : (
              <form onSubmit={submit} className="mt-8 max-w-md space-y-5">
                {error && (
                  <p className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
                )}
                <div>
                  <label className="block text-sm font-medium text-on-surface">
                    {lang === 'es' ? 'Horarios' : 'Slots'}
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {available.map((s) => {
                      const timeStr = typeof s.timeStart === 'string' ? s.timeStart.slice(0, 5) : ''
                      const label = `${s.date} ${timeStr}`
                      const id = s.id
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setSelected(id)}
                          className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                            selected === id
                              ? 'border-primary bg-primary text-white shadow-md scale-105'
                              : 'border-gray-200 bg-surface hover:border-gray-300 hover:bg-surface-gray'
                          }`}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {selected && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-on-surface">{t('form.name')}</label>
                      <input type="text" name="name" required minLength={2} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface">{t('form.email')}</label>
                      <input type="email" name="email" required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface">{t('form.phone')}</label>
                      <input type="tel" name="phone" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface">{t('form.message')}</label>
                      <textarea name="message" rows={2} className={inputClass} />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative w-full overflow-hidden rounded-xl bg-primary px-5 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {sending ? '…' : lang === 'es' ? 'Confirmar cita' : 'Confirm appointment'}
                    </button>
                  </>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </section>
  )
}
