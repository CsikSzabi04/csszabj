import { lookup as dnsLookup, type LookupAddress, type LookupOptions } from "node:dns";
import http, { type IncomingHttpHeaders } from "node:http";
import https from "node:https";
import net from "node:net";
import zlib from "node:zlib";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
 * Server-side HTML fetcher for the SEO checker and speed test tools. Browsers can't read other
 * sites' HTML (CORS), so the request is made here – hardened because it is the only dynamic,
 * publicly reachable endpoint of the site:
 *  - same-origin POST only, tiny JSON body, per-IP rate limit + in-flight cap
 *    (plus a Netlify edge rate limit rule in netlify/edge-functions)
 *  - http/https on default ports, no credentials in the URL
 *  - SSRF protection: every resolved IP, including after redirects, must be a public address
 *  - hard total timeout, download size cap and decompression-bomb cap
 */

const MAX_BODY_BYTES = 4_096;
const MAX_URL_LENGTH = 2_048;
const MAX_REDIRECTS = 4;
const MAX_TRANSFER_BYTES = 3 * 1024 * 1024;
const MAX_DECODED_BYTES = 5 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 10_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_MAX_KEYS = 5_000;
const MAX_IN_FLIGHT = 8;
const REDIRECT_CODES = new Set([301, 302, 303, 307, 308]);
const NO_STORE = { "Cache-Control": "no-store" };

const MESSAGES: Record<string, string> = {
  forbidden: "A kérés nem engedélyezett.",
  rate_limited: "Túl sok kérés. Próbáld újra egy perc múlva.",
  busy: "A szolgáltatás most túlterhelt, próbáld újra később.",
  bad_request: "Érvénytelen kérés.",
  invalid_url: "Érvénytelen URL. Csak nyilvános http(s) címek adhatók meg.",
  blocked_host: "Ez a cím nem elérhető (belső vagy tiltott hálózat).",
  dns_failed: "A domain nem található.",
  timeout: "A céloldal nem válaszolt időben.",
  too_large: "Az oldal túl nagy az elemzéshez.",
  too_many_redirects: "Túl sok átirányítás.",
  not_html: "A cím nem HTML oldalt ad vissza.",
  upstream_error: "Nem sikerült lekérni az oldalt.",
};

class FetchError extends Error {
  code: string;
  status: number;

  constructor(code: string, status: number) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

// ---------- Abuse protection ----------

const hits = new Map<string, number[]>();
let inFlight = 0;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  const limited = recent.length >= RATE_LIMIT_MAX;
  if (!limited) recent.push(now);
  hits.delete(key);
  hits.set(key, recent);

  if (hits.size > RATE_LIMIT_MAX_KEYS) {
    // Map keeps insertion order, so the first keys are the least recently seen ones.
    for (const staleKey of hits.keys()) {
      if (hits.size <= RATE_LIMIT_MAX_KEYS) break;
      hits.delete(staleKey);
    }
  }
  return limited;
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-nf-client-connection-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isSameOrigin(req: NextRequest): boolean {
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

// ---------- SSRF protection ----------

const blockList = new net.BlockList();
const BLOCKED_IPV4: [string, number][] = [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8], ["169.254.0.0", 16],
  ["172.16.0.0", 12], ["192.0.0.0", 24], ["192.0.2.0", 24], ["192.88.99.0", 24], ["192.168.0.0", 16],
  ["198.18.0.0", 15], ["198.51.100.0", 24], ["203.0.113.0", 24], ["224.0.0.0", 4], ["240.0.0.0", 4],
];
const BLOCKED_IPV6: [string, number][] = [
  ["::", 128], ["::1", 128], ["64:ff9b::", 96], ["64:ff9b:1::", 48], ["100::", 64], ["2001::", 23],
  ["2001:db8::", 32], ["2002::", 16], ["fc00::", 7], ["fe80::", 10], ["fec0::", 10], ["ff00::", 8],
];
for (const [address, prefix] of BLOCKED_IPV4) blockList.addSubnet(address, prefix, "ipv4");
for (const [address, prefix] of BLOCKED_IPV6) blockList.addSubnet(address, prefix, "ipv6");

function isBlockedAddress(address: string): boolean {
  const family = net.isIP(address);
  if (family === 0) return true;
  // IPv4-mapped IPv6 addresses (::ffff:a.b.c.d) are matched against the IPv4 rules by BlockList.
  return blockList.check(address, family === 6 ? "ipv6" : "ipv4");
}

type LookupCallback = (
  err: NodeJS.ErrnoException | null,
  address: string | LookupAddress[],
  family?: number,
) => void;

// Validates the resolved addresses at connection time, so DNS rebinding can't slip a private IP in.
function safeLookup(hostname: string, options: LookupOptions, callback: LookupCallback) {
  dnsLookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, "", 0);
    if (addresses.length === 0 || addresses.some((entry) => isBlockedAddress(entry.address))) {
      const blocked: NodeJS.ErrnoException = new Error("blocked_host");
      blocked.code = "EBLOCKED";
      return callback(blocked, "", 0);
    }
    if (options.all) callback(null, addresses);
    else callback(null, addresses[0].address, addresses[0].family);
  });
}

function assertAllowedUrl(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new FetchError("invalid_url", 400);
  if (url.username || url.password || url.port) throw new FetchError("invalid_url", 400);

  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  const isIpLiteral = net.isIP(host) !== 0;
  if (
    !host ||
    (!isIpLiteral && !host.includes(".")) ||
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    throw new FetchError("blocked_host", 403);
  }
  // IP literals never go through DNS lookup, so check them directly.
  if (isIpLiteral && isBlockedAddress(host)) throw new FetchError("blocked_host", 403);
}

function parseTargetUrl(input: unknown): URL {
  if (typeof input !== "string") throw new FetchError("invalid_url", 400);
  const trimmed = input.trim();
  if (!trimmed || trimmed.length > MAX_URL_LENGTH) throw new FetchError("invalid_url", 400);

  let url: URL;
  try {
    url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    throw new FetchError("invalid_url", 400);
  }
  assertAllowedUrl(url);
  return url;
}

// ---------- Fetching ----------

interface RawResponse {
  status: number;
  headers: IncomingHttpHeaders;
  body: Buffer;
  ttfbMs: number;
}

function toFetchError(err: unknown): FetchError {
  if (err instanceof FetchError) return err;
  const code = (err as NodeJS.ErrnoException | null)?.code;
  if (code === "EBLOCKED") return new FetchError("blocked_host", 403);
  if (code === "ENOTFOUND" || code === "EAI_AGAIN") return new FetchError("dns_failed", 502);
  return new FetchError("upstream_error", 502);
}

function requestOnce(url: URL, deadline: number): Promise<RawResponse> {
  return new Promise((resolve, reject) => {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return reject(new FetchError("timeout", 504));

    const client = url.protocol === "https:" ? https : http;
    const startedAt = performance.now();
    let timedOut = false;

    const req = client.request(
      url,
      {
        method: "GET",
        agent: false,
        lookup: safeLookup as unknown as net.LookupFunction,
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; CsSzLabBot/1.0; +https://csszabj.netlify.app/tools)",
          accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.1",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "hu,en;q=0.8",
        },
      },
      (res) => {
        const ttfbMs = performance.now() - startedAt;
        const status = res.statusCode ?? 0;

        if (REDIRECT_CODES.has(status)) {
          res.resume();
          resolve({ status, headers: res.headers, body: Buffer.alloc(0), ttfbMs });
          return;
        }

        const declaredLength = Number(res.headers["content-length"]);
        if (Number.isFinite(declaredLength) && declaredLength > MAX_TRANSFER_BYTES) {
          res.destroy();
          reject(new FetchError("too_large", 413));
          return;
        }

        const chunks: Buffer[] = [];
        let received = 0;
        res.on("data", (chunk: Buffer) => {
          received += chunk.length;
          if (received > MAX_TRANSFER_BYTES) {
            res.destroy();
            reject(new FetchError("too_large", 413));
            return;
          }
          chunks.push(chunk);
        });
        res.on("end", () => resolve({ status, headers: res.headers, body: Buffer.concat(chunks), ttfbMs }));
        res.on("error", () => reject(new FetchError(timedOut ? "timeout" : "upstream_error", timedOut ? 504 : 502)));
      },
    );

    const timer = setTimeout(() => {
      timedOut = true;
      req.destroy(new FetchError("timeout", 504));
    }, remaining);
    req.on("error", (err) => reject(toFetchError(err)));
    req.on("close", () => clearTimeout(timer));
    req.end();
  });
}

function decodeBody(body: Buffer, encoding: string): Buffer {
  const options = { maxOutputLength: MAX_DECODED_BYTES };
  try {
    switch (encoding.trim().toLowerCase()) {
      case "":
      case "identity":
        if (body.length > MAX_DECODED_BYTES) throw new FetchError("too_large", 413);
        return body;
      case "gzip":
      case "x-gzip":
        return zlib.gunzipSync(body, options);
      case "deflate":
        try {
          return zlib.inflateSync(body, options);
        } catch (err) {
          if (err instanceof RangeError) throw err;
          return zlib.inflateRawSync(body, options);
        }
      case "br":
        return zlib.brotliDecompressSync(body, options);
      default:
        throw new FetchError("upstream_error", 502);
    }
  } catch (err) {
    if (err instanceof FetchError) throw err;
    if (err instanceof RangeError) throw new FetchError("too_large", 413);
    throw new FetchError("upstream_error", 502);
  }
}

function decodeText(buffer: Buffer, contentType: string): string {
  const charset = /charset=["']?([\w-]+)/i.exec(contentType)?.[1] ?? "utf-8";
  try {
    return new TextDecoder(charset).decode(buffer);
  } catch {
    return new TextDecoder("utf-8").decode(buffer);
  }
}

function firstHeader(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

async function fetchPage(start: URL) {
  const deadline = Date.now() + REQUEST_TIMEOUT_MS;
  const startedAt = performance.now();
  let url = start;

  for (let redirects = 0; ; redirects++) {
    const response = await requestOnce(url, deadline);

    if (REDIRECT_CODES.has(response.status)) {
      const location = firstHeader(response.headers.location);
      if (!location) throw new FetchError("upstream_error", 502);
      if (redirects >= MAX_REDIRECTS) throw new FetchError("too_many_redirects", 508);
      let next: URL;
      try {
        next = new URL(location, url);
      } catch {
        throw new FetchError("upstream_error", 502);
      }
      assertAllowedUrl(next);
      url = next;
      continue;
    }

    const contentType = firstHeader(response.headers["content-type"]);
    if (contentType && !/text\/html|application\/xhtml\+xml/i.test(contentType)) {
      throw new FetchError("not_html", 415);
    }
    const contentEncoding = firstHeader(response.headers["content-encoding"]);
    const decoded = decodeBody(response.body, contentEncoding);

    return {
      url: url.toString(),
      status: response.status,
      redirects,
      ttfbMs: Math.round(response.ttfbMs),
      totalMs: Math.round(performance.now() - startedAt),
      transferBytes: response.body.length,
      decodedBytes: decoded.length,
      contentEncoding: contentEncoding || null,
      html: decodeText(decoded, contentType),
    };
  }
}

function errorResponse(error: FetchError, extraHeaders: Record<string, string> = {}) {
  return NextResponse.json(
    { error: error.code, message: MESSAGES[error.code] ?? MESSAGES.upstream_error },
    { status: error.status, headers: { ...NO_STORE, ...extraHeaders } },
  );
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return errorResponse(new FetchError("forbidden", 403));
  if (isRateLimited(clientIp(req))) {
    return errorResponse(new FetchError("rate_limited", 429), { "Retry-After": "60" });
  }
  if (Number(req.headers.get("content-length") ?? "0") > MAX_BODY_BYTES) {
    return errorResponse(new FetchError("bad_request", 413));
  }

  let payload: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) throw new Error("body too large");
    payload = JSON.parse(text);
  } catch {
    return errorResponse(new FetchError("bad_request", 400));
  }

  if (inFlight >= MAX_IN_FLIGHT) {
    return errorResponse(new FetchError("busy", 503), { "Retry-After": "10" });
  }

  inFlight++;
  try {
    const target = parseTargetUrl((payload as { url?: unknown } | null)?.url);
    const result = await fetchPage(target);
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (err) {
    return errorResponse(toFetchError(err));
  } finally {
    inFlight--;
  }
}
