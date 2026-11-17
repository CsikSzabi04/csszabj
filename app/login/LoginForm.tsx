"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, Lock, LogIn } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const MESSAGES: Record<string, { hu: string; en: string }> = {
  invalid_credentials: { hu: "Hibás felhasználónév vagy jelszó.", en: "Wrong username or password." },
  rate_limited: {
    hu: "Túl sok sikertelen próbálkozás. Próbáld újra 15 perc múlva.",
    en: "Too many failed attempts. Try again in 15 minutes.",
  },
  not_configured: { hu: "A bejelentkezés nincs beállítva a szerveren.", en: "Sign-in is not configured on the server." },
  default: { hu: "Nem sikerült bejelentkezni. Próbáld újra.", en: "Sign-in failed. Please try again." },
};

export default function LoginForm({ configured }: { configured: boolean }) {
  const { language } = useLanguage();
  const en = language === "en";
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(configured ? null : "not_configured");

  const message = errorCode ? (MESSAGES[errorCode] ?? MESSAGES.default)[en ? "en" : "hu"] : null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setErrorCode(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        // The header listens for this event and re-checks the session (shows the "Files" link).
        window.dispatchEvent(new Event("auth:changed"));
        router.replace("/files");
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setErrorCode(data?.error ?? "default");
      setPassword("");
    } catch {
      setErrorCode("default");
    }
    setPending(false);
  }

  const inputClass =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-[#9b59b6]/70 focus:bg-white/[0.07]";

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-36 pb-20 px-4">
      <div className="enter-up mx-auto w-full max-w-md">
        <div className="relative rounded-3xl border border-white/5 bg-[#0a0a0f] p-7 sm:p-9 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#9b59b6]/30 bg-[#9b59b6]/10 text-[#9b59b6]">
              <Lock className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{en ? "Sign in" : "Bejelentkezés"}</h1>
              <p className="text-sm text-zinc-500">{en ? "Owner access only." : "Csak a tulajdonos számára."}</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="login-username" className="mb-1.5 block text-sm text-zinc-400">
                {en ? "Username" : "Felhasználónév"}
              </label>
              <input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-sm text-zinc-400">
                {en ? "Password" : "Jelszó"}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  data-hoverable
                  aria-label={showPassword ? (en ? "Hide password" : "Jelszó elrejtése") : en ? "Show password" : "Jelszó megjelenítése"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-zinc-500 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </div>

            <p role="alert" aria-live="polite" className="min-h-5 text-sm text-red-400">
              {message}
            </p>

            <button
              type="submit"
              disabled={pending || !configured || !username || !password}
              data-hoverable
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#9b59b6]/50 bg-[#9b59b6]/20 px-4 py-3 font-medium text-white shadow-[0_0_15px_rgba(155,89,182,0.2)] transition-all hover:bg-[#9b59b6]/30 hover:shadow-[0_0_20px_rgba(155,89,182,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <LogIn className="h-4 w-4" aria-hidden="true" />
              )}
              {en ? "Sign in" : "Bejelentkezés"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
