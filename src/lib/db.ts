import { neon } from '@neondatabase/serverless'
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-http'
import { Pool } from 'pg'
import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres'

const url = import.meta.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is required.')

/**
 * localhost / 127.0.0.1 → pg (Docker local).
 * Cualquier otro host (p. ej. neon.tech) → Neon serverless (HTTP).
 */
const isLocal = /localhost|127\.0\.0\.1/.test(url)

type DbType = ReturnType<typeof neonDrizzle>
export const db = (isLocal
  ? pgDrizzle(new Pool({ connectionString: url }))
  : neonDrizzle(neon(url))) as unknown as DbType
