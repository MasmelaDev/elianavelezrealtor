import { useState, useEffect } from 'react'

interface Property {
  id: string
  titleEn: string
  titleEs: string
  price: string
  zone: string
  type: string
  images: string[]
  slug?: string
}

interface Props {
  lang: 'en' | 'es'
  limit?: number
  featuredTitle: string
  viewAll: string
  emptyFeatured: string
  typeSale: string
  typeRent: string
}

export default function FeaturedProperties({
  lang,
  limit = 6,
  featuredTitle,
  viewAll,
  emptyFeatured,
  typeSale,
  typeRent,
}: Props) {
  const [list, setList] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/properties?featured=true&status=sold&limit=${limit}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.data) setList(data.data)
      })
      .finally(() => setLoading(false))
  }, [limit])

  const title = (p: Property) => (lang === 'es' ? p.titleEs : p.titleEn)
  const typeLabel = (type: string) => (type === 'sale' ? typeSale : typeRent)

  return (
    <section className="bg-surface py-24 md:py-32" id="properties">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="reveal-on-scroll">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary">
              Portfolio
            </div>
            <h2 className="font-serif text-4xl font-semibold text-on-surface md:text-5xl lg:text-5xl">
              {featuredTitle}
            </h2>
          </div>
          {!loading && list.length > 0 && (
            <a
              href={lang === 'en' ? '/en/properties' : '/es/properties'}
              className="reveal-on-scroll reveal-delay-1 inline-flex items-center justify-center rounded-lg bg-surface border border-gray-200 px-6 py-3 font-semibold text-on-surface transition-all duration-300 hover:bg-surface-gray hover:shadow-sm"
            >
              {viewAll}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
          </div>
        ) : list.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-gray-100 bg-surface-gray/30 p-16 text-center">
            <p className="text-lg text-on-surface-muted">{emptyFeatured}</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, idx) => (
              <a
                key={p.id}
                href={lang === 'en' ? `/en/properties/${p.id}` : `/es/properties/${p.id}`}
                className={`reveal-on-scroll reveal-delay-${Math.min(idx + 1, 6)} group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-surface shadow-lg transition-all duration-300 hover:shadow-[0_20px_40px_rgba(227,30,47,0.12)] hover:-translate-y-3`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={title(p)}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-on-surface-muted bg-surface-gray">
                      No Image Available
                    </div>
                  )}
                  {/* Subtle dark gradient at bottom for contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" aria-hidden />
                  
                  {/* Floating Action Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-black/20 backdrop-blur-[2px]">
                    <span className="translate-y-8 rounded-full bg-primary/90 px-8 py-3 backdrop-blur-md border border-white/20 font-bold text-white transition-all duration-500 group-hover:translate-y-0 shadow-2xl hover:bg-primary">
                      View Details
                    </span>
                  </div>

                  {/* Badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                    {typeLabel(p.type)}
                  </span>
                </div>
                
                <div className="relative flex flex-1 flex-col p-8 bg-surface z-10">
                  {/* Top-right floating price tag */}
                  <div className="absolute -top-6 right-6 bg-surface px-5 py-2.5 rounded-2xl shadow-xl border border-gray-100 font-bold text-xl text-primary transform transition-transform duration-500 group-hover:-translate-y-2">
                    ${Number(p.price).toLocaleString()}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-on-surface line-clamp-1 transition-colors duration-300 md:pr-16 group-hover:text-primary pt-2">
                    {title(p)}
                  </h3>
                  <div className="mt-3 flex items-center text-on-surface-muted">
                    <svg className="mr-2 h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="text-base font-medium">{p.zone}</span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hidden md:flex">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Explore property</span>
                    <svg className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
