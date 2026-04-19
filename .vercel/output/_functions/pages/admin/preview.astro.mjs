import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_0t14V1Lw.mjs';
import { d as db, p as pageContent } from '../../chunks/schema_CP1qSdhM.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { B as Button, I as Input, T as Textarea } from '../../chunks/Input_CMCGEBv1.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

function getSectionIdForKey(key) {
  for (const s of SECTIONS) {
    if (s.fields.some((f) => f.key === key)) return s.id;
  }
  return null;
}
const SECTIONS = [
  {
    id: "hero",
    label: "Hero",
    icon: "🏠",
    fields: [
      { key: "hero.title", label: "Título Principal", type: "short" },
      { key: "hero.subtitle", label: "Subtítulo", type: "long" },
      { key: "hero.tagline", label: "Tagline (badge)", type: "short" },
      { key: "hero.role", label: "Cargo", type: "short" },
      { key: "hero.cta.primary", label: "Botón principal (ej. Ver Propiedades)", type: "short" },
      { key: "hero.cta.secondary", label: "Botón secundario (ej. Agendar)", type: "short" },
      { key: "hero.badgeTitle", label: "Badge título (ej. Cumpliendo Sueños)", type: "short" },
      { key: "hero.badgeDesc", label: "Badge descripción (ej. Más de 100 familias)", type: "short" },
      { key: "image.hero", label: "Foto Hero", type: "image" }
    ]
  },
  {
    id: "about",
    label: "Sobre Mí",
    icon: "👤",
    fields: [
      { key: "about.title", label: "Título sección", type: "short" },
      { key: "about.badge", label: "Badge (ej. Sobre Mí)", type: "short" },
      { key: "about.body", label: "Descripción", type: "long" },
      { key: "about.cta", label: "Texto botón (ej. Contáctame)", type: "short" },
      { key: "about.happyClients", label: "Texto clientes felices", type: "short" },
      { key: "image.about", label: "Foto About", type: "image" }
    ]
  },
  {
    id: "services",
    label: "Servicios",
    icon: "🔧",
    fields: [
      { key: "services.title", label: "Título sección", type: "short" },
      { key: "services.badge", label: "Badge", type: "short" },
      { key: "services.body", label: "Descripción General", type: "long" },
      { key: "services.buy.title", label: "Comprar — Título", type: "short" },
      { key: "services.buy.desc", label: "Comprar — Descripción", type: "long" },
      { key: "services.sell.title", label: "Vender — Título", type: "short" },
      { key: "services.sell.desc", label: "Vender — Descripción", type: "long" },
      { key: "services.rent.title", label: "Arrendar — Título", type: "short" },
      { key: "services.rent.desc", label: "Arrendar — Descripción", type: "long" },
      { key: "image.service.buy", label: "Foto Comprar", type: "image" },
      { key: "image.service.sell", label: "Foto Vender", type: "image" },
      { key: "image.service.rent", label: "Foto Arrendar", type: "image" }
    ]
  },
  {
    id: "why",
    label: "Por Qué Elegirme",
    icon: "⭐",
    fields: [
      { key: "why.title", label: "Título sección", type: "short" },
      { key: "why.subtitle", label: "Subtítulo", type: "long" },
      { key: "why.item1.title", label: "Item 1 — Título", type: "short" },
      { key: "why.item1.desc", label: "Item 1 — Descripción", type: "long" },
      { key: "why.item2.title", label: "Item 2 — Título", type: "short" },
      { key: "why.item2.desc", label: "Item 2 — Descripción", type: "long" },
      { key: "why.item3.title", label: "Item 3 — Título", type: "short" },
      { key: "why.item3.desc", label: "Item 3 — Descripción", type: "long" }
    ]
  },
  {
    id: "contact",
    label: "Contacto y WhatsApp",
    icon: "📞",
    fields: [
      { key: "contact.title", label: "Título sección contacto", type: "short" },
      { key: "contact.whatsapp", label: "Número WhatsApp", type: "short" }
    ]
  }
];
function LiveEditor({ initialData }) {
  const [data, setData] = useState(() => {
    const map = {};
    initialData.forEach((r) => {
      map[r.key] = { valueEn: r.valueEn, valueEs: r.valueEs };
    });
    return map;
  });
  const [activeSection, setActiveSection] = useState(null);
  const [pendingScrollKey, setPendingScrollKey] = useState(null);
  const [previewLang, setPreviewLang] = useState("es");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [uploadingKey, setUploadingKey] = useState(null);
  const iframeRef = useRef(null);
  const fileInputRef = useRef(null);
  const fieldRefsMap = useRef({});
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type !== "EDIT_FIELD" || !e.data?.key) return;
      const key = e.data.key;
      const sectionId = getSectionIdForKey(key);
      if (sectionId) {
        setActiveSection(sectionId);
        setPendingScrollKey(key);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
  useEffect(() => {
    if (!pendingScrollKey || !activeSection) return;
    const el = fieldRefsMap.current[pendingScrollKey];
    if (!el) return;
    const input = el.querySelector("input, textarea");
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      input?.focus();
    });
    setPendingScrollKey(null);
  }, [activeSection, pendingScrollKey]);
  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3e3);
  };
  const handleChange = (key, field, val) => {
    setData((prev) => ({ ...prev, [key]: { ...prev[key] || { valueEn: "", valueEs: "" }, [field]: val } }));
  };
  const handleSave = async () => {
    const section = SECTIONS.find((s) => s.id === activeSection);
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
      showToast("success", "Guardado — recargando preview...");
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.src;
        }
      }, 300);
    } catch {
      showToast("error", "Error al guardar");
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
      showToast("success", "Imagen subida — recargando...");
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
      }, 300);
    } catch {
      showToast("error", "Error subiendo imagen");
    }
    setUploading(null);
  };
  const currentSection = SECTIONS.find((s) => s.id === activeSection);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-3.5rem)] overflow-hidden", children: [
    toast && /* @__PURE__ */ jsx("div", { className: `fixed top-4 right-4 z-[60] rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`, children: toast.msg }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 relative bg-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute top-3 right-3 z-10 flex items-center gap-1 rounded-lg bg-white shadow-md border p-1", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setPreviewLang("es"),
            className: `px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${previewLang === "es" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-800"}`,
            children: "ES"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setPreviewLang("en"),
            className: `px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${previewLang === "en" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-800"}`,
            children: "EN"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "iframe",
        {
          ref: iframeRef,
          src: `/${previewLang}/?editor=true`,
          className: "h-full w-full border-0",
          title: "Preview"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[380px] border-l border-gray-200 bg-white flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-3 border-b border-gray-100 bg-gray-50", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2", children: "Selecciona una sección" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: SECTIONS.map((s) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveSection(s.id === activeSection ? null : s.id),
            className: `flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${activeSection === s.id ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"}`,
            children: [
              /* @__PURE__ */ jsx("span", { children: s.icon }),
              s.label
            ]
          },
          s.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4", children: [
        !currentSection && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center text-gray-400", children: [
          /* @__PURE__ */ jsx("svg", { className: "h-12 w-12 mb-3 text-gray-300", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Selecciona una sección para editar" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mt-1", children: "Los cambios se reflejan al instante en la vista previa" })
        ] }),
        currentSection && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-gray-800 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { children: currentSection.icon }),
            currentSection.label
          ] }),
          currentSection.fields.map((field) => {
            const values = data[field.key] || { valueEn: "", valueEs: "" };
            const isImage = field.type === "image";
            const isWhatsapp = field.key === "contact.whatsapp";
            if (isImage) {
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  ref: (el) => {
                    fieldRefsMap.current[field.key] = el;
                  },
                  "data-field-key": field.key,
                  className: "rounded-xl border border-gray-100 p-3 bg-gray-50",
                  children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-700 mb-2", children: field.label }),
                    /* @__PURE__ */ jsxs("div", { className: "relative h-28 w-full rounded-lg overflow-hidden bg-gray-200 mb-2", children: [
                      values.valueEn ? /* @__PURE__ */ jsx("img", { src: values.valueEn, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full text-gray-400 text-xs", children: "Sin imagen" }),
                      uploading === field.key && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent" }) })
                    ] }),
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
                        className: "w-full text-xs",
                        children: uploading === field.key ? "Subiendo..." : "Cambiar imagen"
                      }
                    )
                  ]
                },
                field.key
              );
            }
            if (isWhatsapp) {
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  ref: (el) => {
                    fieldRefsMap.current[field.key] = el;
                  },
                  "data-field-key": field.key,
                  className: "rounded-xl border border-gray-100 p-3 bg-gray-50",
                  children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-700 mb-2", children: field.label }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        value: values.valueEn,
                        onChange: (e) => {
                          handleChange(field.key, "valueEn", e.target.value);
                          handleChange(field.key, "valueEs", e.target.value);
                        },
                        placeholder: "+573001234567",
                        className: "text-sm"
                      }
                    )
                  ]
                },
                field.key
              );
            }
            return /* @__PURE__ */ jsxs(
              "div",
              {
                ref: (el) => {
                  fieldRefsMap.current[field.key] = el;
                },
                "data-field-key": field.key,
                className: "rounded-xl border border-gray-100 p-3 bg-gray-50",
                children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-700 mb-2", children: field.label }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-medium text-gray-400 flex items-center gap-1 mb-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "inline-block h-2 w-3 rounded-sm bg-blue-600" }),
                        "EN"
                      ] }),
                      field.type === "long" ? /* @__PURE__ */ jsx(Textarea, { value: values.valueEn, onChange: (e) => handleChange(field.key, "valueEn", e.target.value), rows: 2, className: "text-sm" }) : /* @__PURE__ */ jsx(Input, { value: values.valueEn, onChange: (e) => handleChange(field.key, "valueEn", e.target.value), className: "text-sm" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-medium text-gray-400 flex items-center gap-1 mb-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "inline-block h-2 w-3 rounded-sm bg-yellow-500" }),
                        "ES"
                      ] }),
                      field.type === "long" ? /* @__PURE__ */ jsx(Textarea, { value: values.valueEs, onChange: (e) => handleChange(field.key, "valueEs", e.target.value), rows: 2, className: "text-sm" }) : /* @__PURE__ */ jsx(Input, { value: values.valueEs, onChange: (e) => handleChange(field.key, "valueEs", e.target.value), className: "text-sm" })
                    ] })
                  ] })
                ]
              },
              field.key
            );
          })
        ] })
      ] }),
      currentSection && /* @__PURE__ */ jsx("div", { className: "p-3 border-t border-gray-100 bg-gray-50", children: /* @__PURE__ */ jsx(Button, { onClick: handleSave, disabled: saving, className: "w-full", children: saving ? "Guardando..." : "Guardar y Actualizar Preview" }) })
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

const $$Preview = createComponent(async ($$result, $$props, $$slots) => {
  const list = await db.select().from(pageContent);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Editor Visual", "data-astro-cid-abpwhxlv": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "LiveEditor", LiveEditor, { "client:load": true, "initialData": list, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/admin/LiveEditor", "client:component-export": "LiveEditor", "data-astro-cid-abpwhxlv": true })} ` })} `;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/preview.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/preview.astro";
const $$url = "/admin/preview";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Preview,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
