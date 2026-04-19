import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_0t14V1Lw.mjs';
import { d as db, a as availabilitySlots, l as leads, b as appointments } from '../../chunks/schema_CP1qSdhM.mjs';
import { eq, desc } from 'drizzle-orm';
import { jsx, jsxs } from 'react/jsx-runtime';
import { D as DataTable } from '../../chunks/DataTable_Fw57qU5a.mjs';
import { B as Badge } from '../../chunks/Badge_DgJT3Y8m.mjs';
export { renderers } from '../../renderers.mjs';

function AppointmentsTable({ data }) {
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      data,
      keyExtractor: (a) => a.id,
      columns: [
        { header: "Cliente", accessor: "leadName" },
        {
          header: "Email / Tel",
          accessor: (a) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: a.leadEmail }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: a.leadPhone ?? "—" })
          ] })
        },
        {
          header: "Fecha / Hora",
          accessor: (a) => {
            const dateObj = new Date(a.slotDate);
            const dateStr = !isNaN(dateObj.getTime()) ? dateObj.toISOString().slice(0, 10) : String(a.slotDate);
            const timeStart = typeof a.slotTimeStart === "string" ? a.slotTimeStart.slice(0, 5) : "—";
            return /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
              dateStr,
              " ",
              timeStart
            ] });
          }
        },
        {
          header: "Estado",
          accessor: (a) => /* @__PURE__ */ jsx(Badge, { variant: a.status === "confirmed" ? "success" : a.status === "cancelled" ? "error" : "warning", children: a.status })
        }
      ],
      emptyMessage: "No hay citas registradas."
    }
  );
}

const $$Appointments = createComponent(async ($$result, $$props, $$slots) => {
  const data = await db.select({
    id: appointments.id,
    status: appointments.status,
    createdAt: appointments.createdAt,
    leadName: leads.name,
    leadEmail: leads.email,
    leadPhone: leads.phone,
    slotDate: availabilitySlots.date,
    slotTimeStart: availabilitySlots.timeStart,
    slotTimeEnd: availabilitySlots.timeEnd
  }).from(appointments).innerJoin(leads, eq(appointments.leadId, leads.id)).innerJoin(availabilitySlots, eq(appointments.slotId, availabilitySlots.id)).orderBy(desc(appointments.createdAt));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Citas" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-semibold text-gray-900">Citas</h1> <div class="mt-4"> ${renderComponent($$result2, "AppointmentsTable", AppointmentsTable, { "client:load": true, "data": data, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/admin/AppointmentsTable", "client:component-export": "AppointmentsTable" })} </div> ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/appointments.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/appointments.astro";
const $$url = "/admin/appointments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Appointments,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
