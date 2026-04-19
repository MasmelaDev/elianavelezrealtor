import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, l as renderScript } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_0t14V1Lw.mjs';
import { d as db, a as availabilitySlots } from '../../chunks/schema_CP1qSdhM.mjs';
import { desc } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const $$Availability = createComponent(async ($$result, $$props, $$slots) => {
  const list = await db.select().from(availabilitySlots).orderBy(desc(availabilitySlots.date), desc(availabilitySlots.timeStart));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Disponibilidad" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-semibold text-gray-900">Slots de disponibilidad</h1> <p class="mt-2 text-sm text-gray-600">Crea bloques de horario para que los clientes agenden citas.</p> <form id="add-slot" class="mt-6 flex flex-wrap items-end gap-4 rounded-lg border border-gray-200 bg-white p-4"> <div> <label class="block text-xs font-medium text-gray-500">Fecha</label> <input type="date" name="date" required class="mt-1 rounded border border-gray-300 px-3 py-2 text-sm"> </div> <div> <label class="block text-xs font-medium text-gray-500">Hora inicio</label> <input type="time" name="timeStart" required class="mt-1 rounded border border-gray-300 px-3 py-2 text-sm"> </div> <div> <label class="block text-xs font-medium text-gray-500">Hora fin</label> <input type="time" name="timeEnd" required class="mt-1 rounded border border-gray-300 px-3 py-2 text-sm"> </div> <button type="submit" class="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700">Añadir slot</button> </form> <div class="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Fecha</th> <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Inicio</th> <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Fin</th> <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Reservado</th> <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"></th> </tr> </thead> <tbody class="divide-y divide-gray-200"> ${list.length === 0 ? renderTemplate`<tr> <td colspan="5" class="px-4 py-8 text-center text-gray-500">No hay slots. Añade uno arriba.</td> </tr>` : list.map((slot) => {
    const dateStr = typeof slot.date === "string" ? slot.date : slot.date.toISOString().slice(0, 10);
    const start = typeof slot.timeStart === "string" ? String(slot.timeStart).slice(0, 5) : "\u2014";
    const end = typeof slot.timeEnd === "string" ? String(slot.timeEnd).slice(0, 5) : "\u2014";
    return renderTemplate`<tr class="hover:bg-gray-50"> <td class="px-4 py-2 text-sm text-gray-900">${dateStr}</td> <td class="px-4 py-2 text-sm text-gray-600">${start}</td> <td class="px-4 py-2 text-sm text-gray-600">${end}</td> <td class="px-4 py-2 text-sm">${slot.isBooked ? renderTemplate`<span class="text-amber-600">Sí</span>` : renderTemplate`<span class="text-gray-500">No</span>`}</td> <td class="px-4 py-2"> ${!slot.isBooked && renderTemplate`<button type="button"${addAttribute(slot.id, "data-slot-id")} class="delete-slot text-sm text-red-600 hover:underline">Eliminar</button>`} </td> </tr>`;
  })} </tbody> </table> </div> ${renderScript($$result2, "/home/miguel/dev/elianarealtor/src/pages/admin/availability.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/availability.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/availability.astro";
const $$url = "/admin/availability";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Availability,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
