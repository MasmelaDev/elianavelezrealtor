import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { leads, appointments, availabilitySlots } from '../../../db/schema'
import { AppointmentSchema } from '../../../schemas'
import { sendAppointmentToClient, notifyRealtorAppointment } from '../../../lib/email'
import { getTokenFromCookies, verifyToken } from '../../../lib/auth'
import { eq, and, desc } from 'drizzle-orm'

export const GET: APIRoute = async ({ cookies }) => {
  const token = getTokenFromCookies(cookies)
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await verifyToken(token)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await db
      .select({
        id: appointments.id,
        status: appointments.status,
        notes: appointments.notes,
        createdAt: appointments.createdAt,
        leadName: leads.name,
        leadEmail: leads.email,
        leadPhone: leads.phone,
        slotDate: availabilitySlots.date,
        slotTimeStart: availabilitySlots.timeStart,
        slotTimeEnd: availabilitySlots.timeEnd,
      })
      .from(appointments)
      .innerJoin(leads, eq(appointments.leadId, leads.id))
      .innerJoin(availabilitySlots, eq(appointments.slotId, availabilitySlots.id))
      .orderBy(desc(appointments.createdAt))
    return Response.json(data)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const parsed = AppointmentSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }

    // Wrap the entire booking flow in a transaction to prevent double-booking
    const result = await db.transaction(async (tx) => {
      // Check slot exists AND is not booked (atomic via transaction)
      const [slot] = await tx
        .select()
        .from(availabilitySlots)
        .where(and(eq(availabilitySlots.id, parsed.data.slotId), eq(availabilitySlots.isBooked, false)))
        .limit(1)
      if (!slot) return null

      const [lead] = await tx
        .insert(leads)
        .values({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone ?? null,
          message: parsed.data.message ?? null,
          source: 'appointment',
        })
        .returning()

      const [appointment] = await tx
        .insert(appointments)
        .values({
          leadId: lead.id,
          slotId: parsed.data.slotId,
          status: 'pending',
        })
        .returning()

      await tx
        .update(availabilitySlots)
        .set({ isBooked: true })
        .where(eq(availabilitySlots.id, parsed.data.slotId))

      return { slot, lead, appointment }
    })

    if (!result) {
      return Response.json({ error: 'Slot not found or already booked' }, { status: 409 })
    }

    const { slot, appointment } = result
    const dateStr = typeof slot.date === 'string' ? slot.date : (slot.date as Date).toISOString().slice(0, 10)
    const timeStart = typeof slot.timeStart === 'string' ? slot.timeStart : String(slot.timeStart).slice(0, 5)

    // Send emails outside the transaction — failure here should not roll back the booking
    try {
      await sendAppointmentToClient({
        to: parsed.data.email,
        name: parsed.data.name,
        date: dateStr,
        timeStart,
      })
      await notifyRealtorAppointment({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        date: dateStr,
        timeStart,
        message: parsed.data.message,
      })
    } catch {
      // don't fail the request if emails fail
    }

    return Response.json({
      success: true,
      appointment: { id: appointment.id, date: dateStr, timeStart },
    })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
