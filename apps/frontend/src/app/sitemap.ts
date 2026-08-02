import { MetadataRoute } from 'next';
import { fetchBlogs } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://calebadjeoda.dev';
  
  const locales = ['en', 'fr'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Base route
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Blog index
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });

    // Dynamic blog articles
    try {
      const blogs = await fetchBlogs(locale);
      for (const blog of blogs) {
        entries.push({
          url: `${baseUrl}/${locale}/blog/${blog.id}`,
          lastModified: new Date(blog.updatedAt || blog.publishedAt || Date.now()),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    } catch (e) {
      console.error(`Failed to fetch blogs for sitemap (${locale}):`, e);
    }
  }

  return entries;
}
