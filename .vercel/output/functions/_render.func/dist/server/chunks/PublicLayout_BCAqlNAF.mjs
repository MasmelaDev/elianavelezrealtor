import { e as createComponent, g as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate, h as createAstro, m as maybeRenderHead, l as renderScript, k as renderComponent, an as defineScriptVars } from './astro/server_Bx_r-E3M.mjs';
/* empty css                                */
import { f as favicon } from './favicon_PMaL-EV7.mjs';
import { d as db, p as pageContent } from './schema_CP1qSdhM.mjs';
import { eq } from 'drizzle-orm';

const $$Astro$4 = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description, image, lang } = Astro2.props;
  const canonical = new URL(Astro2.url.pathname, "https://tudominio.com");
  return renderTemplate`<html${addAttribute(lang, "lang")} class="font-sans antialiased"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:image"${addAttribute(image ?? "/og-default.jpg", "content")}><meta property="og:type" content="website"><link rel="icon" type="image/svg+xml"${addAttribute(favicon, "href")}><link rel="alternate" hreflang="en"${addAttribute(`${"https://tudominio.com"}/en${Astro2.url.pathname.replace(/^\/(en|es)/, "") || ""}`, "href")}><link rel="alternate" hreflang="es"${addAttribute(`${"https://tudominio.com"}/es${Astro2.url.pathname.replace(/^\/(en|es)/, "") || ""}`, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(`${"https://tudominio.com"}/en`, "href")}>${renderHead()}</head> <body class="bg-surface text-on-surface"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/miguel/dev/elianarealtor/src/components/layout/BaseLayout.astro", void 0);

const defaultLang = "en";
const ui = {
  en: {
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.book": "Book a Call",
    "nav.menuOpen": "Open menu",
    "nav.menuClose": "Close menu",
    "hero.tagline": "Turning your vision into reality. Your expert real estate guide.",
    "hero.badgeTitle": "Fulfilling Dreams",
    "hero.badgeDesc": "Over 100 Happy Families",
    "hero.role": "Broker / Manager",
    "hero.cta.primary": "View Properties",
    "hero.cta.secondary": "Schedule a Meeting",
    "about.title": "About Me",
    "about.badge": "About Me",
    "about.cta": "Get in Touch",
    "about.happyClients": "Happy Clients",
    "services.title": "How I Can Help",
    "services.badge": "Expertise & Dedication",
    "services.body": "Comprehensive real estate services designed around your unique goals, whether buying, selling, or renting.",
    "services.buy.title": "Buy",
    "services.buy.desc": "Find your perfect home with expert guidance and market insight.",
    "services.sell.title": "Sell",
    "services.sell.desc": "Maximize your property value with a tailored marketing strategy.",
    "services.rent.title": "Rent",
    "services.rent.desc": "Lease or find tenants with reliable, hassle-free support.",
    "properties.title": "Available Properties",
    "blog.title": "Real Estate Tips",
    "contact.title": "Get in Touch",
    "appointment.title": "Schedule a Meeting",
    "form.name": "Full Name",
    "form.email": "Email Address",
    "form.phone": "Phone Number",
    "form.message": "Message",
    "form.submit": "Send Message",
    "form.success": "Message sent! I'll get back to you soon.",
    "form.error": "Something went wrong. Please try again.",
    "filter.zone": "Zone",
    "filter.type": "Type",
    "filter.type.sale": "For Sale",
    "filter.type.rent": "For Rent",
    "filter.price": "Price Range",
    "filter.bedrooms": "Bedrooms",
    "filter.clear": "Clear Filters",
    "property.bedrooms": "Bedrooms",
    "property.bathrooms": "Bathrooms",
    "property.area": "Area (sqft)",
    "property.contact": "I'm interested in this property",
    "property.location": "Location",
    "properties.featuredTitle": "Featured Properties",
    "properties.viewAll": "View all properties",
    "properties.emptyFeatured": "No featured properties at the moment. Browse all listings below.",
    "blog.viewAll": "View blog",
    "blog.empty": "No posts yet. Check back soon.",
    "properties.mapTitle": "Explore by Area",
    "stats.ariaLabel": "Our results in numbers",
    "stats.years": "10+",
    "stats.yearsLabel": "Years Experience",
    "stats.clients": "50+",
    "stats.clientsLabel": "Happy Clients",
    "stats.deals": "100+",
    "stats.dealsLabel": "Closed Deals",
    "why.title": "Why Choose Me As Your Partner",
    "why.subtitle": "I bring personalized attention, unparalleled local expertise, and a relentless commitment to achieving your absolute satisfaction and peace of mind.",
    "why.item1.title": "Local Market Expert",
    "why.item1.desc": "Deep knowledge of neighborhoods, pricing trends, and the best opportunities in the area.",
    "why.item2.title": "Full-Service Support",
    "why.item2.desc": "From search to closing—guidance, paperwork, and negotiations so you feel confident every step.",
    "why.item3.title": "Honest & Transparent",
    "why.item3.desc": "Clear communication and no pressure. Your goals and timeline always come first.",
    "testimonials.title": "What My Clients Say",
    "testimonials.subtitle": "Real stories from people who found their perfect home or successfully sold their property with my help."
  },
  es: {
    "nav.home": "Inicio",
    "nav.properties": "Propiedades",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.book": "Agendar Llamada",
    "nav.menuOpen": "Abrir menú",
    "nav.menuClose": "Cerrar menú",
    "hero.tagline": "Transformamos tu visión en realidad. Tu guía experta en bienes raíces.",
    "hero.badgeTitle": "Cumpliendo Sueños",
    "hero.badgeDesc": "Más de 100 familias felices",
    "hero.role": "Broker / Manager",
    "hero.cta.primary": "Ver Propiedades",
    "hero.cta.secondary": "Programar Reunión",
    "about.title": "Sobre Mí",
    "about.badge": "Sobre Mí",
    "about.cta": "Contáctame",
    "about.happyClients": "Clientes felices",
    "services.title": "Cómo Puedo Ayudarte",
    "services.badge": "Experiencia y Dedicación",
    "services.body": "Ya sea que busques tu hogar soñado, vender al mejor precio o una inversión sólida, te ofrezco asesoría integral y resultados excepcionales.",
    "services.buy.title": "Comprar",
    "services.buy.desc": "Encuentra tu hogar ideal con asesoría y conocimiento del mercado.",
    "services.sell.title": "Vender",
    "services.sell.desc": "Maximiza el valor de tu propiedad con una estrategia a tu medida.",
    "services.rent.title": "Arrendar",
    "services.rent.desc": "Arrienda o encuentra inquilinos con un proceso confiable y sencillo.",
    "properties.title": "Propiedades Disponibles",
    "blog.title": "Tips de Bienes Raíces",
    "contact.title": "Contáctame",
    "appointment.title": "Programa una Reunión",
    "form.name": "Nombre Completo",
    "form.email": "Correo Electrónico",
    "form.phone": "Teléfono",
    "form.message": "Mensaje",
    "form.submit": "Enviar Mensaje",
    "form.success": "¡Mensaje enviado! Me pondré en contacto pronto.",
    "form.error": "Algo salió mal. Por favor intenta de nuevo.",
    "filter.zone": "Zona",
    "filter.type": "Tipo",
    "filter.type.sale": "En Venta",
    "filter.type.rent": "En Arriendo",
    "filter.price": "Rango de Precio",
    "filter.bedrooms": "Habitaciones",
    "filter.clear": "Limpiar Filtros",
    "property.bedrooms": "Habitaciones",
    "property.bathrooms": "Baños",
    "property.area": "Área (pies²)",
    "property.contact": "Me interesa esta propiedad",
    "property.location": "Ubicación",
    "properties.featuredTitle": "Propiedades destacadas",
    "properties.viewAll": "Ver todas las propiedades",
    "properties.emptyFeatured": "No hay propiedades destacadas por ahora. Explora el listado completo.",
    "blog.viewAll": "Ver blog",
    "blog.empty": "Aún no hay posts. Vuelve pronto.",
    "properties.mapTitle": "Explora por zona",
    "stats.ariaLabel": "Nuestros números",
    "stats.years": "10+",
    "stats.yearsLabel": "Años de Experiencia",
    "stats.clients": "50+",
    "stats.clientsLabel": "Clientes Felices",
    "stats.deals": "100+",
    "stats.dealsLabel": "Operaciones Cerradas",
    "why.title": "Por Qué Elegirme Como Tu Aliada",
    "why.subtitle": "Atención exclusiva, conocimiento inigualable del mercado local y un compromiso absoluto con tu tranquilidad financiera y bienestar familiar.",
    "why.item1.title": "Experta en el Mercado Local",
    "why.item1.desc": "Conocimiento profundo de barrios, tendencias de precios y las mejores oportunidades en la zona.",
    "why.item2.title": "Soporte Integral",
    "why.item2.desc": "Desde la búsqueda hasta el cierre: asesoría, trámites y negociaciones para que te sientas seguro en cada paso.",
    "why.item3.title": "Honestidad y Transparencia",
    "why.item3.desc": "Comunicación clara y sin presiones. Tus objetivos y plazos siempre van primero.",
    "testimonials.title": "Lo Que Dicen Mis Clientes",
    "testimonials.subtitle": "Historias reales de personas que encontraron su hogar ideal o vendrieron su propiedad con éxito."
  }
};

function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang;
  return defaultLang;
}
function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] ?? ui[defaultLang][key] ?? String(key);
  };
}
function getRelativeLocaleUrl(lang, path) {
  return `/${lang}${path.startsWith("/") ? path : "/" + path}`;
}
function getLocalizedPath(path, lang) {
  return getRelativeLocaleUrl(lang, path);
}

const $$Astro$3 = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { lang, t, transparentNav = false } = Astro2.props;
  const otherLang = lang === "en" ? "es" : "en";
  const homePath = getLocalizedPath("/", lang);
  const headerClasses = transparentNav ? "fixed w-full top-0 z-50 border-b border-white/10 bg-surface-dark/40 backdrop-blur-md shadow-none transition-colors duration-300" : "fixed w-full top-0 z-50 border-b border-gray-200/80 bg-surface/95 backdrop-blur-sm shadow-sm";
  const textClasses = transparentNav ? "text-white" : "text-on-surface";
  const linkClasses = transparentNav ? "text-white/90 hover:text-white" : "text-on-surface-muted hover:text-on-surface";
  const logoClasses = transparentNav ? "brightness-0 invert drop-shadow-md" : "";
  const btnClasses = transparentNav ? "text-white" : "text-on-surface";
  return renderTemplate`${maybeRenderHead()}<header${addAttribute(headerClasses, "class")} id="navbar"${addAttribute(String(transparentNav), "data-transparent")}> <nav class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6"> <a${addAttribute(homePath, "href")}${addAttribute(`flex items-center gap-2 font-serif text-lg font-semibold sm:text-xl ${textClasses}`, "class")}> <img src="/images/logo.png" alt="Eliana Velez REALTOR®"${addAttribute(`h-11 w-auto max-w-[180px] object-contain transition-all sm:h-14 sm:max-w-[220px] ${logoClasses}`, "class")} width="220" height="56"> <span class="navbar-brand-fallback hidden">Eliana Velez</span> </a> <div class="hidden items-center gap-6 md:flex md:gap-8"> <a${addAttribute(getLocalizedPath("/properties", lang), "href")}${addAttribute(`text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${linkClasses}`, "class")}>${t("nav.properties")}</a> <a${addAttribute(getLocalizedPath("/blog", lang), "href")}${addAttribute(`text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${linkClasses}`, "class")}>${t("nav.blog")}</a> <a${addAttribute(`${homePath}#contact`, "href")}${addAttribute(`text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${linkClasses}`, "class")}>${t("nav.contact")}</a> <a${addAttribute(`${homePath}#appointment`, "href")} class="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"> ${t("nav.book")} </a> <a${addAttribute(getLocalizedPath("/", otherLang), "href")}${addAttribute(`text-sm font-medium transition ${linkClasses}`, "class")} aria-label="Switch language"> ${otherLang === "es" ? "Espa\xF1ol" : "English"} </a> </div> <button type="button"${addAttribute(`flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg md:hidden ${btnClasses}`, "class")} id="nav-toggle"${addAttribute(t("nav.menuOpen"), "aria-label")} aria-expanded="false"${addAttribute(t("nav.menuOpen"), "data-menu-open-label")}${addAttribute(t("nav.menuClose"), "data-menu-close-label")}> <svg class="h-6 w-6 nav-icon-open" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> <svg class="h-6 w-6 nav-icon-close hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </nav> <div class="fixed inset-0 z-40 hidden bg-surface pt-24 pb-8 md:hidden" id="nav-drawer" aria-hidden="true"> <nav class="flex flex-col gap-1 px-4 py-6" aria-label="Menú principal"> <a${addAttribute(getLocalizedPath("/properties", lang), "href")} class="min-h-[48px] rounded-lg px-4 py-3 font-serif text-lg font-medium text-on-surface hover:bg-surface-muted">${t("nav.properties")}</a> <a${addAttribute(getLocalizedPath("/blog", lang), "href")} class="min-h-[48px] rounded-lg px-4 py-3 font-serif text-lg font-medium text-on-surface hover:bg-surface-muted">${t("nav.blog")}</a> <a${addAttribute(`${homePath}#contact`, "href")} class="min-h-[48px] rounded-lg px-4 py-3 font-serif text-lg font-medium text-on-surface hover:bg-surface-muted">${t("nav.contact")}</a> <a${addAttribute(`${homePath}#appointment`, "href")} class="mt-2 inline-flex min-h-[48px] w-fit items-center rounded-lg bg-accent px-6 py-3 font-semibold text-white">${t("nav.book")}</a> <a${addAttribute(getLocalizedPath("/", otherLang), "href")} class="min-h-[48px] rounded-lg px-4 py-3 font-serif text-lg font-medium text-on-surface hover:bg-surface-muted">${otherLang === "es" ? "Espa\xF1ol" : "English"}</a> </nav> </div> </header> ${renderScript($$result, "/home/miguel/dev/elianarealtor/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/home/miguel/dev/elianarealtor/src/components/layout/Navbar.astro?astro&type=script&index=1&lang.ts")}`;
}, "/home/miguel/dev/elianarealtor/src/components/layout/Navbar.astro", void 0);

const $$Astro$2 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  const { lang, t } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="relative overflow-hidden border-t-4 border-accent bg-surface-dark py-12 text-on-surface-dark sm:py-16"> <div class="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-[0.02] pointer-events-none" aria-hidden="true"></div> <div class="absolute right-0 bottom-0 w-64 opacity-5 pointer-events-none" aria-hidden="true"> <img src="/images/elianafull.jpg" alt="" class="rounded-tl-3xl object-cover h-48 w-full"> </div> <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div class="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4"> <div class="lg:col-span-2"> <a${addAttribute(getRelativeLocaleUrl(lang, "/"), "href")} class="inline-block"> <img src="/images/logo.png" alt="Eliana Velez REALTOR®" class="footer-logo h-8 w-auto max-w-[140px] object-contain brightness-0 invert" width="140" height="32"> <span class="footer-brand-fallback hidden font-serif text-3xl font-bold tracking-tight text-white">Eliana Velez <span class="text-accent text-sm uppercase tracking-widest block mt-1 font-sans">Realtor®</span></span> </a> <p class="mt-4 max-w-sm text-sm text-on-surface-dark-muted">
© ${(/* @__PURE__ */ new Date()).getFullYear()} Eliana Velez. ${t("nav.home")}.
</p> </div> <nav class="flex flex-col gap-3"> <span class="text-sm font-bold uppercase tracking-widest text-accent mb-2">Links</span> <a${addAttribute(getRelativeLocaleUrl(lang, "/properties"), "href")} class="text-on-surface-dark-muted transition-colors hover:text-white font-medium">${t("nav.properties")}</a> <a${addAttribute(getRelativeLocaleUrl(lang, "/blog"), "href")} class="text-on-surface-dark-muted transition-colors hover:text-white font-medium">${t("nav.blog")}</a> <a${addAttribute(getRelativeLocaleUrl(lang, "/#contact"), "href")} class="text-on-surface-dark-muted transition-colors hover:text-white font-medium">${t("nav.contact")}</a> <a${addAttribute(getRelativeLocaleUrl(lang, "/#appointment"), "href")} class="text-on-surface-dark-muted transition-colors hover:text-white font-medium">${t("nav.book")}</a> </nav> </div> </div> </footer> ${renderScript($$result, "/home/miguel/dev/elianarealtor/src/components/sections/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/miguel/dev/elianarealtor/src/components/sections/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$WhatsAppButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$WhatsAppButton;
  const { lang } = Astro2.props;
  const whatsappNumberRow = await db.select().from(pageContent).where(eq(pageContent.key, "contact.whatsapp")).limit(1);
  const whatsappRaw = whatsappNumberRow[0]?.valueEs || whatsappNumberRow[0]?.valueEn || "1234567890";
  const cleanNumber = whatsappRaw.replace(/[^0-9]/g, "");
  const whatsappLink = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(lang === "es" ? "\xA1Hola Eliana! Quisiera m\xE1s informaci\xF3n." : "Hello Eliana! I would like more information.")}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(whatsappLink, "href")} target="_blank" rel="noopener noreferrer" class="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50" aria-label="Direct message on WhatsApp" data-edit-key="contact.whatsapp"> <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path fill-rule="evenodd" d="M12.031 2.016A10.015 10.015 0 0 0 2 12c0 1.769.458 3.483 1.332 5.008l-1.574 5.753 5.88-1.543A10.027 10.027 0 0 0 12.031 22c5.526 0 10.015-4.485 10.015-10.007S17.556 2.016 12.031 2.016zm0 18.257c-1.464 0-2.898-.393-4.148-1.135l-.297-.176-3.085.809.822-3.007-.193-.307a8.293 8.293 0 0 1-1.272-4.426C3.858 6.439 8.356 1.94 13.921 1.94c5.564 0 10.063 4.498 10.063 10.062s-4.499 10.063-10.063 10.063zm5.521-7.538c-.303-.153-1.794-.888-2.072-.988-.278-.101-.481-.153-.684.153-.202.306-.784.988-.962 1.192-.177.203-.355.23-.658.077-.303-.153-1.282-.472-2.441-1.503-.902-.803-1.51-1.795-1.687-2.102-.177-.306-.019-.472.133-.624.136-.137.303-.357.455-.536.152-.178.203-.306.304-.51.101-.203.051-.382-.025-.535-.076-.153-.684-1.65-.937-2.257-.246-.593-.497-.512-.684-.521-.177-.008-.38-.008-.582-.008s-.532.076-.81.382c-.279.306-1.064 1.041-1.064 2.536s1.089 2.94 1.241 3.144c.152.204 2.146 3.273 5.197 4.59.726.313 1.291.501 1.733.642.729.231 1.393.198 1.916.12.585-.088 1.794-.735 2.047-1.446.253-.711.253-1.32.177-1.445-.076-.126-.279-.203-.583-.356z" clip-rule="evenodd"></path> </svg> </a>`;
}, "/home/miguel/dev/elianarealtor/src/components/ui/WhatsAppButton.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$PublicLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PublicLayout;
  const { lang, t, transparentNav = false, editorMode = false } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, { "lang": lang, "t": t, "transparentNav": transparentNav })} ${maybeRenderHead()}<main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "lang": lang, "t": t })} ${renderComponent($$result, "WhatsAppButton", $$WhatsAppButton, { "lang": lang })} ${editorMode && renderTemplate(_a || (_a = __template(["<script>(function(){", `
    (function() {
      if (!editorMode) return;
      var style = document.createElement('style');
      style.textContent = [
        'body.editor-mode [data-edit-key] { pointer-events: auto !important; }',
        '[data-edit-key]:hover { outline: 2px solid #2563eb !important; outline-offset: 2px !important; cursor: pointer !important; position: relative !important; }',
        '[data-edit-key]:hover::after { content: ""; position: absolute; top: 4px; right: 4px; width: 18px; height: 18px; background: #2563eb; border-radius: 4px; mask: url("data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'white\\' stroke-width=\\'2\\'%3E%3Cpath d=\\'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\\'%3E%3C/path%3E%3Cpath d=\\'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\\'%3E%3C/path%3E%3C/svg%3E") center/14px no-repeat; -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'white\\' stroke-width=\\'2\\'%3E%3Cpath d=\\'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\\'%3E%3C/path%3E%3Cpath d=\\'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\\'%3E%3C/path%3E%3C/svg%3E") center/14px no-repeat; }'
      ].join('\\n');
      document.body.classList.add('editor-mode');
      document.head.appendChild(style);
      document.addEventListener('click', function(e) {
        var el = e.target.closest('[data-edit-key]');
        if (!el) return;
        e.preventDefault();
        e.stopPropagation();
        var key = el.getAttribute('data-edit-key');
        if (key && window.parent !== window) window.parent.postMessage({ type: 'EDIT_FIELD', key: key }, '*');
      }, true);
    })();
  })();<\/script>`], ["<script>(function(){", `
    (function() {
      if (!editorMode) return;
      var style = document.createElement('style');
      style.textContent = [
        'body.editor-mode [data-edit-key] { pointer-events: auto !important; }',
        '[data-edit-key]:hover { outline: 2px solid #2563eb !important; outline-offset: 2px !important; cursor: pointer !important; position: relative !important; }',
        '[data-edit-key]:hover::after { content: ""; position: absolute; top: 4px; right: 4px; width: 18px; height: 18px; background: #2563eb; border-radius: 4px; mask: url("data:image/svg+xml,%3Csvg xmlns=\\\\'http://www.w3.org/2000/svg\\\\' viewBox=\\\\'0 0 24 24\\\\' fill=\\\\'none\\\\' stroke=\\\\'white\\\\' stroke-width=\\\\'2\\\\'%3E%3Cpath d=\\\\'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\\\\'%3E%3C/path%3E%3Cpath d=\\\\'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\\\\'%3E%3C/path%3E%3C/svg%3E") center/14px no-repeat; -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=\\\\'http://www.w3.org/2000/svg\\\\' viewBox=\\\\'0 0 24 24\\\\' fill=\\\\'none\\\\' stroke=\\\\'white\\\\' stroke-width=\\\\'2\\\\'%3E%3Cpath d=\\\\'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\\\\'%3E%3C/path%3E%3Cpath d=\\\\'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\\\\'%3E%3C/path%3E%3C/svg%3E") center/14px no-repeat; }'
      ].join('\\\\n');
      document.body.classList.add('editor-mode');
      document.head.appendChild(style);
      document.addEventListener('click', function(e) {
        var el = e.target.closest('[data-edit-key]');
        if (!el) return;
        e.preventDefault();
        e.stopPropagation();
        var key = el.getAttribute('data-edit-key');
        if (key && window.parent !== window) window.parent.postMessage({ type: 'EDIT_FIELD', key: key }, '*');
      }, true);
    })();
  })();<\/script>`])), defineScriptVars({ editorMode }))}`;
}, "/home/miguel/dev/elianarealtor/src/components/layout/PublicLayout.astro", void 0);

export { $$BaseLayout as $, $$PublicLayout as a, getRelativeLocaleUrl as b, getLangFromUrl as g, useTranslations as u };
