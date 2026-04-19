import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_0t14V1Lw.mjs';
import { d as db, e as properties, l as leads, b as appointments, c as blogPosts } from '../chunks/schema_CP1qSdhM.mjs';
import { sql } from 'drizzle-orm';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [propsCount] = await db.select({ count: sql`count(*)` }).from(properties);
  const [leadsCount] = await db.select({ count: sql`count(*)` }).from(leads);
  const [apptsCount] = await db.select({ count: sql`count(*)` }).from(appointments);
  const [postsCount] = await db.select({ count: sql`count(*)` }).from(blogPosts);
  const metrics = {
    properties: Number(propsCount?.count ?? 0),
    leads: Number(leadsCount?.count ?? 0),
    appointments: Number(apptsCount?.count ?? 0),
    blogPosts: Number(postsCount?.count ?? 0)
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1> <p class="mt-2 text-gray-600">Bienvenido al panel de administración.</p> <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"> <a href="/admin/properties" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300"> <p class="text-sm font-medium text-gray-500">Propiedades</p> <p class="mt-1 text-2xl font-semibold text-gray-900">${metrics.properties}</p> </a> <a href="/admin/leads" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300"> <p class="text-sm font-medium text-gray-500">Leads</p> <p class="mt-1 text-2xl font-semibold text-gray-900">${metrics.leads}</p> </a> <a href="/admin/appointments" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300"> <p class="text-sm font-medium text-gray-500">Citas</p> <p class="mt-1 text-2xl font-semibold text-gray-900">${metrics.appointments}</p> </a> <a href="/admin/blog" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300"> <p class="text-sm font-medium text-gray-500">Posts del blog</p> <p class="mt-1 text-2xl font-semibold text-gray-900">${metrics.blogPosts}</p> </a> </div> ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/index.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
