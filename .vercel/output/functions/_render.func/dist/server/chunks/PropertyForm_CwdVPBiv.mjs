import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { I as ImageUploader } from './ImageUploader_CO328R9T.mjs';

const empty = {
  titleEn: "",
  titleEs: "",
  descriptionEn: "",
  descriptionEs: "",
  price: "",
  zone: "",
  type: "sale",
  status: "available",
  bedrooms: "",
  bathrooms: "",
  areaSqft: "",
  address: "",
  lat: "",
  lng: "",
  images: [],
  features: [],
  featured: false
};
function PropertyForm({ id }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    fetch(`/api/properties/${id}`).then((r) => r.json()).then((data) => {
      if (data.error) return;
      setForm({
        titleEn: data.titleEn ?? "",
        titleEs: data.titleEs ?? "",
        descriptionEn: data.descriptionEn ?? "",
        descriptionEs: data.descriptionEs ?? "",
        price: data.price ?? "",
        zone: data.zone ?? "",
        type: data.type ?? "sale",
        status: data.status ?? "available",
        bedrooms: data.bedrooms != null ? String(data.bedrooms) : "",
        bathrooms: data.bathrooms != null ? String(data.bathrooms) : "",
        areaSqft: data.areaSqft != null ? String(data.areaSqft) : "",
        address: data.address ?? "",
        lat: data.lat != null ? String(data.lat) : "",
        lng: data.lng != null ? String(data.lng) : "",
        images: Array.isArray(data.images) ? data.images : [],
        features: Array.isArray(data.features) ? data.features : [],
        featured: Boolean(data.featured)
      });
    }).catch(() => setError("No se pudo cargar"));
  }, [id]);
  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  const [newFeature, setNewFeature] = useState("");
  function addImage(url) {
    update("images", [...form.images, url]);
  }
  function removeImage(i) {
    update("images", form.images.filter((_, idx) => idx !== i));
  }
  function addFeature() {
    const v = newFeature.trim();
    if (v) {
      update("features", [...form.features, v]);
      setNewFeature("");
    }
  }
  function removeFeature(i) {
    update("features", form.features.filter((_, idx) => idx !== i));
  }
  async function submit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      titleEn: form.titleEn,
      titleEs: form.titleEs,
      descriptionEn: form.descriptionEn || void 0,
      descriptionEs: form.descriptionEs || void 0,
      price: Number(form.price) || 0,
      zone: form.zone,
      type: form.type,
      status: form.status,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : void 0,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : void 0,
      areaSqft: form.areaSqft ? Number(form.areaSqft) : void 0,
      address: form.address || void 0,
      lat: form.lat ? Number(form.lat) : void 0,
      lng: form.lng ? Number(form.lng) : void 0,
      images: form.images,
      features: form.features,
      featured: form.featured
    };
    const url = id ? `/api/properties/${id}` : "/api/properties";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(data.error?.message ?? data.error ?? "Error al guardar");
      return;
    }
    window.location.href = id ? "/admin/properties" : `/admin/properties/${data.id}`;
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 max-w-2xl space-y-4", children: [
    error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
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
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Descripción EN" }),
        /* @__PURE__ */ jsx("textarea", { value: form.descriptionEn, onChange: (e) => update("descriptionEn", e.target.value), rows: 3, className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Descripción ES" }),
        /* @__PURE__ */ jsx("textarea", { value: form.descriptionEs, onChange: (e) => update("descriptionEs", e.target.value), rows: 3, className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Precio" }),
        /* @__PURE__ */ jsx("input", { type: "number", required: true, min: 0, step: 0.01, value: form.price, onChange: (e) => update("price", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Zona" }),
        /* @__PURE__ */ jsx("input", { type: "text", required: true, value: form.zone, onChange: (e) => update("zone", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Tipo" }),
        /* @__PURE__ */ jsxs("select", { value: form.type, onChange: (e) => update("type", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2", children: [
          /* @__PURE__ */ jsx("option", { value: "sale", children: "Venta" }),
          /* @__PURE__ */ jsx("option", { value: "rent", children: "Arriendo" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Estado" }),
        /* @__PURE__ */ jsxs("select", { value: form.status, onChange: (e) => update("status", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2", children: [
          /* @__PURE__ */ jsx("option", { value: "available", children: "Disponible" }),
          /* @__PURE__ */ jsx("option", { value: "sold", children: "Vendido" }),
          /* @__PURE__ */ jsx("option", { value: "rented", children: "Arrendado" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Habitaciones" }),
        /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: form.bedrooms, onChange: (e) => update("bedrooms", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Baños" }),
        /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: form.bathrooms, onChange: (e) => update("bathrooms", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Área (sqft)" }),
        /* @__PURE__ */ jsx("input", { type: "number", min: 0, value: form.areaSqft, onChange: (e) => update("areaSqft", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: form.featured, onChange: (e) => update("featured", e.target.checked) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: "Destacada" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Dirección" }),
      /* @__PURE__ */ jsx("input", { type: "text", value: form.address, onChange: (e) => update("address", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Lat" }),
        /* @__PURE__ */ jsx("input", { type: "number", step: "any", value: form.lat, onChange: (e) => update("lat", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Lng" }),
        /* @__PURE__ */ jsx("input", { type: "number", step: "any", value: form.lng, onChange: (e) => update("lng", e.target.value), className: "mt-1 w-full rounded border border-gray-300 px-3 py-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Imágenes" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
        form.images.map((url, i) => /* @__PURE__ */ jsxs("span", { className: "relative inline-block", children: [
          /* @__PURE__ */ jsx("img", { src: url, alt: "", className: "h-20 w-20 rounded object-cover" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeImage(i), className: "absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white", children: "×" })
        ] }, i)),
        /* @__PURE__ */ jsx(ImageUploader, { onUpload: addImage })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Características" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
        form.features.map((f, i) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm", children: [
          f,
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeFeature(i), className: "text-gray-500 hover:text-red-600", children: "×" })
        ] }, i)),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: addFeature, className: "rounded border border-gray-300 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50", children: "Añadir" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: newFeature,
            onChange: (e) => setNewFeature(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            },
            className: "rounded border border-gray-300 px-2 py-1 text-sm",
            placeholder: "Nueva característica"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50", children: saving ? "Guardando…" : id ? "Guardar cambios" : "Crear propiedad" }),
      /* @__PURE__ */ jsx("a", { href: "/admin/properties", className: "rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50", children: "Cancelar" })
    ] })
  ] });
}

export { PropertyForm as P };
