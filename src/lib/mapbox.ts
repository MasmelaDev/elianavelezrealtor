import mapboxgl from 'mapbox-gl'

export function initMapbox() {
  const token = import.meta.env.PUBLIC_MAPBOX_TOKEN
  if (!token) {
    console.warn('Mapbox token (PUBLIC_MAPBOX_TOKEN) is missing')
    return false
  }
  mapboxgl.accessToken = token
  return true
}

export { mapboxgl }
