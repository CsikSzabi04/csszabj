"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Language = "hu" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Only the navigation labels go through t(); every other component picks its text with
// `language === "en"` next to the markup it belongs to.
const dictionary: Record<Language, Record<string, string>> = {
  hu: {
    "nav.about": "Rólam",
    "nav.projects": "Projektek",
    "nav.blog": "Blog",
    "nav.tools": "Eszközök",
    "nav.cv": "Önéletrajz",
  },
  en: {
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.tools": "Tools",
    "nav.cv": "CV",
  },
};

const STORAGE_KEY = "language";
const listeners = new Set<() => void>();
// Used only when localStorage is unavailable (private mode / blocked storage).
let memoryLanguage: Language | null = null;

function isLanguage(value: unknown): value is Language {
  return value === "hu" || value === "en";
}

function readLanguage(): Language {
  if (memoryLanguage) return memoryLanguage;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    // storage blocked – fall back to the browser language
  }
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "hu";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep several open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

// The server always renders Hungarian; the stored preference is applied right after hydration.
const getServerLanguage = (): Language => "hu";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const language = useSyncExternalStore(subscribe, readLanguage, getServerLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      memoryLanguage = null;
    } catch {
      memoryLanguage = lang;
    }
    listeners.forEach((listener) => listener());
  }, []);

  const t = useCallback((key: string): string => dictionary[language][key] ?? key, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
