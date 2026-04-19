import { useState, useRef, useEffect } from 'react'
import { Button } from '../ui/Button'
import { Input, Textarea } from '../ui/Input'
import type { PageContentRow } from '../../types'

/** Map content key to section id for opening the right drawer */
function getSectionIdForKey(key: string): string | null {
  for (const s of SECTIONS) {
    if (s.fields.some((f) => f.key === key)) return s.id
  }
  return null
}

/* ── Section definitions (mirrors ContentEditor) ── */
interface FieldDef {
  key: string;
  label: string;
  type: 'short' | 'long' | 'image' | 'select';
  options?: { value: string; label: string }[];
}
interface SectionDef { id: string; label: string; icon: string; fields: FieldDef[] }

const SECTIONS: SectionDef[] = [
  {
    id: 'hero', label: 'Hero', icon: '🏠',
    fields: [
      { key: 'hero.title', label: 'Título Principal', type: 'short' },
      { key: 'hero.subtitle', label: 'Subtítulo', type: 'long' },
      { key: 'hero.tagline', label: 'Tagline (badge)', type: 'short' },
      { key: 'hero.role', label: 'Cargo', type: 'short' },
      { key: 'hero.cta.primary', label: 'Botón principal (ej. Ver Propiedades)', type: 'short' },
      { key: 'hero.cta.secondary', label: 'Botón secundario (ej. Agendar)', type: 'short' },
      { key: 'hero.badgeTitle', label: 'Badge título (ej. Cumpliendo Sueños)', type: 'short' },
      { key: 'hero.badgeDesc', label: 'Badge descripción (ej. Más de 100 familias)', type: 'short' },
      { key: 'image.hero', label: 'Foto Hero', type: 'image' },
    ],
  },
  {
    id: 'about', label: 'Sobre Mí', icon: '👤',
    fields: [
      { key: 'about.title', label: 'Título sección', type: 'short' },
      { key: 'about.badge', label: 'Badge (ej. Sobre Mí)', type: 'short' },
      { key: 'about.body', label: 'Descripción', type: 'long' },
      { key: 'about.cta', label: 'Texto botón (ej. Contáctame)', type: 'short' },
      { key: 'about.happyClients', label: 'Texto clientes felices', type: 'short' },
      { key: 'about.badgeFloatingTitle', label: 'Badge flotante en foto — Título (ej. Certified)', type: 'short' },
      { key: 'about.badgeFloatingDesc', label: 'Badge flotante en foto — Subtítulo (ej. Top Realtor)', type: 'short' },
      { key: 'image.about', label: 'Foto About', type: 'image' },
    ],
  },
  {
    id: 'services', label: 'Servicios', icon: '🔧',
    fields: [
      { key: 'services.title', label: 'Título sección', type: 'short' },
      { key: 'services.badge', label: 'Badge', type: 'short' },
      { key: 'services.body', label: 'Descripción General', type: 'long' },
      { key: 'services.buy.title', label: 'Comprar — Título', type: 'short' },
      { key: 'services.buy.desc', label: 'Comprar — Descripción', type: 'long' },
      { key: 'services.sell.title', label: 'Vender — Título', type: 'short' },
      { key: 'services.sell.desc', label: 'Vender — Descripción', type: 'long' },
      { key: 'services.rent.title', label: 'Arrendar — Título', type: 'short' },
      { key: 'services.rent.desc', label: 'Arrendar — Descripción', type: 'long' },
      { key: 'image.service.buy', label: 'Foto Comprar', type: 'image' },
      { key: 'image.service.sell', label: 'Foto Vender', type: 'image' },
      { key: 'image.service.rent', label: 'Foto Arrendar', type: 'image' },
      {
        key: 'icon.service.buy',
        label: 'Icono Comprar',
        type: 'select',
        options: [
          { value: 'home', label: 'Casa' },
          { value: 'building', label: 'Edificio' },
          { value: 'key', label: 'Llave' },
          { value: 'star', label: 'Estrella' },
          { value: 'chat', label: 'Chat' },
          { value: 'handshake', label: 'Acuerdo' },
        ],
      },
      {
        key: 'icon.service.sell',
        label: 'Icono Vender',
        type: 'select',
        options: [
          { value: 'home', label: 'Casa' },
          { value: 'building', label: 'Edificio' },
          { value: 'key', label: 'Llave' },
          { value: 'star', label: 'Estrella' },
          { value: 'chat', label: 'Chat' },
          { value: 'handshake', label: 'Acuerdo' },
        ],
      },
      {
        key: 'icon.service.rent',
        label: 'Icono Arrendar',
        type: 'select',
        options: [
          { value: 'home', label: 'Casa' },
          { value: 'building', label: 'Edificio' },
          { value: 'key', label: 'Llave' },
          { value: 'star', label: 'Estrella' },
          { value: 'chat', label: 'Chat' },
          { value: 'handshake', label: 'Acuerdo' },
        ],
      },
    ],
  },
  {
    id: 'why', label: 'Por Qué Elegirme', icon: '⭐',
    fields: [
      { key: 'why.title', label: 'Título sección', type: 'short' },
      { key: 'why.subtitle', label: 'Subtítulo', type: 'long' },
      { key: 'why.item1.title', label: 'Item 1 — Título', type: 'short' },
      { key: 'why.item1.desc', label: 'Item 1 — Descripción', type: 'long' },
      { key: 'why.item2.title', label: 'Item 2 — Título', type: 'short' },
      { key: 'why.item2.desc', label: 'Item 2 — Descripción', type: 'long' },
      { key: 'why.item3.title', label: 'Item 3 — Título', type: 'short' },
      { key: 'why.item3.desc', label: 'Item 3 — Descripción', type: 'long' },
    ],
  },
  {
    id: 'stats', label: 'Números / Stats', icon: '📊',
    fields: [
      { key: 'stats.years', label: 'Número años (ej. 10+)', type: 'short' },
      { key: 'stats.yearsLabel', label: 'Etiqueta años', type: 'short' },
      { key: 'stats.clients', label: 'Número clientes (ej. 50+)', type: 'short' },
      { key: 'stats.clientsLabel', label: 'Etiqueta clientes', type: 'short' },
      { key: 'stats.deals', label: 'Número operaciones (ej. 100+)', type: 'short' },
      { key: 'stats.dealsLabel', label: 'Etiqueta operaciones', type: 'short' },
    ],
  },
  {
    id: 'contact', label: 'Contacto y WhatsApp', icon: '📞',
    fields: [
      { key: 'contact.title', label: 'Título sección contacto', type: 'short' },
      { key: 'contact.whatsapp', label: 'Número WhatsApp', type: 'short' },
    ],
  },
  {
    id: 'testimonials', label: 'Testimonios', icon: '💬',
    fields: [
      { key: 'testimonials.title', label: 'Título sección', type: 'short' },
      { key: 'testimonials.subtitle', label: 'Subtítulo', type: 'long' },
      { key: 'testimonials.1.name', label: 'Testimonio 1 — Nombre', type: 'short' },
      { key: 'testimonials.1.role', label: 'Testimonio 1 — Rol', type: 'short' },
      { key: 'testimonials.1.content', label: 'Testimonio 1 — Texto', type: 'long' },
      { key: 'testimonials.1.image', label: 'Testimonio 1 — Foto', type: 'image' },
      { key: 'testimonials.1.rating', label: 'Testimonio 1 — Estrellas (1-5)', type: 'short' },
      { key: 'testimonials.2.name', label: 'Testimonio 2 — Nombre', type: 'short' },
      { key: 'testimonials.2.role', label: 'Testimonio 2 — Rol', type: 'short' },
      { key: 'testimonials.2.content', label: 'Testimonio 2 — Texto', type: 'long' },
      { key: 'testimonials.2.image', label: 'Testimonio 2 — Foto', type: 'image' },
      { key: 'testimonials.2.rating', label: 'Testimonio 2 — Estrellas (1-5)', type: 'short' },
      { key: 'testimonials.3.name', label: 'Testimonio 3 — Nombre', type: 'short' },
      { key: 'testimonials.3.role', label: 'Testimonio 3 — Rol', type: 'short' },
      { key: 'testimonials.3.content', label: 'Testimonio 3 — Texto', type: 'long' },
      { key: 'testimonials.3.image', label: 'Testimonio 3 — Foto', type: 'image' },
      { key: 'testimonials.3.rating', label: 'Testimonio 3 — Estrellas (1-5)', type: 'short' },
    ],
  },
]

export function LiveEditor({ initialData }: { initialData: PageContentRow[] }) {
  const [data, setData] = useState<Record<string, { valueEn: string; valueEs: string }>>(() => {
    const map: Record<string, { valueEn: string; valueEs: string }> = {}
    initialData.forEach((r) => { map[r.key] = { valueEn: r.valueEn, valueEs: r.valueEs } })
    return map
  })

  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [pendingScrollKey, setPendingScrollKey] = useState<string | null>(null)
  const [previewLang, setPreviewLang] = useState<'es' | 'en'>('es')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fieldRefsMap = useRef<Record<string, HTMLDivElement | null>>({})

  // Listen for EDIT_FIELD from iframe (true inline visual editor)
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type !== 'EDIT_FIELD' || !e.data?.key) return
      const key = e.data.key as string
      const sectionId = getSectionIdForKey(key)
      if (sectionId) {
        setActiveSection(sectionId)
        setPendingScrollKey(key)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  // When section opened and we have a pending key, scroll to that field and focus
  useEffect(() => {
    if (!pendingScrollKey || !activeSection) return
    const el = fieldRefsMap.current[pendingScrollKey]
    if (!el) return
    const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      input?.focus()
    })
    setPendingScrollKey(null)
  }, [activeSection, pendingScrollKey])

  // Live preview: send current data to iframe when it changes (so user sees changes as they type; save button persists)
  useEffect(() => {
    const t = setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: 'UPDATE_PREVIEW', data, lang: previewLang },
          '*'
        )
      }
    }, 100)
    return () => clearTimeout(t)
  }, [data, previewLang])

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (key: string, field: 'valueEn' | 'valueEs', val: string) => {
    setData((prev) => ({ ...prev, [key]: { ...(prev[key] || { valueEn: '', valueEs: '' }), [field]: val } }))
  }

  const handleSave = async () => {
    const section = SECTIONS.find((s) => s.id === activeSection)
    if (!section) return
    setSaving(true)
    try {
      for (const field of section.fields) {
        const values = data[field.key]
        if (!values) continue
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: field.key, valueEn: values.valueEn, valueEs: values.valueEs }),
        })
      }
      showToast('success', 'Guardado — recargando preview...')
      // Reload iframe
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.src
        }
      }, 300)
    } catch {
      showToast('error', 'Error al guardar')
    }
    setSaving(false)
  }

  const handleImageUpload = async (key: string, file: File) => {
    setUploading(key)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload/image', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = await res.json()
      setData((prev) => ({ ...prev, [key]: { valueEn: url, valueEs: url } }))
      // Auto save
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, valueEn: url, valueEs: url }),
      })
      showToast('success', 'Imagen subida — recargando...')
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = iframeRef.current.src
      }, 300)
    } catch {
      showToast('error', 'Error subiendo imagen')
    }
    setUploading(null)
  }

  const currentSection = SECTIONS.find((s) => s.id === activeSection)

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[60] rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* ── LEFT: Iframe Preview ── */}
      <div className="flex-1 relative bg-gray-100">
        {/* Lang Toggle */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-lg bg-white shadow-md border p-1">
          <button
            onClick={() => setPreviewLang('es')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              previewLang === 'es' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
          >ES</button>
          <button
            onClick={() => setPreviewLang('en')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              previewLang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
          >EN</button>
        </div>

        <iframe
          ref={iframeRef}
          src={`/${previewLang}/?editor=true`}
          className="h-full w-full border-0"
          title="Preview"
        />
      </div>

      {/* ── RIGHT: Editor Panel ── */}
      <div className="w-[380px] border-l border-gray-200 bg-white flex flex-col overflow-hidden">
        {/* Section Buttons */}
        <div className="p-3 border-b border-gray-100 bg-gray-50">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Selecciona una sección</p>
          <div className="flex flex-wrap gap-1.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id === activeSection ? null : s.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                  activeSection === s.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Edit Fields */}
        <div className="flex-1 overflow-y-auto p-4">
          {!currentSection && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <svg className="h-12 w-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <p className="text-sm font-medium">Selecciona una sección para editar</p>
              <p className="text-xs mt-1">Los cambios se reflejan al instante en la vista previa</p>
            </div>
          )}

          {currentSection && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>{currentSection.icon}</span>
                {currentSection.label}
              </h3>

              {currentSection.fields.map((field) => {
                const values = data[field.key] || { valueEn: '', valueEs: '' }
                const isImage = field.type === 'image'
                const isWhatsapp = field.key === 'contact.whatsapp'
                const isSelect = field.type === 'select'

                if (isImage) {
                  return (
                    <div
                      key={field.key}
                      ref={(el) => { fieldRefsMap.current[field.key] = el }}
                      data-field-key={field.key}
                      className="rounded-xl border border-gray-100 p-3 bg-gray-50"
                    >
                      <p className="text-xs font-semibold text-gray-700 mb-2">{field.label}</p>
                      <div className="relative h-28 w-full rounded-lg overflow-hidden bg-gray-200 mb-2">
                        {values.valueEn ? (
                          <img src={values.valueEn} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400 text-xs">Sin imagen</div>
                        )}
                        {uploading === field.key && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent" />
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => { setUploadingKey(field.key); fileInputRef.current?.click() }}
                        disabled={uploading === field.key}
                        className="w-full text-xs"
                      >
                        {uploading === field.key ? 'Subiendo...' : 'Cambiar imagen'}
                      </Button>
                    </div>
                  )
                }

                if (isWhatsapp) {
                  return (
                    <div
                      key={field.key}
                      ref={(el) => { fieldRefsMap.current[field.key] = el }}
                      data-field-key={field.key}
                      className="rounded-xl border border-gray-100 p-3 bg-gray-50"
                    >
                      <p className="text-xs font-semibold text-gray-700 mb-2">{field.label}</p>
                      <Input
                        value={values.valueEn}
                        onChange={(e) => {
                          const raw = e.target.value
                          handleChange(field.key, 'valueEn', raw)
                          handleChange(field.key, 'valueEs', raw)
                        }}
                        placeholder="+573001234567"
                        inputMode="tel"
                        className="text-sm"
                      />
                    </div>
                  )
                }

                if (isSelect) {
                  const selectValue = values.valueEn || values.valueEs || ''
                  return (
                    <div
                      key={field.key}
                      ref={(el) => { fieldRefsMap.current[field.key] = el }}
                      data-field-key={field.key}
                      className="rounded-xl border border-gray-100 p-3 bg-gray-50"
                    >
                      <p className="text-xs font-semibold text-gray-700 mb-1">{field.label}</p>
                      <p className="text-[10px] text-gray-400 mb-2">Este icono aplica igual para EN y ES.</p>
                      <select
                        value={selectValue}
                        onChange={(e) => {
                          handleChange(field.key, 'valueEn', e.target.value)
                          handleChange(field.key, 'valueEs', e.target.value)
                        }}
                        className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Usar icono por defecto</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                }

                return (
                  <div
                    key={field.key}
                    ref={(el) => { fieldRefsMap.current[field.key] = el }}
                    data-field-key={field.key}
                    className="rounded-xl border border-gray-100 p-3 bg-gray-50"
                  >
                    <p className="text-xs font-semibold text-gray-700 mb-2">{field.label}</p>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] font-medium text-gray-400 flex items-center gap-1 mb-1">
                          <span className="inline-block h-2 w-3 rounded-sm bg-blue-600" />EN
                        </label>
                        {field.type === 'long' ? (
                          <Textarea value={values.valueEn} onChange={(e) => handleChange(field.key, 'valueEn', e.target.value)} rows={2} className="text-sm" />
                        ) : (
                          <Input value={values.valueEn} onChange={(e) => handleChange(field.key, 'valueEn', e.target.value)} className="text-sm" />
                        )}
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-gray-400 flex items-center gap-1 mb-1">
                          <span className="inline-block h-2 w-3 rounded-sm bg-yellow-500" />ES
                        </label>
                        {field.type === 'long' ? (
                          <Textarea value={values.valueEs} onChange={(e) => handleChange(field.key, 'valueEs', e.target.value)} rows={2} className="text-sm" />
                        ) : (
                          <Input value={values.valueEs} onChange={(e) => handleChange(field.key, 'valueEs', e.target.value)} className="text-sm" />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Save Footer */}
        {currentSection && (
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? 'Guardando...' : 'Guardar y Actualizar Preview'}
            </Button>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file && uploadingKey) {
            handleImageUpload(uploadingKey, file)
            setUploadingKey(null)
          }
          e.target.value = ''
        }}
      />
    </div>
  )
}
