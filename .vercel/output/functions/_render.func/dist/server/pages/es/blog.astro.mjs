import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$BaseLayout, a as $$PublicLayout, u as useTranslations } from '../../chunks/PublicLayout_BCAqlNAF.mjs';
import { d as db, c as blogPosts } from '../../chunks/schema_CP1qSdhM.mjs';
import { eq, desc } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const t = useTranslations("es");
  const list = await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog", "description": "Tips de bienes ra\xEDces", "lang": "es" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PublicLayout", $$PublicLayout, { "lang": "es", "t": t }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-7xl px-4 py-8"> <h1 class="text-2xl font-bold text-gray-900">${t("blog.title")}</h1> <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${list.map((p) => renderTemplate`<a${addAttribute(`/es/blog/${p.slug}`, "href")} class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md"> ${p.coverImage ? renderTemplate`<img${addAttribute(p.coverImage, "src")} alt="" class="h-48 w-full object-cover">` : renderTemplate`<div class="h-48 bg-gray-200"></div>`} <div class="p-4"> <h2 class="font-semibold text-gray-900">${p.titleEs}</h2> <p class="mt-1 line-clamp-2 text-sm text-gray-600">${p.excerptEs ?? ""}</p> </div> </a>`)} </div> ${list.length === 0 && renderTemplate`<p class="py-12 text-center text-gray-500">Aún no hay posts.</p>`} </div> ` })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/es/blog/index.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/es/blog/index.astro";
const $$url = "/es/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
