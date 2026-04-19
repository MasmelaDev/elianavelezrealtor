import { d as db, c as blogPosts } from '../../../chunks/schema_CP1qSdhM.mjs';
import { B as BlogPostSchema } from '../../../chunks/index_BTv1RK1A.mjs';
import { getTokenFromCookies, verifyToken } from '../../../chunks/auth_M1WJu4vt.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const GET = async ({ params, url }) => {
  try {
    const id = params.id;
    if (!id) return Response.json({ error: "Not found" }, { status: 404 });
    const bySlug = url.searchParams.get("bySlug") === "true";
    if (!bySlug && !UUID_RE.test(id)) return Response.json({ error: "Not found" }, { status: 404 });
    const [row] = bySlug ? await db.select().from(blogPosts).where(eq(blogPosts.slug, id)).limit(1) : await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
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
    const parsed = BlogPostSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 });
    }
    const [existing] = await db.select({ publishedAt: blogPosts.publishedAt, published: blogPosts.published }).from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (!existing) return Response.json({ error: "Not found" }, { status: 404 });
    const isFirstPublish = parsed.data.published && !existing.published;
    const publishedAt = parsed.data.published ? isFirstPublish ? /* @__PURE__ */ new Date() : existing.publishedAt : null;
    const [updated] = await db.update(blogPosts).set({
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
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(blogPosts.id, id)).returning();
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
    const [deleted] = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
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
