import { useState, useEffect } from 'react'

export interface PropertyFiltersState {
  zone: string
  type: string
}

interface PropertyFiltersProps {
  initialFilters: PropertyFiltersState
  onFilterChange: (filters: PropertyFiltersState) => void
  lang: 'en' | 'es'
}

export function PropertyFilters({ initialFilters, onFilterChange, lang }: PropertyFiltersProps) {
  const [zone, setZone] = useState(initialFilters.zone)
  const [type, setType] = useState(initialFilters.type)

  const t = {
    zonePlaceholder: lang === 'en' ? 'Any Zone' : 'Cualquier zona',
    typePlaceholder: lang === 'en' ? 'Any Type' : 'Cualquier tipo',
    sale: lang === 'en' ? 'For Sale' : 'En Venta',
    rent: lang === 'en' ? 'For Rent' : 'En Alquiler',
  }

  // Update URL on change silently so refresh keeps state
  useEffect(() => {
    onFilterChange({ zone, type })
    
    const url = new URL(window.location.href)
    if (zone) url.searchParams.set('zone', zone)
    else url.searchParams.delete('zone')
    
    if (type) url.searchParams.set('type', type)
    else url.searchParams.delete('type')
    
    // Reset to page 1 on filter change
    url.searchParams.delete('page')
    
    window.history.replaceState({}, '', url.toString())
  }, [zone, type, onFilterChange])

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex-1">
        <label htmlFor="zone-filter" className="sr-only">Zone</label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="zone-filter"
            type="text"
            placeholder={t.zonePlaceholder}
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full sm:w-48">
        <label htmlFor="type-filter" className="sr-only">Type</label>
        <select
          id="type-filter"
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">{t.typePlaceholder}</option>
          <option value="sale">{t.sale}</option>
          <option value="rent">{t.rent}</option>
        </select>
      </div>
    </div>
  )
}
