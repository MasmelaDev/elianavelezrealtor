import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_0t14V1Lw.mjs';
import { d as db, p as pageContent } from '../../chunks/schema_CP1qSdhM.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef } from 'react';
import { C as Card } from '../../chunks/Card_mlP6s3gF.mjs';
import { B as Button, I as Input, T as Textarea } from '../../chunks/Input_CMCGEBv1.mjs';
export { renderers } from '../../renderers.mjs';

const SECTIONS = [
  {
    id: "hero",
    label: "Hero",
    icon: "🏠",
    fields: [
      { key: "hero.title", label: "Título Principal", type: "short" },
      { key: "hero.subtitle", label: "Subtítulo / Tagline", type: "long" },
      { key: "hero.role", label: "Cargo (ej: Broker / Manager)", type: "short" }
    ]
  },
  {
    id: "about",
    label: "About",
    icon: "👤",
    fields: [
      { key: "about.body", label: "Descripción Sobre Mí", type: "long" }
    ]
  },
  {
    id: "services",
    label: "Services",
    icon: "🔧",
    fields: [
      { key: "services.body", label: "Descripción General de Servicios", type: "long" },
      { key: "services.buy.desc", label: "Comprar — Descripción", type: "long" },
      { key: "services.sell.desc", label: "Vender — Descripción", type: "long" },
      { key: "services.rent.desc", label: "Arrendar — Descripción", type: "long" }
    ]
  },
  {
    id: "why",
    label: "Why Choose Me",
    icon: "⭐",
    fields: [
      { key: "why.subtitle", label: "Subtítulo de sección", type: "long" },
      { key: "why.item1.desc", label: "Experta Local — Descripción", type: "long" },
      { key: "why.item2.desc", label: "Soporte Integral — Descripción", type: "long" },
      { key: "why.item3.desc", label: "Honestidad — Descripción", type: "long" }
    ]
  },
  {
    id: "contact",
    label: "Contact & WhatsApp",
    icon: "📞",
    fields: [
      { key: "contact.whatsapp", label: "Número de WhatsApp (incluye código de país)", type: "short" }
    ]
  },
  {
    id: "images",
    label: "Imágenes",
    icon: "🖼️",
    fields: [
      { key: "image.hero", label: "Foto del Hero (retrato principal)", type: "image" },
      { key: "image.about", label: "Foto de Sobre Mí", type: "image" },
      { key: "image.service.buy", label: "Imagen de Servicio — Comprar", type: "image" },
      { key: "image.service.sell", label: "Imagen de Servicio — Vender", type: "image" },
      { key: "image.service.rent", label: "Imagen de Servicio — Arrendar", type: "image" }
    ]
  }
];
function ContentEditor({ initialData }) {
  const [data, setData] = useState(() => {
    const map = {};
    initialData.forEach((row) => {
      map[row.key] = { valueEn: row.valueEn, valueEs: row.valueEs };
    });
    return map;
  });
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [uploading, setUploading] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadingKey, setUploadingKey] = useState(null);
  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };
  const handleChange = (key, field, val) => {
    setData((prev) => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
  };
  const handleSaveSection = async () => {
    const section = SECTIONS.find((s) => s.id === activeTab);
    if (!section) return;
    setSaving(true);
    try {
      for (const field of section.fields) {
        const values = data[field.key];
        if (!values) continue;
        await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: field.key, valueEn: values.valueEn, valueEs: values.valueEs })
        });
      }
      showToast("success", "Sección guardada correctamente");
    } catch {
      showToast("error", "Error al guardar. Intenta de nuevo.");
    }
    setSaving(false);
  };
  const handleImageUpload = async (key, file) => {
    setUploading(key);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload/image", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setData((prev) => ({ ...prev, [key]: { valueEn: url, valueEs: url } }));
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, valueEn: url, valueEs: url })
      });
      showToast("success", "Imagen subida y guardada");
    } catch {
      showToast("error", "Error subiendo imagen");
    }
    setUploading(null);
  };
  const activeSection = SECTIONS.find((s) => s.id === activeTab);
  return /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
    toast && /* @__PURE__ */ jsx("div", { className: `fixed top-4 right-4 z-50 rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg transition-all ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`, children: toast.msg }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 rounded-xl bg-gray-100 p-1 mb-6", children: SECTIONS.map((section) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setActiveTab(section.id),
        className: `flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === section.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-base", children: section.icon }),
          section.label
        ]
      },
      section.id
    )) }),
    activeSection && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
      activeSection.fields.map((field) => {
        const values = data[field.key] || { valueEn: "", valueEs: "" };
        if (field.type === "image") {
          return /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-sm font-semibold text-gray-800", children: field.label }),
            /* @__PURE__ */ jsx("p", { className: "mb-3 font-mono text-xs text-gray-400", children: field.key }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative h-40 w-60 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center", children: [
                values.valueEn ? /* @__PURE__ */ jsx("img", { src: values.valueEn, alt: "Preview", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm", children: "Sin imagen" }),
                uploading === field.key && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "secondary",
                    onClick: () => {
                      setUploadingKey(field.key);
                      fileInputRef.current?.click();
                    },
                    disabled: uploading === field.key,
                    children: uploading === field.key ? "Subiendo..." : "Cambiar imagen"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "JPG, PNG, WebP. Máx 10MB." }),
                values.valueEn && /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: values.valueEn,
                    onChange: (e) => {
                      handleChange(field.key, "valueEn", e.target.value);
                      handleChange(field.key, "valueEs", e.target.value);
                    },
                    className: "text-xs"
                  }
                )
              ] })
            ] })
          ] }, field.key);
        }
        const isLong = field.type === "long";
        const isWhatsapp = field.key === "contact.whatsapp";
        return /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-sm font-semibold text-gray-800", children: field.label }),
          /* @__PURE__ */ jsx("p", { className: "mb-3 font-mono text-xs text-gray-400", children: field.key }),
          isWhatsapp ? /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
            /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-gray-500", children: "Número" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: values.valueEn,
                onChange: (e) => {
                  handleChange(field.key, "valueEn", e.target.value);
                  handleChange(field.key, "valueEs", e.target.value);
                },
                placeholder: "+573001234567"
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-gray-500", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("span", { className: "inline-block h-3 w-4 rounded-sm bg-blue-600" }),
                "English"
              ] }) }),
              isLong ? /* @__PURE__ */ jsx(
                Textarea,
                {
                  value: values.valueEn,
                  onChange: (e) => handleChange(field.key, "valueEn", e.target.value),
                  rows: 4
                }
              ) : /* @__PURE__ */ jsx(
                Input,
                {
                  value: values.valueEn,
                  onChange: (e) => handleChange(field.key, "valueEn", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-gray-500", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("span", { className: "inline-block h-3 w-4 rounded-sm bg-yellow-500" }),
                "Español"
              ] }) }),
              isLong ? /* @__PURE__ */ jsx(
                Textarea,
                {
                  value: values.valueEs,
                  onChange: (e) => handleChange(field.key, "valueEs", e.target.value),
                  rows: 4
                }
              ) : /* @__PURE__ */ jsx(
                Input,
                {
                  value: values.valueEs,
                  onChange: (e) => handleChange(field.key, "valueEs", e.target.value)
                }
              )
            ] })
          ] })
        ] }, field.key);
      }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-2 pb-8", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleSaveSection,
          disabled: saving,
          className: "px-8",
          children: saving ? "Guardando..." : `Guardar sección "${activeSection.label}"`
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/jpeg,image/png,image/webp,image/avif",
        className: "hidden",
        onChange: (e) => {
          const file = e.target.files?.[0];
          if (file && uploadingKey) {
            handleImageUpload(uploadingKey, file);
            setUploadingKey(null);
          }
          e.target.value = "";
        }
      }
    )
  ] });
}

const $$Content = createComponent(async ($$result, $$props, $$slots) => {
  const list = await db.select().from(pageContent);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Contenido" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-semibold text-gray-900">Contenido de la Página</h1> <p class="mt-2 text-sm text-gray-600">Edita todos los textos (EN/ES) e imágenes que se muestran en la página. Los cambios se reflejan inmediatamente.</p> ${renderComponent($$result2, "ContentEditor", ContentEditor, { "client:load": true, "initialData": list, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/admin/ContentEditor", "client:component-export": "ContentEditor" })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/content.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/content.astro";
const $$url = "/admin/content";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Content,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
