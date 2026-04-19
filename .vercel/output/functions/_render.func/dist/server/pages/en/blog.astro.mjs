import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$BaseLayout, a as $$PublicLayout, u as useTranslations } from '../../chunks/PublicLayout_BCAqlNAF.mjs';
import { d as db, c as blogPosts } from '../../chunks/schema_CP1qSdhM.mjs';
import { eq, desc } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const t = useTranslations("en");
  const list = await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog", "description": "Real estate tips", "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PublicLayout", $$PublicLayout, { "lang": "en", "t": t }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-7xl px-4 py-8"> <h1 class="text-2xl font-bold text-gray-900">${t("blog.title")}</h1> <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${list.map((p) => renderTemplate`<a${addAttribute(`/en/blog/${p.slug}`, "href")} class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md"> ${p.coverImage ? renderTemplate`<img${addAttribute(p.coverImage, "src")} alt="" class="h-48 w-full object-cover">` : renderTemplate`<div class="h-48 bg-gray-200"></div>`} <div class="p-4"> <h2 class="font-semibold text-gray-900">${p.titleEn}</h2> <p class="mt-1 line-clamp-2 text-sm text-gray-600">${p.excerptEn ?? ""}</p> </div> </a>`)} </div> ${list.length === 0 && renderTemplate`<p class="py-12 text-center text-gray-500">No posts yet.</p>`} </div> ` })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/en/blog/index.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/en/blog/index.astro";
const $$url = "/en/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
