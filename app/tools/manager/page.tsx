"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Database, Plus, Search, Trash2, Copy, Save, Check, Type, Palette, Code as CodeIcon, Server, Shield, XCircle } from "lucide-react";
import Link from "next/link";

// --- IndexedDB Wrapper ---
const DB_NAME = "LabAssetManagerDB";
const DB_VERSION = 1;
const STORE_NAME = "assets";

const ASSET_TYPES = ["prompt", "snippet", "color"] as const;
type AssetType = (typeof ASSET_TYPES)[number];
type FilterType = AssetType | "all";
const FILTERS: readonly FilterType[] = ["all", ...ASSET_TYPES];

const LIMITS = { title: 200, content: 100_000, tags: 20, tagLength: 40 };

interface Asset {
  id?: number;
  type: AssetType;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

// One shared connection instead of opening a new one for every operation.
function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  const promise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        store.createIndex("by_type", "type", { unique: false });
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      // Another tab upgrading the schema: close so it isn't blocked; reopen lazily next time.
      db.onversionchange = () => {
        db.close();
        dbPromise = null;
      };
      resolve(db);
    };
  });

  dbPromise = promise;
  promise.catch(() => {
    dbPromise = null;
  });
  return promise;
}

async function runRequest<T>(mode: IDBTransactionMode, makeRequest: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDB();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const request = makeRequest(tx.objectStore(STORE_NAME));
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = () => reject(tx.error ?? request.error);
    tx.onabort = () => reject(tx.error ?? new Error("IndexedDB transaction aborted"));
  });
}

function isAsset(value: unknown): value is Asset {
  const candidate = value as Partial<Asset> | null;
  return (
    !!candidate &&
    typeof candidate.title === "string" &&
    typeof candidate.content === "string" &&
    typeof candidate.createdAt === "number" &&
    Array.isArray(candidate.tags) &&
    ASSET_TYPES.includes(candidate.type as AssetType)
  );
}

const LOAD_ERROR = "Nem sikerült betölteni a mentett elemeket – az IndexedDB nem elérhető ebben a böngészőben.";

const getAllAssets = async (): Promise<Asset[]> => (await runRequest("readonly", (store) => store.getAll())).filter(isAsset);
const getAssetsNewestFirst = async (): Promise<Asset[]> => (await getAllAssets()).sort((a, b) => b.createdAt - a.createdAt);
const addAsset = (asset: Omit<Asset, "id">) => runRequest("readwrite", (store) => store.add(asset));
const deleteAsset = (id: number) => runRequest("readwrite", (store) => store.delete(id));

function TypeIcon({ type, className }: { type: AssetType; className?: string }) {
  if (type === "prompt") return <Type className={className} aria-hidden="true" />;
  if (type === "color") return <Palette className={className} aria-hidden="true" />;
  return <CodeIcon className={className} aria-hidden="true" />;
}

export default function AssetManager() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newType, setNewType] = useState<AssetType>("prompt");
  const [newTags, setNewTags] = useState("");

  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refresh = useCallback(async () => {
    try {
      setAssets(await getAssetsNewestFirst());
    } catch (err) {
      console.error("Failed to load assets from IndexedDB", err);
      setError(LOAD_ERROR);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    getAssetsNewestFirst()
      .then((data) => {
        if (!cancelled) setAssets(data);
      })
      .catch((err) => {
        console.error("Failed to load assets from IndexedDB", err);
        if (!cancelled) setError(LOAD_ERROR);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const handleAdd = async () => {
    const title = newTitle.trim();
    const content = newContent.trim();
    if (!title || !content) return;

    const tags = [...new Set(newTags.split(",").map((tag) => tag.trim().slice(0, LIMITS.tagLength)).filter(Boolean))].slice(0, LIMITS.tags);

    try {
      await addAsset({ type: newType, title: title.slice(0, LIMITS.title), content: content.slice(0, LIMITS.content), tags, createdAt: Date.now() });
      setIsAdding(false);
      setNewTitle("");
      setNewContent("");
      setNewTags("");
      setError(null);
      await refresh();
    } catch (err) {
      console.error("Failed to add asset", err);
      setError("A mentés nem sikerült (lehet, hogy betelt a böngésző tárhelye).");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Biztosan törlöd ezt az elemet?")) return;
    try {
      await deleteAsset(id);
      await refresh();
    } catch (err) {
      console.error("Failed to delete asset", err);
      setError("A törlés nem sikerült.");
    }
  };

  const copyToClipboard = async (id: number, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
      setError("A vágólapra másolás nem sikerült.");
    }
  };

  const filteredAssets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return assets.filter((asset) => {
      if (filterType !== "all" && asset.type !== filterType) return false;
      if (!query) return true;
      return (
        asset.title.toLowerCase().includes(query) ||
        asset.content.toLowerCase().includes(query) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [assets, filterType, searchQuery]);

  const counts = useMemo(
    () => ({
      prompt: assets.filter((asset) => asset.type === "prompt").length,
      snippet: assets.filter((asset) => asset.type === "snippet").length,
      color: assets.filter((asset) => asset.type === "color").length,
    }),
    [assets],
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-16 px-4">
      <div className="container-custom max-w-6xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00ffff] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#00ffff] mb-4 font-mono text-xs uppercase tracking-[0.3em]">
              <Database className="w-4 h-4" aria-hidden="true" />
              <span>Local Storage Node</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Asset Manager</h1>
            <p className="text-gray-500 text-sm max-w-xl flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff41] flex-shrink-0" aria-hidden="true" />
              Minden adat kizárólag ebben a böngészőben, az IndexedDB-ben tárolódik. Szerverre semmi nem kerül.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAdding((value) => !value)}
            aria-expanded={isAdding}
            className="bg-[#00ffff]/10 hover:bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff]/30 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          >
            {isAdding ? <XCircle className="w-4 h-4" aria-hidden="true" /> : <Plus className="w-4 h-4" aria-hidden="true" />}
            {isAdding ? "Mégse" : "Új Elem"}
          </button>
        </div>

        {error && (
          <div role="alert" className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Add New Form */}
            <AnimatePresence>
              {isAdding && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={(event) => {
                    event.preventDefault();
                    void handleAdd();
                  }}
                  className="bg-[#0a0a0f] border border-[#00ffff]/30 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)]"
                >
                  <div className="space-y-6 p-8">
                    <div className="flex gap-4" role="radiogroup" aria-label="Elem típusa">
                      {ASSET_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          role="radio"
                          aria-checked={newType === type}
                          onClick={() => setNewType(type)}
                          className={`flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${newType === type ? "bg-[#00ffff] text-black font-bold" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                        >
                          <TypeIcon type={type} className="w-4 h-4" />
                          {type}
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      placeholder="Név vagy Cím..."
                      aria-label="Cím"
                      value={newTitle}
                      maxLength={LIMITS.title}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00ffff]/50 focus:outline-none transition-all"
                    />

                    <textarea
                      placeholder="Tartalom (Prompt, Kód, Hex)..."
                      aria-label="Tartalom"
                      value={newContent}
                      maxLength={LIMITS.content}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full h-32 bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-gray-300 font-mono text-sm focus:border-[#00ffff]/50 focus:outline-none transition-all resize-none"
                    />

                    <input
                      type="text"
                      placeholder="Címkék (vesszővel elválasztva)..."
                      aria-label="Címkék"
                      value={newTags}
                      maxLength={LIMITS.tags * (LIMITS.tagLength + 2)}
                      onChange={(e) => setNewTags(e.target.value)}
                      className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00ffff]/50 focus:outline-none transition-all"
                    />

                    <button
                      type="submit"
                      disabled={!newTitle.trim() || !newContent.trim()}
                      className="w-full bg-[#00ffff] hover:bg-[#00cccc] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-black py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" aria-hidden="true" />
                      Mentés a Lokális Adatbázisba
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-[#0a0a0f] p-4 rounded-2xl border border-white/5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Keresés tartalomban vagy címkékben..."
                  aria-label="Keresés"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#050508] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-[#00ffff]/30 focus:outline-none transition-all"
                />
              </div>
              <div className="flex gap-2">
                {FILTERS.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilterType(type)}
                    aria-pressed={filterType === type}
                    aria-label={type === "all" ? "Mind" : type}
                    className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-widest transition-all ${filterType === type ? "bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff]/30" : "bg-[#050508] text-gray-500 border border-white/10 hover:border-white/20"}`}
                  >
                    {type === "all" ? "MIND" : <TypeIcon type={type} className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredAssets.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 border border-dashed border-white/10 rounded-3xl text-center"
                  >
                    <Server className="w-12 h-12 text-gray-700 mx-auto mb-4" aria-hidden="true" />
                    <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Nincs mentett adat</p>
                  </motion.div>
                ) : (
                  filteredAssets.map((asset) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl group hover:border-[#00ffff]/20 transition-all flex flex-col sm:flex-row gap-6"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${asset.type === "prompt" ? "bg-purple-500/10 text-purple-400" : asset.type === "snippet" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>
                            <TypeIcon type={asset.type} className="w-4 h-4" />
                          </div>
                          <h2 className="text-lg font-bold break-words">{asset.title}</h2>
                        </div>

                        <div className="bg-[#050508] p-4 rounded-xl border border-white/5 font-mono text-sm text-gray-400 mb-4 line-clamp-3 break-words whitespace-pre-wrap">
                          {asset.content}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {asset.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-mono text-gray-500 uppercase">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 justify-end sm:border-l sm:border-white/5 sm:pl-6">
                        <button
                          type="button"
                          onClick={() => asset.id !== undefined && copyToClipboard(asset.id, asset.content)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#00ffff]/10 text-gray-400 hover:text-[#00ffff] rounded-lg transition-colors text-xs font-mono"
                        >
                          {copiedId === asset.id ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                          {copiedId === asset.id ? "Másolva" : "Másolás"}
                        </button>
                        <button
                          type="button"
                          onClick={() => asset.id !== undefined && handleDelete(asset.id)}
                          aria-label={`${asset.title} törlése`}
                          className="flex items-center justify-center p-2 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-gradient-to-br from-[#0a0a0f] to-[#050508] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffff]/5 blur-3xl rounded-full" />
                <h2 className="text-sm font-mono text-[#00ffff] uppercase tracking-widest mb-6">Database Stats</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-sm">Összes Elem</span>
                    <span className="text-2xl font-bold">{assets.length}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Type className="w-3 h-3" aria-hidden="true" /> Prompt</span>
                    <span className="font-mono">{counts.prompt}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><CodeIcon className="w-3 h-3" aria-hidden="true" /> Snippet</span>
                    <span className="font-mono">{counts.snippet}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Palette className="w-3 h-3" aria-hidden="true" /> Color</span>
                    <span className="font-mono">{counts.color}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] font-mono text-gray-600 space-y-2">
                  <div className="flex justify-between"><span>DB_NAME</span><span>{DB_NAME}</span></div>
                  <div className="flex justify-between"><span>STORAGE</span><span>IndexedDB</span></div>
                  <div className="flex justify-between"><span>SCOPE</span><span>Csak ez a böngésző</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
