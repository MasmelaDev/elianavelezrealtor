/** Tipos del dominio (alineados con DB y Zod donde aplique) */

export interface Property {
  id: string
  titleEn: string
  titleEs: string
  descriptionEn: string | null
  descriptionEs: string | null
  price: string
  zone: string
  type: 'sale' | 'rent'
  status: 'available' | 'sold' | 'rented'
  bedrooms: number | null
  bathrooms: number | null
  areaSqft: string | null
  address: string | null
  lat: string | null
  lng: string | null
  images: string[]
  features: string[]
  featured: boolean
  createdAt: Date | string | null
  updatedAt: Date | string | null
}

export interface BlogPost {
  id: string
  slug: string
  titleEn: string
  titleEs: string
  contentEn: string | null
  contentEs: string | null
  excerptEn: string | null
  excerptEs: string | null
  coverImage: string | null
  published: boolean
  publishedAt: Date | string | null
  createdAt: Date | string | null
  updatedAt: Date | string | null
}

export interface PageContentRow {
  id: string
  key: string
  valueEn: string
  valueEs: string
  updatedAt: Date | string | null
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  source: 'contact' | 'property' | 'appointment'
  propertyId: string | null
  status: 'new' | 'contacted' | 'closed'
  createdAt: Date | string | null
}

export interface AvailabilitySlot {
  id: string
  date: string
  timeStart: string
  timeEnd: string
  isBooked: boolean
  createdAt: Date | string | null
}

export interface AppointmentWithDetails {
  id: string
  status: string
  createdAt: Date | string | null
  leadName: string
  leadEmail: string
  leadPhone: string | null
  slotDate: string
  slotTimeStart: string
  slotTimeEnd: string
}

export interface ApiMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  error: string
  details?: Record<string, unknown>
}
