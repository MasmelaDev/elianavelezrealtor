import type { APIRoute } from 'astro'
import { db } from '../lib/db'
import { properties, blogPosts } from '../db/schema'
import { eq } from 'drizzle-orm'

export const GET: APIRoute = async ({ request }) => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || new URL(request.url).origin

  // Fetch published content
  const propsAll = await db.select().from(properties).where(eq(properties.status, 'sold'))
  const postsAll = await db.select().from(blogPosts).where(eq(blogPosts.published, true))

  const props = propsAll.map(p => ({ id: p.id, updatedAt: p.updatedAt }))
  const posts = postsAll.map(p => ({ slug: p.slug, updatedAt: p.updatedAt }))

  // Static pages
  const staticPages = [
    '',
    '/properties',
    '/blog'
  ]

  // Construct URLs for both languages
  const urls: { loc: string; lastmod: string }[] = []

  const now = new Date().toISOString()

  // Add static pages
  for (const page of staticPages) {
    urls.push({ loc: `${siteUrl}/en${page}`, lastmod: now })
    urls.push({ loc: `${siteUrl}/es${page}`, lastmod: now })
  }

  // Add properties
  for (const p of props) {
    const mod = p.updatedAt ? new Date(p.updatedAt).toISOString() : now
    urls.push({ loc: `${siteUrl}/en/properties/${p.id}`, lastmod: mod })
    urls.push({ loc: `${siteUrl}/es/properties/${p.id}`, lastmod: mod })
  }

  // Add blog posts
  for (const post of posts) {
    const mod = post.updatedAt ? new Date(post.updatedAt).toISOString() : now
    urls.push({ loc: `${siteUrl}/en/blog/${post.slug}`, lastmod: mod })
    urls.push({ loc: `${siteUrl}/es/blog/${post.slug}`, lastmod: mod })
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
