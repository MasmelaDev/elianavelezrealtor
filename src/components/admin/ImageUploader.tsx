import type { ReactNode } from 'react'
import { useState } from 'react'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  children?: ReactNode
  accept?: string
}

export default function ImageUploader({ onUpload, children, accept = 'image/*' }: ImageUploaderProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload/image', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Upload failed')
      onUpload(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setLoading(false)
      e.target.value = ''
    }
  }

  return (
    <div>
      <label className="inline-block cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
        <input type="file" accept={accept} className="hidden" onChange={handleChange} disabled={loading} />
        {loading ? 'Subiendo…' : children ?? 'Subir imagen'}
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
