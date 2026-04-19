import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { availabilitySlots } from '../../../db/schema'
import { getTokenFromCookies, verifyToken } from '../../../lib/auth'
import { eq } from 'drizzle-orm'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const DELETE: APIRoute = async ({ params, cookies }) => {
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
    const [deleted] = await db
      .delete(availabilitySlots)
      .where(eq(availabilitySlots.id, id))
      .returning()
    if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 })
    return new Response(null, { status: 204 })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
