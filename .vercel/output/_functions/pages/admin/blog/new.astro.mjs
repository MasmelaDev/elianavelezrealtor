import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_0t14V1Lw.mjs';
import { B as BlogPostForm } from '../../../chunks/BlogPostForm_DhrONj5g.mjs';
export { renderers } from '../../../renderers.mjs';

const $$New = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Nuevo post" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-semibold text-gray-900">Nuevo post</h1> ${renderComponent($$result2, "BlogPostForm", BlogPostForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/admin/BlogPostForm", "client:component-export": "default" })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/blog/new.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/blog/new.astro";
const $$url = "/admin/blog/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
