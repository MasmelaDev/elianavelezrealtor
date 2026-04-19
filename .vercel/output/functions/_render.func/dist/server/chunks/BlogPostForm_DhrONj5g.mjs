import { jsx, jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { I as ImageUploader } from './ImageUploader_CO328R9T.mjs';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

function BlogEditor({ value, onChange, placeholder = "Escribe aquí…", minHeight = "200px" }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[200px] p-3 focus:outline-none rounded border border-gray-300"
      }
    },
    onUpdate: ({ editor: editor2 }) => {
      onChange(editor2.getHTML());
    }
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);
  if (!editor) return /* @__PURE__ */ jsx("div", { className: "rounded border border-gray-300 bg-white", style: { minHeight }, children: "Cargando…" });
  return /* @__PURE__ */ jsxs("div", { className: "rounded border border-gray-300 bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-1", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => editor.chain().focus().toggleBold().run(), className: `rounded px-2 py-1 text-sm ${editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"}`, children: /* @__PURE__ */ jsx("strong", { children: "B" }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => editor.chain().focus().toggleItalic().run(), className: `rounded px-2 py-1 text-sm ${editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"}`, children: /* @__PURE__ */ jsx("em", { children: "I" }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), className: `rounded px-2 py-1 text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : "hover:bg-gray-100"}`, children: "H2" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), className: `rounded px-2 py-1 text-sm ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : "hover:bg-gray-100"}`, children: "H3" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => editor.chain().focus().toggleBulletList().run(), className: `rounded px-2 py-1 text-sm ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`, children: "Lista" })
    ] }),
    /* @__PURE__ */ jsx(EditorContent, { editor })
  ] });
}

const empty = {
  slug: "",
  titleEn: "",
  titleEs: "",
  contentEn: "",
  contentEs: "",
  excerptEn: "",
  excerptEs: "",
  coverImage: "",
  published: false
};
function BlogPostForm({ id }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    fetch(`/api/blog/${id}`).then((r) => r.json()).then((data) => {
      if (data.error) return;
      setForm({
        slug: data.slug ?? "",
        titleEn: data.titleEn ?? "",
        titleEs: data.titleEs ?? "",
        contentEn: data.contentEn ?? "",
        contentEs: data.contentEs ?? "",
        excerptEn: data.excerptEn ?? "",
        excerptEs: data.excerptEs ?? "",
        coverImage: data.coverImage ?? "",
        published: Boolean(data.published)
      });
    }).catch(() => setError("No se pudo cargar"));
  }, [id]);
  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  async function submit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      slug: form.slug,
      titleEn: form.titleEn,
      titleEs: form.titleEs,
      contentEn: form.contentEn || void 0,
      contentEs: form.contentEs || void 0,
      excerptEn: form.excerptEn || void 0,
      excerptEs: form.excerptEs || void 0,
      coverImage: form.coverImage || void 0,
      published: form.published
    };
    const url = id ? `/api/blog/${id}` : "/api/blog";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(typeof data.error === "object" ? JSON.stringify(data.error) : data.error ?? "Error al guardar");
      return;
    }
    window.location.href = id ? "/admin/blog" : `/admin/blog/${data.id}`;
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 max-w-2xl space-y-4", children: [
    error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Slug (solo minúsculas, guiones)" }),
      /* @__PURE__ */ jsx("input", { type: "text", required: true, pattern: "[a-z0-9-]+", value: form.slug, onChange: (e) => update("slug", e.target.value.toLowerCase().replace(/\s/g, "-")), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono", placeholder: "mi-post" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Título EN" }),
        /* @__PURE__ */ jsx("input", { type: "text", required: true, value: form.titleEn, onChange: (e) => update("titleEn", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Título ES" }),
        /* @__PURE__ */ jsx("input", { type: "text", required: true, value: form.titleEs, onChange: (e) => update("titleEs", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Extracto EN" }),
        /* @__PURE__ */ jsx("textarea", { value: form.excerptEn, onChange: (e) => update("excerptEn", e.target.value), maxLength: 500, rows: 2, className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Extracto ES" }),
        /* @__PURE__ */ jsx("textarea", { value: form.excerptEs, onChange: (e) => update("excerptEs", e.target.value), maxLength: 500, rows: 2, className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Imagen de portada (URL)" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("input", { type: "url", value: form.coverImage, onChange: (e) => update("coverImage", e.target.value), className: "flex-1 rounded border border-gray-300 px-3 py-2", placeholder: "https://..." }),
        /* @__PURE__ */ jsx(ImageUploader, { onUpload: (url) => update("coverImage", url), children: "Subir imagen" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Contenido EN" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(BlogEditor, { value: form.contentEn, onChange: (html) => update("contentEn", html), minHeight: "240px" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Contenido ES" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(BlogEditor, { value: form.contentEs, onChange: (html) => update("contentEs", html), minHeight: "240px" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", id: "published", checked: form.published, onChange: (e) => update("published", e.target.checked) }),
      /* @__PURE__ */ jsx("label", { htmlFor: "published", className: "text-sm text-gray-700", children: "Publicado" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50", children: saving ? "Guardando…" : id ? "Guardar cambios" : "Crear post" }),
      /* @__PURE__ */ jsx("a", { href: "/admin/blog", className: "rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50", children: "Cancelar" })
    ] })
  ] });
}

export { BlogPostForm as B };
