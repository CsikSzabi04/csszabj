import "server-only";
import { createHmac, scrypt, timingSafeEqual, type ScryptOptions } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

/*
 * Owner-only login. There is exactly one account, configured through environment variables:
 *   AUTH_USERNAME       the login name
 *   AUTH_PASSWORD_HASH  scrypt hash of the password (generate it with `node scripts/hash-password.mjs`)
 *   AUTH_SECRET         random secret (32+ bytes, hex) that signs the session cookie
 * The plain password is never stored anywhere. The session is a stateless HMAC-signed cookie;
 * changing the password hash or the secret invalidates every existing session.
 */

export const SESSION_COOKIE = "csszabj_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const MAX_PASSWORD_LENGTH = 256;
const SCRYPT_MAXMEM = 64 * 1024 * 1024;

interface PasswordHash {
  raw: string;
  N: number;
  r: number;
  p: number;
  salt: Buffer;
  hash: Buffer;
}

interface AuthConfig {
  username: string;
  password: PasswordHash;
  signingKey: Buffer;
}

export interface Session {
  username: string;
  expiresAt: number;
}

// Format: scrypt:<N>:<r>:<p>:<saltHex>:<hashHex> (no "$" so .env variable expansion can't mangle it)
function parsePasswordHash(raw: string): PasswordHash | null {
  const parts = raw.trim().split(":");
  if (parts.length !== 6 || parts[0] !== "scrypt") return null;
  const [N, r, p] = parts.slice(1, 4).map(Number);
  const salt = Buffer.from(parts[4], "hex");
  const hash = Buffer.from(parts[5], "hex");
  const isPowerOfTwo = Number.isInteger(N) && N > 1 && (N & (N - 1)) === 0;
  if (!isPowerOfTwo || !Number.isInteger(r) || r < 1 || !Number.isInteger(p) || p < 1) return null;
  if (salt.length < 16 || hash.length < 32) return null;
  return { raw: raw.trim(), N, r, p, salt, hash };
}

function readConfig(): AuthConfig | null {
  const username = process.env.AUTH_USERNAME?.trim();
  const password = parsePasswordHash(process.env.AUTH_PASSWORD_HASH ?? "");
  const secret = process.env.AUTH_SECRET?.trim() ?? "";
  if (!username || !password || secret.length < 32) return null;
  // The signing key depends on the password hash, so a password change logs out every session.
  const signingKey = createHmac("sha256", secret).update(`session-key:${password.raw}`).digest();
  return { username, password, signingKey };
}

export function isAuthConfigured(): boolean {
  return readConfig() !== null;
}

function deriveKey(password: string, salt: Buffer, keylen: number, options: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keylen, options, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

// Constant-time string comparison that doesn't leak the length either.
function safeEqual(a: string, b: string): boolean {
  const key = Buffer.from("compare");
  const ha = createHmac("sha256", key).update(a).digest();
  const hb = createHmac("sha256", key).update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function verifyCredentials(username: unknown, password: unknown): Promise<boolean> {
  const config = readConfig();
  if (!config || typeof username !== "string" || typeof password !== "string") return false;
  if (password.length === 0 || password.length > MAX_PASSWORD_LENGTH) return false;

  // Always run the (slow) hash, even for a wrong username, so timing doesn't reveal which part was wrong.
  const { N, r, p, salt, hash } = config.password;
  const derived = await deriveKey(password.normalize("NFC"), salt, hash.length, { N, r, p, maxmem: SCRYPT_MAXMEM });
  const passwordOk = timingSafeEqual(derived, hash);
  const usernameOk = safeEqual(username.trim(), config.username);
  return passwordOk && usernameOk;
}

function sign(key: Buffer, data: string): string {
  return createHmac("sha256", key).update(data).digest("base64url");
}

export function createSessionToken(): string | null {
  const config = readConfig();
  if (!config) return null;
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ u: config.username, iat: now, exp: now + SESSION_TTL_SECONDS }),
  ).toString("base64url");
  return `${payload}.${sign(config.signingKey, payload)}`;
}

export function verifySessionToken(token: string | undefined | null): Session | null {
  const config = readConfig();
  if (!config || !token || token.length > 1024) return null;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return null;

  const expected = Buffer.from(sign(config.signingKey, payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { u?: unknown; exp?: unknown };
    if (data.u !== config.username || typeof data.exp !== "number") return null;
    if (data.exp * 1000 <= Date.now()) return null;
    return { username: data.u, expiresAt: data.exp * 1000 };
  } catch {
    return null;
  }
}

/** Current session from the request cookies (Server Components, Route Handlers). */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

// ---------- Request guards shared by the auth and file routes ----------

export function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  // Trust only the header the hosting platform sets itself; any other header can be sent by the
  // client to dodge the per-IP lockout (e.g. a fake x-nf-client-connection-ip on Vercel).
  if (process.env.VERCEL) return req.headers.get("x-real-ip") ?? forwarded ?? "unknown";
  if (process.env.NETLIFY) return req.headers.get("x-nf-client-connection-ip") ?? forwarded ?? "unknown";
  return forwarded ?? req.headers.get("x-real-ip") ?? "unknown";
}

/** Rejects cross-site requests (CSRF) for every state-changing endpoint. */
export function isSameOrigin(req: NextRequest): boolean {
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
