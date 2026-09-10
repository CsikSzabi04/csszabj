"use client";

import Image from "next/image";
import Link from "next/link";
import BlogShare from "./BlogShare";
import ReadingProgress from "./ReadingProgress";
import { useLanguage } from "../contexts/LanguageContext";
import { personalInfo } from "../data/portfolio";
import { formatPostDate, formatReadTime, postCategory, type BlogPostSummary, type PreparedArticle } from "../lib/blog";

interface BlogPostClientProps {
  post: BlogPostSummary;
  article: { hu: PreparedArticle; en: PreparedArticle | null };
  relatedPosts: BlogPostSummary[];
}

export default function BlogPostClient({ post, article, relatedPosts }: BlogPostClientProps) {
  const { language } = useLanguage();
  const en = language === "en";
  const content = en && article.en ? article.en : article.hu;
  const title = en && post.titleEn ? post.titleEn : post.title;

  return (
    <>
      <ReadingProgress />

      <article className="min-h-screen pt-40 pb-20">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {en ? "Back to blog" : "Vissza a bloghoz"}
          </Link>

          {/* Fejléc */}
          <header className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-sm rounded-full mb-6">
              {postCategory(post, language)}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-sm">
              <span>{formatPostDate(post.date, language)}</span>
              <span aria-hidden="true">•</span>
              <span>{formatReadTime(post.readTime, language)} {en ? "read" : "olvasás"}</span>
              <span aria-hidden="true">•</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="bg-white/5 px-2 py-0.5 rounded-full text-xs">#{tag}</span>
                ))}
              </div>
            </div>
          </header>

          {/* Kiemelt kép */}
          <div className="relative h-[240px] sm:h-[400px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <Image src={post.image} alt={title} fill preload sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Tartalomjegyzék – generated from the article's own headings */}
          {content.toc.length > 1 && (
            <nav aria-label={en ? "Table of Contents" : "Tartalomjegyzék"} className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <details className="group">
                <summary className="cursor-pointer font-semibold text-white flex items-center gap-2">
                  📑 {en ? "Table of Contents" : "Tartalomjegyzék"}
                  <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 pl-4 border-l-2 border-blue-500/50">
                  <ul className="space-y-1 text-sm text-zinc-300">
                    {content.toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="hover:text-blue-400 transition-colors">{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </nav>
          )}

          {/* Tartalom – trusted, repo-authored HTML prepared on the server */}
          <div className="prose prose-invert prose-lg max-w-none flow-root">
            <div
              className={`text-zinc-300 leading-loose space-y-6
              [&>p:first-of-type]:first-letter:text-6xl [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:text-blue-500 [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:leading-none [&>p:first-of-type]:first-letter:mt-3
              [&_h2]:text-white [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-4 [&_h2]:scroll-mt-28
              [&_h3]:text-white [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-12 [&_h3]:mb-4
              [&_pre]:bg-[#0d0d0d] [&_pre]:border [&_pre]:border-white/5 [&_pre]:rounded-2xl [&_pre]:p-6 [&_pre]:my-8 [&_pre]:overflow-x-auto
              [&_code]:text-sm [&_code]:text-blue-200 [&_code]:bg-blue-900/20 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md
              [&_ul]:list-none [&_ul]:bg-zinc-900/30 [&_ul]:border [&_ul]:border-white/10 [&_ul]:rounded-2xl [&_ul]:p-6 [&_ul]:my-8 [&_ul]:backdrop-blur-sm
              [&_ul_li]:relative [&_ul_li]:pl-8 [&_ul_li]:py-3 [&_ul_li]:border-b [&_ul_li]:border-white/5 [&_ul_li:last-child]:border-0
              [&_ul_li::before]:content-['✓'] [&_ul_li::before]:absolute [&_ul_li::before]:left-2 [&_ul_li::before]:text-blue-500 [&_ul_li::before]:font-bold
              [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:bg-zinc-900/30 [&_ol]:border [&_ol]:border-white/10 [&_ol]:rounded-2xl [&_ol]:p-6 [&_ol]:my-8 [&_ol]:backdrop-blur-sm
              [&_ol_li]:py-3 [&_ol_li]:border-b [&_ol_li]:border-white/5 [&_ol_li:last-child]:border-0
              [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-zinc-400 [&_blockquote]:bg-blue-900/5 [&_blockquote]:rounded-r-xl`}
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
          </div>

          <BlogShare title={title} slug={post.slug} />

          {/* Szerző infó */}
          <div className="mt-12 p-8 bg-[#0d0d0d] rounded-2xl border border-white/5">
            <div className="flex items-start gap-4">
              <Image
                src={personalInfo.avatar}
                alt="Szabolcs Alex"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/30 flex-shrink-0"
              />
              <div>
                <h4 className="text-white font-semibold mb-1">Szabolcs Alex</h4>
                <p className="text-zinc-500 text-sm mb-3">Full Stack Developer & Tech Enthusiast</p>
                <p className="text-zinc-400 text-sm">
                  {en
                    ? "Passionate web developer who loves sharing knowledge and experiences about modern web technologies. If you have questions, feel free to reach out!"
                    : "Szenvedélyes webfejlesztő, aki szeret megosztani tudását és tapasztalatait a modern webtechnológiákról. Ha kérdésed van, írj bátran!"}
                </p>
              </div>
            </div>
          </div>

          {/* Kapcsolódó cikkek */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8">📖 {en ? "Related Articles" : "Kapcsolódó cikkek"}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => {
                  const relatedTitle = en && related.titleEn ? related.titleEn : related.title;
                  return (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group bg-[#0d0d0d] rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={related.image}
                          alt={relatedTitle}
                          fill
                          sizes="(min-width: 768px) 448px, 100vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">{relatedTitle}</h4>
                        <p className="text-zinc-500 text-sm line-clamp-2">{en && related.excerptEn ? related.excerptEn : related.excerpt}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
