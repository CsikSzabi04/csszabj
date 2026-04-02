import { notFound } from "next/navigation";
import { blogPosts } from "../../data/blogData";
import BlogPostClient from "../../components/BlogPostClient";

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

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}