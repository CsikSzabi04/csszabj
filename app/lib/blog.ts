import type { BlogPost } from "../data/blogData";

type Language = "hu" | "en";

/** Everything a list/card needs – without the (large) article HTML. */
export type BlogPostSummary = Pick<
  BlogPost,
  "id" | "title" | "slug" | "excerpt" | "category" | "date" | "readTime" | "image" | "tags" | "titleEn" | "excerptEn" | "categoryEn"
>;

export interface TocItem {
  id: string;
  label: string;
}

export interface PreparedArticle {
  html: string;
  toc: TocItem[];
}

export function toSummary(post: BlogPost): BlogPostSummary {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    image: post.image,
    tags: post.tags,
    titleEn: post.titleEn,
    excerptEn: post.excerptEn,
    categoryEn: post.categoryEn,
  };
}

export function postCategory(post: Pick<BlogPost, "category" | "categoryEn">, language: Language): string {
  return language === "en" ? post.categoryEn ?? post.category : post.category;
}

const HU_MONTHS = [
  "január", "február", "március", "április", "május", "június",
  "július", "augusztus", "szeptember", "október", "november", "december",
];

/** Parses dates in the blog's format, e.g. "2025. január 15.", into a UTC date. */
export function parseHuDate(value: string): Date | null {
  const match = /^(\d{4})\.\s*(\p{L}+)\s+(\d{1,2})\.?$/u.exec(value.trim());
  if (!match) return null;
  const month = HU_MONTHS.indexOf(match[2].toLowerCase());
  if (month === -1) return null;
  return new Date(Date.UTC(Number(match[1]), month, Number(match[3])));
}

const englishDateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export function formatPostDate(value: string, language: Language): string {
  if (language === "hu") return value;
  const date = parseHuDate(value);
  return date ? englishDateFormat.format(date) : value;
}

export function formatReadTime(value: string, language: Language): string {
  return language === "en" ? value.replace(/\bperc\b/i, "min") : value;
}

const ENTITIES: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Prepares repo-authored article HTML for rendering: gives every <h2> a stable id and builds the
 * table of contents from them, lazy-loads images and hardens external links.
 */
export function prepareArticle(html: string): PreparedArticle {
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();

  const withHeadingIds = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (full: string, attrs: string | undefined, inner: string) => {
    const label = stripTags(inner);
    const existingId = attrs ? /\sid=["']([^"']+)["']/i.exec(attrs)?.[1] : undefined;

    let id = existingId ?? (slugify(label) || `szakasz-${toc.length + 1}`);
    if (!existingId) {
      const base = id;
      for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
    }
    usedIds.add(id);
    toc.push({ id, label });

    return existingId ? full : `<h2 id="${id}"${attrs ?? ""}>${inner}</h2>`;
  });

  const withLazyImages = withHeadingIds.replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"');

  const withSafeLinks = withLazyImages.replace(
    /<a\s(?![^>]*\b(?:rel|target)=)([^>]*\bhref=["']https?:\/\/[^>]*)>/gi,
    '<a target="_blank" rel="noopener noreferrer" $1>',
  );

  return { html: withSafeLinks, toc };
}
