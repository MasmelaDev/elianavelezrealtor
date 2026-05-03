import type { APIRoute } from 'astro'
import { db } from '../../../lib/db'
import { adminUsers } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)
const SALT_LEN = 16
const KEY_LEN = 64

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LEN).toString('hex')
  const key = (await scryptAsync(password, salt, KEY_LEN)) as Buffer
  return `${salt}:${key.toString('hex')}`
}

export const PUT: APIRoute = async ({ request, cookies }) => {
  const { getTokenFromCookies, verifyToken } = await import('../../../lib/auth')
  const token = getTokenFromCookies(cookies)
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const session = await verifyToken(token)
    const body = await request.json()
    const { email, password } = body

    if (!email) return Response.json({ error: 'Email is required' }, { status: 400 })

    const updateData: any = { email }
    if (password) {
      if (password.length < 8) {
        return Response.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
      }
      updateData.passwordHash = await hashPassword(password)
    }

    await db.update(adminUsers)
      .set(updateData)
      .where(eq(adminUsers.id, session.userId))

    return Response.json({ success: true })
  } catch (err: any) {
    console.error('Profile update error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
