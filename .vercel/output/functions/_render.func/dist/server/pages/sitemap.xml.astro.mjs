import { d as db, e as properties, c as blogPosts } from '../chunks/schema_CP1qSdhM.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../renderers.mjs';

const GET = async ({ request }) => {
  const siteUrl = "https://tudominio.com";
  const propsAll = await db.select().from(properties).where(eq(properties.status, "available"));
  const postsAll = await db.select().from(blogPosts).where(eq(blogPosts.published, true));
  const props = propsAll.map((p) => ({ id: p.id, updatedAt: p.updatedAt }));
  const posts = postsAll.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
  const staticPages = [
    "",
    "/properties",
    "/blog"
  ];
  const urls = [];
  const now = (/* @__PURE__ */ new Date()).toISOString();
  for (const page of staticPages) {
    urls.push({ loc: `${siteUrl}/en${page}`, lastmod: now });
    urls.push({ loc: `${siteUrl}/es${page}`, lastmod: now });
  }
  for (const p of props) {
    const mod = p.updatedAt ? new Date(p.updatedAt).toISOString() : now;
    urls.push({ loc: `${siteUrl}/en/properties/${p.id}`, lastmod: mod });
    urls.push({ loc: `${siteUrl}/es/properties/${p.id}`, lastmod: mod });
  }
  for (const post of posts) {
    const mod = post.updatedAt ? new Date(post.updatedAt).toISOString() : now;
    urls.push({ loc: `${siteUrl}/en/blog/${post.slug}`, lastmod: mod });
    urls.push({ loc: `${siteUrl}/es/blog/${post.slug}`, lastmod: mod });
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join("")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
