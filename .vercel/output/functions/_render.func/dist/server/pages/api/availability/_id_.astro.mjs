import { d as db, a as availabilitySlots } from '../../../chunks/schema_CP1qSdhM.mjs';
import { getTokenFromCookies, verifyToken } from '../../../chunks/auth_M1WJu4vt.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
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
    const [deleted] = await db.delete(availabilitySlots).where(eq(availabilitySlots.id, id)).returning();
    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
