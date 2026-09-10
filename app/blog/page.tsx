import type { Metadata } from "next";
import Blog from "../components/Blog";
import { blogPosts } from "../data/blogData";
import { toSummary } from "../lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Cikkek webfejlesztésről, SEO-ról, online marketingről és karrierről.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Only summaries go to the client – the full article HTML stays on the server. */}
      <Blog posts={blogPosts.map(toSummary)} />
    </div>
  );
}
