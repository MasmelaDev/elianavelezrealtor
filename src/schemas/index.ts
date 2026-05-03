import { z } from 'zod'

export const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(150),
  phone: z.string().max(20).optional().or(z.literal('')),
  message: z.string().max(1000).optional().or(z.literal('')),
  source: z.enum(['contact', 'property', 'appointment']),
  propertyId: z.string().uuid().optional(),
})

export const AppointmentSchema = z.object({
  slotId: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().max(500).optional(),
})

export const PropertySchema = z.object({
  titleEn: z.string().min(3).max(255),
  titleEs: z.string().min(3).max(255),
  descriptionEn: z.string().optional(),
  descriptionEs: z.string().optional(),
  price: z.number().positive(),
  zone: z.string().min(2).max(100),
  type: z.enum(['sale', 'rent']),
  status: z.enum(['available', 'sold', 'rented']).default('available'),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  areaSqft: z.number().positive().optional(),
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
})

export const BlogPostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  titleEn: z.string().min(3).max(255),
  titleEs: z.string().min(3).max(255),
  contentEn: z.string().optional(),
  contentEs: z.string().optional(),
  excerptEn: z.string().max(500).optional(),
  excerptEs: z.string().max(500).optional(),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type Lead = z.infer<typeof LeadSchema>
export type Appointment = z.infer<typeof AppointmentSchema>
export type Property = z.infer<typeof PropertySchema>
export type BlogPost = z.infer<typeof BlogPostSchema>
