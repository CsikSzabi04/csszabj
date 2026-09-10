import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "../../data/blogData";
import BlogPostClient from "../../components/BlogPostClient";
import { parseHuDate, prepareArticle, toSummary } from "../../lib/blog";

type BlogPostProps = { params: Promise<{ slug: string }> };

// Every post is prerendered at build time; unknown slugs get a static 404 instead of
// triggering on-demand server rendering.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Nem található" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: [post.image],
      publishedTime: parseHuDate(post.date)?.toISOString(),
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Related articles: same category, excluding this post
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2)
    .map(toSummary);

  const article = {
    hu: prepareArticle(post.content),
    en: post.contentEn ? prepareArticle(post.contentEn) : null,
  };

  return <BlogPostClient post={toSummary(post)} article={article} relatedPosts={relatedPosts} />;
}
