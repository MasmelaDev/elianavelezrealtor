import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { pageContent } from '../../../db/schema'
import { getTokenFromCookies, verifyToken } from '../../../lib/auth'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const ContentUpdateSchema = z.object({
  key: z.string().min(1).max(100),
  valueEn: z.string(),
  valueEs: z.string(),
})

export const GET: APIRoute = async ({ url }) => {
  try {
    const key = url.searchParams.get('key')
    if (key) {
      const [row] = await db.select().from(pageContent).where(eq(pageContent.key, key)).limit(1)
      if (!row) return Response.json({ error: 'Not found' }, { status: 404 })
      return Response.json(row)
    }
    const rows = await db.select().from(pageContent)
    return Response.json(rows)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const PUT: APIRoute = async ({ request, cookies }) => {
  const token = getTokenFromCookies(cookies)
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await verifyToken(token)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const parsed = ContentUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }
    const [updated] = await db
      .update(pageContent)
      .set({
        valueEn: parsed.data.valueEn,
        valueEs: parsed.data.valueEs,
        updatedAt: new Date(),
      })
      .where(eq(pageContent.key, parsed.data.key))
      .returning()
    if (!updated) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(updated)
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
    const parsed = ContentUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }
    const [result] = await db
      .insert(pageContent)
      .values({
        key: parsed.data.key,
        valueEn: parsed.data.valueEn,
        valueEs: parsed.data.valueEs,
      })
      .onConflictDoUpdate({
        target: pageContent.key,
        set: {
          valueEn: parsed.data.valueEn,
          valueEs: parsed.data.valueEs,
          updatedAt: new Date(),
        },
      })
      .returning()
    return Response.json(result)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
