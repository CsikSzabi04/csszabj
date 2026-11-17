import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  clientIp,
  createSessionToken,
  isAuthConfigured,
  isSameOrigin,
  sessionCookieOptions,
  verifyCredentials,
} from "../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
 * Owner login. Hardening: same-origin JSON POST only, tiny body, slow scrypt check, per-IP lockout
 * after repeated failures (plus a Netlify edge rate limit in netlify/edge-functions/login-rate-limit.ts).
 */

const NO_STORE = { "Cache-Control": "no-store" };
const MAX_BODY_BYTES = 2_048;
const FAILURE_WINDOW_MS = 15 * 60_000;
const MAX_FAILURES = 5;
const MAX_TRACKED_IPS = 5_000;
const FAILURE_DELAY_MS = 400;

const failures = new Map<string, { count: number; first: number }>();

function isLockedOut(ip: string): boolean {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.first > FAILURE_WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const now = Date.now();
  const entry = failures.get(ip);
  const fresh = !entry || now - entry.first > FAILURE_WINDOW_MS;
  failures.delete(ip);
  failures.set(ip, fresh ? { count: 1, first: now } : { count: entry.count + 1, first: entry.first });
  // Map keeps insertion order, so the first keys are the least recently seen ones.
  for (const key of failures.keys()) {
    if (failures.size <= MAX_TRACKED_IPS) break;
    failures.delete(key);
  }
}

function error(code: string, status: number) {
  return NextResponse.json({ error: code }, { status, headers: NO_STORE });
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return error("forbidden", 403);
  if (!isAuthConfigured()) return error("not_configured", 503);

  const ip = clientIp(req);
  if (isLockedOut(ip)) return error("rate_limited", 429);

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return error("bad_request", 413);
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) return error("bad_request", 413);

  let body: { username?: unknown; password?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return error("bad_request", 400);
  }

  const ok = await verifyCredentials(body?.username, body?.password);
  if (!ok) {
    recordFailure(ip);
    await new Promise((resolve) => setTimeout(resolve, FAILURE_DELAY_MS));
    return error("invalid_credentials", 401);
  }

  const token = createSessionToken();
  if (!token) return error("not_configured", 503);
  failures.delete(ip);

  const res = NextResponse.json({ ok: true }, { headers: NO_STORE });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return res;
}
