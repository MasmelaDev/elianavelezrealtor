import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { initMapbox } from '../../lib/mapbox'
import type { Property } from '../../types'

interface ZoneMapProps {
  properties: Pick<Property, 'id' | 'titleEn' | 'titleEs' | 'price' | 'lat' | 'lng'>[]
  lang: 'en' | 'es'
  centerLat?: number
  centerLng?: number
}

export function ZoneMap({ properties, lang, centerLat = 25.7617, centerLng = -80.1918 }: ZoneMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return
    if (!initMapbox()) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [centerLng, centerLat],
      zoom: 11,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    const markers: mapboxgl.Marker[] = []

    properties.forEach((p) => {
      if (!p.lat || !p.lng) return

      const title = lang === 'en' ? p.titleEn : p.titleEs
      const popupHTML = `
        <div class="p-4 font-sans max-w-[280px]">
          <h3 class="font-serif font-bold text-on-surface mb-1 text-lg leading-tight">${title}</h3>
          <p class="text-accent font-bold mb-3 text-xl">$${Number(p.price).toLocaleString()}</p>
          <a href="/${lang}/properties/${p.id}" class="text-sm bg-primary text-white font-medium px-4 py-2 rounded-lg block text-center transition hover:bg-primary-dark w-full shadow-sm hover:shadow-md">Ver Detalles</a>
        </div>
      `

      const popup = new mapboxgl.Popup({ offset: 25, maxWidth: '250px' }).setHTML(popupHTML)

      const el = document.createElement('div')
      el.className = 'w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:shadow-xl z-10'

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([Number(p.lng), Number(p.lat)])
        .setPopup(popup)
        .addTo(map.current!)

      markers.push(marker)
    })

    // If we have properties, fit bounds to show all markers nicely
    if (markers.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds()
      properties.forEach(p => {
        if (p.lat && p.lng) {
          bounds.extend([Number(p.lng), Number(p.lat)])
        }
      })
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 })
    }

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [properties, lang, centerLat, centerLng])

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xl relative w-full h-[500px] group transition-all duration-300 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-[2px] z-0" />
      <div ref={mapContainer} className="absolute inset-0 z-10" />
      {!import.meta.env.PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <p className="text-gray-500 text-center px-4">
            El mapa interactivo necesita un token Mapbox válido en PUBLIC_MAPBOX_TOKEN
          </p>
        </div>
      )}
    </div>
  )
}
