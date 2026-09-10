import type { MetadataRoute } from "next";
import { blogPosts } from "./data/blogData";
import { parseHuDate } from "./lib/blog";
import { SITE_URL } from "./lib/site";

const PAGE_ROUTES = ["", "/about", "/projects", "/blog", "/contact", "/cv", "/tools"];
const TOOL_ROUTES = ["/tools/qr", "/tools/compressor", "/tools/seo", "/tools/contrast", "/tools/speed", "/tools/netspeed"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PAGE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const tools = TOOL_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const posts = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: parseHuDate(post.date) ?? undefined,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...tools, ...posts];
}
