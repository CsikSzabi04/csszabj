"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { formatPostDate, formatReadTime, postCategory, type BlogPostSummary } from "../lib/blog";

const ALL = "__all__";

export default function Blog({ posts }: { posts: BlogPostSummary[] }) {
  const { language } = useLanguage();
  const en = language === "en";
  // Keyed by the Hungarian category name, so the selection survives a language switch.
  const [selectedCategory, setSelectedCategory] = useState(ALL);

  const categories = useMemo(() => {
    const firstPostByCategory = new Map<string, BlogPostSummary>();
    for (const post of posts) {
      if (!firstPostByCategory.has(post.category)) firstPostByCategory.set(post.category, post);
    }
    return [...firstPostByCategory.entries()].map(([key, post]) => ({ key, label: postCategory(post, language) }));
  }, [posts, language]);

  const filteredPosts = selectedCategory === ALL ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <section id="blog" className="section relative py-32 overflow-hidden">
      {/* Háttér minta */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20H20v-2.5zM0 20h20v2H0v-2zm0 4h20v2H0v-2zm0 4h20v2H0v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Fejléc */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2.5 bg-blue-900/20 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {en ? "Latest Articles" : "Legújabb Írásaim"}
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {en ? "Useful tips, tricks, guides, and personal stories from the web development world." : "Hasznos tippek, trükkök, útmutatók és személyes történetek a webfejlesztés világából."}
          </p>
        </motion.div>

        {/* Kategória szűrő */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[{ key: ALL, label: en ? "All" : "Összes" }, ...categories].map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setSelectedCategory(category.key)}
              aria-pressed={selectedCategory === category.key}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.key
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => {
            const title = en && post.titleEn ? post.titleEn : post.title;
            return (
              <Link href={`/blog/${post.slug}`} key={post.id} className="block h-full">
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.08 }}
                  viewport={{ once: true }}
                  className="group bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-colors duration-300 h-full flex flex-col"
                >
                  {/* Kép + kategória badge */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-blue-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {postCategory(post, language)}
                    </span>
                  </div>

                  {/* Tartalom */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                      <span>{formatPostDate(post.date, language)}</span>
                      <span aria-hidden="true">•</span>
                      <span>{formatReadTime(post.readTime, language)} {en ? "read" : "olvasás"}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {title}
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                      {en && post.excerptEn ? post.excerptEn : post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] text-zinc-500 bg-white/5 px-2 py-1 rounded-full">#{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                      <span>{en ? "Read more" : "Olvass tovább"}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500">{en ? "No articles in this category." : "Nincs cikk ebben a kategóriában."}</p>
          </div>
        )}

        {selectedCategory !== ALL && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory(ALL)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white rounded-xl font-semibold border border-white/10 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
            >
              <span>{en ? "View all articles" : "Minden cikk megtekintése"}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
