import { useState, useEffect } from 'react'
import ImageUploader from './ImageUploader'

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
      .catch(() => setError('No se pudo cargar'))
  }, [id])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const [newFeature, setNewFeature] = useState('')

  function addImage(url: string) {
    update('images', [...form.images, url])
  }

  function removeImage(i: number) {
    update('images', form.images.filter((_, idx) => idx !== i))
  }

  function addFeature() {
    const v = newFeature.trim()
    if (v) {
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
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json().catch(() => ({}))
    setSaving(false)
    if (!res.ok) {
      setError(data.error?.message ?? data.error ?? 'Error al guardar')
      return
    }
    window.location.href = id ? '/admin/properties' : `/admin/properties/${data.id}`
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-2xl space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título EN</label>
          <input type="text" required value={form.titleEn} onChange={(e) => update('titleEn', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Título ES</label>
          <input type="text" required value={form.titleEs} onChange={(e) => update('titleEs', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción EN</label>
          <textarea value={form.descriptionEn} onChange={(e) => update('descriptionEn', e.target.value)} rows={3} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción ES</label>
          <textarea value={form.descriptionEs} onChange={(e) => update('descriptionEs', e.target.value)} rows={3} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input type="number" required min={0} step={0.01} value={form.price} onChange={(e) => update('price', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Zona</label>
          <input type="text" required value={form.zone} onChange={(e) => update('zone', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select value={form.type} onChange={(e) => update('type', e.target.value as 'sale' | 'rent')} className="mt-1 w-full rounded border border-gray-300 px-3 py-2">
            <option value="sale">Venta</option>
            <option value="rent">Arriendo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select value={form.status} onChange={(e) => update('status', e.target.value as 'available' | 'sold' | 'rented')} className="mt-1 w-full rounded border border-gray-300 px-3 py-2">
            <option value="available">Disponible</option>
            <option value="sold">Vendido</option>
            <option value="rented">Arrendado</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Habitaciones</label>
          <input type="number" min={0} value={form.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Baños</label>
          <input type="number" min={0} value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Área (sqft)</label>
          <input type="number" min={0} value={form.areaSqft} onChange={(e) => update('areaSqft', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
            <span className="text-sm text-gray-700">Destacada</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dirección</label>
        <input type="text" value={form.address} onChange={(e) => update('address', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Lat</label>
          <input type="number" step="any" value={form.lat} onChange={(e) => update('lat', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lng</label>
          <input type="number" step="any" value={form.lng} onChange={(e) => update('lng', e.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Imágenes</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.images.map((url, i) => (
            <span key={i} className="relative inline-block">
              <img src={url} alt="" className="h-20 w-20 rounded object-cover" />
              <button type="button" onClick={() => removeImage(i)} className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">×</button>
            </span>
          ))}
          <ImageUploader onUpload={addImage} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Características</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.features.map((f, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm">
              {f}
              <button type="button" onClick={() => removeFeature(i)} className="text-gray-500 hover:text-red-600">×</button>
            </span>
          ))}
          <button type="button" onClick={addFeature} className="rounded border border-gray-300 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">Añadir</button>
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature() } }}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
            placeholder="Nueva característica"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50">
          {saving ? 'Guardando…' : id ? 'Guardar cambios' : 'Crear propiedad'}
        </button>
        <a href="/admin/properties" className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">Cancelar</a>
      </div>
    </form>
  )
}
