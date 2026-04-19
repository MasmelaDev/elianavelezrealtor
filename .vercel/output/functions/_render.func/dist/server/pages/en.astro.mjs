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
  const heroTitle = content["hero.title"]?.en ?? "Find Your Perfect Home";
  const heroSubtitle = content["hero.subtitle"]?.en ?? "Turning your vision into reality. Your expert real estate guide.";
  const heroTagline = content["hero.tagline"]?.en ?? t("hero.tagline");
  const heroRole = content["hero.role"]?.en ?? t("hero.role");
  const heroCtaPrimary = content["hero.cta.primary"]?.en ?? t("hero.cta.primary");
  const heroCtaSecondary = content["hero.cta.secondary"]?.en ?? t("hero.cta.secondary");
  const heroBadgeTitle = content["hero.badgeTitle"]?.en ?? t("hero.badgeTitle");
  const heroBadgeDesc = content["hero.badgeDesc"]?.en ?? t("hero.badgeDesc");
  const aboutTitle = content["about.title"]?.en ?? t("about.title");
  const aboutBody = content["about.body"]?.en ?? "I am Eliana Velez, a passionate real estate professional with a proven track record of helping families and investors find their perfect place. My commitment is to provide you with transparent, agile, and fully personalized service to ensure the absolute success of your investment and your peace of mind.";
  const aboutBadge = content["about.badge"]?.en ?? t("about.badge");
  const aboutCta = content["about.cta"]?.en ?? t("about.cta");
  const aboutHappyClients = content["about.happyClients"]?.en ?? t("about.happyClients");
  const servicesTitle = content["services.title"]?.en ?? t("services.title");
  const servicesBody = content["services.body"]?.en ?? "Whether you are looking for your dream home, want to sell your property at the best price in today\u2019s competitive market, or seek a profitable rental investment, I offer comprehensive and dedicated guidance every step of the way.";
  const servicesBadge = content["services.badge"]?.en ?? t("services.badge");
  const servicesBuyTitle = content["services.buy.title"]?.en ?? t("services.buy.title");
  const servicesBuyDesc = content["services.buy.desc"]?.en ?? t("services.buy.desc");
  const servicesSellTitle = content["services.sell.title"]?.en ?? t("services.sell.title");
  const servicesSellDesc = content["services.sell.desc"]?.en ?? t("services.sell.desc");
  const servicesRentTitle = content["services.rent.title"]?.en ?? t("services.rent.title");
  const servicesRentDesc = content["services.rent.desc"]?.en ?? t("services.rent.desc");
  const whyTitle = content["why.title"]?.en ?? t("why.title");
  const whySubtitle = content["why.subtitle"]?.en ?? t("why.subtitle");
  const whyItem1Title = content["why.item1.title"]?.en ?? t("why.item1.title");
  const whyItem1Desc = content["why.item1.desc"]?.en ?? t("why.item1.desc");
  const whyItem2Title = content["why.item2.title"]?.en ?? t("why.item2.title");
  const whyItem2Desc = content["why.item2.desc"]?.en ?? t("why.item2.desc");
  const whyItem3Title = content["why.item3.title"]?.en ?? t("why.item3.title");
  const whyItem3Desc = content["why.item3.desc"]?.en ?? t("why.item3.desc");
  const contactTitle = content["contact.title"]?.en ?? t("contact.title");
  const heroImage = content["image.hero"]?.en ?? "/images/elianafull.jpg";
  const aboutImage = content["image.about"]?.en ?? "/images/elianafull.jpg";
  const serviceBuyImage = content["image.service.buy"]?.en ?? "/images/hero-bg.png";
  const serviceSellImage = content["image.service.sell"]?.en ?? "/images/hero-2.png";
  const serviceRentImage = content["image.service.rent"]?.en ?? "/images/hero-3.png";
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
  const enTestimonials = [
    {
      id: "1",
      name: "Sarah Jenkins",
      role: "Homebuyer",
      content: "Eliana was incredible! She guided us through every step of buying our first home. Her knowledge of the local market made all the difference.",
      image: "/images/sarah.jpg",
      rating: 5
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Property Investor",
      content: "I have worked with many realtors, but the level of professionalism and dedication here is unmatched. Highly recommended for any serious investor.",
      image: "/images/michael.jpg",
      rating: 5
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      role: "Home Seller",
      content: "Selling a house can be stressful, but she made it seamless. My house sold over asking price within a week of listing!",
      image: "/images/elena.jpg",
      rating: 5
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home", "description": heroSubtitle, "lang": "en" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PublicLayout", $$PublicLayout, { "lang": "en", "t": t, "transparentNav": true, "editorMode": Astro2.url.searchParams.get("editor") === "true" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "HeroSection", $$HeroSection, { "lang": "en", "t": t, "title": heroTitle, "subtitle": heroSubtitle, "heroImage": heroImage, "tagline": heroTagline, "role": heroRole, "primaryCta": heroCtaPrimary, "secondaryCta": heroCtaSecondary, "badgeTitle": heroBadgeTitle, "badgeDesc": heroBadgeDesc })} ${renderComponent($$result3, "StatsSection", $$StatsSection, { "t": t })} ${renderComponent($$result3, "FeaturedProperties", FeaturedProperties, { "client:load": true, "lang": "en", "featuredTitle": t("properties.featuredTitle"), "viewAll": t("properties.viewAll"), "emptyFeatured": t("properties.emptyFeatured"), "typeSale": t("filter.type.sale"), "typeRent": t("filter.type.rent"), "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/FeaturedProperties", "client:component-export": "default" })} ${renderComponent($$result3, "WhyChooseSection", $$WhyChooseSection, { "t": t, "whyTitle": whyTitle, "whySubtitle": whySubtitle, "item1Title": whyItem1Title, "item1Desc": whyItem1Desc, "item2Title": whyItem2Title, "item2Desc": whyItem2Desc, "item3Title": whyItem3Title, "item3Desc": whyItem3Desc })} ${renderComponent($$result3, "AboutSection", $$AboutSection, { "lang": "en", "t": t, "title": aboutTitle, "body": aboutBody, "badge": aboutBadge, "cta": aboutCta, "happyClients": aboutHappyClients, "cardImage": aboutImage })} ${renderComponent($$result3, "ServicesSection", $$ServicesSection, { "lang": "en", "t": t, "title": servicesTitle, "badge": servicesBadge, "body": servicesBody, "serviceImages": [serviceBuyImage, serviceSellImage, serviceRentImage], "buyTitle": servicesBuyTitle, "buyDesc": servicesBuyDesc, "sellTitle": servicesSellTitle, "sellDesc": servicesSellDesc, "rentTitle": servicesRentTitle, "rentDesc": servicesRentDesc })} ${renderComponent($$result3, "TestimonialsContent", TestimonialsContent, { "client:load": true, "title": t("testimonials.title"), "subtitle": t("testimonials.subtitle"), "testimonials": enTestimonials, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/TestimonialsContent", "client:component-export": "default" })} ${maybeRenderHead()}<section class="map-section relative bg-surface-muted py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden" id="map"> <div class="absolute inset-0 opacity-[0.04] pointer-events-none hidden lg:block" aria-hidden="true"> <img src="/images/hero-bg.png" alt="" class="h-full w-full object-cover"> </div> <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <h2 class="font-serif text-2xl font-semibold text-on-surface sm:text-3xl md:text-4xl">${t("properties.mapTitle")}</h2> <div class="mt-4 min-h-[320px] overflow-hidden rounded-2xl border border-gray-200/80 bg-surface sm:mt-6 sm:min-h-[400px] md:mt-8 shadow-xl"> ${renderComponent($$result3, "ZoneMap", null, { "client:only": "react", "properties": propsList, "lang": "en", "client:component-hydration": "only", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/ZoneMap", "client:component-export": "ZoneMap" })} </div> </div> </section> ${renderComponent($$result3, "BlogPreview", $$BlogPreview, { "lang": "en", "t": t, "posts": posts })} ${renderComponent($$result3, "ContactForm", ContactForm, { "client:load": true, "lang": "en", "contactTitle": contactTitle, "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/ContactForm", "client:component-export": "default" })} ${renderComponent($$result3, "AppointmentForm", AppointmentForm, { "client:load": true, "lang": "en", "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/AppointmentForm", "client:component-export": "default" })} ` })} ` })}`;
}, "/home/miguel/dev/elianarealtor/src/pages/en/index.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
