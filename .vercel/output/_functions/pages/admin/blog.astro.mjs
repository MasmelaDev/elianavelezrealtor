import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_0t14V1Lw.mjs';
import { d as db, c as blogPosts } from '../../chunks/schema_CP1qSdhM.mjs';
import { desc } from 'drizzle-orm';
import { jsx } from 'react/jsx-runtime';
import { D as DataTable } from '../../chunks/DataTable_Fw57qU5a.mjs';
import { B as Badge } from '../../chunks/Badge_DgJT3Y8m.mjs';
export { renderers } from '../../renderers.mjs';

function BlogTable({ data }) {
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      data,
      keyExtractor: (p) => p.id,
      columns: [
        { header: "Slug", accessor: (p) => /* @__PURE__ */ jsx("span", { className: "font-mono text-gray-500", children: p.slug }) },
        { header: "Título (ES)", accessor: "titleEs" },
        {
          header: "Publicado",
          accessor: (p) => /* @__PURE__ */ jsx(Badge, { variant: p.published ? "success" : "default", children: p.published ? "Sí" : "No" })
        },
        {
          header: "",
          accessor: (p) => /* @__PURE__ */ jsx("a", { href: `/admin/blog/${p.id}`, className: "text-brand-600 hover:text-brand-700 font-medium text-sm", children: "Editar" })
        }
      ],
      emptyMessage: "No hay posts en el blog."
    }
  );
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const list = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Blog" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between"> <h1 class="text-2xl font-semibold text-gray-900">Blog</h1> <a href="/admin/blog/new" class="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700">Nuevo post</a> </div> <div class="mt-4"> ${renderComponent($$result2, "BlogTable", BlogTable, { "client:load": true, "data": list, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/admin/BlogTable", "client:component-export": "BlogTable" })} </div> ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/blog/index.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/blog/index.astro";
const $$url = "/admin/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
