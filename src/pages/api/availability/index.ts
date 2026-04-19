import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { availabilitySlots } from '../../../db/schema'
import { getTokenFromCookies, verifyToken } from '../../../lib/auth'
import { and, gte, lte } from 'drizzle-orm'
import { z } from 'zod'

const SlotSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeStart: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  timeEnd: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
})

export const GET: APIRoute = async ({ url }) => {
  try {
    const month = url.searchParams.get('month') // YYYY-MM
    if (!month) {
      return Response.json({ error: 'Missing month (YYYY-MM)' }, { status: 400 })
    }
    const [y, m] = month.split('-').map(Number)
    const start = new Date(y, m - 1, 1)
    const end = new Date(y, m, 0)
    const startStr = start.toISOString().slice(0, 10)
    const endStr = end.toISOString().slice(0, 10)

    const data = await db
      .select()
      .from(availabilitySlots)
      .where(and(gte(availabilitySlots.date, startStr), lte(availabilitySlots.date, endStr)))

    return Response.json(data)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = getTokenFromCookies(cookies)
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await verifyToken(token)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const parsed = SlotSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }
    const [created] = await db
      .insert(availabilitySlots)
      .values({
        date: parsed.data.date,
        timeStart: parsed.data.timeStart,
        timeEnd: parsed.data.timeEnd,
      })
      .returning()
    return Response.json(created, { status: 201 })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
