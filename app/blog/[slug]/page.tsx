import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "../../data/blogData";

// Static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return { title: "Blog - Nem található" };
  }
  
  return {
    title: `${post.title} | Szabolcs Alex Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="min-h-screen pt-40 pb-20">
      <div className="container-custom max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/#blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vissza a bloghoz
        </Link>
        
        {/* Header */}
        <header className="mb-12">
          <span className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-sm rounded-full mb-6">
            {post.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-zinc-500">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime} olvasás</span>
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div 
            className="text-zinc-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        
        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1.5 bg-white/5 text-zinc-400 text-sm rounded-lg border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Author */}
        <div className="mt-12 p-8 bg-[#0d0d0d] rounded-2xl border border-white/5">
          <div className="flex items-start gap-4">
            <img 
              src="https://i.imgur.com/M3iJpBH.png"
              alt="Szabolcs Alex"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-white font-semibold mb-1">Szabolcs Alex</h4>
              <p className="text-zinc-500 text-sm mb-3">
                Full Stack Developer & Tech Enthusiast
              </p>
              <p className="text-zinc-400 text-sm">
                Szenvedélyes webfejlesztő, aki szeret megosztani tudását és tapasztalatait a modern webtechnológiákról.
              </p>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8">Kapcsolódó cikkek</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-[#0d0d0d] rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-zinc-500 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
}
