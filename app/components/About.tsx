"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { BookOpen, Clock, FileText, Handshake, MessagesSquare, Users, type LucideIcon } from "lucide-react";
import { personalInfo, softSkills, languages } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";
import { enterDelay } from "../lib/enter";

// Same palette as the hero's code block: keys purple, strings cyan, keywords blue, comments green.
const C = { key: "#c792ea", str: "#00ffff", kw: "#00a8ff", com: "#5c8a6a", punct: "#71717a" };

const SKILL_ICONS: Record<string, LucideIcon> = {
  FaUsers: Users,
  FaFileAlt: FileText,
  FaComments: MessagesSquare,
  FaClock: Clock,
  FaBook: BookOpen,
  FaHandshake: Handshake,
};
const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];

function EditorWindow({ file, children }: { file: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[.07] bg-[#0b0b0e]">
      <div className="flex items-center gap-3 border-b border-white/[.06] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff2d2d]/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#9b59b6]/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#00ff41]/60" />
        </span>
        <span className="font-mono text-[12px] text-zinc-400">{file}</span>
      </div>
      {children}
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-5 flex items-center gap-2.5 text-xl font-bold">
      <span className="font-mono text-base text-[#9b59b6]" aria-hidden="true">
        ##
      </span>
      {children}
    </h3>
  );
}

export default function About() {
  const { language } = useLanguage();
  const en = language === "en";

  // profile.json — keys stay English (it's "code"), the comment follows the site language.
  const rows: { k: string; v: ReactNode; comment?: string }[] = [
    {
      k: "email",
      v: (
        <a href={`mailto:${personalInfo.email}`} className="underline-offset-4 hover:underline" style={{ color: C.str }}>
          &quot;{personalInfo.email}&quot;
        </a>
      ),
    },
    { k: "location", v: <span style={{ color: C.str }}>&quot;{en ? personalInfo.locationEn : personalInfo.location}&quot;</span> },
    { k: "born", v: <span style={{ color: C.str }}>&quot;{en ? personalInfo.birthdayEn : personalInfo.birthday}&quot;</span> },
  ];

  return (
    <section className="section relative overflow-hidden py-32">
      <div className="container-custom relative z-10">
        <div className="enter-up mb-20 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl">{en ? "Get To Know Me!" : "Ismerj meg!"}</h2>
          <p className="mx-auto max-w-2xl px-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {en ? "A passionate full stack developer who enjoys solving complex problems." : "Szenvedélyes full stack fejlesztő, aki élvezi a komplex problémák megoldását."}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: photo + profile.json */}
          <div className="enter-up space-y-6">
            {/* Same photo, frame size and crop as the hero (narrow 3:5 frame, max 420px). */}
            <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 sm:max-w-[380px] lg:max-w-[420px]">
              <div className="relative aspect-[3/5] w-full">
                <Image src="/images/profile1.png" alt={personalInfo.name} fill sizes="(min-width: 1024px) 420px, 380px" className="object-cover object-[50%_60%]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-xl border border-white/10 bg-[#0d0d0d]/90 px-4 py-2 backdrop-blur-sm">
                <p className="font-mono text-sm text-white">
                  <span style={{ color: C.kw }}>await</span> createFuture()
                </p>
              </div>
            </div>

            <EditorWindow file="profile.json">
              <pre className="overflow-x-auto px-0 py-4 font-mono text-[13px] leading-7 sm:text-[13.5px]" data-lenis-prevent>
                <code className="grid grid-cols-[2.75rem_1fr]">
                  <span className="select-none pr-3 text-right text-zinc-700">1</span>
                  <span style={{ color: C.punct }}>{"{"}</span>
                  {rows.map((r, i) => (
                    <span key={r.k} className="contents">
                      <span className="select-none pr-3 text-right text-zinc-700">{i + 2}</span>
                      <span className="whitespace-pre-wrap break-all pl-4 pr-4">
                        <span style={{ color: C.key }}>&quot;{r.k}&quot;</span>
                        <span style={{ color: C.punct }}>: </span>
                        {r.v}
                        {i < rows.length - 1 && <span style={{ color: C.punct }}>,</span>}
                        {r.comment && <span style={{ color: C.com }}>{`  // ${r.comment}`}</span>}
                      </span>
                    </span>
                  ))}
                  <span className="select-none pr-3 text-right text-zinc-700">{rows.length + 2}</span>
                  <span style={{ color: C.punct }}>{"}"}</span>
                </code>
              </pre>
            </EditorWindow>
          </div>

          {/* Right: README, skills, languages */}
          <div style={enterDelay(0.1)} className="enter-up space-y-10">
            <EditorWindow file="README.md">
              <div className="space-y-4 p-6 leading-relaxed text-zinc-400 sm:p-7">
                <p className="font-mono text-[13px]" style={{ color: C.com }}>
                  {en ? "# Profile summary" : "# Profil összefoglaló"}
                </p>
                <p>
                  {en
                    ? "A passionate full stack developer student who enjoys solving complex problems and applying modern web technologies. Alongside my university studies, I actively build personal projects."
                    : "Szenvedélyes full stack fejlesztő hallgató, aki élvezi a komplex problémák megoldását és a modern webtechnológiák alkalmazását. Az egyetemi tanulmányok mellett aktívan fejlesztem saját projekteket."}
                </p>
                <p>
                  {en ? (
                    <>
                      I&apos;m especially interested in the <span className="text-[#00a8ff]">React and Node.js</span> ecosystem, as well as cloud-based solutions. My goal is to build innovative software.
                    </>
                  ) : (
                    <>
                      Különösen érdekel a <span className="text-[#00a8ff]">React és Node.js</span> ökoszisztéma, valamint a felhőalapú megoldások. Célom, hogy innovatív szoftvereket hozzak létre.
                    </>
                  )}
                </p>
              </div>
            </EditorWindow>

            <div>
              <Heading>{en ? "Personal skills" : "Személyes készségek"}</Heading>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {softSkills.map((skill, i) => {
                  const Icon = SKILL_ICONS[skill.icon] ?? Users;
                  return (
                    <li
                      key={skill.name}
                      style={enterDelay(0.15 + i * 0.04)}
                      className="enter-up group flex items-center gap-3 rounded-xl border border-white/[.06] bg-[#0b0b0e] px-3.5 py-3 transition-colors hover:border-[#9b59b6]/35"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[.06] bg-white/[.03] text-[#c792ea]">
                        <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="text-sm text-zinc-300">{en ? skill.nameEn : skill.name}</span>
                      <span className="ml-auto font-mono text-[11px] text-zinc-700 transition-colors group-hover:text-zinc-500" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <Heading>{en ? "Languages" : "Nyelvismeret"}</Heading>
              <div className="space-y-4">
                {languages.map((lang) => {
                  const level = CEFR.indexOf(lang.level);
                  return (
                    <div key={lang.name} className="rounded-xl border border-white/[.06] bg-[#0b0b0e] p-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold text-white">{en ? lang.nameEn : lang.name}</span>
                        <span className="font-mono text-sm text-[#00a8ff]">{lang.level}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-6 gap-1.5" role="img" aria-label={`${lang.level} (CEFR A1–C2)`}>
                        {CEFR.map((l, i) => (
                          <div key={l}>
                            <div className={`h-1.5 rounded-full ${i <= level ? "bg-[#00a8ff]" : "bg-white/[.07]"}`} />
                            <div className={`mt-1.5 text-center font-mono text-[10.5px] ${i === level ? "text-white" : "text-zinc-600"}`}>{l}</div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-[13px] text-zinc-500">{en ? lang.descriptionEn : lang.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
