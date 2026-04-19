import { d as db, l as leads } from '../../chunks/schema_CP1qSdhM.mjs';
import { a as LeadSchema } from '../../chunks/index_BTv1RK1A.mjs';
import { a as notifyRealtorLead } from '../../chunks/email_BQBaStOK.mjs';
import { desc } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const GET = async ({ cookies }) => {
  const { getTokenFromCookies, verifyToken } = await import('../../chunks/auth_M1WJu4vt.mjs');
  const token = getTokenFromCookies(cookies);
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await verifyToken(token);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 });
    }
    const [created] = await db.insert(leads).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      message: parsed.data.message ?? null,
      source: parsed.data.source,
      propertyId: parsed.data.propertyId ?? null
    }).returning();
    try {
      await notifyRealtorLead({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
        source: parsed.data.source
      });
    } catch {
    }
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
