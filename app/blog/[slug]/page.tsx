import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "../../data/blogData";
import BlogShare from "../../components/BlogShare";
import ReadingProgress from "../../components/ReadingProgress";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog - Nem található" };
  return {
    title: `${post.title} | Szabolcs Alex Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
    return null; // unreachable but satisfies TS
  }

  // Kapcsolódó cikkek: ugyanaz a kategória, de nem ez a poszt
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

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
            Vissza a bloghoz
          </Link>

          {/* Fejléc */}
          <header className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-sm rounded-full mb-6">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-sm">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} olvasás</span>
              <span>•</span>
              <div className="flex gap-2">
                {post.tags.slice(0, 3).map(tag => (
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

          {/* TARTALOMJEGYZÉK (ha van h2 a tartalomban) – kliens oldali JS, de itt már komponensként betesszük */}
          <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <details className="group">
              <summary className="cursor-pointer font-semibold text-white flex items-center gap-2">
                📑 Tartalomjegyzék
                <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-4 border-l-2 border-blue-500/50">
                <ul className="space-y-1 text-sm text-zinc-300">
                  {/* Ezt a listát a tartalom alapján dinamikusan generálhatnánk, de most csak statikus példa */}
                  <li><a href="#bevezetes" className="hover:text-blue-400">Bevezetés</a></li>
                  <li><a href="#react-compiler" className="hover:text-blue-400">React Compiler</a></li>
                  <li><a href="#server-actions" className="hover:text-blue-400">Server Actions</a></li>
                  <li><a href="#use-hook" className="hover:text-blue-400">use() hook</a></li>
                  <li><a href="#osszegzes" className="hover:text-blue-400">Összegzés</a></li>
                </ul>
              </div>
            </details>
          </div>

          {/* Tartalom */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-zinc-300 leading-relaxed space-y-6 [&_h2]:text-white [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_pre]:bg-black/50 [&_pre]:rounded-xl [&_code]:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
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
                  Szenvedélyes webfejlesztő, aki szeret megosztani tudását és tapasztalatait a modern webtechnológiákról. Ha kérdésed van, írj bátran!
                </p>
              </div>
            </div>
          </div>

          {/* Kapcsolódó cikkek */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8">📖 Kapcsolódó cikkek</h3>
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
                        {related.title}
                      </h4>
                      <p className="text-zinc-500 text-sm line-clamp-2">
                        {related.excerpt}
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