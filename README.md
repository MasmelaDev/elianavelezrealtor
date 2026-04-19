# Realtor Website

Sitio de bienes raíces con Astro 5 SSR, React, Drizzle, Neon y panel admin.

## Requisitos

- Node 20+
- pnpm
- Cuenta Neon (PostgreSQL), Resend, Cloudinary, Mapbox (opcional para desarrollo)

## Setup

```bash
pnpm install
cp .env.example .env
# Editar .env con tus valores. DATABASE_URL debe ser una URL de Neon (postgresql://...@...neon.tech/...).
```

**Base de datos:** Por defecto se recomienda **Neon para dev y prod** (misma URL). Opcionalmente puedes usar **Docker** para Postgres local: `pnpm db:up` y en `.env` pon `DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/realtor`. La app detecta `localhost`/`127.0.0.1` y usa el driver correcto.

## Comandos

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm preview` | Preview del build |
| `pnpm db:generate` | Generar migración Drizzle |
| `pnpm db:migrate` | Aplicar migraciones |
| `pnpm db:studio` | Abrir Drizzle Studio |
| `pnpm db:seed` | Seed admin + page_content (requiere DATABASE_URL) |
| `pnpm db:up` | Levanta Postgres en Docker (opcional, para dev local) |
| `pnpm db:down` | Para y elimina el contenedor |

## Estructura

- `src/pages/` — Rutas: `/en`, `/es`, `/admin`, `/api`
- `src/components/` — UI, sections, layout
- `src/lib/` — db, auth, email, cloudinary
- `src/db/` — schema y migraciones
- `src/i18n/` — diccionario EN/ES
- `src/schemas/` — validación Zod

## Deploy (Vercel)

Configurar variables de entorno en el dashboard de Vercel y conectar el repo para deploy automático.

## Troubleshooting

- **`ECONNREFUSED 5432`**: Si usas Docker, ejecuta `pnpm db:up` y asegura `DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/realtor`. Si no usas Docker, pon una URL de [Neon](https://neon.tech).
- **`ELOOP: too many symbolic links`**: Suele ser un store de pnpm corrupto o enlazado. Prueba: `rm -rf node_modules .pnpm-store` (si existe en el proyecto) y luego `pnpm install`.
