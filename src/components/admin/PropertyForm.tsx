import { useState, useEffect } from 'react'
import ImageUploader from './ImageUploader'
import { Save, X, Trash2, MapPin, Image as ImageIcon, List, Info, Home } from 'lucide-react'

interface PropertyFormProps {
  id?: string
}

const empty = {
  titleEn: '',
  titleEs: '',
  descriptionEn: '',
  descriptionEs: '',
  price: '',
  zone: '',
  type: 'sale' as 'sale' | 'rent',
  status: 'available' as 'available' | 'sold' | 'rented',
  bedrooms: '',
  bathrooms: '',
  areaSqft: '',
  address: '',
  lat: '',
  lng: '',
  images: [] as string[],
  features: [] as string[],
  featured: false,
}

export default function PropertyForm({ id }: PropertyFormProps) {
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newFeature, setNewFeature] = useState('')

  useEffect(() => {
    if (!id) return
    fetch(`/api/properties/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return
        setForm({
          titleEn: data.titleEn ?? '',
          titleEs: data.titleEs ?? '',
          descriptionEn: data.descriptionEn ?? '',
          descriptionEs: data.descriptionEs ?? '',
          price: data.price ?? '',
          zone: data.zone ?? '',
          type: data.type ?? 'sale',
          status: data.status ?? 'available',
          bedrooms: data.bedrooms != null ? String(data.bedrooms) : '',
          bathrooms: data.bathrooms != null ? String(data.bathrooms) : '',
          areaSqft: data.areaSqft != null ? String(data.areaSqft) : '',
          address: data.address ?? '',
          lat: data.lat != null ? String(data.lat) : '',
          lng: data.lng != null ? String(data.lng) : '',
          images: Array.isArray(data.images) ? data.images : [],
          features: Array.isArray(data.features) ? data.features : [],
          featured: Boolean(data.featured),
        })
      })
      .catch(() => setError('No se pudo cargar la propiedad.'))
  }, [id])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function addImage(url: string) {
    update('images', [...form.images, url])
  }

  function removeImage(i: number) {
    update('images', form.images.filter((_, idx) => idx !== i))
  }

  function addFeature() {
    const v = newFeature.trim()
    if (v && !form.features.includes(v)) {
      update('features', [...form.features, v])
      setNewFeature('')
    }
  }

  function removeFeature(i: number) {
    update('features', form.features.filter((_, idx) => idx !== i))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    const payload = {
      titleEn: form.titleEn,
      titleEs: form.titleEs,
      descriptionEn: form.descriptionEn || undefined,
      descriptionEs: form.descriptionEs || undefined,
      price: Number(form.price) || 0,
      zone: form.zone,
      type: form.type,
      status: form.status,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      areaSqft: form.areaSqft ? Number(form.areaSqft) : undefined,
      address: form.address || undefined,
      lat: form.lat ? Number(form.lat) : undefined,
      lng: form.lng ? Number(form.lng) : undefined,
      images: form.images,
      features: form.features,
      featured: form.featured,
    }
    const url = id ? `/api/properties/${id}` : '/api/properties'
    const method = id ? 'PUT' : 'POST'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json().catch(() => ({}))
      
      if (!res.ok) {
        let errorMsg = 'Error al guardar. Verifica los campos requeridos.'
        if (data.error) {
          if (typeof data.error === 'string') errorMsg = data.error
          else if (data.error.message) errorMsg = data.error.message
          else if (data.error.fieldErrors) {
            errorMsg = Object.entries(data.error.fieldErrors)
              .map(([field, errs]) => `${field}: ${(errs as string[]).join(', ')}`)
              .join(' | ')
          }
        }
        setError(errorMsg)
        setSaving(false)
        return
      }
      window.location.href = id ? '/admin/properties' : `/admin/properties/${data.id}`
    } catch (err) {
      setError('Error de conexión al guardar.')
      setSaving(false)
    }
  }

  async function deleteProperty() {
    if (!id) return
    if (!window.confirm('¿Estás seguro de que quieres borrar esta propiedad? Esta acción no se puede deshacer.')) return
    
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error?.message ?? data.error ?? 'Error al borrar la propiedad')
        setSaving(false)
        return
      }
      window.location.href = '/admin/properties'
    } catch {
      setError('Error de conexión al intentar borrar.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="relative pb-24">
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Se encontraron errores</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Section 1: Información Principal */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
          <div className="border-b border-gray-900/10 bg-gray-50/50 px-6 py-4 flex items-center gap-3">
            <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-900/10">
              <Info className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Información Principal</h2>
          </div>
          <div className="p-6 grid gap-x-6 gap-y-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Título (Inglés) *</label>
              <div className="mt-2">
                <input type="text" required value={form.titleEn} onChange={(e) => update('titleEn', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="e.g. Modern Villa in Miami" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Título (Español) *</label>
              <div className="mt-2">
                <input type="text" required value={form.titleEs} onChange={(e) => update('titleEs', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="ej. Villa Moderna en Miami" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Descripción (Inglés)</label>
              <div className="mt-2">
                <textarea rows={4} value={form.descriptionEn} onChange={(e) => update('descriptionEn', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Descripción (Español)</label>
              <div className="mt-2">
                <textarea rows={4} value={form.descriptionEs} onChange={(e) => update('descriptionEs', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Detalles */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
          <div className="border-b border-gray-900/10 bg-gray-50/50 px-6 py-4 flex items-center gap-3">
            <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-900/10">
              <Home className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Detalles de la Propiedad</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Precio (USD) *</label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input type="number" required min={0} step={0.01} value={form.price} onChange={(e) => update('price', e.target.value)} className="block w-full rounded-md border-0 py-2 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Zona / Barrio *</label>
                <div className="mt-2">
                  <input type="text" required value={form.zone} onChange={(e) => update('zone', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="e.g. Brickell" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Propiedad Destacada</label>
                <div className="mt-3 flex items-center">
                  <button type="button" onClick={() => update('featured', !form.featured)} className={`${form.featured ? 'bg-brand-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2`}>
                    <span className={`${form.featured ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
                  </button>
                  <span className="ml-3 text-sm text-gray-500">Mostrar en inicio</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Tipo de Negocio *</label>
                <div className="mt-2">
                  <select value={form.type} onChange={(e) => update('type', e.target.value as any)} className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6">
                    <option value="sale">Venta</option>
                    <option value="rent">Arriendo / Renta</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Estado *</label>
                <div className="mt-2">
                  <select value={form.status} onChange={(e) => update('status', e.target.value as any)} className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6">
                    <option value="available">Disponible</option>
                    <option value="sold">Vendido</option>
                    <option value="rented">Arrendado</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Habitaciones</label>
                <div className="mt-2">
                  <input type="number" min={0} value={form.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Baños</label>
                <div className="mt-2">
                  <input type="number" min={0} step={0.5} value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Área (sqft)</label>
                <div className="mt-2">
                  <input type="number" min={0} value={form.areaSqft} onChange={(e) => update('areaSqft', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Ubicación */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
          <div className="border-b border-gray-900/10 bg-gray-50/50 px-6 py-4 flex items-center gap-3">
            <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-900/10">
              <MapPin className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Ubicación y Mapa</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">Dirección completa</label>
              <div className="mt-2">
                <input type="text" value={form.address} onChange={(e) => update('address', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="123 Ocean Drive, Miami Beach, FL" />
              </div>
            </div>
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Latitud</label>
                <div className="mt-2">
                  <input type="number" step="any" value={form.lat} onChange={(e) => update('lat', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="25.761681" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Longitud</label>
                <div className="mt-2">
                  <input type="number" step="any" value={form.lng} onChange={(e) => update('lng', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="-80.191788" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">La latitud y longitud son necesarias para mostrar la propiedad en el mapa interactivo. Puedes obtenerlas buscando la dirección en Google Maps.</p>
          </div>
        </div>

        {/* Section 4: Características */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
          <div className="border-b border-gray-900/10 bg-gray-50/50 px-6 py-4 flex items-center gap-3">
            <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-900/10">
              <List className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Características (Features)</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature() } }}
                className="block flex-1 rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                placeholder="Ej. Piscina privada, Vista al mar, Gym..."
              />
              <button type="button" onClick={addFeature} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Añadir
              </button>
            </div>
            {form.features.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No hay características añadidas.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {form.features.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-x-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {f}
                    <button type="button" onClick={() => removeFeature(i)} className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-blue-600/20">
                      <span className="sr-only">Eliminar</span>
                      <X className="h-3.5 w-3.5 text-blue-700" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Multimedia */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
          <div className="border-b border-gray-900/10 bg-gray-50/50 px-6 py-4 flex items-center gap-3">
            <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-900/10">
              <ImageIcon className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Multimedia</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">La primera imagen se utilizará como la foto principal de la propiedad.</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {form.images.map((url, i) => (
                <div key={i} className="group relative aspect-[4/3] rounded-lg bg-gray-100 overflow-hidden ring-1 ring-gray-900/10">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {i === 0 && (
                    <span className="absolute left-2 top-2 rounded-md bg-brand-600 px-2 py-1 text-xs font-medium text-white shadow-sm">
                      Principal
                    </span>
                  )}
                </div>
              ))}
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                <ImageUploader onUpload={addImage} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:left-64">
        <div className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg sm:px-6 flex items-center justify-between">
          <div className="flex gap-3">
            {id && (
              <button type="button" disabled={saving} onClick={deleteProperty} className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors">
                <Trash2 className="h-4 w-4" />
                Borrar
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <a href="/admin/properties" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Cancelar
            </a>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 transition-all">
              <Save className="h-4 w-4" />
              {saving ? 'Guardando...' : id ? 'Guardar Cambios' : 'Crear Propiedad'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
