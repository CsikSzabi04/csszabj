"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { experience, education } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";
import { enterDelay } from "../lib/enter";

/*
 * "git log --graph": work and education are two branches. With --all they sit side by side
 * (short page, no long scroll); filtering shows one branch. Each entry is a commit with a stable
 * short hash; current ones carry HEAD. Colours follow the hero's code block.
 */

type Kind = "work" | "edu";
type Filter = "all" | Kind;
type Commit = {
  key: string;
  kind: Kind;
  start: string;
  current: boolean;
  date: string;
  title: string;
  org: string;
  location: string;
  lines: string[];
  hash: string;
};

const LANES: Record<Kind, { color: string; branch: string }> = {
  work: { color: "#00a8ff", branch: "work" },
  edu: { color: "#34d399", branch: "education" },
};
const NODE_Y = 28; // px from the top of a row to the commit dot (aligned with the card's first line)
const LANE_X = 9;

function shortHash(text: string) {
  let h = 2166136261;
  for (const ch of text) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

function Branch({ kind, title, commits, delay }: { kind: Kind; title: string; commits: Commit[]; delay: number }) {
  const { color, branch } = LANES[kind];
  return (
    <div style={{ "--lane": color } as CSSProperties}>
      <div style={enterDelay(delay)} className="enter-up mb-5 flex items-baseline justify-between gap-3">
        <h3 className="text-2xl font-bold">{title}</h3>
        <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-zinc-500">
          <span className="h-2 w-2 rounded-full" style={{ background: color }} aria-hidden="true" />
          {branch} · {commits.length} commits
        </span>
      </div>

      <ol>
        {commits.map((c, i) => {
          const first = i === 0;
          const last = i === commits.length - 1;
          return (
            <li key={c.key} style={enterDelay(delay + 0.05 + i * 0.05)} className="enter-up relative flex gap-3 pb-4 sm:gap-4">
              {/* graph gutter: one lane, line between the commit dots */}
              <div className="relative w-[18px] shrink-0" aria-hidden="true">
                {commits.length > 1 && (
                  <span
                    className="absolute w-[2px] rounded-full"
                    style={{
                      left: LANE_X - 1,
                      top: first ? NODE_Y : 0,
                      bottom: last ? undefined : 0,
                      height: last ? NODE_Y : undefined,
                      background: `${color}66`,
                    }}
                  />
                )}
                <span
                  className="absolute h-3 w-3 rounded-full border-2"
                  style={{ left: LANE_X - 6, top: NODE_Y - 6, borderColor: color, background: c.current ? color : "#050508" }}
                />
              </div>

              <article className="vx-commit min-w-0 flex-1 rounded-2xl border border-white/[.06] bg-[#0b0b0e] p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11.5px]">
                  <span className="text-[#e5c07b]">commit {c.hash}</span>
                  {c.current ? (
                    <span className="rounded-md border px-1.5 py-0.5" style={{ color, borderColor: `${color}55` }}>
                      HEAD → {branch}
                    </span>
                  ) : null}
                  <span className="ml-auto text-zinc-400">{c.date}</span>
                </div>
                <h4 className="mt-2.5 text-[17px] font-bold leading-snug">{c.title}</h4>
                <p className="text-[14.5px] font-medium" style={{ color }}>
                  {c.org}
                </p>
                {c.location && <p className="text-[13px] text-zinc-500">{c.location}</p>}
                <ul className="mt-3 space-y-1">
                  {c.lines.map((line) => (
                    <li key={line} className="flex gap-2 text-[13.5px] leading-relaxed text-zinc-400">
                      <span className="shrink-0 font-mono" style={{ color }} aria-hidden="true">
                        +
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Experience() {
  const { language } = useLanguage();
  const en = language === "en";
  const [filter, setFilter] = useState<Filter>("all");

  const { work, edu } = useMemo(() => {
    const byNewest = (a: Commit, b: Commit) => b.start.localeCompare(a.start);
    const workList: Commit[] = experience
      .map((e) => ({
        key: `w${e.id}`,
        kind: "work" as const,
        start: e.start,
        current: e.current,
        date: en ? e.dateEn : e.date,
        title: en ? e.titleEn : e.title,
        org: (en && "companyEn" in e ? e.companyEn : undefined) ?? e.company,
        location: e.location,
        lines: en ? e.descriptionEn : e.description,
        hash: shortHash(e.titleEn),
      }))
      .sort(byNewest);
    const eduList: Commit[] = education
      .map((e) => ({
        key: `e${e.id}`,
        kind: "edu" as const,
        start: e.start,
        current: /present/i.test(e.dateEn),
        date: en ? e.dateEn : e.date,
        title: en ? e.titleEn : e.title,
        org: en ? e.schoolEn : e.school,
        location: e.location,
        lines: en ? e.descriptionEn : e.description,
        hash: shortHash(e.titleEn),
      }))
      .sort(byNewest);
    return { work: workList, edu: eduList };
  }, [en]);

  const filters: { id: Filter; label: string; color?: string }[] = [
    { id: "all", label: "--all" },
    { id: "work", label: "work", color: LANES.work.color },
    { id: "edu", label: "education", color: LANES.edu.color },
  ];
  const workTitle = en ? "Professional experience" : "Szakmai tapasztalat";
  const eduTitle = en ? "Education" : "Tanulmányok";

  return (
    <section id="experience" className="section relative">
      <div className="container-custom">
        <div className="enter-up mb-12 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl">{en ? "My Journey So Far" : "Eddigi utam"}</h2>
          <p className="mx-auto max-w-2xl px-4 text-base leading-relaxed text-zinc-500 sm:text-lg">
            {en
              ? "Work and studies — two branches of the same story."
              : "Munka és tanulmányok — ugyanannak a történetnek két ága."}
          </p>
        </div>

        {/* Same width for every filter, so switching branches never makes the layout jump. */}
        <div className="mx-auto max-w-6xl">
          {/* terminal bar + branch filter */}
          <div style={enterDelay(0.05)} className="enter-up mb-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[.07] bg-[#0b0b0e] px-4 py-3 font-mono text-[13px]">
            <span className="text-zinc-400">
              <span className="text-[#00ff41]">$</span> git log --graph {filter === "all" ? "--all" : LANES[filter].branch}
            </span>
            <div role="group" aria-label={en ? "Branch" : "Ág"} className="flex gap-1.5">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 transition-colors ${
                    filter === f.id ? "border-white/20 bg-white/[.08] text-white" : "border-white/[.06] text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  {f.color && <span className="h-2 w-2 rounded-full" style={{ background: f.color }} aria-hidden="true" />}
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className={filter === "all" ? "grid gap-10 lg:grid-cols-2 lg:gap-8" : ""}>
            {filter !== "edu" && <Branch kind="work" title={workTitle} commits={work} delay={0.08} />}
            {filter !== "work" && <Branch kind="edu" title={eduTitle} commits={edu} delay={filter === "all" ? 0.12 : 0.08} />}
          </div>
        </div>
      </div>
      <style>{`#experience .vx-commit{transition:border-color .3s}#experience .vx-commit:hover{border-color:color-mix(in srgb,var(--lane) 35%,transparent)}`}</style>
    </section>
  );
}
