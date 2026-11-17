// Client helpers for the vault UI: API calls, direct uploads and the HU/EN strings.

export class ApiError extends Error {
  code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

/** GET when `body` is a query string ("?p=…"), POST with JSON when it is an object. */
export async function api<T = { ok: true }>(body: string | object): Promise<T> {
  let res: Response;
  try {
    res =
      typeof body === "string"
        ? await fetch(`/api/files${body}`, { cache: "no-store" })
        : await fetch("/api/files", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  } catch {
    throw new ApiError("network");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status === 401 ? "unauthorized" : (data as { error?: string }).error ?? "upstream");
  return data as T;
}

/** PUT a file straight to Supabase through a one-time signed URL, with progress. */
export function xhrPut(
  url: string,
  file: Blob,
  headers: Record<string, string>,
  onProgress: (loaded: number) => void,
  register?: (xhr: XMLHttpRequest) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    register?.(xhr);
    xhr.open("PUT", url);
    for (const [k, v] of Object.entries(headers)) xhr.setRequestHeader(k, v);
    xhr.upload.onprogress = (e) => onProgress(e.loaded);
    xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new ApiError(xhr.status === 413 ? "too_large" : "upstream")));
    xhr.onerror = () => reject(new ApiError("network"));
    xhr.onabort = () => reject(new ApiError("aborted"));
    xhr.send(file);
  });
}

export const fmt = (text: string, vars: Record<string, string | number>) => text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

const hu = {
  site: "Oldal",
  logout: "Kijelentkezés",
  selectAll: "Összes kijelölése",
  refresh: "Frissítés",
  partitions: "Partíciók",
  newPartition: "Új partíció",
  editPartition: "Partíció szerkesztése",
  deletePartition: "Partíció törlése",
  storage: "Tárhely",
  unallocated: "Kiosztható még: {x}",
  search: "Keresés az összes fájlban…",
  upload: "Feltöltés",
  uploadFiles: "Fájlok feltöltése",
  uploadFolder: "Mappa feltöltése",
  newFolder: "Új mappa",
  name: "Név",
  size: "Méret",
  modified: "Módosítva",
  sortName: "Név szerint",
  sortDate: "Dátum szerint",
  sortSize: "Méret szerint",
  list: "Lista",
  grid: "Rács",
  open: "Megnyitás",
  download: "Letöltés",
  rename: "Átnevezés",
  move: "Áthelyezés",
  delete: "Törlés",
  select: "Kijelölés",
  selected: "{n} kijelölve",
  cancel: "Mégse",
  save: "Mentés",
  create: "Létrehozás",
  moveHere: "Áthelyezés ide",
  confirmDelete: "{n} elem véglegesen törlődik (mappák a teljes tartalmukkal). Biztosan?",
  confirmDeletePartition: "A(z) „{name}” partíció és minden benne lévő fájl véglegesen törlődik. Biztosan?",
  empty: "Ez a mappa üres",
  emptyHint: "Húzz ide fájlokat vagy mappákat, vagy használd a Feltöltés gombot.",
  dropHere: "Engedd el a feltöltéshez",
  noResults: "Nincs találat",
  results: "Találatok: „{q}”",
  quota: "Méret (GB)",
  quotaHelp: "Legfeljebb {x} adható (összesen {limit}).",
  color: "Szín",
  edit: "Szerkesztés",
  uploads: "Feltöltések",
  items: "{n} elem",
  appearance: "Megjelenés",
  background: "Háttér",
  uploadImage: "Kép feltöltése",
  accent: "Kiemelőszín",
  glass: "Üveg",
  panel: "Panel fedettség",
  cards: "Szekciók és sorok fedettsége",
  blur: "Háttér elmosás",
  bright: "Háttér fényerő",
  effects: "Effektek",
  cursor: "Kurzorfény",
  cursorHint: "Lágy fény követi a mutatót az üveg alatt.",
  reset: "Alaphelyzet",
  savedNote: "Csak neked és csak itt — a profilodhoz mentve, minden eszközön ugyanaz.",
  close: "Bezárás",
  prev: "Előző",
  next: "Következő",
  openTab: "Megnyitás új lapon",
  noPreview: "Ehhez a fájltípushoz nincs böngészős előnézet.",
  previewFailed: "Az előnézet nem tölthető be ebben a böngészőben. Töltsd le, vagy nyisd meg új lapon.",
  tooBig: "Túl nagy az előnézethez — töltsd le.",
  loading: "Betöltés…",
  menu: "Menü",
  more: "Műveletek",
  back: "Vissza",
  root: "Gyökér",
  setupTitle: "Egyszeri beállítás szükséges",
  setupBody:
    "Nyisd meg ennek az oldalnak a Supabase projektjét → SQL Editor, illeszd be a supabase/vault.sql tartalmát, futtasd, majd frissítsd ezt az oldalt.",
  configTitle: "A Supabase nincs beállítva",
  configBody: "Hiányzik a NEXT_PUBLIC_SUPABASE_URL vagy a SUPABASE_SECRET_KEY környezeti változó.",
  retry: "Újrapróbálás",
  err: {
    forbidden: "Tiltott kérés.",
    bad_request: "Érvénytelen kérés.",
    not_found: "Nem található (lehet, hogy közben törölték).",
    exists: "Már van ilyen nevű elem itt.",
    quota: "Nincs elég hely ebben a partícióban vagy a tárhelyen.",
    too_large: "Túl nagy fájl (legfeljebb {max}).",
    public_bucket: "A tároló nyilvános — állítsd privátra a Supabase-ben.",
    upstream: "Szerverhiba, próbáld újra.",
    network: "Hálózati hiba.",
    aborted: "Megszakítva.",
    setup_required: "Hiányzik az adatbázis-beállítás (supabase/vault.sql).",
    not_configured: "A Supabase nincs beállítva.",
  } as Record<string, string>,
};

const en: typeof hu = {
  site: "Site",
  logout: "Sign out",
  selectAll: "Select all",
  refresh: "Refresh",
  partitions: "Partitions",
  newPartition: "New partition",
  editPartition: "Edit partition",
  deletePartition: "Delete partition",
  storage: "Storage",
  unallocated: "Unallocated: {x}",
  search: "Search all files…",
  upload: "Upload",
  uploadFiles: "Upload files",
  uploadFolder: "Upload folder",
  newFolder: "New folder",
  name: "Name",
  size: "Size",
  modified: "Modified",
  sortName: "By name",
  sortDate: "By date",
  sortSize: "By size",
  list: "List",
  grid: "Grid",
  open: "Open",
  download: "Download",
  rename: "Rename",
  move: "Move",
  delete: "Delete",
  select: "Select",
  selected: "{n} selected",
  cancel: "Cancel",
  save: "Save",
  create: "Create",
  moveHere: "Move here",
  confirmDelete: "{n} item(s) will be deleted permanently (folders with everything inside). Are you sure?",
  confirmDeletePartition: "The “{name}” partition and every file in it will be deleted permanently. Are you sure?",
  empty: "This folder is empty",
  emptyHint: "Drop files or folders here, or use the Upload button.",
  dropHere: "Drop to upload",
  noResults: "No results",
  results: "Results for “{q}”",
  quota: "Size (GB)",
  quotaHelp: "Up to {x} can be assigned ({limit} in total).",
  color: "Color",
  edit: "Edit",
  uploads: "Uploads",
  items: "{n} items",
  appearance: "Appearance",
  background: "Background",
  uploadImage: "Upload image",
  accent: "Accent",
  glass: "Glass",
  panel: "Panel opacity",
  cards: "Sections & rows opacity",
  blur: "Background blur",
  bright: "Background brightness",
  effects: "Effects",
  cursor: "Cursor light",
  cursorHint: "A soft light follows your pointer under the glass.",
  reset: "Reset to default",
  savedNote: "Only for you and only here — saved to your profile, the same on every device.",
  close: "Close",
  prev: "Previous",
  next: "Next",
  openTab: "Open in new tab",
  noPreview: "No in-browser preview for this file type.",
  previewFailed: "The preview couldn't load in this browser. Download it or open it in a new tab.",
  tooBig: "Too large to preview — download it.",
  loading: "Loading…",
  menu: "Menu",
  more: "Actions",
  back: "Back",
  root: "Root",
  setupTitle: "One-time setup needed",
  setupBody: "Open this site's Supabase project → SQL Editor, paste the contents of supabase/vault.sql, run it, then reload this page.",
  configTitle: "Supabase isn't configured",
  configBody: "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY is missing.",
  retry: "Retry",
  err: {
    forbidden: "Forbidden.",
    bad_request: "Invalid request.",
    not_found: "Not found (it may have been deleted meanwhile).",
    exists: "Something with this name is already here.",
    quota: "Not enough space in this partition or in storage.",
    too_large: "File too large (max {max}).",
    public_bucket: "The bucket is public — make it private in Supabase.",
    upstream: "Server error, try again.",
    network: "Network error.",
    aborted: "Cancelled.",
    setup_required: "Database setup is missing (supabase/vault.sql).",
    not_configured: "Supabase isn't configured.",
  },
};

export const STR = { hu, en };
export type Strings = typeof hu;
