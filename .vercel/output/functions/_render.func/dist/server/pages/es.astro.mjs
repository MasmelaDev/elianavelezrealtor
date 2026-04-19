import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_Bx_r-E3M.mjs';
import { g as getLangFromUrl, $ as $$BaseLayout, u as useTranslations, a as $$PublicLayout } from '../chunks/PublicLayout_BCAqlNAF.mjs';
import { $ as $$HeroSection, a as $$StatsSection, F as FeaturedProperties, b as $$WhyChooseSection, c as $$AboutSection, d as $$ServicesSection, T as TestimonialsContent, e as $$BlogPreview, C as ContactForm, A as AppointmentForm } from '../chunks/AppointmentForm_BHIDCMhr.mjs';
import { d as db, p as pageContent, c as blogPosts, e as properties } from '../chunks/schema_CP1qSdhM.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const contentRows = await db.select().from(pageContent);
  const content = {};
  contentRows.forEach((r) => {
    content[r.key] = { en: r.valueEn, es: r.valueEs };
  });
  const heroTitle = content["hero.title"]?.es ?? "Encuentra tu Hogar Ideal";
  const heroSubtitle = content["hero.subtitle"]?.es ?? "Transformamos tu visi\xF3n en realidad. Tu gu\xEDa experta en bienes ra\xEDces.";
  const heroTagline = content["hero.tagline"]?.es ?? t("hero.tagline");
  const heroRole = content["hero.role"]?.es ?? t("hero.role");
  const heroCtaPrimary = content["hero.cta.primary"]?.es ?? t("hero.cta.primary");
  const heroCtaSecondary = content["hero.cta.secondary"]?.es ?? t("hero.cta.secondary");
  const heroBadgeTitle = content["hero.badgeTitle"]?.es ?? t("hero.badgeTitle");
  const heroBadgeDesc = content["hero.badgeDesc"]?.es ?? t("hero.badgeDesc");
  const aboutTitle = content["about.title"]?.es ?? t("about.title");
  const aboutBody = content["about.body"]?.es ?? "Soy Eliana Velez, una apasionada profesional en bienes ra\xEDces con experiencia comprobada ayudando a familias e inversores a encontrar su lugar perfecto. Mi compromiso es brindarte un servicio transparente, \xE1gil y totalmente personalizado para asegurar el \xE9xito absoluto de tu inversi\xF3n y tranquilidad.";
  const aboutBadge = content["about.badge"]?.es ?? t("about.badge");
  const aboutCta = content["about.cta"]?.es ?? t("about.cta");
  const aboutHappyClients = content["about.happyClients"]?.es ?? t("about.happyClients");
  const servicesTitle = content["services.title"]?.es ?? t("services.title");
  const servicesBody = content["services.body"]?.es ?? "Ya sea que busques el hogar de tus sue\xF1os, desees vender tu propiedad al mejor precio del mercado competitivo actual, o busques una propiedad rentable para arrendar, te ofrezco una asesor\xEDa integral y dedicada en cada paso del camino.";
  const servicesBadge = content["services.badge"]?.es ?? t("services.badge");
  const servicesBuyTitle = content["services.buy.title"]?.es ?? t("services.buy.title");
  const servicesBuyDesc = content["services.buy.desc"]?.es ?? t("services.buy.desc");
  const servicesSellTitle = content["services.sell.title"]?.es ?? t("services.sell.title");
  const servicesSellDesc = content["services.sell.desc"]?.es ?? t("services.sell.desc");
  const servicesRentTitle = content["services.rent.title"]?.es ?? t("services.rent.title");
  const servicesRentDesc = content["services.rent.desc"]?.es ?? t("services.rent.desc");
  const whyTitle = content["why.title"]?.es ?? t("why.title");
  const whySubtitle = content["why.subtitle"]?.es ?? t("why.subtitle");
  const whyItem1Title = content["why.item1.title"]?.es ?? t("why.item1.title");
  const whyItem1Desc = content["why.item1.desc"]?.es ?? t("why.item1.desc");
  const whyItem2Title = content["why.item2.title"]?.es ?? t("why.item2.title");
  const whyItem2Desc = content["why.item2.desc"]?.es ?? t("why.item2.desc");
  const whyItem3Title = content["why.item3.title"]?.es ?? t("why.item3.title");
  const whyItem3Desc = content["why.item3.desc"]?.es ?? t("why.item3.desc");
  const contactTitle = content["contact.title"]?.es ?? t("contact.title");
  const heroImage = content["image.hero"]?.es ?? "/images/elianafull.jpg";
  const aboutImage = content["image.about"]?.es ?? "/images/elianafull.jpg";
  const serviceBuyImage = content["image.service.buy"]?.es ?? "/images/hero-bg.png";
  const serviceSellImage = content["image.service.sell"]?.es ?? "/images/hero-2.png";
  const serviceRentImage = content["image.service.rent"]?.es ?? "/images/hero-3.png";
  const posts = await db.select({
    id: blogPosts.id,
    slug: blogPosts.slug,
    titleEn: blogPosts.titleEn,
    titleEs: blogPosts.titleEs,
    excerptEn: blogPosts.excerptEn,
    excerptEs: blogPosts.excerptEs,
    coverImage: blogPosts.coverImage
  }).from(blogPosts).where(eq(blogPosts.published, true)).limit(3);
  const propsList = await db.select({
    id: properties.id,
    titleEn: properties.titleEn,
    titleEs: properties.titleEs,
    price: properties.price,
    lat: properties.lat,
    lng: properties.lng
  }).from(properties).where(eq(properties.status, "available"));
  const esTestimonials = [
    {
      id: "1",
      name: "Sarah Jenkins",
      role: "Compradora",
      content: "\xA1Eliana fue incre\xEDble! Nos gui\xF3 en cada paso para comprar nuestra primera casa. Su conocimiento del mercado local hizo toda la diferencia.",
      image: "/images/sarah.jpg",
      rating: 5
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Inversor",
      content: "He trabajado con muchos realtors, pero el nivel de profesionalismo y dedicaci\xF3n aqu\xED es inigualable. Muy recomendada para cualquier inversor serio.",
      image: "/images/michael.jpg",
      rating: 5
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      role: "Vendedora",
      content: "Vender una casa puede ser estresante, pero ella lo hizo muy sencillo. \xA1Mi casa se vendi\xF3 por encima del precio en una semana!",
      image: "/images/elena.jpg",
      rating: 5
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Inicio", "description": heroSubtitle, "lang": "es" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PublicLayout", $$PublicLayout, { "lang": "es", "t": t, "transparentNav": true, "editorMode": Astro2.url.searchParams.get("editor") === "true" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "HeroSection", $$HeroSection, { "lang": "es", "t": t, "title": heroTitle, "subtitle": heroSubtitle, "heroImage": heroImage, "tagline": heroTagline, "role": heroRole, "primaryCta": heroCtaPrimary, "secondaryCta": heroCtaSecondary, "badgeTitle": heroBadgeTitle, "badgeDesc": heroBadgeDesc })} ${renderComponent($$result3, "StatsSection", $$StatsSection, { "t": t })} ${renderComponent($$result3, "FeaturedProperties", FeaturedProperties, { "client:load": true, "lang": "es", "featuredTitle": t("properties.featuredTitle"), "viewAll": t("properties.viewAll"), "emptyFeatured": t("properties.emptyFeatured"), "typeSale": t("filter.type.sale"), "typeRent": t("filter.type.rent"), "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/FeaturedProperties", "client:component-export": "default" })} ${renderComponent($$result3, "WhyChooseSection", $$WhyChooseSection, { "t": t, "whyTitle": whyTitle, "whySubtitle": whySubtitle, "item1Title": whyItem1Title, "item1Desc": whyItem1Desc, "item2Title": whyItem2Title, "item2Desc": whyItem2Desc, "item3Title": whyItem3Title, "item3Desc": whyItem3Desc })} ${renderComponent($$result3, "AboutSection", $$AboutSection, { "lang": "es", "t": t, "title": aboutTitle, "body": aboutBody, "badge": aboutBadge, "cta": aboutCta, "happyClients": aboutHappyClients, "cardImage": aboutImage })} ${renderComponent($$result3, "ServicesSection", $$ServicesSection, { "lang": "es", "t": t, "title": servicesTitle, "badge": servicesBadge, "body": servicesBody, "serviceImages": [serviceBuyImage, serviceSellImage, serviceRentImage], "buyTitle": servicesBuyTitle, "buyDesc": servicesBuyDesc, "sellTitle": servicesSellTitle, "sellDesc": servicesSellDesc, "rentTitle": servicesRentTitle, "rentDesc": servicesRentDesc })} ${renderComponent($$result3, "TestimonialsContent", TestimonialsContent, { "client:load": true, "title": t("testimonials.title"), "subtitle": t("testimonials.subtitle"), "testimonials": esTestimonials, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/TestimonialsContent", "client:component-export": "default" })} ${maybeRenderHead()}<section class="map-section relative bg-surface-muted py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden" id="map"> <div class="absolute inset-0 opacity-[0.04] pointer-events-none hidden lg:block" aria-hidden="true"> <img src="/images/hero-bg.png" alt="" class="h-full w-full object-cover"> </div> <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <h2 class="font-serif text-2xl font-semibold text-on-surface sm:text-3xl md:text-4xl">${t("properties.mapTitle")}</h2> <div class="mt-4 min-h-[320px] overflow-hidden rounded-2xl border border-gray-200/80 bg-surface sm:mt-6 sm:min-h-[400px] md:mt-8 shadow-xl"> ${renderComponent($$result3, "ZoneMap", null, { "client:only": "react", "properties": propsList, "lang": "es", "client:component-hydration": "only", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/ZoneMap", "client:component-export": "ZoneMap" })} </div> </div> </section> ${renderComponent($$result3, "BlogPreview", $$BlogPreview, { "lang": "es", "t": t, "posts": posts })} ${renderComponent($$result3, "ContactForm", ContactForm, { "client:load": true, "lang": "es", "contactTitle": contactTitle, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/ContactForm", "client:component-export": "default" })} ${renderComponent($$result3, "AppointmentForm", AppointmentForm, { "client:load": true, "lang": "es", "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/AppointmentForm", "client:component-export": "default" })} ` })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/es/index.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/es/index.astro";
const $$url = "/es";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
