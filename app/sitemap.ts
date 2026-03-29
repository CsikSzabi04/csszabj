import { MetadataRoute } from 'next';
import { blogPosts } from './data/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://csszabj.netlify.app';

  // Alap oldalak
  const routes = ['', '/about', '/projects', '/blog', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Blog posztok
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
