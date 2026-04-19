import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, ao as Fragment } from '../../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$BaseLayout, a as $$PublicLayout, u as useTranslations } from '../../../chunks/PublicLayout_BCAqlNAF.mjs';
import { d as db, e as properties } from '../../../chunks/schema_CP1qSdhM.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) return Astro2.redirect("/es/properties");
  const [p] = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
  if (!p) return Astro2.redirect("/es/properties");
  const t = useTranslations("es");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": p.titleEs, "description": p.descriptionEs ?? p.titleEs, "lang": "es", "image": p.images?.[0] }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PublicLayout", $$PublicLayout, { "lang": "es", "t": t }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-4xl px-4 py-8"> <a href="/es/properties" class="text-sm text-brand-600 hover:underline">← Propiedades</a> <h1 class="mt-4 text-3xl font-bold text-gray-900">${p.titleEs}</h1> <p class="mt-2 text-xl text-brand-600">$${Number(p.price).toLocaleString()} · ${p.zone} · ${p.type}</p> ${p.images && p.images.length > 0 && renderTemplate`<img${addAttribute(p.images[0], "src")} alt="" class="mt-6 aspect-video w-full rounded-lg object-cover">`} ${(p.descriptionEn || p.descriptionEs) && renderTemplate`<div class="mt-6 text-gray-700 whitespace-pre-wrap">${p.descriptionEn ?? p.descriptionEs ?? ""}</div>`} ${p.lat && p.lng && renderTemplate`<div class="mt-8"> <h2 class="text-xl font-semibold text-gray-900 mb-4">${t("property.location")}</h2> ${renderComponent($$result3, "PropertyMap", null, { "client:only": "react", "lat": Number(p.lat), "lng": Number(p.lng), "client:component-hydration": "only", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/properties/PropertyMap", "client:component-export": "PropertyMap" })} </div>`} <dl class="mt-6 grid gap-2 sm:grid-cols-2"> ${p.bedrooms != null && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate`<dt class="text-gray-500">${t("property.bedrooms")}</dt><dd>${p.bedrooms}</dd>` })}`} ${p.bathrooms != null && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate`<dt class="text-gray-500">${t("property.bathrooms")}</dt><dd>${p.bathrooms}</dd>` })}`} ${p.areaSqft != null && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate`<dt class="text-gray-500">${t("property.area")}</dt><dd>${p.areaSqft} pies²</dd>` })}`} </dl> <a href="#contact" class="mt-8 inline-block rounded-lg bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700">${t("property.contact")}</a> </div> ` })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/es/properties/[id].astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/es/properties/[id].astro";
const $$url = "/es/properties/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
