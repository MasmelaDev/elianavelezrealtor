import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_0t14V1Lw.mjs';
import { P as PropertyForm } from '../../../chunks/PropertyForm_CwdVPBiv.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Editar propiedad" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-semibold text-gray-900">Editar propiedad</h1> ${renderComponent($$result2, "PropertyForm", PropertyForm, { "id": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/admin/PropertyForm", "client:component-export": "default" })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/properties/[id].astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/properties/[id].astro";
const $$url = "/admin/properties/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
