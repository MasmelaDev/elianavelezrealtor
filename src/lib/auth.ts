import { SignJWT, jwtVerify } from 'jose'
import type { AstroCookies } from 'astro'
import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)
const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET)

const SALT_LEN = 16
const KEY_LEN = 64

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LEN).toString('hex')
  const key = (await scryptAsync(password, salt, KEY_LEN)) as Buffer
  return `${salt}:${key.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const key = (await scryptAsync(password, salt, KEY_LEN)) as Buffer
  try {
    return timingSafeEqual(key, Buffer.from(hash, 'hex'))
  } catch {
    return false
  }
}

export async function createToken(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)
}

export async function verifyToken(token: string): Promise<{ userId: string }> {
  const { payload } = await jwtVerify(token, secret)
  return payload as { userId: string }
}

export function getTokenFromCookies(cookies: AstroCookies): string | null {
  return cookies.get('auth_token')?.value ?? null
}

/**
 * Consolidated auth check for admin API endpoints.
 * Throws a Response (401) if not authenticated — catch in the handler with:
 * ```ts
 * try { await requireAuth(cookies) } catch (r) { if (r instanceof Response) return r; throw r }
 * ```
 */
export async function requireAuth(cookies: AstroCookies): Promise<{ userId: string }> {
  const token = cookies.get('auth_token')?.value
  if (!token) {
    throw Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    return await verifyToken(token)
  } catch {
    throw Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

