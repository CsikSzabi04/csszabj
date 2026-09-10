export interface PageFetchResult {
  url: string;
  status: number;
  redirects: number;
  ttfbMs: number;
  totalMs: number;
  transferBytes: number;
  decodedBytes: number;
  contentEncoding: string | null;
  html: string;
}

const CLIENT_TIMEOUT_MS = 20_000;

/** Fetches a public page's HTML through our hardened same-origin API (see app/api/page-fetch). */
export async function fetchPageViaServer(url: string): Promise<PageFetchResult> {
  let response: Response;
  try {
    response = await fetch("/api/page-fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      cache: "no-store",
      signal: AbortSignal.timeout(CLIENT_TIMEOUT_MS),
    });
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "TimeoutError";
    throw new Error(timedOut ? "A kérés túllépte az időkorlátot." : "Hálózati hiba – ellenőrizd az internetkapcsolatot.");
  }

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = (data as { message?: unknown } | null)?.message;
    throw new Error(typeof message === "string" ? message : "Nem sikerült lekérni az oldalt.");
  }
  return data as PageFetchResult;
}
