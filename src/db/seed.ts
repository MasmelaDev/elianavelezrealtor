/**
 * Seed inicial: admin user + page_content keys.
 * Ejecutar con: pnpm db:seed (carga .env desde la raíz del proyecto).
 * Requiere DATABASE_URL; opcional ADMIN_EMAIL, ADMIN_PASSWORD.
 */
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm'
import { adminUsers, pageContent, properties } from './schema'
import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)
const SALT_LEN = 16
const KEY_LEN = 64

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LEN).toString('hex')
  const key = (await scryptAsync(password, salt, KEY_LEN)) as Buffer
  return `${salt}:${key.toString('hex')}`
}

const INITIAL_PAGE_CONTENT: Array<{ key: string; valueEn: string; valueEs: string }> = [
  // ── Hero ──
  { key: 'hero.title', valueEn: 'Find Your Perfect Home', valueEs: 'Encuentra tu Hogar Ideal' },
  { key: 'hero.subtitle', valueEn: 'Turning your vision into reality. Your expert real estate guide.', valueEs: 'Transformamos tu visión en realidad. Tu guía experta en bienes raíces.' },
  { key: 'hero.tagline', valueEn: 'Turning your vision into reality. Your expert real estate guide.', valueEs: 'Transformamos tu visión en realidad. Tu guía experta en bienes raíces.' },
  { key: 'hero.role', valueEn: 'Broker / Manager', valueEs: 'Broker / Manager' },
  { key: 'hero.cta.primary', valueEn: 'View Properties', valueEs: 'Ver Propiedades' },
  { key: 'hero.cta.secondary', valueEn: 'Schedule a Meeting', valueEs: 'Programar Reunión' },
  { key: 'hero.badgeTitle', valueEn: 'Fulfilling Dreams', valueEs: 'Cumpliendo Sueños' },
  { key: 'hero.badgeDesc', valueEn: 'Over 100 Happy Families', valueEs: 'Más de 100 familias felices' },
  // ── About ──
  { key: 'about.title', valueEn: 'About Me', valueEs: 'Sobre Mí' },
  { key: 'about.badge', valueEn: 'About Me', valueEs: 'Sobre Mí' },
  { key: 'about.body', valueEn: 'I am Eliana Velez, a passionate real estate professional with a proven track record of helping families and investors find their perfect place. My commitment is to provide you with transparent, agile, and fully personalized service to ensure the absolute success of your investment and your peace of mind.', valueEs: 'Soy Eliana Velez, una apasionada profesional en bienes raíces con experiencia comprobada ayudando a familias e inversores a encontrar su lugar perfecto. Mi compromiso es brindarte un servicio transparente, ágil y totalmente personalizado para asegurar el éxito absoluto de tu inversión y tranquilidad.' },
  { key: 'about.cta', valueEn: 'Get in Touch', valueEs: 'Contáctame' },
  { key: 'about.happyClients', valueEn: 'Happy Clients', valueEs: 'Clientes felices' },
  { key: 'about.badgeFloatingTitle', valueEn: 'Certified', valueEs: 'Certificada' },
  { key: 'about.badgeFloatingDesc', valueEn: 'Top Realtor', valueEs: 'Top Realtor' },
  // ── Stats ──
  { key: 'stats.years', valueEn: '10+', valueEs: '10+' },
  { key: 'stats.yearsLabel', valueEn: 'Years Experience', valueEs: 'Años de Experiencia' },
  { key: 'stats.clients', valueEn: '50+', valueEs: '50+' },
  { key: 'stats.clientsLabel', valueEn: 'Happy Clients', valueEs: 'Clientes Felices' },
  { key: 'stats.deals', valueEn: '100+', valueEs: '100+' },
  { key: 'stats.dealsLabel', valueEn: 'Closed Deals', valueEs: 'Operaciones Cerradas' },
  // ── Services ──
  { key: 'services.title', valueEn: 'How I Can Help', valueEs: 'Cómo Puedo Ayudarte' },
  { key: 'services.badge', valueEn: 'Expertise & Dedication', valueEs: 'Experiencia y Dedicación' },
  { key: 'services.body', valueEn: 'Comprehensive real estate services designed around your unique goals, whether buying, selling, or renting.', valueEs: 'Ya sea que busques tu hogar soñado, vender al mejor precio o una inversión sólida, te ofrezco asesoría integral y resultados excepcionales.' },
  { key: 'services.buy.title', valueEn: 'Buy', valueEs: 'Comprar' },
  { key: 'services.buy.desc', valueEn: 'Find your perfect home with expert guidance and market insight.', valueEs: 'Encuentra tu hogar ideal con asesoría y conocimiento del mercado.' },
  { key: 'services.sell.title', valueEn: 'Sell', valueEs: 'Vender' },
  { key: 'services.sell.desc', valueEn: 'Maximize your property value with a tailored marketing strategy.', valueEs: 'Maximiza el valor de tu propiedad con una estrategia a tu medida.' },
  { key: 'services.rent.title', valueEn: 'Rent', valueEs: 'Arrendar' },
  { key: 'services.rent.desc', valueEn: 'Lease or find tenants with reliable, hassle-free support.', valueEs: 'Arrienda o encuentra inquilinos con un proceso confiable y sencillo.' },
  // ── Why Choose Me ──
  { key: 'why.title', valueEn: 'Why Choose Me As Your Partner', valueEs: 'Por Qué Elegirme Como Tu Aliada' },
  { key: 'why.subtitle', valueEn: 'I bring personalized attention, unparalleled local expertise, and a relentless commitment to achieving your absolute satisfaction and peace of mind.', valueEs: 'Atención exclusiva, conocimiento inigualable del mercado local y un compromiso absoluto con tu tranquilidad financiera y bienestar familiar.' },
  { key: 'why.item1.title', valueEn: 'Local Market Expert', valueEs: 'Experta en el Mercado Local' },
  { key: 'why.item1.desc', valueEn: 'Deep knowledge of neighborhoods, pricing trends, and the best opportunities in the area.', valueEs: 'Conocimiento profundo de barrios, tendencias de precios y las mejores oportunidades en la zona.' },
  { key: 'why.item2.title', valueEn: 'Full-Service Support', valueEs: 'Soporte Integral' },
  { key: 'why.item2.desc', valueEn: 'From search to closing—guidance, paperwork, and negotiations so you feel confident every step.', valueEs: 'Desde la búsqueda hasta el cierre: asesoría, trámites y negociaciones para que te sientas seguro en cada paso.' },
  { key: 'why.item3.title', valueEn: 'Honest & Transparent', valueEs: 'Honestidad y Transparencia' },
  { key: 'why.item3.desc', valueEn: 'Clear communication and no pressure. Your goals and timeline always come first.', valueEs: 'Comunicación clara y sin presiones. Tus objetivos y plazos siempre van primero.' },
  // ── Contact & WhatsApp ──
  { key: 'contact.title', valueEn: 'Get in Touch', valueEs: 'Contáctame' },
  { key: 'contact.whatsapp', valueEn: '+1234567890', valueEs: '+1234567890' },
  // ── Images (same for both langs) ──
  { key: 'image.hero', valueEn: '/images/elianafull.jpg', valueEs: '/images/elianafull.jpg' },
  { key: 'image.about', valueEn: '/images/elianafull.jpg', valueEs: '/images/elianafull.jpg' },
  { key: 'image.service.buy', valueEn: '/images/hero-bg.png', valueEs: '/images/hero-bg.png' },
  { key: 'image.service.sell', valueEn: '/images/hero-2.png', valueEs: '/images/hero-2.png' },
  { key: 'image.service.rent', valueEn: '/images/hero-3.png', valueEs: '/images/hero-3.png' },
  { key: 'icon.service.buy', valueEn: 'home', valueEs: 'home' },
  { key: 'icon.service.sell', valueEn: 'building', valueEs: 'building' },
  { key: 'icon.service.rent', valueEn: 'key', valueEs: 'key' },
  // ── Testimonials ──
  { key: 'testimonials.title', valueEn: 'What My Clients Say', valueEs: 'Lo Que Dicen Mis Clientes' },
  { key: 'testimonials.subtitle', valueEn: 'Real stories from people who found their perfect home or successfully sold their property with my help.', valueEs: 'Historias reales de personas que encontraron su hogar ideal o vendieron su propiedad con éxito.' },
  { key: 'testimonials.1.name', valueEn: 'Sarah Jenkins', valueEs: 'Sarah Jenkins' },
  { key: 'testimonials.1.role', valueEn: 'Homebuyer', valueEs: 'Compradora' },
  { key: 'testimonials.1.content', valueEn: 'Eliana was incredible! She guided us through every step of buying our first home. Her knowledge of the local market made all the difference.', valueEs: '¡Eliana fue increíble! Nos guió en cada paso para comprar nuestra primera casa. Su conocimiento del mercado local hizo toda la diferencia.' },
  { key: 'testimonials.1.image', valueEn: '/images/sarah.jpg', valueEs: '/images/sarah.jpg' },
  { key: 'testimonials.1.rating', valueEn: '5', valueEs: '5' },
  { key: 'testimonials.2.name', valueEn: 'Michael Chen', valueEs: 'Michael Chen' },
  { key: 'testimonials.2.role', valueEn: 'Property Investor', valueEs: 'Inversor' },
  { key: 'testimonials.2.content', valueEn: 'I have worked with many realtors, but the level of professionalism and dedication here is unmatched. Highly recommended for any serious investor.', valueEs: 'He trabajado con muchos realtors, pero el nivel de profesionalismo y dedicación aquí es inigualable. Muy recomendada para cualquier inversor serio.' },
  { key: 'testimonials.2.image', valueEn: '/images/michael.jpg', valueEs: '/images/michael.jpg' },
  { key: 'testimonials.2.rating', valueEn: '5', valueEs: '5' },
  { key: 'testimonials.3.name', valueEn: 'Elena Rodriguez', valueEs: 'Elena Rodriguez' },
  { key: 'testimonials.3.role', valueEn: 'Home Seller', valueEs: 'Vendedora' },
  { key: 'testimonials.3.content', valueEn: 'Selling a house can be stressful, but she made it seamless. My house sold over asking price within a week of listing!', valueEs: 'Vender una casa puede ser estresante, pero ella lo hizo muy sencillo. ¡Mi casa se vendió por encima del precio en una semana!' },
  { key: 'testimonials.3.image', valueEn: '/images/elena.jpg', valueEs: '/images/elena.jpg' },
  { key: 'testimonials.3.rating', valueEn: '5', valueEs: '5' },
]

async function main() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('Missing DATABASE_URL')
    process.exit(1)
  }
  const isLocal = /localhost|127\.0\.0\.1/.test(dbUrl)
  const db = isLocal
    ? (await import('drizzle-orm/node-postgres')).drizzle(new (await import('pg')).Pool({ connectionString: dbUrl }))
    : drizzle(neon(dbUrl))

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'changeme'

  const existingAdmin = await db.select().from(adminUsers).where(eq(adminUsers.email, adminEmail)).limit(1)
  if (existingAdmin.length > 0) {
    console.log('Admin user already exists, skipping.')
  } else {
    const passwordHash = await hashPassword(adminPassword)
    await db.insert(adminUsers).values({ email: adminEmail, passwordHash })
    console.log('Created admin user:', adminEmail)
  }

  for (const row of INITIAL_PAGE_CONTENT) {
    await db.insert(pageContent).values(row).onConflictDoUpdate({
      target: pageContent.key,
      set: { valueEn: row.valueEn, valueEs: row.valueEs, updatedAt: new Date() },
    })
  }
  console.log('Page content keys upserted:', INITIAL_PAGE_CONTENT.length)

  // Seed Mock Properties
  const existingProps = await db.select().from(properties).limit(1)
  if (existingProps.length === 0) {
    const mockProperties = [
      {
        titleEn: 'Modern Luxury Villa in Beverly Hills',
        titleEs: 'Moderna Villa de Lujo en Beverly Hills',
        price: '5500000',
        zone: 'Beverly Hills',
        type: 'sale',
        bedrooms: 5,
        bathrooms: 6,
        images: ['/images/properties/prop1.jpg'],
        featured: true,
      },
      {
        titleEn: 'Elegant Penthouse with Ocean View',
        titleEs: 'Elegante Penthouse con Vista al Océano',
        price: '3200000',
        zone: 'Miami Beach',
        type: 'sale',
        bedrooms: 3,
        bathrooms: 3,
        images: ['/images/properties/prop2.jpg'],
        featured: true,
      },
      {
        titleEn: 'Contemporary Estate with Private Pool',
        titleEs: 'Finca Contemporánea con Piscina Privada',
        price: '4800000',
        zone: 'Hollywood Hills',
        type: 'sale',
        bedrooms: 6,
        bathrooms: 5,
        images: ['/images/properties/prop3.jpg'],
        featured: true,
      },
      {
        titleEn: 'Exclusive Waterfront Mansion',
        titleEs: 'Exclusiva Mansión Frente al Agua',
        price: '8900000',
        zone: 'Biscayne Bay',
        type: 'sale',
        bedrooms: 7,
        bathrooms: 8,
        images: ['/images/properties/prop4.jpg'],
        featured: true,
      },
      {
        titleEn: 'Stunning Modernist Home in the Woods',
        titleEs: 'Impresionante Casa Modernista en el Bosque',
        price: '2750000',
        zone: 'Aspen',
        type: 'sale',
        bedrooms: 4,
        bathrooms: 4,
        images: ['/images/properties/prop5.jpg'],
        featured: true,
      },
      {
        titleEn: 'Architectural Masterpiece in the City',
        titleEs: 'Obra Maestra Arquitectónica en la Ciudad',
        price: '6400000',
        zone: 'Manhattan',
        type: 'sale',
        bedrooms: 4,
        bathrooms: 5,
        images: ['/images/properties/prop6.jpg'],
        featured: true,
      },
    ]

    for (const prop of mockProperties) {
      await db.insert(properties).values(prop)
    }
    console.log('Seeded 6 mock properties.')
  } else {
    // If they exist, let's just make sure their images are pointing to the real ones
    // We already did this via the migrate script, but let's do it here just in case.
    const allProps = await db.select().from(properties).limit(6)
    const images = ['/images/properties/prop1.jpg', '/images/properties/prop2.jpg', '/images/properties/prop3.jpg', '/images/properties/prop4.jpg', '/images/properties/prop5.jpg', '/images/properties/prop6.jpg']
    for (let i = 0; i < allProps.length; i++) {
      await db.update(properties).set({ images: [images[i % images.length]], featured: true }).where(eq(properties.id, allProps[i].id))
    }
    console.log('Updated existing properties with real images.')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
