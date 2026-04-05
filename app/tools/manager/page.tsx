"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Database, Plus, Search, Trash2, Copy, Save, Check, Type, Palette, Code as CodeIcon, Server, Shield, XCircle } from "lucide-react";
import Link from "next/link";

// --- IndexedDB Wrapper ---
const DB_NAME = "LabAssetManagerDB";
const DB_VERSION = 1;
const STORE_NAME = "assets";

interface Asset {
  id?: number;
  type: "prompt" | "snippet" | "color";
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
}

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        store.createIndex("by_type", "type", { unique: false });
      }
    };
  });
};

const getAllAssets = async (): Promise<Asset[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const addAsset = async (asset: Omit<Asset, "id">): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(asset);
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

const deleteAsset = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};


export default function AssetManager() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filterType, setFilterType] = useState<Asset["type"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newType, setNewType] = useState<Asset["type"]>("prompt");
  const [newTags, setNewTags] = useState("");
  
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const data = await getAllAssets();
      setAssets(data.sort((a, b) => b.createdAt - a.createdAt));
    } catch (e) {
      console.error("Failed to load assets from IndexedDB", e);
    }
  };

  const handleAdd = async () => {
    if (!newTitle || !newContent) return;
    
    const tags = newTags.split(",").map(t => t.trim()).filter(t => t);
    
    try {
      await addAsset({
        type: newType,
        title: newTitle,
        content: newContent,
        tags,
        createdAt: Date.now()
      });
      setIsAdding(false);
      setNewTitle("");
      setNewContent("");
      setNewTags("");
      loadAssets();
    } catch (e) {
      console.error("Failed to add asset", e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAsset(id);
      loadAssets();
    } catch (e) {
      console.error("Failed to delete asset", e);
    }
  };

  const copyToClipboard = async (id: number, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const filteredAssets = assets.filter(a => {
    if (filterType !== "all" && a.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || 
             a.content.toLowerCase().includes(q) || 
             a.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  const TypeIcon = ({ type, className }: { type: Asset["type"], className?: string }) => {
    if (type === "prompt") return <Type className={className} />;
    if (type === "color") return <Palette className={className} />;
    return <CodeIcon className={className} />;
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-0 px-4">
      <div className="container-custom max-w-6xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00ffff] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#00ffff] mb-4 font-mono text-xs uppercase tracking-[0.3em]">
              <Database className="w-4 h-4" />
              <span>Local Storage Node</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Asset Manager</h1>
            <p className="text-gray-500 text-sm max-w-xl flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00ff41]" />
              Minden adat titkosítva, lokálisan tárolva az IndexedDB-ben. Szerver kapcsolat nincs.
            </p>
          </div>
          
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-[#00ffff]/10 hover:bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff]/30 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          >
            {isAdding ? <XCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isAdding ? "Mégse" : "Új Elem"}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Add New Form */}
            <AnimatePresence>
              {isAdding && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#0a0a0f] border border-[#00ffff]/30 p-8 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)]"
                >
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      {["prompt", "snippet", "color"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setNewType(type as Asset["type"])}
                          className={`flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${newType === type ? 'bg-[#00ffff] text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                          <TypeIcon type={type as Asset["type"]} className="w-4 h-4" />
                          {type}
                        </button>
                      ))}
                    </div>
                    
                    <div>
                      <input 
                        type="text" 
                        placeholder="Név vagy Cím..."
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00ffff]/50 focus:outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <textarea 
                        placeholder="Tartalom (Prompt, Kód, Hex)..."
                        value={newContent}
                        onChange={e => setNewContent(e.target.value)}
                        className="w-full h-32 bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-gray-300 font-mono text-sm focus:border-[#00ffff]/50 focus:outline-none transition-all resize-none"
                      />
                    </div>
                    
                    <div>
                      <input 
                        type="text" 
                        placeholder="Címkék (vesszővel elválasztva)..."
                        value={newTags}
                        onChange={e => setNewTags(e.target.value)}
                        className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00ffff]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <button 
                      onClick={handleAdd}
                      disabled={!newTitle || !newContent}
                      className="w-full bg-[#00ffff] hover:bg-[#00cccc] disabled:bg-gray-800 text-black py-4 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Mentés a Lokális Adatbázisba
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-[#0a0a0f] p-4 rounded-2xl border border-white/5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Keresés tartalomban vagy címkékben..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#050508] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-[#00ffff]/30 focus:outline-none transition-all"
                />
              </div>
              <div className="flex gap-2">
                {["all", "prompt", "snippet", "color"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-widest transition-all ${filterType === type ? 'bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff]/30' : 'bg-[#050508] text-gray-500 border border-white/10 hover:border-white/20'}`}
                  >
                    {type === "all" ? "MIND" : <TypeIcon type={type as any} className="w-4 h-4" />}
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
                     <Server className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                     <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Nincs mentett adat</p>
                   </motion.div>
                ) : (
                  filteredAssets.map(asset => (
                    <motion.div 
                      key={asset.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl group hover:border-[#00ffff]/20 transition-all flex flex-col sm:flex-row gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${asset.type === 'prompt' ? 'bg-purple-500/10 text-purple-400' : asset.type === 'snippet' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'}`}>
                            <TypeIcon type={asset.type} className="w-4 h-4" />
                          </div>
                          <h3 className="text-lg font-bold">{asset.title}</h3>
                        </div>
                        
                        <div className="bg-[#050508] p-4 rounded-xl border border-white/5 font-mono text-sm text-gray-400 mb-4 line-clamp-3">
                          {asset.content}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {asset.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-mono text-gray-500 uppercase">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 justify-end sm:border-l sm:border-white/5 sm:pl-6">
                        <button 
                          onClick={() => copyToClipboard(asset.id!, asset.content)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#00ffff]/10 text-gray-400 hover:text-[#00ffff] rounded-lg transition-colors text-xs font-mono"
                        >
                          {copiedId === asset.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedId === asset.id ? "Másolva" : "Másolás"}
                        </button>
                        <button 
                          onClick={() => handleDelete(asset.id!)}
                          className="flex items-center justify-center p-2 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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
                <h3 className="text-sm font-mono text-[#00ffff] uppercase tracking-widest mb-6">Database Stats</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-sm">Összes Elem</span>
                    <span className="text-2xl font-bold">{assets.length}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Type className="w-3 h-3" /> Prompt</span>
                    <span className="font-mono">{assets.filter(a => a.type === 'prompt').length}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><CodeIcon className="w-3 h-3" /> Snippet</span>
                    <span className="font-mono">{assets.filter(a => a.type === 'snippet').length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Palette className="w-3 h-3" /> Color</span>
                    <span className="font-mono">{assets.filter(a => a.type === 'color').length}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] font-mono text-gray-600 space-y-2">
                  <div className="flex justify-between"><span>DB_NAME</span><span>LabAssetManagerDB</span></div>
                  <div className="flex justify-between"><span>STORAGE</span><span>IndexedDB</span></div>
                  <div className="flex justify-between"><span>ENCRYPTION</span><span>Local Only</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
