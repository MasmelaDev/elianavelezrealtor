import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { properties } from '../../../db/schema'
import { PropertySchema } from '../../../schemas'
import { getTokenFromCookies, verifyToken } from '../../../lib/auth'
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm'

export const GET: APIRoute = async ({ url }) => {
  try {
    const zone = url.searchParams.get('zone')
    const type = url.searchParams.get('type')
    const status = url.searchParams.get('status') ?? 'available'
    const minPrice = url.searchParams.get('minPrice')
    const maxPrice = url.searchParams.get('maxPrice')
    const bedrooms = url.searchParams.get('bedrooms')
    const featured = url.searchParams.get('featured')
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))
    const limit = Math.min(24, Number(url.searchParams.get('limit') ?? 12))
    const offset = (page - 1) * limit

    const conditions = [eq(properties.status, status)]
    if (zone) conditions.push(eq(properties.zone, zone))
    if (type) conditions.push(eq(properties.type, type))
    if (minPrice) conditions.push(gte(properties.price, minPrice))
    if (maxPrice) conditions.push(lte(properties.price, maxPrice))
    if (bedrooms) conditions.push(eq(properties.bedrooms, Number(bedrooms)))
    if (featured === 'true') conditions.push(eq(properties.featured, true))

    const [data, countResult] = await Promise.all([
      db
        .select()
        .from(properties)
        .where(and(...conditions))
        .limit(limit)
        .offset(offset)
        .orderBy(desc(properties.createdAt)),
      db.select({ count: sql<number>`count(*)` }).from(properties).where(and(...conditions)),
    ])

    const total = Number(countResult[0]?.count ?? 0)
    return Response.json({
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    })
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
    const parsed = PropertySchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }
    const [created] = await db.insert(properties).values({
      titleEn: parsed.data.titleEn,
      titleEs: parsed.data.titleEs,
      descriptionEn: parsed.data.descriptionEn ?? null,
      descriptionEs: parsed.data.descriptionEs ?? null,
      price: String(parsed.data.price),
      zone: parsed.data.zone,
      type: parsed.data.type,
      status: parsed.data.status ?? 'available',
      bedrooms: parsed.data.bedrooms ?? null,
      bathrooms: parsed.data.bathrooms ?? null,
      areaSqft: parsed.data.areaSqft != null ? String(parsed.data.areaSqft) : null,
      address: parsed.data.address ?? null,
      lat: parsed.data.lat != null ? String(parsed.data.lat) : null,
      lng: parsed.data.lng != null ? String(parsed.data.lng) : null,
      images: parsed.data.images ?? [],
      features: parsed.data.features ?? [],
      featured: parsed.data.featured ?? false,
    }).returning()
    return Response.json(created, { status: 201 })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
