import { d as db, e as properties } from '../../../chunks/schema_CP1qSdhM.mjs';
import { P as PropertySchema } from '../../../chunks/index_BTv1RK1A.mjs';
import { getTokenFromCookies, verifyToken } from '../../../chunks/auth_M1WJu4vt.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const GET = async ({ params }) => {
  try {
    const id = params.id;
    if (!id || !UUID_RE.test(id)) return Response.json({ error: "Not found" }, { status: 404 });
    const [row] = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
    if (!row) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(row);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
const PUT = async ({ params, request, cookies }) => {
  const token = getTokenFromCookies(cookies);
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await verifyToken(token);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const id = params.id;
    if (!id || !UUID_RE.test(id)) return Response.json({ error: "Not found" }, { status: 404 });
    const body = await request.json();
    const parsed = PropertySchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 });
    }
    const [updated] = await db.update(properties).set({
      titleEn: parsed.data.titleEn,
      titleEs: parsed.data.titleEs,
      descriptionEn: parsed.data.descriptionEn ?? null,
      descriptionEs: parsed.data.descriptionEs ?? null,
      price: String(parsed.data.price),
      zone: parsed.data.zone,
      type: parsed.data.type,
      status: parsed.data.status ?? "available",
      bedrooms: parsed.data.bedrooms ?? null,
      bathrooms: parsed.data.bathrooms ?? null,
      areaSqft: parsed.data.areaSqft != null ? String(parsed.data.areaSqft) : null,
      address: parsed.data.address ?? null,
      lat: parsed.data.lat != null ? String(parsed.data.lat) : null,
      lng: parsed.data.lng != null ? String(parsed.data.lng) : null,
      images: parsed.data.images ?? [],
      features: parsed.data.features ?? [],
      featured: parsed.data.featured ?? false,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(properties.id, id)).returning();
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(updated);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
const DELETE = async ({ params, cookies }) => {
  const token = getTokenFromCookies(cookies);
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await verifyToken(token);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const id = params.id;
    if (!id || !UUID_RE.test(id)) return Response.json({ error: "Not found" }, { status: 404 });
    const [deleted] = await db.delete(properties).where(eq(properties.id, id)).returning();
    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
