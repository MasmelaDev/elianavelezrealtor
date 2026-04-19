import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, u as unescapeHTML } from '../../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$BaseLayout, a as $$PublicLayout, u as useTranslations } from '../../../chunks/PublicLayout_BCAqlNAF.mjs';
import { d as db, c as blogPosts } from '../../../chunks/schema_CP1qSdhM.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) return Astro2.redirect("/es/blog");
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (!post || !post.published) return Astro2.redirect("/es/blog");
  const t = useTranslations("es");
  const content = post.contentEs ?? post.contentEn ?? "";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": post.titleEs, "description": post.excerptEs ?? post.titleEs, "lang": "es", "image": post.coverImage ?? void 0 }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PublicLayout", $$PublicLayout, { "lang": "es", "t": t }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<article class="mx-auto max-w-3xl px-4 py-8"> <a href="/es/blog" class="text-sm text-brand-600 hover:underline">← Blog</a> ${post.coverImage && renderTemplate`<img${addAttribute(post.coverImage, "src")} alt="" class="mt-4 aspect-video w-full rounded-lg object-cover">`} <h1 class="mt-6 text-3xl font-bold text-gray-900">${post.titleEs}</h1> ${post.excerptEs && renderTemplate`<p class="mt-2 text-lg text-gray-600">${post.excerptEs}</p>`} <div class="prose prose-gray mt-8 max-w-none">${unescapeHTML(content)}</div> </article> ` })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/es/blog/[slug].astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/es/blog/[slug].astro";
const $$url = "/es/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
