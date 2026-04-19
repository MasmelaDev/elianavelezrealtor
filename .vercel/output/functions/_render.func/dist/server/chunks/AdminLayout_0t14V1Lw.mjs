import { e as createComponent, m as maybeRenderHead, r as renderTemplate, g as addAttribute, n as renderHead, k as renderComponent, o as renderSlot, h as createAstro } from './astro/server_Bx_r-E3M.mjs';
/* empty css                                */
import { f as favicon } from './favicon_PMaL-EV7.mjs';

const $$AdminNav = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="flex items-center gap-6"> <a href="/admin" class="text-sm font-medium text-gray-700 hover:text-gray-900">Dashboard</a> <a href="/admin/properties" class="text-sm text-gray-600 hover:text-gray-900">Propiedades</a> <a href="/admin/blog" class="text-sm text-gray-600 hover:text-gray-900">Blog</a> <a href="/admin/content" class="text-sm text-gray-600 hover:text-gray-900">Contenido</a> <a href="/admin/preview" class="text-sm text-blue-600 font-medium hover:text-blue-800">Editor Visual</a> <a href="/admin/leads" class="text-sm text-gray-600 hover:text-gray-900">Leads</a> <a href="/admin/appointments" class="text-sm text-gray-600 hover:text-gray-900">Citas</a> <a href="/admin/availability" class="text-sm text-gray-600 hover:text-gray-900">Disponibilidad</a> <form method="post" action="/api/auth/logout" class="inline"> <button type="submit" class="text-sm text-gray-600 hover:text-gray-900">Cerrar sesión</button> </form> </nav>`;
}, "/home/miguel/dev/elianarealtor/src/components/admin/AdminNav.astro", void 0);

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>${title} | Admin</title><link rel="icon" type="image/svg+xml"${addAttribute(favicon, "href")}>${renderHead()}</head> <body class="min-h-screen bg-gray-50 text-gray-900"> <header class="border-b border-gray-200 bg-white"> <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4"> <a href="/admin" class="font-medium">Admin</a> ${renderComponent($$result, "AdminNav", $$AdminNav, {})} </div> </header> <main class="mx-auto max-w-7xl px-4 py-6"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/miguel/dev/elianarealtor/src/components/admin/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
