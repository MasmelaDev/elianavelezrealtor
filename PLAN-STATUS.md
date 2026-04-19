# Estado del plan — Realtor Website

## ✅ Completado

### SETUP (1–5)
- Astro 5 SSR, React, Tailwind v4 (@tailwindcss/vite), Vercel adapter, i18n (en/es).
- Dependencias: drizzle-orm, @neondatabase/serverless, jose, zod, resend, cloudinary, @tiptap/*.
- astro.config.ts, drizzle.config.ts, .env.example, env.d.ts, global.css con @theme.

### BASE DE DATOS (6–9)
- Schema completo en `src/db/schema.ts`.
- `src/lib/db.ts` (Neon + Drizzle).
- Migración generada, seed (admin + page_content).

### AUTENTICACIÓN (10–13)
- auth.ts (createToken, verifyToken, getTokenFromCookies, hashPassword, verifyPassword).
- Middleware protege /admin/* salvo /admin/login.
- login.astro, POST /api/auth/login, POST /api/auth/logout.

### PANEL ADMIN (14–21)
- AdminLayout, AdminNav, dashboard con métricas.
- CRUD Propiedades (lista, new, edit) + ImageUploader (Cloudinary).
- CRUD Blog (lista, new, edit) con **TipTap** (BlogEditor) EN/ES.
- Editor de contenido (/admin/content.astro).
- Inbox leads (/admin/leads.astro) con cambio de status.
- Vista citas (/admin/appointments.astro).
- Gestión disponibilidad (/admin/availability.astro).

### API (22–28)
- GET+POST /api/properties, GET+PUT+DELETE /api/properties/[id].
- GET+POST /api/blog, GET+PUT+DELETE /api/blog/[id].
- GET+PUT /api/content.
- GET (admin) + POST (público) /api/leads, PUT /api/leads/[id].
- GET /api/availability, POST+DELETE /api/availability (y DELETE /api/availability/[id]).
- GET (admin) + POST (público) /api/appointments.
- POST /api/upload/image → Cloudinary.

### i18n + RUTAS PÚBLICAS (29–31)
- ui.ts completo EN/ES, getLangFromUrl, useTranslations, getLocalizedPath.
- Redirect / → /en o /es según Accept-Language.
- Páginas /en/* y /es/*.

### LANDING Y COMPONENTES (32–42)
- BaseLayout con SEO + hreflang.
- PublicLayout + **Navbar** con toggle de idioma.
- **HeroSection**, **AboutSection**, **ServicesSection** (texto dinámico page_content).
- **FeaturedProperties** (React, /api/properties?featured=true).
- **BlogPreview** (últimos 3 posts).
- **ContactForm** (React, POST /api/leads).
- **AppointmentForm** (React, GET availability + POST /api/appointments).
- **Footer**.

### PÁGINAS INTERNAS (43–46)
- /en/properties y /es/properties (index con filtros, [id] detalle).
- /en/blog y /es/blog (index, [slug] post con HTML TipTap).

### SEO (50–51)
- **sitemap.xml.ts** (propiedades disponibles + posts publicados + páginas).
- **robots.txt** (ruta dinámica con PUBLIC_SITE_URL).

### EXTRAS DE ROBUSTEZ
- **TipTap** en admin blog (BlogEditor con StarterKit).
- **types/index.ts** (Property, BlogPost, Lead, etc.).
- **lib/api-response.ts** (jsonError, jsonValidationError) para uso opcional en APIs.
- **lib/email.ts**: escapeHtml en correos, RESEND_FROM en env.
- **RESEND_FROM** en .env.example y env.d.ts.

---

## ⏳ Pendiente / opcional según plan

| Ítem | Descripción |
|------|-------------|
| **47–49** | **Identidad visual**: definir paleta + tipografía con la realtor; aplicar tokens en todos los componentes (ya hay @theme en global.css; falta afinar y aplicar en más componentes). |
| **ZoneMap** | **Mapa (Mapbox)** en la landing: componente React con markers de propiedades. Plan: ZoneMap.tsx (island). Requiere PUBLIC_MAPBOX_TOKEN y lógica de centros/zoom. |
| **48** | Ajustar **tailwind.config** si se quieren más tokens (Tailwind v4 usa @theme en CSS; no hay tailwind.config.ts por defecto). |
| **52** | **Lighthouse**: Performance >90, SEO 100, A11y >90 (revisión manual o CI). |
| **53–55** | **Deploy**: configurar env en Vercel, conectar GitHub, dominio + HTTPS (manual). |
| **og-default.jpg** | Imagen por defecto para OG (actualmente se referencia `/og-default.jpg`; crear y subir en `public/` o generar en build). |

---

## Resumen

- **Hecho**: setup, BD, auth, panel admin completo, APIs, i18n, landing con secciones, propiedades y blog públicos, SEO (sitemap, robots), TipTap, tipos, emails más seguros.
- **Falta (opcional o manual)**: mapa Mapbox en landing, pulir identidad visual (tokens/paleta), og-default.jpg, Lighthouse, deploy y dominio.
