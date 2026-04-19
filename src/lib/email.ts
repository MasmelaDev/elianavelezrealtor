import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)
const FROM = (import.meta.env.RESEND_FROM as string) || 'noreply@tudominio.com'
const REALTOR = import.meta.env.REALTOR_EMAIL as string

/** Escape user-provided strings before interpolating into HTML emails */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function sendAppointmentToClient(data: {
  to: string
  name: string
  date: string
  timeStart: string
}) {
  return resend.emails.send({
    from: FROM,
    to: data.to,
    subject: 'Your appointment is confirmed',
    html: `
      <h2>Hi ${escapeHtml(data.name)},</h2>
      <p>Your appointment has been confirmed for <strong>${escapeHtml(data.date)}</strong> at <strong>${escapeHtml(data.timeStart)}</strong>.</p>
      <p>I'll reach out to confirm the meeting details. See you soon!</p>
    `,
  })
}

export async function notifyRealtorAppointment(data: {
  name: string
  email: string
  phone?: string
  date: string
  timeStart: string
  message?: string
}) {
  return resend.emails.send({
    from: FROM,
    to: REALTOR,
    subject: `New appointment: ${escapeHtml(data.name)} — ${escapeHtml(data.date)}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? 'Not provided')}</p>
      <p><strong>Date:</strong> ${escapeHtml(data.date)} at ${escapeHtml(data.timeStart)}</p>
      <p><strong>Message:</strong> ${escapeHtml(data.message ?? '—')}</p>
    `,
  })
}

export async function notifyRealtorLead(data: {
  name: string
  email: string
  phone?: string
  message?: string
  source: string
}) {
  return resend.emails.send({
    from: FROM,
    to: REALTOR,
    subject: `New lead (${escapeHtml(data.source)}): ${escapeHtml(data.name)}`,
    html: `
      <h2>New Contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? 'Not provided')}</p>
      <p><strong>Message:</strong> ${escapeHtml(data.message ?? '—')}</p>
      <p><strong>Source:</strong> ${escapeHtml(data.source)}</p>
    `,
  })
}

