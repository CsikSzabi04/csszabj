"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { blogPosts } from "../data/blogData";

const categories = ["Összes", "Frontend", "Tutorial", "Karrier", "DevOps", "Backend", "Személyes"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Összes");

  const filteredPosts = selectedCategory === "Összes"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section id="blog" className="section relative py-32 overflow-hidden">
      {/* Háttér minta */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20H20v-2.5zM0 20h20v2H0v-2zm0 4h20v2H0v-2zm0 4h20v2H0v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
            Legújabb Írásaim
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Hasznos tippek, trükkök, útmutatók és személyes történetek a webfejlesztés világából.
          </p>
        </motion.div>

        {/* Kategória szűrő */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col"
              >
                {/* Kép + kategória badge */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-blue-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                {/* Tartalom */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} olvasás</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto mb-3">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] text-zinc-500 bg-white/5 px-2 py-1 rounded-full">#{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                    <span>Olvass tovább</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Üzenet, ha nincs találat */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500">Nincs cikk ebben a kategóriában.</p>
          </div>
        )}

        {/* Még több gomb – most már az összes cikk megjelenik a szűrő miatt, de megtartjuk */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => setSelectedCategory("Összes")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white rounded-xl font-semibold border border-white/10 hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
          >
            <span>Minden cikk megtekintése</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}