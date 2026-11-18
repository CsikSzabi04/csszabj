"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import { enterDelay } from "../lib/enter";

/*
 * "Beyond the code": an evidence board (pinned "case files" tied together with red string)
 * and a CRT TV with a shelf of VHS tapes for the old video edits.
 * Pin positions are measured from the DOM, so the strings follow any layout (desktop grid or phone stack).
 */

const WATTPAD_PROFILE = "https://www.wattpad.com/user/thejasonronin04";
const WATTPAD_STORY = "https://www.wattpad.com/story/386494029-the-consultant";
const TIKTOK = "https://www.tiktok.com/@supreme_scaler";
const VHARAZ = "https://vharazcomic.vercel.app/";
const DEBATER = "https://debaterweb.vercel.app/";

const TAPES = [
  { id: "mOXJ7O2TK7g", title: "Supernatural — Final Countdown", fav: true },
  { id: "CbtfkFj8w2w", title: "Multimale — Judas × Bad Romance mashup" },
  { id: "GBHMeo6_RRU", title: "Dead by Daylight" },
  { id: "ZNSGBp76rMc", title: "Elijah Mikaelson sings a song" },
  { id: "91gcmcC8Iu4", title: "Elijah Mikaelson — Rasputin" },
  { id: "0cuWso6pfyw", title: "Coraline Song" },
  { id: "eQm0Q2lxw00", title: "Peaky Blinders — Polozhenie" },
];

const TOPICS = [
  { en: "Top 15 best horror characters", hu: "Top 15 legjobb horrorkarakter" },
  { en: "Top 15 smartest characters — everyone included", hu: "Top 15 legokosabb karakter — mindenki benne van" },
  { en: "Top 17 strongest characters of all time", hu: "Minden idők 17 legerősebb karaktere" },
  { en: "Top 17 best shows (my opinion)", hu: "Top 17 legjobb sorozat (szerintem)" },
  { en: "Liked The Mentalist? Watch these", hu: "Tetszett a Mentalista? Ezeket nézd" },
  { en: "Debate: the most skilled characters", hu: "Vita: a legképzettebb karakterek" },
];

const WATTPAD_TAGS = ["mystery", "psychologicaldrama", "maskedkiller", "mindpalace", "serialkiller"];

const HAND = '"Segoe Print","Bradley Hand","Marker Felt","Comic Sans MS",cursive';
const TYPE = '"Courier New",Courier,ui-monospace,monospace';

const svgUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
const CORK = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .62 0 0 0 0 .45 0 0 0 0 .3 0 0 0 .5 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
);
const STATIC = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>",
);

const T = {
  hu: {
    title: "Kódon túl",
    dev: "fejlesztő",
    insert: "+ író · képregényes · vágó · listagyártó",
    intro:
      "Nappal kódot írok, éjjel történeteket: pszichológiai krimit, dark fantasy képregényt, rangsorokat mindenről, ami fikció — és valaha videókat is vágtam. Ez a fal az, ami a kódon túl van.",
    boardTitle: "A nyomozófal",
    boardSub: "Minden akta egy szenvedély. A piros fonal köti össze őket.",
    file: "Akta",
    writing: "Írás",
    ongoing: "folyamatban",
    consultantMeta: "Pszichológiai krimi · Wattpad · 9 rész",
    consultantBlurb:
      "Egy városban, ahol semmi sem az, aminek látszik, Lucian, az angoltanár két hátborzongató gyilkossági ügybe keveredik, amelyek már így is törékeny elméjét fenyegetik. Az első: zárt szobás gyilkosság, dulakodás nyoma nélkül…",
    consultantNote: "zárt szoba, semmi nyom… ki volt az?",
    read: "Olvasd a Wattpadon",
    comic: "Webképregény",
    vharaz: "Eredeti dark fantasy webképregény, saját fejlesztésű, könyvszerű lapozós olvasóval.",
    readComic: "Lapozz bele",
    blacklistSub: "rangsorok, vélemények és kutatós listák",
    declassify: "Feloldás",
    classify: "Titkosítás",
    hint: "vidd fölé az egeret, vagy nyomd meg: Feloldás",
    followers: "követő",
    likes: "kedvelés",
    topViews: "legnézettebb",
    likesValue: "53,6 E",
    topValue: "657 E",
    openTikTok: "Megnézem a TikTokon",
    platform: "Vitaplatform",
    debater: "A rangsorok vitát szülnek — a Debater pont erre való: saját fejlesztésű online vitaplatform.",
    openDebater: "Vitázz a Debateren",
    stickyTitle: "7 régi szalag 📼",
    stickyBody: "Nagyon régi, nagyon kezdő vágások. Lent a tévében ↓",
    labels: ["történetek", "fikció", "vita", "szalagok"],
    tapesKicker: "Archívum",
    tapesTitle: "Régi szalagok",
    tapesBody: "Nagyon-nagyon régi, nagyon-nagyon kezdő videóvágások. Nem nyilvánosak — csak itt teszem ki őket. Légy kíméletes. 🙂",
    play: "Lejátszás",
    fav: "KEDVENC",
    inTv: "a lejátszóban",
  },
  en: {
    title: "Beyond the code",
    dev: "developer",
    insert: "+ writer · comic maker · video editor · list maker",
    intro:
      "By day I write code, by night stories: a psychological crime thriller, a dark fantasy webcomic, rankings of everything in fiction — and once upon a time I edited videos, too. This wall is everything beyond the code.",
    boardTitle: "The evidence board",
    boardSub: "Every case file is a passion. The red string ties them together.",
    file: "Case file",
    writing: "Writing",
    ongoing: "ongoing",
    consultantMeta: "Psychological thriller · Wattpad · 9 parts",
    consultantBlurb:
      "In a city where nothing is as it seems, an English teacher, Lucian, is drawn into two chilling murder cases that threaten to unravel his already fragile mind. The first: a locked-room killing with no signs of struggle…",
    consultantNote: "locked room, no struggle… who did it?",
    read: "Read it on Wattpad",
    comic: "Webcomic",
    vharaz: "An original dark fantasy webcomic with its own book-like, page-flipping reader that I built.",
    readComic: "Flip through it",
    blacklistSub: "rankings, opinions and research lists",
    declassify: "Declassify",
    classify: "Classify",
    hint: "hover over it, or press Declassify",
    followers: "followers",
    likes: "likes",
    topViews: "top video",
    likesValue: "53.6K",
    topValue: "657K",
    openTikTok: "Watch on TikTok",
    platform: "Debate platform",
    debater: "Rankings start arguments — Debater is made for exactly that: my own online debate platform.",
    openDebater: "Argue on Debater",
    stickyTitle: "7 old tapes 📼",
    stickyBody: "Very old, very beginner edits. Down in the TV ↓",
    labels: ["stories", "fiction", "debate", "tapes"],
    tapesKicker: "Archive",
    tapesTitle: "Old tapes",
    tapesBody: "Very, very old and very, very beginner video edits. They're unlisted — this is the only place I show them. Be gentle. 🙂",
    play: "Play",
    fav: "FAVOURITE",
    inTv: "in the player",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

function Pinned({ n, rotate, className = "", children }: { n: number; rotate: number; className?: string; children: ReactNode }) {
  return (
    <div className={`cr-pinned relative ${className}`} style={{ "--rot": `${rotate}deg`, "--i": n } as CSSProperties}>
      <span data-pin={n} aria-hidden="true" className="cr-pin" />
      <div className="cr-card">{children}</div>
    </div>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Creative() {
  const { language } = useLanguage();
  const t = T[language];
  const boardRef = useRef<HTMLDivElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [layout, setLayout] = useState<{ pins: { x: number; y: number }[]; cards: { l: number; t: number; r: number; b: number }[] }>({ pins: [], cards: [] });
  const pins = layout.pins;
  const [reveal, setReveal] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [switching, setSwitching] = useState(false);

  // Measure the pins (after layout, resizes and the drop-in animations) to draw the strings.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const measure = () => {
      const b = board.getBoundingClientRect();
      const points = Array.from(board.querySelectorAll<HTMLElement>("[data-pin]"))
        .sort((a, z) => Number(a.dataset.pin) - Number(z.dataset.pin))
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top };
        });
      const cards = Array.from(board.querySelectorAll<HTMLElement>(".cr-card")).map((el) => {
        const r = el.getBoundingClientRect();
        return { l: r.left - b.left, t: r.top - b.top, r: r.right - b.left, b: r.bottom - b.top };
      });
      setLayout({ pins: points, cards });
    };
    const frame = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(board);
    board.addEventListener("animationend", measure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      board.removeEventListener("animationend", measure);
    };
  }, []);

  useEffect(() => () => {
    if (switchTimer.current) clearTimeout(switchTimer.current);
  }, []);

  // Inserting a tape only loads it: the TV shows that tape's title screen (thumbnail + ▶) and the
  // visitor starts playback themselves with the play button.
  const insertTape = (i: number) => {
    if (window.matchMedia("(max-width: 1023px)").matches) tvRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (i === active) return;
    setActive(i);
    setPlaying(false);
    setSwitching(true);
    if (switchTimer.current) clearTimeout(switchTimer.current);
    switchTimer.current = setTimeout(() => setSwitching(false), 420);
  };

  const strings = pins.slice(1).map((p, i) => {
    const a = pins[i];
    const sag = Math.min(90, Math.hypot(p.x - a.x, p.y - a.y) * 0.18);
    const cx = (a.x + p.x) / 2;
    const cy = (a.y + p.y) / 2 + sag;
    // The tag goes on the first point of the string (from the middle outwards) that no card covers.
    const at = (k: number) => ({
      x: (1 - k) ** 2 * a.x + 2 * (1 - k) * k * cx + k * k * p.x,
      y: (1 - k) ** 2 * a.y + 2 * (1 - k) * k * cy + k * k * p.y,
    });
    const free = (q: { x: number; y: number }) => !layout.cards.some((c) => q.x > c.l - 40 && q.x < c.r + 40 && q.y > c.t - 16 && q.y < c.b + 16);
    const mid = [0.5, 0.6, 0.4, 0.7, 0.3, 0.8, 0.2, 0.9].map(at).find(free) ?? null;
    return { d: `M${a.x} ${a.y} Q${cx} ${cy} ${p.x} ${p.y}`, mid };
  });

  const tape = TAPES[active];
  const btn = "cr-btn";

  return (
    // Transparent on purpose: the site-wide star field (body::after) shows through.
    <div className="relative min-h-screen overflow-hidden px-4 pb-28 pt-32 text-white">
      <style>{CSS}</style>

      {/* ---------- HERO ---------- */}
      <header className="enter-up relative mx-auto max-w-4xl text-center">
        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">{t.title}</h1>
        <div className="relative mt-16 inline-block font-mono text-2xl text-zinc-300 md:text-4xl">
          <span>
            &lt;<span className="text-[#c084fc]">{t.dev}</span>
            <span className="relative inline-block w-[.7em]">
              <span className="cr-caret">‸</span>
            </span>
            /&gt;
          </span>
          <span className="cr-insert" style={{ fontFamily: HAND }}>
            {t.insert}
          </span>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">{t.intro}</p>
      </header>

      {/* ---------- EVIDENCE BOARD ---------- */}
      <section className="relative mx-auto mt-24 max-w-6xl" aria-labelledby="board-title">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 id="board-title" className="text-3xl font-bold md:text-4xl">
            {t.boardTitle}
          </h2>
          <p className="mt-2 text-zinc-400">{t.boardSub}</p>
        </div>

        <div ref={boardRef} className="cr-board" style={{ backgroundImage: `radial-gradient(120% 70% at 50% 0%, rgba(255,255,255,.06), transparent 60%), ${CORK}, linear-gradient(160deg, #2b1e15, #1a120c)` }}>
          {/* The strings run under the cards (readable on phones too); the tags float above them on desktop. */}
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" aria-hidden="true">
            {strings.map((s, i) => (
              <path key={i} d={s.d} pathLength={1} className="cr-string" style={{ animationDelay: `${1 + i * 0.3}s` }} />
            ))}
          </svg>
          {strings.map((s, i) =>
            s.mid ? (
              <span key={i} className="cr-label hidden lg:block" aria-hidden="true" style={{ left: s.mid.x, top: s.mid.y, fontFamily: HAND, animationDelay: `${1.6 + i * 0.3}s` }}>
                {t.labels[i]}
              </span>
            ) : null,
          )}

          <div className="relative z-[1] grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-20">
            {/* #01 — writing */}
            <Pinned n={1} rotate={-1.8} className="lg:col-span-6">
              <article className="cr-paper rounded-[3px] p-5 sm:p-7" style={{ fontFamily: TYPE }}>
                <div className="flex items-start justify-between gap-3 text-[11px] uppercase tracking-[.2em] text-[#6b5b45]">
                  <span>
                    {t.file} #01 — {t.writing}
                  </span>
                  <span className="cr-stamp">{t.ongoing}</span>
                </div>
                <div className="mt-5 flex flex-col gap-5 sm:flex-row">
                  <a href={WATTPAD_STORY} {...ext} className="cr-polaroid w-[150px] shrink-0 -rotate-3 self-center sm:self-start" aria-label="The Consultant – Wattpad">
                    <Image src="/creative/the-consultant.jpg" alt="The Consultant" width={126} height={197} className="h-auto w-full" />
                  </a>
                  <div className="min-w-0">
                    {/* Inline colour: the unlayered `h1–h6 { color }` rule in globals.css beats Tailwind's layered utilities. */}
                    <h3 className="text-[26px] font-bold leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#1d160f" }}>
                      The Consultant
                    </h3>
                    <p className="mt-1 text-[12px] text-[#6b5b45]">{t.consultantMeta}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#2b2118]">{t.consultantBlurb}</p>
                    <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[11.5px] text-[#7a5b2e]">
                      {WATTPAD_TAGS.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a href={WATTPAD_STORY} {...ext} className={`${btn} cr-btn-ink`}>
                        {t.read} ↗
                      </a>
                      <a href={WATTPAD_PROFILE} {...ext} className={`${btn} cr-btn-line`}>
                        @thejasonronin04
                      </a>
                    </div>
                  </div>
                </div>
                <p className="mt-5 -rotate-2 text-[17px] text-[#b3261e]" style={{ fontFamily: HAND }}>
                  {t.consultantNote}
                </p>
              </article>
            </Pinned>

            {/* #02 — webcomic */}
            <Pinned n={2} rotate={2.2} className="lg:col-span-5 lg:col-start-8 lg:mt-24">
              <a href={VHARAZ} {...ext} className="cr-polaroid group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image src="/vharaz.png" alt="Alexander × Vharaz" fill sizes="(min-width: 1024px) 440px, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="px-1 pt-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[21px] text-[#1b1b1b]" style={{ fontFamily: HAND }}>
                      Alexander × Vharaz
                    </span>
                    <span className="text-[10px] uppercase tracking-[.2em] text-[#888]" style={{ fontFamily: TYPE }}>
                      #02 · {t.comic}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-[#444]">{t.vharaz}</p>
                  <span className="mt-2 inline-block text-[13px] font-semibold text-[#7c3aed]">{t.readComic} ↗</span>
                </div>
              </a>
            </Pinned>

            {/* #03 — TikTok BlackList */}
            <Pinned n={3} rotate={1.2} className="lg:col-span-6 lg:-mt-4">
              <article className="cr-folder p-5 pt-7 sm:p-7 sm:pt-8" data-reveal={reveal} style={{ fontFamily: TYPE }}>
                <span className="cr-tab">BLACKLIST</span>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[.2em] text-[#5b4320]">{t.file} #03 — TikTok</div>
                    <h3 className="mt-1 text-[26px] font-black tracking-tight" style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#1d1408" }}>
                      BlackList <span className="text-[13px] font-semibold text-[#5b4320]">@supreme_scaler</span>
                    </h3>
                    <p className="text-[12.5px] text-[#4a3618]">Ranking All of Fiction 🔥 — {t.blacklistSub}</p>
                  </div>
                  <span className="cr-stamp cr-stamp-tilt shrink-0">TOP SECRET</span>
                </div>
                <ol className="mt-5 space-y-2">
                  {TOPICS.map((x, i) => (
                    <li key={x.en} className="flex gap-3 text-[13px] text-[#1d1408]">
                      <span className="text-[#7a5b2e]">{pad(i + 1)}</span>
                      <span className="cr-redact" style={{ transitionDelay: `${i * 70}ms` }}>
                        {x[language]}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => setReveal((v) => !v)} aria-pressed={reveal} className={`${btn} cr-btn-line`}>
                    {reveal ? t.classify : t.declassify}
                  </button>
                  <span className="text-[14px] text-[#7a1f16]" style={{ fontFamily: HAND }}>
                    {t.hint}
                  </span>
                </div>
                <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-dashed border-[#8a6a35]/50 pt-4 text-center">
                  {[
                    ["332", t.followers],
                    [t.likesValue, t.likes],
                    [t.topValue, t.topViews],
                  ].map(([v, k]) => (
                    <div key={k}>
                      <dt className="sr-only">{k}</dt>
                      <dd className="text-[20px] font-black text-[#1d1408]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        {v}
                      </dd>
                      <dd className="text-[10.5px] uppercase tracking-[.15em] text-[#5b4320]">{k}</dd>
                    </div>
                  ))}
                </dl>
                <a href={TIKTOK} {...ext} className={`${btn} cr-btn-ink mt-5`}>
                  {t.openTikTok} ↗
                </a>
              </article>
            </Pinned>

            {/* #04 — Debater */}
            <Pinned n={4} rotate={-2.4} className="lg:col-span-5 lg:col-start-8 lg:mt-16">
              <a href={DEBATER} {...ext} className="cr-polaroid group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image src="/debaterweb.png" alt="Debater" fill sizes="(min-width: 1024px) 440px, 90vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="px-1 pt-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[21px] text-[#1b1b1b]" style={{ fontFamily: HAND }}>
                      Debater
                    </span>
                    <span className="text-[10px] uppercase tracking-[.2em] text-[#888]" style={{ fontFamily: TYPE }}>
                      #04 · {t.platform}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-[#444]">{t.debater}</p>
                  <span className="mt-2 inline-block text-[13px] font-semibold text-[#7c3aed]">{t.openDebater} ↗</span>
                </div>
              </a>
            </Pinned>

            {/* #05 — sticky note to the tapes */}
            <Pinned n={5} rotate={3.5} className="w-full max-w-[290px] justify-self-center lg:col-span-4 lg:col-start-5 lg:-mt-6">
              <a href="#tapes" className="cr-sticky block p-5 text-[#3b3208]" style={{ fontFamily: HAND }}>
                <span className="block text-[22px] leading-snug">{t.stickyTitle}</span>
                <span className="mt-1 block text-[15px] leading-snug">{t.stickyBody}</span>
              </a>
            </Pinned>
          </div>
        </div>
      </section>

      {/* ---------- OLD TAPES ---------- */}
      <section id="tapes" className="relative mx-auto mt-32 max-w-6xl scroll-mt-28" aria-labelledby="tapes-title">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[.3em] text-[#c9a5e6]">{t.tapesKicker}</span>
          <h2 id="tapes-title" className="mt-2 text-3xl font-bold md:text-4xl">
            {t.tapesTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">{t.tapesBody}</p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div ref={tvRef} style={enterDelay(0.1)} className="enter-up">
            <div className="cr-tv">
              <div className="cr-screen relative aspect-video overflow-hidden">
                {playing && !switching ? (
                  <iframe
                    key={tape.id}
                    src={`https://www.youtube-nocookie.com/embed/${tape.id}?autoplay=1&rel=0&playsinline=1`}
                    title={tape.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`${t.play}: ${tape.title}`}>
                    <Image src={`/creative/yt-${tape.id}.jpg`} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover opacity-75 transition-opacity group-hover:opacity-100" />
                    <span className="cr-noise absolute inset-0 opacity-20" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="cr-play">▶</span>
                    </span>
                  </button>
                )}
                {switching && <span className="cr-noise absolute inset-0 opacity-95" />}
                <span className="cr-scan pointer-events-none absolute inset-0" />
                <span className="cr-osd pointer-events-none absolute left-4 top-3">CH {pad(active + 1)}</span>
                <span className="cr-osd pointer-events-none absolute right-4 top-3">{playing ? "▶ PLAY" : "■ STOP"}</span>
              </div>
              <div className="mt-3 flex items-center justify-between px-2">
                <span className="text-[10px] font-semibold tracking-[.4em] text-zinc-500">CSSZ · VISION</span>
                <div className="flex items-center gap-3">
                  <span className={`cr-led ${playing ? "on" : ""}`} />
                  <span className="cr-knob" />
                  <span className="cr-knob" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-[17px] text-[#d8c7ff]" style={{ fontFamily: HAND }}>
              📼 {tape.title} — {t.inTv}
            </p>
          </div>

          <ul className="space-y-2.5" aria-label={t.tapesTitle}>
            {TAPES.map((x, i) => (
              <li key={x.id} style={enterDelay(0.15 + i * 0.05)} className="enter-up">
                <button type="button" onClick={() => insertTape(i)} aria-pressed={i === active} className={`cr-tape ${i === active ? "is-in" : ""} ${i === active && playing ? "is-playing" : ""}`}>
                  <span className="cr-tape-label">
                    <span className="shrink-0 font-mono text-[10px] text-zinc-500">#{pad(i + 1)}</span>
                    <span className="min-w-0 flex-1 truncate text-[15px] text-[#1b1b1b]" style={{ fontFamily: HAND }}>
                      {x.title}
                    </span>
                    {x.fav && <span className="cr-fav">★ {t.fav}</span>}
                  </span>
                  <span className="cr-reels" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

const CSS = `
.cr-board{position:relative;isolation:isolate;border-radius:22px;padding:64px 20px 56px;background-color:#1d140e;
  box-shadow:inset 0 0 0 10px #3a281b,inset 0 0 0 12px #120c08,inset 0 0 80px rgba(0,0,0,.85),0 40px 90px rgba(0,0,0,.6)}
@media (min-width:640px){.cr-board{padding:72px 40px 64px}}
.cr-pinned{animation:cr-drop .75s cubic-bezier(.2,.9,.3,1.15) both;animation-delay:calc(var(--i) * 140ms + 250ms)}
.cr-card{position:relative;transform:rotate(var(--rot));transform-origin:50% 0;transition:transform .45s cubic-bezier(.2,.8,.2,1),filter .45s;filter:drop-shadow(0 18px 22px rgba(0,0,0,.55)) drop-shadow(0 2px 3px rgba(0,0,0,.5))}
.cr-pinned:hover .cr-card,.cr-pinned:focus-within .cr-card{transform:rotate(0deg) translateY(-6px);filter:drop-shadow(0 30px 34px rgba(0,0,0,.6)) drop-shadow(0 2px 3px rgba(0,0,0,.5))}
.cr-pin{position:absolute;left:50%;top:-10px;z-index:3;width:20px;height:20px;margin-left:-10px;border-radius:50%;
  background:radial-gradient(circle at 34% 30%,#ffb3ab 0,#e53935 38%,#8e1b16 100%);box-shadow:0 5px 6px rgba(0,0,0,.6),inset 0 -2px 3px rgba(0,0,0,.35)}
@keyframes cr-drop{from{opacity:0;transform:translateY(-22px) scale(1.05)}to{opacity:1;transform:none}}
.cr-string{fill:none;stroke:#d63a2f;stroke-width:2.3;stroke-linecap:round;filter:drop-shadow(0 3px 2px rgba(0,0,0,.55));stroke-dasharray:1;stroke-dashoffset:1;animation:cr-draw 1.2s ease-in-out forwards}
@keyframes cr-draw{to{stroke-dashoffset:0}}
.cr-label{position:absolute;z-index:2;pointer-events:none;transform:translate(-50%,-50%) rotate(-5deg);background:#f4f1e8;color:#8e1b16;font-size:14px;padding:1px 9px;border-radius:2px;
  box-shadow:0 4px 8px rgba(0,0,0,.45);white-space:nowrap;opacity:0;animation:cr-fade .5s ease forwards}
@keyframes cr-fade{to{opacity:1}}
.cr-paper{background:repeating-linear-gradient(transparent 0 27px,rgba(90,70,40,.09) 27px 28px),linear-gradient(180deg,#f3ead6,#e9dec5);color:#2b2118}
.cr-polaroid{background:#f5f3ee;padding:12px 12px 16px;border-radius:2px;color:#222}
.cr-folder{position:relative;background:linear-gradient(180deg,#e6c98f,#d3ad6e);border-radius:4px 10px 6px 6px}
.cr-tab{position:absolute;left:20px;top:-19px;height:20px;padding:0 14px;border-radius:8px 8px 0 0;background:#dcbf84;font:700 10px/20px ui-monospace,monospace;letter-spacing:.22em;color:#5b4320}
.cr-sticky{background:linear-gradient(180deg,#fdec85,#f2d649);border-radius:2px}
.cr-stamp{display:inline-block;border:2px solid #b3261e;color:#b3261e;padding:2px 8px;font:700 10px/1.4 ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase;transform:rotate(-6deg);opacity:.85;border-radius:3px}
.cr-stamp-tilt{transform:rotate(9deg);font-size:11px;padding:4px 10px}
.cr-redact{background:#161211;color:transparent;border-radius:2px;padding:0 5px;transition:background-color .45s,color .45s;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.cr-folder:hover .cr-redact,.cr-folder[data-reveal="true"] .cr-redact{background:transparent;color:#1d1408}
.cr-btn{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:8px 15px;font:600 12.5px/1.2 var(--font-inter),Inter,system-ui,sans-serif;transition:transform .2s,background-color .2s}
.cr-btn:hover{transform:translateY(-1px)}
.cr-btn-ink{background:#1d160f;color:#f3ead6}.cr-btn-ink:hover{background:#000}
.cr-btn-line{border:1.5px solid rgba(29,22,15,.55);color:#1d160f}.cr-btn-line:hover{background:rgba(29,22,15,.08)}
.cr-caret{position:absolute;left:50%;bottom:-.55em;transform:translateX(-50%);color:#e53935;font-family:${HAND};font-size:1.1em;opacity:0;animation:cr-fade .3s ease .9s forwards}
.cr-insert{position:absolute;left:50%;bottom:100%;margin-bottom:.15em;transform:translateX(-50%) rotate(-4deg);white-space:nowrap;color:#ef5350;font-size:.55em;
  clip-path:inset(0 100% 0 0);animation:cr-write 1.4s steps(28) 1.1s forwards}
@keyframes cr-write{to{clip-path:inset(0 0 0 0)}}
@media (max-width:480px){.cr-insert{font-size:.5em}}
.cr-tv{background:linear-gradient(160deg,#2e2e33,#131315);border-radius:30px;padding:18px 18px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -6px 14px rgba(0,0,0,.5),0 34px 80px rgba(0,0,0,.65)}
.cr-screen{border-radius:22px/28px;background:#000;box-shadow:inset 0 0 0 3px #0a0a0a,0 0 0 1px rgba(255,255,255,.05)}
.cr-scan{background:repeating-linear-gradient(0deg,rgba(0,0,0,.16) 0 1px,transparent 1px 3px),radial-gradient(ellipse at center,transparent 58%,rgba(0,0,0,.6) 100%);border-radius:inherit}
.cr-osd{font:700 13px/1 ui-monospace,monospace;letter-spacing:.12em;color:#8dffaa;text-shadow:0 0 6px rgba(141,255,170,.85)}
.cr-noise{background-image:${STATIC};background-size:180px;animation:cr-noise .22s steps(4) infinite}
@keyframes cr-noise{0%{background-position:0 0}25%{background-position:-45px 30px}50%{background-position:35px -55px}75%{background-position:-60px -25px}100%{background-position:0 0}}
.cr-play{display:flex;width:76px;height:76px;align-items:center;justify-content:center;border-radius:50%;padding-left:5px;background:rgba(0,0,0,.55);border:2px solid rgba(255,255,255,.85);color:#fff;font-size:28px;backdrop-filter:blur(4px);transition:transform .25s}
button:hover .cr-play{transform:scale(1.08)}
.cr-led{width:8px;height:8px;border-radius:50%;background:#3d1212}.cr-led.on{background:#ff3b30;box-shadow:0 0 10px #ff3b30}
.cr-knob{width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#5a5a5f,#18181a);box-shadow:0 2px 4px rgba(0,0,0,.6)}
.cr-tape{display:flex;width:100%;align-items:center;gap:12px;padding:9px 12px;border-radius:7px;text-align:left;background:linear-gradient(180deg,#1f1f23,#0d0d0f);
  border:1px solid rgba(255,255,255,.06);box-shadow:0 6px 14px rgba(0,0,0,.5);transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s}
.cr-tape:hover{transform:translateX(6px)}
.cr-tape.is-in{transform:translateX(16px);box-shadow:0 0 0 1px rgba(192,132,252,.55),0 10px 26px rgba(155,89,182,.3)}
.cr-tape-label{display:flex;min-width:0;flex:1;align-items:center;gap:8px;border-radius:3px;padding:6px 10px;background:repeating-linear-gradient(#fbfaf5 0 15px,#e7e3d6 15px 16px)}
.cr-fav{flex-shrink:0;border-radius:3px;background:#f2b84b;color:#2a1a00;font:700 9.5px/1.4 ui-monospace,monospace;padding:1px 5px;letter-spacing:.08em}
.cr-reels{display:flex;gap:6px}
.cr-reels i{display:block;width:18px;height:18px;border-radius:50%;background:radial-gradient(circle,#0a0a0a 28%,#2c2c31 30%,#2c2c31 58%,#101012 60%);box-shadow:inset 0 0 0 2px #34343a}
.cr-tape.is-playing .cr-reels i{animation:cr-spin 1.4s linear infinite;background:conic-gradient(#0a0a0a 0 25%,#2c2c31 0 50%,#0a0a0a 0 75%,#2c2c31 0)}
@keyframes cr-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){
  .cr-pinned,.cr-label,.cr-caret,.cr-insert,.cr-noise,.cr-tape.is-playing .cr-reels i{animation:none!important}
  .cr-string{animation:none!important;stroke-dashoffset:0}
  .cr-label,.cr-caret{opacity:1}.cr-insert{clip-path:none}
}`;
