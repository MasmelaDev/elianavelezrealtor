import { SignJWT, jwtVerify } from 'jose';
import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);
const secret = new TextEncoder().encode("genera_un_string_aleatorio_minimo_64_caracteres_aqui");
const SALT_LEN = 16;
const KEY_LEN = 64;
async function hashPassword(password) {
  const salt = randomBytes(SALT_LEN).toString("hex");
  const key = await scryptAsync(password, salt, KEY_LEN);
  return `${salt}:${key.toString("hex")}`;
}
async function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const key = await scryptAsync(password, salt, KEY_LEN);
  try {
    return timingSafeEqual(key, Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}
async function createToken(userId) {
  return new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(secret);
}
async function verifyToken(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
function getTokenFromCookies(cookies) {
  return cookies.get("auth_token")?.value ?? null;
}
async function requireAuth(cookies) {
  const token = cookies.get("auth_token")?.value;
  if (!token) {
    throw Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return await verifyToken(token);
  } catch {
    throw Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export { createToken, getTokenFromCookies, hashPassword, requireAuth, verifyPassword, verifyToken };
