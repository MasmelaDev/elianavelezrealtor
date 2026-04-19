import type { Property } from '../../types'
import { Badge } from '../ui/Badge'
import { Card, CardContent } from '../ui/Card'

export function PropertyCard({ property: p, lang }: { property: Property; lang: 'en' | 'es' }) {
  const title = lang === 'en' ? p.titleEn : p.titleEs
  const typeLabel =
    lang === 'en' ? (p.type === 'sale' ? 'Sale' : 'Rent') : p.type === 'sale' ? 'Venta' : 'Alquiler'

  return (
    <a
      href={`/${lang}/properties/${p.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {p.images?.[0] ? (
          <img
            src={p.images[0]}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            {lang === 'en' ? 'No image' : 'Sin imagen'}
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {p.featured && <Badge variant="warning">{lang === 'en' ? 'Featured' : 'Destacada'}</Badge>}
          <Badge variant="default" className="bg-white/90 backdrop-blur-sm">
            {typeLabel}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-semibold text-gray-900" title={title}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{p.zone}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-brand-600">${Number(p.price).toLocaleString()}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {p.bedrooms != null && (
              <span className="flex items-center gap-1" title={lang === 'en' ? 'Bedrooms' : 'Habitaciones'}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {p.bedrooms}
              </span>
            )}
            {p.bathrooms != null && (
              <span className="flex items-center gap-1" title={lang === 'en' ? 'Bathrooms' : 'Baños'}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {p.bathrooms}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </a>
  )
}
