import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const site = (import.meta.env.PUBLIC_SITE_URL as string) || 'https://tudominio.com'
  const body = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
