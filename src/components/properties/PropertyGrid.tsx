import { useState, useMemo } from 'react'
import type { Property } from '../../types'
import { PropertyCard } from './PropertyCard'
import { PropertyFilters, type PropertyFiltersState } from './PropertyFilters'

interface PropertyGridProps {
  initialProperties: Property[]
  lang: 'en' | 'es'
  initialZone?: string
  initialType?: string
}

export function PropertyGrid({ initialProperties, lang, initialZone = '', initialType = '' }: PropertyGridProps) {
  const [filters, setFilters] = useState<PropertyFiltersState>({
    zone: initialZone,
    type: initialType,
  })

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((p) => {
      if (filters.zone && !p.zone.toLowerCase().includes(filters.zone.toLowerCase())) {
        return false
      }
      if (filters.type && p.type !== filters.type) {
        return false
      }
      return true
    })
  }, [initialProperties, filters])

  return (
    <div>
      <PropertyFilters
        initialFilters={filters}
        onFilterChange={setFilters}
        lang={lang}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((p) => (
          <PropertyCard key={p.id} property={p} lang={lang} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="py-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            {lang === 'en' ? 'No properties found' : 'No se encontraron propiedades'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {lang === 'en' 
              ? 'Try adjusting your filters or search terms.' 
              : 'Intenta ajustar tus filtros de búsqueda.'}
          </p>
        </div>
      )}
    </div>
  )
}
