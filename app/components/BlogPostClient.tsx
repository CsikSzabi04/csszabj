"use client";

import Link from "next/link";
import BlogShare from "./BlogShare";
import ReadingProgress from "./ReadingProgress";
import { useLanguage } from "../contexts/LanguageContext";

export default function BlogPostClient({ post, relatedPosts }: { post: any, relatedPosts: any[] }) {
  const { language } = useLanguage();

  return (
    <>
      <ReadingProgress />

      <article className="min-h-screen pt-40 pb-20">
        <div className="container-custom max-w-4xl mx-auto px-4">
          {/* Vissza gomb */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === "en" ? "Back to blog" : "Vissza a bloghoz"}
          </Link>

          {/* Fejléc */}
          <header className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-sm rounded-full mb-6">
              {language === "en" && post.categoryEn ? post.categoryEn : post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {language === "en" && post.titleEn ? post.titleEn : post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-sm">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} {language === "en" ? "read" : "olvasás"}</span>
              <span>•</span>
              <div className="flex gap-2">
                {post.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="bg-white/5 px-2 py-0.5 rounded-full text-xs">#{tag}</span>
                ))}
              </div>
            </div>
          </header>

          {/* Kiemelt kép */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* TARTALOMJEGYZÉK */}
          <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <details className="group">
              <summary className="cursor-pointer font-semibold text-white flex items-center gap-2">
                📑 {language === "en" ? "Table of Contents" : "Tartalomjegyzék"}
                <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-4 border-l-2 border-blue-500/50">
                <ul className="space-y-1 text-sm text-zinc-300">
                  <li><a href="#bevezetes" className="hover:text-blue-400">{language === "en" ? "Introduction" : "Bevezetés"}</a></li>
                  <li><a href="#react-compiler" className="hover:text-blue-400">React Compiler</a></li>
                  <li><a href="#server-actions" className="hover:text-blue-400">Server Actions</a></li>
                  <li><a href="#use-hook" className="hover:text-blue-400">use() hook</a></li>
                  <li><a href="#osszegzes" className="hover:text-blue-400">{language === "en" ? "Summary" : "Összegzés"}</a></li>
                </ul>
              </div>
            </details>
          </div>

          {/* Tartalom */}
          <div className="prose prose-invert prose-lg max-w-none flow-root">
            <div
              className={`text-zinc-300 leading-loose space-y-6 
              [&>p:first-of-type]:first-letter:text-6xl [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:text-blue-500 [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:leading-none [&>p:first-of-type]:first-letter:mt-3
              [&_h2]:text-white [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-4
              [&_h3]:text-white [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-12 [&_h3]:mb-4
              [&_pre]:bg-[#0d0d0d] [&_pre]:border [&_pre]:border-white/5 [&_pre]:rounded-2xl [&_pre]:p-6 [&_pre]:my-8 [&_pre]:overflow-x-auto
              [&_code]:text-sm [&_code]:text-blue-200 [&_code]:bg-blue-900/20 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md
              [&_ul]:list-none [&_ul]:bg-zinc-900/30 [&_ul]:border [&_ul]:border-white/10 [&_ul]:rounded-2xl [&_ul]:p-6 [&_ul]:my-8 [&_ul]:backdrop-blur-sm
              [&_ul_li]:relative [&_ul_li]:pl-8 [&_ul_li]:py-3 [&_ul_li]:border-b [&_ul_li]:border-white/5 [&_ul_li:last-child]:border-0
              [&_ul_li::before]:content-['✓'] [&_ul_li::before]:absolute [&_ul_li::before]:left-2 [&_ul_li::before]:text-blue-500 [&_ul_li::before]:font-bold
              [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:bg-zinc-900/30 [&_ol]:border [&_ol]:border-white/10 [&_ol]:rounded-2xl [&_ol]:p-6 [&_ol]:my-8 [&_ol]:backdrop-blur-sm
              [&_ol_li]:py-3 [&_ol_li]:border-b [&_ol_li]:border-white/5 [&_ol_li:last-child]:border-0
              [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-zinc-400 [&_blockquote]:bg-blue-900/5 [&_blockquote]:rounded-r-xl`}
              dangerouslySetInnerHTML={{ __html: language === "en" && post.contentEn ? post.contentEn : post.content }}
            />
          </div>

          <BlogShare title={post.title} slug={post.slug} />

          {/* Szerző infó */}
          <div className="mt-12 p-8 bg-[#0d0d0d] rounded-2xl border border-white/5">
            <div className="flex items-start gap-4">
              <img
                src="https://i.imgur.com/M3iJpBH.png"
                alt="Szabolcs Alex"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <div>
                <h4 className="text-white font-semibold mb-1">Szabolcs Alex</h4>
                <p className="text-zinc-500 text-sm mb-3">
                  Full Stack Developer & Tech Enthusiast
                </p>
                <p className="text-zinc-400 text-sm">
                  {language === "en" 
                    ? "Passionate web developer who loves sharing knowledge and experiences about modern web technologies. If you have questions, feel free to reach out!"
                    : "Szenvedélyes webfejlesztő, aki szeret megosztani tudását és tapasztalatait a modern webtechnológiákról. Ha kérdésed van, írj bátran!"}
                </p>
              </div>
            </div>
          </div>

          {/* Kapcsolódó cikkek */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8">📖 {language === "en" ? "Related Articles" : "Kapcsolódó cikkek"}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-[#0d0d0d] rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                        {language === "en" && related.titleEn ? related.titleEn : related.title}
                      </h4>
                      <p className="text-zinc-500 text-sm line-clamp-2">
                        {language === "en" && related.excerptEn ? related.excerptEn : related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
