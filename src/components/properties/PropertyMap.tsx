import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { initMapbox } from '../../lib/mapbox'

interface PropertyMapProps {
  lat: number
  lng: number
}

export function PropertyMap({ lat, lng }: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return
    if (!initMapbox()) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: 14,
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add marker
    new mapboxgl.Marker({ color: '#2563eb' })
      .setLngLat([lng, lat])
      .addTo(map.current)

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [lat, lng])

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm relative w-full h-[400px]">
      <div ref={mapContainer} className="absolute inset-0" />
      {!import.meta.env.PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Map unavailable (missing token)</p>
        </div>
      )}
    </div>
  )
}
