import { d as db, f as adminUsers } from '../../../chunks/schema_CP1qSdhM.mjs';
import { eq } from 'drizzle-orm';
import { L as LoginSchema } from '../../../chunks/index_BTv1RK1A.mjs';
import { verifyPassword, createToken } from '../../../chunks/auth_M1WJu4vt.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid email or password", details: parsed.error.flatten() }, { status: 422 });
    }
    const { email, password } = parsed.data;
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const token = await createToken(user.id);
    cookies.set("auth_token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 8
      // 8h
    });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
