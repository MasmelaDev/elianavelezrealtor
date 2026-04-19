import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { leads } from '../../../db/schema'
import { getTokenFromCookies, verifyToken } from '../../../lib/auth'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const LeadStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'closed']),
})

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  const token = getTokenFromCookies(cookies)
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await verifyToken(token)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const id = params.id
    if (!id || !UUID_RE.test(id)) return Response.json({ error: 'Not found' }, { status: 404 })
    const body = await request.json()
    const parsed = LeadStatusSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }
    const [updated] = await db
      .update(leads)
      .set({ status: parsed.data.status })
      .where(eq(leads.id, id))
      .returning()
    if (!updated) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(updated)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
