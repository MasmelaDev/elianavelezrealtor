import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { adminUsers } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { LoginSchema } from '../../../schemas'
import { createToken, verifyPassword } from '../../../lib/auth'

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json()
    const parsed = LoginSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: 'Invalid email or password', details: parsed.error.flatten() }, { status: 422 })
    }
    const { email, password } = parsed.data

    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1)
    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = await createToken(user.id)
    cookies.set('auth_token', token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8h
    })

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
