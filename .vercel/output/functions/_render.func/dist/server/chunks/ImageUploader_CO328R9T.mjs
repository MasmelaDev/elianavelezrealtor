import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';

function ImageUploader({ onUpload, children, accept = "image/*" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload/image", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onUpload(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { className: "inline-block cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50", children: [
      /* @__PURE__ */ jsx("input", { type: "file", accept, className: "hidden", onChange: handleChange, disabled: loading }),
      loading ? "Subiendo…" : children ?? "Subir imagen"
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: error })
  ] });
}

export { ImageUploader as I };
