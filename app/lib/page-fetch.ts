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

const ERROR_TEXT: Record<string, { hu: string; en: string }> = {
  forbidden: { hu: "A kérés nem engedélyezett.", en: "The request is not allowed." },
  rate_limited: { hu: "Túl sok kérés. Próbáld újra egy perc múlva.", en: "Too many requests. Try again in a minute." },
  busy: { hu: "A szolgáltatás most túlterhelt, próbáld újra később.", en: "The service is busy right now, please try again later." },
  bad_request: { hu: "Érvénytelen kérés.", en: "Invalid request." },
  invalid_url: { hu: "Érvénytelen URL. Csak nyilvános http(s) címek adhatók meg.", en: "Invalid URL. Only public http(s) addresses are allowed." },
  blocked_host: { hu: "Ez a cím nem elérhető (belső vagy tiltott hálózat).", en: "This address is not reachable (internal or blocked network)." },
  dns_failed: { hu: "A domain nem található.", en: "The domain could not be found." },
  timeout: { hu: "A céloldal nem válaszolt időben.", en: "The target site did not respond in time." },
  too_large: { hu: "Az oldal túl nagy az elemzéshez.", en: "The page is too large to analyse." },
  too_many_redirects: { hu: "Túl sok átirányítás.", en: "Too many redirects." },
  not_html: { hu: "A cím nem HTML oldalt ad vissza.", en: "The address does not return an HTML page." },
  upstream_error: { hu: "Nem sikerült lekérni az oldalt.", en: "The page could not be fetched." },
  client_timeout: { hu: "A kérés túllépte az időkorlátot.", en: "The request timed out." },
  network: { hu: "Hálózati hiba – ellenőrizd az internetkapcsolatot.", en: "Network error – check your internet connection." },
};

/** Error from fetchPageViaServer; `code` is a key of ERROR_TEXT so the UI can show it in either language. */
export class PageFetchError extends Error {
  code: string;

  constructor(code: string) {
    super(ERROR_TEXT[code]?.hu ?? ERROR_TEXT.upstream_error.hu);
    this.code = code;
  }
}

export function pageFetchErrorText(code: string, en: boolean): string {
  const text = ERROR_TEXT[code] ?? ERROR_TEXT.upstream_error;
  return en ? text.en : text.hu;
}

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
    throw new PageFetchError(timedOut ? "client_timeout" : "network");
  }

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const code = (data as { error?: unknown } | null)?.error;
    throw new PageFetchError(typeof code === "string" ? code : "upstream_error");
  }
  return data as PageFetchResult;
}
