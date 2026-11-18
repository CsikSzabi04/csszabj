"use client";

import { useSyncExternalStore } from "react";

/*
 * Client-side view of the owner session (the cookie itself is httpOnly). One shared store, so any
 * number of components share a single /api/auth/session request. It re-checks on the window
 * "auth:changed" event, which the login form, the files page and signOut() fire after the server
 * has set or cleared the cookie.
 */

let authenticated = false;
let started = false;
let inflight: AbortController | null = null;
const listeners = new Set<() => void>();

function set(next: boolean) {
  if (next === authenticated) return;
  authenticated = next;
  for (const listener of listeners) listener();
}

async function refresh() {
  inflight?.abort();
  const controller = new AbortController();
  inflight = controller;
  try {
    const res = await fetch("/api/auth/session", { cache: "no-store", signal: controller.signal });
    const data = (res.ok ? await res.json() : null) as { authenticated?: unknown } | null;
    set(data?.authenticated === true);
  } catch {
    if (!controller.signal.aborted) set(false);
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) {
    started = true;
    window.addEventListener("auth:changed", () => void refresh());
    void refresh();
  }
  return () => {
    listeners.delete(listener);
  };
}

/** True while the owner is signed in. Always false during server rendering. */
export function useAuthenticated(): boolean {
  return useSyncExternalStore(subscribe, () => authenticated, () => false);
}

/** Clears the session cookie, then lets every listener (header, footer, …) re-check. */
export async function signOut(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // network error: the cookie stays valid, and the re-check below shows that honestly
  }
  window.dispatchEvent(new Event("auth:changed"));
}
