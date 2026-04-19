import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_0t14V1Lw.mjs';
import { d as db, l as leads } from '../../chunks/schema_CP1qSdhM.mjs';
import { desc } from 'drizzle-orm';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { D as DataTable } from '../../chunks/DataTable_Fw57qU5a.mjs';
import { B as Badge } from '../../chunks/Badge_DgJT3Y8m.mjs';
export { renderers } from '../../renderers.mjs';

function LeadsTable({ initialData }) {
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(null);
  async function updateStatus(id, status, originalStatus) {
    setSaving(id);
    const res = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    setSaving(null);
    if (res.ok) {
      setData((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    } else {
      const select = document.getElementById(`status-${id}`);
      if (select) select.value = originalStatus;
    }
  }
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      data,
      keyExtractor: (l) => l.id,
      columns: [
        { header: "Nombre", accessor: "name" },
        { header: "Email", accessor: "email" },
        {
          header: "Origen",
          accessor: (l) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: l.source })
        },
        {
          header: "Estado",
          accessor: (l) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: `status-${l.id}`,
                defaultValue: l.status,
                disabled: saving === l.id,
                onChange: (e) => updateStatus(l.id, e.target.value, l.status),
                className: "block rounded border border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "new", children: "Nuevo" }),
                  /* @__PURE__ */ jsx("option", { value: "contacted", children: "Contactado" }),
                  /* @__PURE__ */ jsx("option", { value: "closed", children: "Cerrado" })
                ]
              }
            ),
            saving === l.id && /* @__PURE__ */ jsx("span", { className: "text-xs text-brand-600", children: "Actualizando..." })
          ] })
        },
        {
          header: "Fecha",
          accessor: (l) => /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: l.createdAt ? new Date(l.createdAt).toLocaleDateString() : "—" })
        }
      ],
      emptyMessage: "No hay leads registrados."
    }
  );
}

const $$Leads = createComponent(async ($$result, $$props, $$slots) => {
  const list = await db.select().from(leads).orderBy(desc(leads.createdAt));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Leads" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-semibold text-gray-900">Leads</h1> <div class="mt-4"> ${renderComponent($$result2, "LeadsTable", LeadsTable, { "client:load": true, "initialData": list, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/admin/LeadsTable", "client:component-export": "LeadsTable" })} </div> ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/leads.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/leads.astro";
const $$url = "/admin/leads";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Leads,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
