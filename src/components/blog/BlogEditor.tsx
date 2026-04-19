import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface BlogEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: string
}

export default function BlogEditor({ value, onChange, placeholder = 'Escribe aquí…', minHeight = '200px' }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[200px] p-3 focus:outline-none rounded border border-gray-300',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

  if (!editor) return <div className="rounded border border-gray-300 bg-white" style={{ minHeight }}>Cargando…</div>

  return (
    <div className="rounded border border-gray-300 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`rounded px-2 py-1 text-sm ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`rounded px-2 py-1 text-sm ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
          <em>I</em>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`rounded px-2 py-1 text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`rounded px-2 py-1 text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
          H3
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`rounded px-2 py-1 text-sm ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
          Lista
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
