import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_Bx_r-E3M.mjs';
import { $ as $$BaseLayout, a as $$PublicLayout, u as useTranslations } from '../../chunks/PublicLayout_BCAqlNAF.mjs';
import { e as properties, d as db } from '../../chunks/schema_CP1qSdhM.mjs';
import { eq, and, desc } from 'drizzle-orm';
import { P as PropertyGrid } from '../../chunks/PropertyGrid_H0jHolHG.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const t = useTranslations("es");
  const url = Astro2.url;
  const zone = url.searchParams.get("zone");
  const type = url.searchParams.get("type");
  const conditions = [eq(properties.status, "available")];
  if (zone) conditions.push(eq(properties.zone, zone));
  if (type) conditions.push(eq(properties.type, type));
  const whereClause = and(...conditions);
  const [list] = await Promise.all([
    db.select().from(properties).where(whereClause).orderBy(desc(properties.createdAt))
  ]);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Propiedades", "description": "Propiedades disponibles", "lang": "es" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PublicLayout", $$PublicLayout, { "lang": "es", "t": t }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-7xl px-4 py-8"> <h1 class="text-2xl font-bold text-gray-900 mb-6">${t("properties.title")}</h1> ${renderComponent($$result3, "PropertyGrid", PropertyGrid, { "client:load": true, "initialProperties": list, "lang": "es", "initialZone": zone ?? "", "initialType": type ?? "", "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/properties/PropertyGrid", "client:component-export": "PropertyGrid" })} </div> ` })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/es/properties/index.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/es/properties/index.astro";
const $$url = "/es/properties";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
