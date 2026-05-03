import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { leads } from '../../../db/schema'
import { LeadSchema } from '../../../schemas'
import { notifyRealtorLead } from '../../../lib/email'
import { desc } from 'drizzle-orm'

export const GET: APIRoute = async ({ cookies }) => {
  const { getTokenFromCookies, verifyToken } = await import('../../../lib/auth')
  const token = getTokenFromCookies(cookies)
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await verifyToken(token)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await db.select().from(leads).orderBy(desc(leads.createdAt))
    return Response.json(data)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const parsed = LeadSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }
    const [created] = await db
      .insert(leads)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        message: parsed.data.message ?? null,
        source: parsed.data.source,
        propertyId: parsed.data.propertyId ?? null,
      })
      .returning()
    try {
      await notifyRealtorLead({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
        source: parsed.data.source,
      })
    } catch {
      // log but don't fail the request
    }
    return Response.json(created, { status: 201 })
  } catch (err: any) {
    console.error('Lead submission error:', err)
    return Response.json({ error: 'Internal server error', details: err.message }, { status: 500 })
  }
}
