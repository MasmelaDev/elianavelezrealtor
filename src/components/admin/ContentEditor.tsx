import { useState, useRef } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input, Textarea } from '../ui/Input'
import type { PageContentRow } from '../../types'

/* ── Section definitions ── */
interface FieldDef {
  key: string
  label: string
  type: 'short' | 'long' | 'image'
}

interface SectionDef {
  id: string
  label: string
  icon: string
  fields: FieldDef[]
}

const SECTIONS: SectionDef[] = [
  {
    id: 'hero', label: 'Hero', icon: '🏠',
    fields: [
      { key: 'hero.title', label: 'Título Principal', type: 'short' },
      { key: 'hero.subtitle', label: 'Subtítulo / Tagline', type: 'long' },
      { key: 'hero.role', label: 'Cargo (ej: Broker / Manager)', type: 'short' },
    ],
  },
  {
    id: 'about', label: 'About', icon: '👤',
    fields: [
      { key: 'about.body', label: 'Descripción Sobre Mí', type: 'long' },
    ],
  },
  {
    id: 'services', label: 'Services', icon: '🔧',
    fields: [
      { key: 'services.body', label: 'Descripción General de Servicios', type: 'long' },
      { key: 'services.buy.desc', label: 'Comprar — Descripción', type: 'long' },
      { key: 'services.sell.desc', label: 'Vender — Descripción', type: 'long' },
      { key: 'services.rent.desc', label: 'Arrendar — Descripción', type: 'long' },
    ],
  },
  {
    id: 'why', label: 'Why Choose Me', icon: '⭐',
    fields: [
      { key: 'why.subtitle', label: 'Subtítulo de sección', type: 'long' },
      { key: 'why.item1.desc', label: 'Experta Local — Descripción', type: 'long' },
      { key: 'why.item2.desc', label: 'Soporte Integral — Descripción', type: 'long' },
      { key: 'why.item3.desc', label: 'Honestidad — Descripción', type: 'long' },
    ],
  },
  {
    id: 'contact', label: 'Contact & WhatsApp', icon: '📞',
    fields: [
      { key: 'contact.whatsapp', label: 'Número de WhatsApp (incluye código de país)', type: 'short' },
    ],
  },
  {
    id: 'images', label: 'Imágenes', icon: '🖼️',
    fields: [
      { key: 'image.hero', label: 'Foto del Hero (retrato principal)', type: 'image' },
      { key: 'image.about', label: 'Foto de Sobre Mí', type: 'image' },
      { key: 'image.service.buy', label: 'Imagen de Servicio — Comprar', type: 'image' },
      { key: 'image.service.sell', label: 'Imagen de Servicio — Vender', type: 'image' },
      { key: 'image.service.rent', label: 'Imagen de Servicio — Arrendar', type: 'image' },
    ],
  },
]

export function ContentEditor({ initialData }: { initialData: PageContentRow[] }) {
  const [data, setData] = useState<Record<string, { valueEn: string; valueEs: string }>>(() => {
    const map: Record<string, { valueEn: string; valueEs: string }> = {}
    initialData.forEach((row) => { map[row.key] = { valueEn: row.valueEn, valueEs: row.valueEs } })
    return map
  })
  const [activeTab, setActiveTab] = useState('hero')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const handleChange = (key: string, field: 'valueEn' | 'valueEs', val: string) => {
    setData((prev) => ({ ...prev, [key]: { ...prev[key], [field]: val } }))
  }

  const handleSaveSection = async () => {
    const section = SECTIONS.find((s) => s.id === activeTab)
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
      showToast('success', 'Sección guardada correctamente')
    } catch {
      showToast('error', 'Error al guardar. Intenta de nuevo.')
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
      // Auto-save the image key
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, valueEn: url, valueEs: url }),
      })
      showToast('success', 'Imagen subida y guardada')
    } catch {
      showToast('error', 'Error subiendo imagen')
    }
    setUploading(null)
  }

  const activeSection = SECTIONS.find((s) => s.id === activeTab)

  return (
    <div className="mt-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg transition-all ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl bg-gray-100 p-1 mb-6">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === section.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-base">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Fields */}
      {activeSection && (
        <div className="space-y-5">
          {activeSection.fields.map((field) => {
            const values = data[field.key] || { valueEn: '', valueEs: '' }

            if (field.type === 'image') {
              return (
                <Card key={field.key} className="p-5">
                  <p className="mb-1 text-sm font-semibold text-gray-800">{field.label}</p>
                  <p className="mb-3 font-mono text-xs text-gray-400">{field.key}</p>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {/* Preview */}
                    <div className="relative h-40 w-60 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                      {values.valueEn ? (
                        <img src={values.valueEn} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-sm">Sin imagen</span>
                      )}
                      {uploading === field.key && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setUploadingKey(field.key)
                          fileInputRef.current?.click()
                        }}
                        disabled={uploading === field.key}
                      >
                        {uploading === field.key ? 'Subiendo...' : 'Cambiar imagen'}
                      </Button>
                      <p className="text-xs text-gray-400">JPG, PNG, WebP. Máx 10MB.</p>
                      {values.valueEn && (
                        <Input
                          value={values.valueEn}
                          onChange={(e) => {
                            handleChange(field.key, 'valueEn', e.target.value)
                            handleChange(field.key, 'valueEs', e.target.value)
                          }}
                          className="text-xs"
                        />
                      )}
                    </div>
                  </div>
                </Card>
              )
            }

            // Text field (short or long) with EN/ES columns
            const isLong = field.type === 'long'
            const isWhatsapp = field.key === 'contact.whatsapp'

            return (
              <Card key={field.key} className="p-5">
                <p className="mb-1 text-sm font-semibold text-gray-800">{field.label}</p>
                <p className="mb-3 font-mono text-xs text-gray-400">{field.key}</p>
                {isWhatsapp ? (
                  <div className="max-w-md">
                    <label className="mb-1 block text-xs font-medium text-gray-500">Número</label>
                    <Input
                      value={values.valueEn}
                      onChange={(e) => {
                        const raw = e.target.value
                        handleChange(field.key, 'valueEn', raw)
                        handleChange(field.key, 'valueEs', raw)
                      }}
                      placeholder="+573001234567"
                      inputMode="tel"
                    />
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="inline-block h-3 w-4 rounded-sm bg-blue-600" />
                          English
                        </span>
                      </label>
                      {isLong ? (
                        <Textarea
                          value={values.valueEn}
                          onChange={(e) => handleChange(field.key, 'valueEn', e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Input
                          value={values.valueEn}
                          onChange={(e) => handleChange(field.key, 'valueEn', e.target.value)}
                        />
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="inline-block h-3 w-4 rounded-sm bg-yellow-500" />
                          Español
                        </span>
                      </label>
                      {isLong ? (
                        <Textarea
                          value={values.valueEs}
                          onChange={(e) => handleChange(field.key, 'valueEs', e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Input
                          value={values.valueEs}
                          onChange={(e) => handleChange(field.key, 'valueEs', e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}

          {/* Save Section Button */}
          <div className="flex justify-end pt-2 pb-8">
            <Button
              onClick={handleSaveSection}
              disabled={saving}
              className="px-8"
            >
              {saving ? 'Guardando...' : `Guardar sección "${activeSection.label}"`}
            </Button>
          </div>
        </div>
      )}

      {/* Hidden file input for image uploads */}
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
