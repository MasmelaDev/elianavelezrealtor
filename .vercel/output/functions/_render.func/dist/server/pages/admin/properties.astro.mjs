import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_0t14V1Lw.mjs';
import { d as db, e as properties } from '../../chunks/schema_CP1qSdhM.mjs';
import { desc } from 'drizzle-orm';
import { jsx } from 'react/jsx-runtime';
import { D as DataTable } from '../../chunks/DataTable_Fw57qU5a.mjs';
import { B as Badge } from '../../chunks/Badge_DgJT3Y8m.mjs';
export { renderers } from '../../renderers.mjs';

function PropertiesTable({ data }) {
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      data,
      keyExtractor: (p) => p.id,
      columns: [
        { header: "Título (ES)", accessor: "titleEs" },
        { header: "Zona", accessor: "zone" },
        { header: "Tipo", accessor: "type" },
        { header: "Precio", accessor: "price" },
        {
          header: "Estado",
          accessor: (p) => /* @__PURE__ */ jsx(Badge, { variant: p.status === "available" ? "success" : p.status === "sold" ? "error" : "warning", children: p.status })
        },
        {
          header: "",
          accessor: (p) => /* @__PURE__ */ jsx("a", { href: `/admin/properties/${p.id}`, className: "text-brand-600 hover:text-brand-700 font-medium text-sm", children: "Editar" })
        }
      ],
      emptyMessage: "No hay propiedades registradas."
    }
  );
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const list = await db.select().from(properties).orderBy(desc(properties.createdAt));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Propiedades" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between"> <h1 class="text-2xl font-semibold text-gray-900">Propiedades</h1> <a href="/admin/properties/new" class="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700">Nueva propiedad</a> </div> <div class="mt-4"> ${renderComponent($$result2, "PropertiesTable", PropertiesTable, { "client:load": true, "data": list, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/admin/PropertiesTable", "client:component-export": "PropertiesTable" })} </div> ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/properties/index.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/properties/index.astro";
const $$url = "/admin/properties";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
