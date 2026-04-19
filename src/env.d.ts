/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string
  readonly JWT_SECRET: string
  readonly RESEND_API_KEY: string
  readonly RESEND_FROM?: string
  readonly REALTOR_EMAIL: string
  readonly CLOUDINARY_CLOUD_NAME: string
  readonly CLOUDINARY_API_KEY: string
  readonly CLOUDINARY_API_SECRET: string
  readonly PUBLIC_MAPBOX_TOKEN: string
  readonly PUBLIC_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
