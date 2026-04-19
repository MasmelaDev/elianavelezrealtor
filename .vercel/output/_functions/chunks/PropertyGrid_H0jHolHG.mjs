import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { B as Badge } from './Badge_DgJT3Y8m.mjs';
import { a as CardContent } from './Card_mlP6s3gF.mjs';

function PropertyCard({ property: p, lang }) {
  const title = lang === "en" ? p.titleEn : p.titleEs;
  const typeLabel = lang === "en" ? p.type === "sale" ? "Sale" : "Rent" : p.type === "sale" ? "Venta" : "Alquiler";
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/${lang}/properties/${p.id}`,
      className: "group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] bg-gray-100 overflow-hidden", children: [
          p.images?.[0] ? /* @__PURE__ */ jsx(
            "img",
            {
              src: p.images[0],
              alt: title,
              className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center text-gray-400", children: lang === "en" ? "No image" : "Sin imagen" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute left-3 top-3 flex gap-2", children: [
            p.featured && /* @__PURE__ */ jsx(Badge, { variant: "warning", children: lang === "en" ? "Featured" : "Destacada" }),
            /* @__PURE__ */ jsx(Badge, { variant: "default", className: "bg-white/90 backdrop-blur-sm", children: typeLabel })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "line-clamp-1 font-semibold text-gray-900", title, children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 line-clamp-1", children: p.zone }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-brand-600", children: [
              "$",
              Number(p.price).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-500", children: [
              p.bedrooms != null && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", title: lang === "en" ? "Bedrooms" : "Habitaciones", children: [
                /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
                p.bedrooms
              ] }),
              p.bathrooms != null && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", title: lang === "en" ? "Bathrooms" : "Baños", children: [
                /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" }) }),
                p.bathrooms
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}

function PropertyFilters({ initialFilters, onFilterChange, lang }) {
  const [zone, setZone] = useState(initialFilters.zone);
  const [type, setType] = useState(initialFilters.type);
  const t = {
    zonePlaceholder: lang === "en" ? "Any Zone" : "Cualquier zona",
    typePlaceholder: lang === "en" ? "Any Type" : "Cualquier tipo",
    sale: lang === "en" ? "For Sale" : "En Venta",
    rent: lang === "en" ? "For Rent" : "En Alquiler"
  };
  useEffect(() => {
    onFilterChange({ zone, type });
    const url = new URL(window.location.href);
    if (zone) url.searchParams.set("zone", zone);
    else url.searchParams.delete("zone");
    if (type) url.searchParams.set("type", type);
    else url.searchParams.delete("type");
    url.searchParams.delete("page");
    window.history.replaceState({}, "", url.toString());
  }, [zone, type, onFilterChange]);
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "zone-filter", className: "sr-only", children: "Zone" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "zone-filter",
            type: "text",
            placeholder: t.zonePlaceholder,
            className: "block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500",
            value: zone,
            onChange: (e) => setZone(e.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-48", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "type-filter", className: "sr-only", children: "Type" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          id: "type-filter",
          className: "block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500",
          value: type,
          onChange: (e) => setType(e.target.value),
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: t.typePlaceholder }),
            /* @__PURE__ */ jsx("option", { value: "sale", children: t.sale }),
            /* @__PURE__ */ jsx("option", { value: "rent", children: t.rent })
          ]
        }
      )
    ] })
  ] });
}

function PropertyGrid({ initialProperties, lang, initialZone = "", initialType = "" }) {
  const [filters, setFilters] = useState({
    zone: initialZone,
    type: initialType
  });
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((p) => {
      if (filters.zone && !p.zone.toLowerCase().includes(filters.zone.toLowerCase())) {
        return false;
      }
      if (filters.type && p.type !== filters.type) {
        return false;
      }
      return true;
    });
  }, [initialProperties, filters]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      PropertyFilters,
      {
        initialFilters: filters,
        onFilterChange: setFilters,
        lang
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filteredProperties.map((p) => /* @__PURE__ */ jsx(PropertyCard, { property: p, lang }, p.id)) }),
    filteredProperties.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 text-sm font-semibold text-gray-900", children: lang === "en" ? "No properties found" : "No se encontraron propiedades" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: lang === "en" ? "Try adjusting your filters or search terms." : "Intenta ajustar tus filtros de búsqueda." })
    ] })
  ] });
}

export { PropertyGrid as P };
