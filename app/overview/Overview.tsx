"use client";

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Shuffle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { projects } from "../data/portfolio";
import { TIKTOK_PROFILE, TIKTOK_VIDEOS, WATTPAD_PROFILE, WATTPAD_STORIES, YOUTUBE_VIDEOS } from "../data/media";
import { enterDelay } from "../lib/enter";
import styles from "./overview.module.css";

type Video = (typeof YOUTUBE_VIDEOS)[number];
type TikTok = (typeof TIKTOK_VIDEOS)[number];
type Story = (typeof WATTPAD_STORIES)[number];

const RING1_COUNT = 4; // YouTube thumbnails
const RING2_YT = 1; // + one more YouTube video, three TikToks and every Wattpad story on the outer ring
const TIKTOK_COUNT = 3;

const PHRASES = [
  `scanning ${projects.length} projects…`,
  "git log --oneline | wc -l",
  "npm run build ✓",
  "ping wattpad.com",
  "await nextIdea()",
  "while (alive) learn();",
  "deploy --prod 🚀",
  "sudo make coffee ☕",
];

function shuffled<T>(list: readonly T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface Picks {
  yt: Video[];
  tiktok: TikTok[];
}

const FIRST_PICKS: Picks = {
  yt: YOUTUBE_VIDEOS.slice(0, RING1_COUNT + RING2_YT),
  tiktok: TIKTOK_VIDEOS.slice(0, TIKTOK_COUNT),
};

const randomPicks = (): Picks => ({
  yt: shuffled(YOUTUBE_VIDEOS).slice(0, RING1_COUNT + RING2_YT),
  tiktok: shuffled(TIKTOK_VIDEOS).slice(0, TIKTOK_COUNT),
});

function projectHost(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    return host === "github.com" ? `${host}${u.pathname.replace(/\/$/, "")}` : host;
  } catch {
    return url;
  }
}

function platformOf(url: string): string {
  const host = projectHost(url);
  if (host.endsWith("vercel.app")) return "vercel";
  if (host.endsWith("netlify.app")) return "netlify";
  if (host.startsWith("github.com")) return "github";
  return "domain";
}

/** Types the phrases out, pauses, deletes them, then moves on to the next one. */
function useTypewriter(phrases: string[], reduced: boolean): string {
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    let pos = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const phrase = phrases[index % phrases.length];
      if (reduced) {
        setText(phrase);
        index++;
        timer = window.setTimeout(tick, 3000);
        return;
      }
      if (!deleting) {
        pos++;
        setText(phrase.slice(0, pos));
        if (pos >= phrase.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1700);
          return;
        }
        timer = window.setTimeout(tick, 50 + Math.random() * 45);
      } else {
        pos--;
        setText(phrase.slice(0, pos));
        if (pos <= 0) {
          deleting = false;
          index++;
          timer = window.setTimeout(tick, 380);
          return;
        }
        timer = window.setTimeout(tick, 22);
      }
    };

    timer = window.setTimeout(tick, 700);
    return () => window.clearTimeout(timer);
  }, [phrases, reduced]);

  return text;
}

// ---------- Small brand glyphs (lucide has no brand icons) ----------

function TikTokGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
      />
    </svg>
  );
}

function PlayBadge() {
  return (
    <span className="absolute bottom-1 right-1 flex h-4 w-6 items-center justify-center rounded-[5px] bg-[#ff0033] shadow sm:h-5 sm:w-7" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3">
        <path fill="currentColor" d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

// ---------- Orbit items ----------

const orbitLink = "block outline-none transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-[#22d3ee]/70";

function YouTubeItem({ video }: { video: Video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      data-hoverable
      title={video.title}
      aria-label={`YouTube: ${video.title}`}
      className={`${orbitLink} ${styles.yt} relative aspect-video overflow-hidden rounded-lg border border-white/15 bg-black shadow-[0_8px_24px_rgba(0,0,0,0.55)]`}
    >
      <Image src={video.thumbnail} alt="" fill sizes="150px" className="object-cover" />
      <PlayBadge />
    </a>
  );
}

function TikTokItem({ label }: { label: string }) {
  return (
    <a
      href={TIKTOK_PROFILE}
      target="_blank"
      rel="noopener noreferrer"
      data-hoverable
      title={label}
      aria-label={`TikTok: ${label}`}
      className={`${orbitLink} flex items-center gap-2 rounded-full border border-white/15 bg-black/90 p-2 pr-2 shadow-[0_8px_24px_rgba(0,0,0,0.55)] sm:pr-3.5`}
    >
      <span className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center sm:h-7 sm:w-7">
        <TikTokGlyph className="absolute h-4 w-4 translate-x-[1.5px] translate-y-[1px] text-[#fe2c55] sm:h-5 sm:w-5" />
        <TikTokGlyph className="absolute h-4 w-4 -translate-x-[1px] text-[#25f4ee] sm:h-5 sm:w-5" />
        <TikTokGlyph className="relative h-4 w-4 text-white sm:h-5 sm:w-5" />
      </span>
      <span className={`${styles.tiktokText} truncate text-[11px] font-medium leading-tight text-zinc-200`}>{label}</span>
    </a>
  );
}

function WattpadItem({ story }: { story: Story }) {
  return (
    <a
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      data-hoverable
      title={story.title}
      aria-label={`Wattpad: ${story.title}`}
      className={`${orbitLink} ${styles.wattpad} relative aspect-[2/3] overflow-hidden rounded-md border border-[#ff6122]/60 bg-black shadow-[0_8px_24px_rgba(0,0,0,0.55)]`}
    >
      <Image src={story.cover} alt="" fill sizes="74px" className="object-cover" />
      <span className="absolute -right-0 top-0 flex h-4 w-4 items-center justify-center rounded-bl-md bg-[#ff6122] text-[9px] font-black text-white sm:h-5 sm:w-5 sm:text-[11px]">
        W
      </span>
    </a>
  );
}

function Slot({ angle, children }: { angle: number; children: ReactNode }) {
  return (
    <div className={styles.slot} style={{ "--a": `${angle}deg` } as CSSProperties}>
      <div className={styles.upright}>{children}</div>
    </div>
  );
}

// ---------- Page ----------

export default function Overview() {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion() ?? false;
  const typed = useTypewriter(PHRASES, reduced);
  const [picks, setPicks] = useState<Picks>(FIRST_PICKS);
  const [ready, setReady] = useState(false);

  // Random items are picked after mount, so the server HTML and the first client render match.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPicks(randomPicks());
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const reroll = useCallback(() => setPicks(randomPicks()), []);

  const tiktokLabel = (video: TikTok) => (en ? video.en : video.hu);
  const ring1 = picks.yt.slice(0, RING1_COUNT).map((video) => <YouTubeItem key={video.id} video={video} />);
  const tiktoks = picks.tiktok.map((video) => <TikTokItem key={video.en} label={tiktokLabel(video)} />);
  const stories = WATTPAD_STORIES.map((story) => <WattpadItem key={story.url} story={story} />);
  const extraYt = picks.yt.slice(RING1_COUNT).map((video) => <YouTubeItem key={video.id} video={video} />);
  // Interleaved (TikTok, Wattpad, TikTok, YouTube, TikTok, Wattpad) so the same kinds don't bunch up.
  const ring2Order: ReactNode[] = [tiktoks[0], stories[0], tiktoks[1], extraYt[0], tiktoks[2], stories[1]].filter(Boolean);

  return (
    // Transparent on purpose: the site-wide star field (body::after in globals.css) shows through.
    <div className="relative min-h-screen overflow-hidden px-4 pb-20 pt-32 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[22rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#9b59b6]/10 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Title + audit line */}
        <div className="enter-up mx-auto mb-4 max-w-3xl text-center">
          <p className="mb-3 font-mono text-xs tracking-[0.25em] text-[#9b59b6]">~/overview</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">{en ? "Overview" : "Áttekintés"}</h1>
          <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-xl border border-white/10 bg-[#0a0a0f]/80 px-4 py-2 font-mono text-xs text-zinc-400 backdrop-blur-sm">
            <span>
              <span className="text-[#22d3ee]">$</span> audit --all
            </span>
            <span className="text-emerald-400">✓</span>
            <span>
              {projects.length} {en ? "projects" : "projekt"} · {YOUTUBE_VIDEOS.length} YouTube · {TIKTOK_VIDEOS.length} TikTok · {WATTPAD_STORIES.length} Wattpad
            </span>
            <button
              type="button"
              onClick={reroll}
              data-hoverable
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#9b59b6]/40 bg-[#9b59b6]/15 px-2.5 py-1 text-[11px] text-zinc-200 transition-colors hover:bg-[#9b59b6]/30"
            >
              <Shuffle className="h-3 w-3" aria-hidden="true" /> random
            </button>
          </div>
        </div>

        {/* Orbit stage */}
        <section
          aria-label={en ? "My videos and stories" : "Videóim és történeteim"}
          className={`${styles.stage} ${ready ? styles.ready : ""} enter-scale`}
          style={enterDelay(0.1)}
        >
          <div className={`${styles.track} ${styles.track1}`} aria-hidden="true" />
          <div className={`${styles.track} ${styles.track2}`} aria-hidden="true" />

          <div className={`${styles.ring} ${styles.ring1}`}>
            {ring1.map((item, i) => (
              <Slot key={i} angle={45 + (i * 360) / ring1.length}>
                {item}
              </Slot>
            ))}
          </div>
          <div className={`${styles.ring} ${styles.ring2}`}>
            {ring2Order.map((item, i) => (
              <Slot key={i} angle={-90 + (i * 360) / ring2Order.length}>
                {item}
              </Slot>
            ))}
          </div>

          <div className={styles.core}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.halo} aria-hidden="true" />
            <div className={styles.avatar}>
              <Image
                src="/snapmoji.png"
                alt={en ? "Csík Szabolcs Alex as a snapmoji" : "Csík Szabolcs Alex snapmojija"}
                fill
                priority
                sizes="190px"
                className="scale-[1.18] object-cover"
                style={{ objectPosition: "86% 30%", transformOrigin: "58% 38%" }}
              />
              <div className={styles.scan} aria-hidden="true" />
            </div>

            {/* Thought bubble: "thinking" in commands */}
            <div className={styles.thought} aria-hidden="true">
              <span className={`${styles.puff} ${styles.puff1}`} />
              <span className={`${styles.puff} ${styles.puff2}`} />
              <div className="rounded-2xl border border-[#9b59b6]/45 bg-[#0d0d14]/95 px-3 py-2 font-mono text-[10px] text-zinc-200 shadow-[0_0_24px_rgba(155,89,182,0.25)] sm:px-4 sm:text-xs">
                <span className="text-[#9b59b6]">❯ </span>
                {typed}
                <span className={styles.caret} />
              </div>
            </div>

            <div className="absolute left-1/2 top-[calc(100%+14px)] -translate-x-1/2 whitespace-nowrap text-center">
              <p className="font-mono text-[10px] text-emerald-400 sm:text-[11px]">
                ● {en ? "thinking" : "gondolkodik"}
                <span className={styles.dots}>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Legend */}
        <div className="enter-up mb-16 flex flex-wrap items-center justify-center gap-3 text-xs" style={enterDelay(0.2)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-[#ff0033]" aria-hidden="true" /> YouTube
          </span>
          <a
            href={TIKTOK_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            data-hoverable
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-300 transition-colors hover:border-[#25f4ee]/50 hover:text-white"
          >
            <TikTokGlyph className="h-3 w-3 text-[#25f4ee]" /> @supreme_scaler <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={WATTPAD_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            data-hoverable
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-300 transition-colors hover:border-[#ff6122]/50 hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-[#ff6122]" aria-hidden="true" /> Wattpad <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>

        {/* Every project, one click away */}
        <section aria-labelledby="overview-projects" className="enter-up mx-auto max-w-6xl" style={enterDelay(0.25)}>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f]/90 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <h2 id="overview-projects" className="font-mono text-xs text-zinc-400">
                ~/projects <span className="text-zinc-600">—</span> ls <span className="text-zinc-600">({projects.length})</span>
              </h2>
            </div>

            <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
              {projects.map((project, i) => {
                // "Dead by Daylight Community & Builds - DBD Hub" -> "DBD Hub": the shorter half is the name.
                const name = project.title.split(" - ").reduce((a, b) => (b.length < a.length ? b : a));
                return (
                  <li key={project.id}>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hoverable
                      className="group block overflow-hidden rounded-2xl border border-white/5 bg-[#0d0d14] outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#9b59b6]/45 hover:shadow-[0_12px_32px_rgba(155,89,182,0.18)] focus-visible:ring-2 focus-visible:ring-[#9b59b6]/70"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                        <Image
                          src={project.image}
                          alt={name}
                          fill
                          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                          style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                        />
                        <span className="absolute left-2.5 top-2.5 rounded-md bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300 backdrop-blur-sm">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-zinc-100">{name}</p>
                          <p className="truncate font-mono text-[11px] text-zinc-500">{projectHost(project.live)}</p>
                        </div>
                        <span className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                          {platformOf(project.live)}
                        </span>
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-zinc-500 transition-colors group-hover:text-[#9b59b6]" aria-hidden="true" />
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
