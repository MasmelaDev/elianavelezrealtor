import { c as blogPosts, d as db } from '../../chunks/schema_CP1qSdhM.mjs';
import { B as BlogPostSchema } from '../../chunks/index_BTv1RK1A.mjs';
import { getTokenFromCookies, verifyToken } from '../../chunks/auth_M1WJu4vt.mjs';
import { eq, desc, sql } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const published = url.searchParams.get("published");
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const limit = Math.min(24, Number(url.searchParams.get("limit") ?? 12));
    const offset = (page - 1) * limit;
    const whereClause = published === "true" ? eq(blogPosts.published, true) : void 0;
    const [data, countResult] = await Promise.all([
      whereClause ? db.select().from(blogPosts).where(whereClause).limit(limit).offset(offset).orderBy(desc(blogPosts.createdAt)) : db.select().from(blogPosts).limit(limit).offset(offset).orderBy(desc(blogPosts.createdAt)),
      whereClause ? db.select({ count: sql`count(*)` }).from(blogPosts).where(whereClause) : db.select({ count: sql`count(*)` }).from(blogPosts)
    ]);
    const total = Number(countResult[0]?.count ?? 0);
    return Response.json({
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
const POST = async ({ request, cookies }) => {
  const token = getTokenFromCookies(cookies);
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await verifyToken(token);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = BlogPostSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 });
    }
    const [created] = await db.insert(blogPosts).values({
      slug: parsed.data.slug,
      titleEn: parsed.data.titleEn,
      titleEs: parsed.data.titleEs,
      contentEn: parsed.data.contentEn ?? null,
      contentEs: parsed.data.contentEs ?? null,
      excerptEn: parsed.data.excerptEn ?? null,
      excerptEs: parsed.data.excerptEs ?? null,
      coverImage: parsed.data.coverImage ?? null,
      published: parsed.data.published ?? false,
      publishedAt: parsed.data.published ? /* @__PURE__ */ new Date() : null
    }).returning();
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
