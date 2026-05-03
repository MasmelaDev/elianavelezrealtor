import { useState, useEffect } from 'react'
import ImageUploader from './ImageUploader'
import BlogEditor from '../blog/BlogEditor'
import { Save, Trash2, Image as ImageIcon, Type, Layout, Info } from 'lucide-react'

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
      .catch(() => setError('No se pudo cargar el artículo.'))
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
      window.location.href = id ? '/admin/blog' : `/admin/blog/${data.id}`
    } catch (err) {
      setError('Error de conexión al guardar.')
      setSaving(false)
    }
  }

  async function deletePost() {
    if (!id) return
    if (!window.confirm('¿Estás seguro de que quieres borrar este artículo? Esta acción no se puede deshacer.')) return
    
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error?.message ?? data.error ?? 'Error al borrar el artículo')
        setSaving(false)
        return
      }
      window.location.href = '/admin/blog'
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
          <div className="border-b border-gray-900/10 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-900/10">
                <Info className="h-5 w-5 text-brand-600" />
              </div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Información Principal</h2>
            </div>
            <div className="flex items-center">
              <span className="mr-3 text-sm font-medium text-gray-900">Publicado</span>
              <button type="button" onClick={() => update('published', !form.published)} className={`${form.published ? 'bg-brand-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2`}>
                <span className={`${form.published ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">Enlace (Slug) *</label>
              <div className="mt-2 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">elianarealtor.com/blog/</span>
                <input type="text" required pattern="[a-z0-9-]+" value={form.slug} onChange={(e) => update('slug', e.target.value.toLowerCase().replace(/\s/g, '-'))} className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 font-mono" placeholder="mi-nuevo-articulo" />
              </div>
            </div>
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Título (Inglés) *</label>
                <div className="mt-2">
                  <input type="text" required value={form.titleEn} onChange={(e) => update('titleEn', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="e.g. 5 Tips to Sell Your House" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Título (Español) *</label>
                <div className="mt-2">
                  <input type="text" required value={form.titleEs} onChange={(e) => update('titleEs', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="ej. 5 Tips para Vender tu Casa" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Extracto Corto (Inglés)</label>
                <div className="mt-2">
                  <textarea rows={2} maxLength={500} value={form.excerptEn} onChange={(e) => update('excerptEn', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Extracto Corto (Español)</label>
                <div className="mt-2">
                  <textarea rows={2} maxLength={500} value={form.excerptEs} onChange={(e) => update('excerptEs', e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Multimedia */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
          <div className="border-b border-gray-900/10 bg-gray-50/50 px-6 py-4 flex items-center gap-3">
            <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-900/10">
              <ImageIcon className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Imagen Principal</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 h-32 w-48 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                {form.coverImage ? (
                  <img src={form.coverImage} alt="Cover" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1 max-w-xl">
                <label className="block text-sm font-medium leading-6 text-gray-900">URL de la imagen de portada</label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <input type="url" value={form.coverImage} onChange={(e) => update('coverImage', e.target.value)} className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="https://..." />
                  <div className="relative inline-flex items-center rounded-r-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                    <ImageUploader onUpload={(url) => update('coverImage', url)}>Subir desde PC</ImageUploader>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Contenido */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
          <div className="border-b border-gray-900/10 bg-gray-50/50 px-6 py-4 flex items-center gap-3">
            <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-900/10">
              <Type className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Contenido del Artículo</h2>
          </div>
          <div className="p-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Contenido Completo (Inglés)</label>
              <div className="rounded-md ring-1 ring-inset ring-gray-300 overflow-hidden bg-white">
                <BlogEditor value={form.contentEn} onChange={(html) => update('contentEn', html)} minHeight="300px" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Contenido Completo (Español)</label>
              <div className="rounded-md ring-1 ring-inset ring-gray-300 overflow-hidden bg-white">
                <BlogEditor value={form.contentEs} onChange={(html) => update('contentEs', html)} minHeight="300px" />
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
              <button type="button" disabled={saving} onClick={deletePost} className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors">
                <Trash2 className="h-4 w-4" />
                Borrar
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <a href="/admin/blog" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Cancelar
            </a>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 transition-all">
              <Save className="h-4 w-4" />
              {saving ? 'Guardando...' : id ? 'Guardar Cambios' : 'Crear Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
