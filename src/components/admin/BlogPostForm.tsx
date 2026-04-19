import { useState, useEffect } from 'react'
import ImageUploader from './ImageUploader'
import BlogEditor from '../blog/BlogEditor'

interface BlogPostFormProps {
  id?: string
}

const empty = {
  slug: '',
  titleEn: '',
  titleEs: '',
  contentEn: '',
  contentEs: '',
  excerptEn: '',
  excerptEs: '',
  coverImage: '',
  published: false,
}

export default function BlogPostForm({ id }: BlogPostFormProps) {
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/blog/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return
        setForm({
          slug: data.slug ?? '',
          titleEn: data.titleEn ?? '',
          titleEs: data.titleEs ?? '',
          contentEn: data.contentEn ?? '',
          contentEs: data.contentEs ?? '',
          excerptEn: data.excerptEn ?? '',
          excerptEs: data.excerptEs ?? '',
          coverImage: data.coverImage ?? '',
          published: Boolean(data.published),
        })
      })
      .catch(() => setError('No se pudo cargar'))
  }, [id])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    const payload = {
      slug: form.slug,
      titleEn: form.titleEn,
      titleEs: form.titleEs,
      contentEn: form.contentEn || undefined,
      contentEs: form.contentEs || undefined,
      excerptEn: form.excerptEn || undefined,
      excerptEs: form.excerptEs || undefined,
      coverImage: form.coverImage || undefined,
      published: form.published,
    }
    const url = id ? `/api/blog/${id}` : '/api/blog'
    const method = id ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json().catch(() => ({}))
    setSaving(false)
    if (!res.ok) {
      setError(typeof data.error === 'object' ? JSON.stringify(data.error) : data.error ?? 'Error al guardar')
      return
    }
    window.location.href = id ? '/admin/blog' : `/admin/blog/${data.id}`
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-2xl space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Slug (solo minúsculas, guiones)</label>
        <input type="text" required pattern="[a-z0-9-]+" value={form.slug} onChange={(e) => update('slug', e.target.value.toLowerCase().replace(/\s/g, '-'))} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono" placeholder="mi-post" />
      </div>
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
          <label className="block text-sm font-medium text-gray-700">Extracto EN</label>
          <textarea value={form.excerptEn} onChange={(e) => update('excerptEn', e.target.value)} maxLength={500} rows={2} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Extracto ES</label>
          <textarea value={form.excerptEs} onChange={(e) => update('excerptEs', e.target.value)} maxLength={500} rows={2} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen de portada (URL)</label>
        <div className="mt-2 flex items-center gap-2">
          <input type="url" value={form.coverImage} onChange={(e) => update('coverImage', e.target.value)} className="flex-1 rounded border border-gray-300 px-3 py-2" placeholder="https://..." />
          <ImageUploader onUpload={(url) => update('coverImage', url)}>Subir imagen</ImageUploader>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Contenido EN</label>
          <div className="mt-1">
            <BlogEditor value={form.contentEn} onChange={(html) => update('contentEn', html)} minHeight="240px" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contenido ES</label>
          <div className="mt-1">
            <BlogEditor value={form.contentEs} onChange={(html) => update('contentEs', html)} minHeight="240px" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="published" checked={form.published} onChange={(e) => update('published', e.target.checked)} />
        <label htmlFor="published" className="text-sm text-gray-700">Publicado</label>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50">
          {saving ? 'Guardando…' : id ? 'Guardar cambios' : 'Crear post'}
        </button>
        <a href="/admin/blog" className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">Cancelar</a>
      </div>
    </form>
  )
}
