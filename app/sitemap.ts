import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

const PAGE_ROUTES = ["", "/about", "/projects", "/overview", "/creative", "/cv"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
