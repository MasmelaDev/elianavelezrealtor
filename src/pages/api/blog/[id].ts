import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { blogPosts } from '../../../db/schema'
import { BlogPostSchema } from '../../../schemas'
import { getTokenFromCookies, verifyToken } from '../../../lib/auth'
import { eq } from 'drizzle-orm'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const GET: APIRoute = async ({ params, url }) => {
  try {
    const id = params.id
    if (!id) return Response.json({ error: 'Not found' }, { status: 404 })
    const bySlug = url.searchParams.get('bySlug') === 'true'
    if (!bySlug && !UUID_RE.test(id)) return Response.json({ error: 'Not found' }, { status: 404 })
    const [row] = bySlug
      ? await db.select().from(blogPosts).where(eq(blogPosts.slug, id)).limit(1)
      : await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1)
    if (!row) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(row)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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
    const parsed = BlogPostSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }

    // Fetch current post to preserve publishedAt if already set
    const [existing] = await db.select({ publishedAt: blogPosts.publishedAt, published: blogPosts.published }).from(blogPosts).where(eq(blogPosts.id, id)).limit(1)
    if (!existing) return Response.json({ error: 'Not found' }, { status: 404 })

    // Only set publishedAt when transitioning from unpublished → published
    const isFirstPublish = parsed.data.published && !existing.published
    const publishedAt = parsed.data.published
      ? (isFirstPublish ? new Date() : existing.publishedAt)
      : null

    const [updated] = await db
      .update(blogPosts)
      .set({
        slug: parsed.data.slug,
        titleEn: parsed.data.titleEn,
        titleEs: parsed.data.titleEs,
        contentEn: parsed.data.contentEn ?? null,
        contentEs: parsed.data.contentEs ?? null,
        excerptEn: parsed.data.excerptEn ?? null,
        excerptEs: parsed.data.excerptEs ?? null,
        coverImage: parsed.data.coverImage ?? null,
        published: parsed.data.published ?? false,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning()
    if (!updated) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(updated)
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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
    const [deleted] = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning()
    if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 })
    return new Response(null, { status: 204 })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
