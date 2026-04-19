import { e as createComponent, m as maybeRenderHead, g as addAttribute, k as renderComponent, r as renderTemplate, h as createAstro } from './astro/server_Bx_r-E3M.mjs';
import { b as getRelativeLocaleUrl, u as useTranslations } from './PublicLayout_BCAqlNAF.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
/* empty css                         */

const HeroContent = ({
  tagline,
  title,
  subtitle,
  role,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 flex w-full flex-col justify-center py-28 sm:py-32 lg:py-0", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "flex w-full max-w-2xl flex-col",
      variants: containerVariants,
      initial: "hidden",
      animate: "visible",
      children: [
        /* @__PURE__ */ jsxs(
          motion.p,
          {
            variants: itemVariants,
            "data-edit-key": "hero.tagline",
            className: "mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-2 pl-3 pr-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm sm:text-sm",
            children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white", children: /* @__PURE__ */ jsx("svg", { className: "h-3.5 w-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" }) }) }),
              tagline
            ]
          }
        ),
        /* @__PURE__ */ jsxs(motion.div, { variants: itemVariants, children: [
          /* @__PURE__ */ jsx("h1", { "data-edit-key": "hero.title", className: "font-serif text-5xl font-black leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem]", children: title }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-3 sm:mt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-[2px] w-10 bg-accent sm:w-14" }),
            /* @__PURE__ */ jsx("span", { "data-edit-key": "hero.role", className: "text-sm font-bold uppercase tracking-[0.3em] text-accent sm:text-base md:text-lg", children: role }),
            /* @__PURE__ */ jsx("div", { className: "h-[2px] w-10 bg-accent sm:w-14" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            variants: itemVariants,
            "data-edit-key": "hero.subtitle",
            className: "mt-6 max-w-lg text-base font-light leading-relaxed text-white/85 sm:mt-8 sm:text-lg md:text-xl",
            children: subtitle
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: itemVariants,
            className: "mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4",
            children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: primaryHref,
                  "data-edit-key": "hero.cta.primary",
                  className: "group inline-flex w-full min-h-[52px] items-center justify-center rounded-xl bg-primary px-7 py-4 text-base font-bold text-white shadow-[0_8px_30px_rgba(227,30,47,0.4)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_12px_40px_rgba(227,30,47,0.5)] hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto sm:px-9 sm:text-lg",
                  children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2.5 tracking-wide", children: [
                    primaryCta,
                    /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 sm:h-5 sm:w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: secondaryHref,
                  "data-edit-key": "hero.cta.secondary",
                  className: "inline-flex w-full min-h-[52px] items-center justify-center rounded-xl border-2 border-white/80 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-surface-dark hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto sm:px-9 sm:text-lg",
                  children: /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: secondaryCta })
                }
              )
            ]
          }
        )
      ]
    }
  ) });
};

const $$Astro$5 = createAstro();
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { lang, t, title, subtitle, heroImage = "/images/elianafull.jpg", tagline = t("hero.tagline"), role = t("hero.role"), primaryCta = t("hero.cta.primary"), secondaryCta = t("hero.cta.secondary"), badgeTitle = t("hero.badgeTitle"), badgeDesc = t("hero.badgeDesc") } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero-section relative w-full min-h-[100dvh] overflow-hidden bg-surface-dark" aria-label="Hero" data-astro-cid-7nmnspah>  <div class="absolute inset-0 lg:w-[50%] pointer-events-none" aria-hidden="true" data-edit-key="image.hero" data-astro-cid-7nmnspah> <img${addAttribute(heroImage, "src")} alt="" class="h-full w-full object-cover object-top" data-astro-cid-7nmnspah>  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-surface-dark/40 to-surface-dark lg:via-surface-dark/60 lg:to-surface-dark" data-astro-cid-7nmnspah></div> <div class="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-transparent lg:from-surface-dark/30 lg:via-transparent" data-astro-cid-7nmnspah></div> </div>  <div class="absolute inset-0 pointer-events-none" aria-hidden="true" data-astro-cid-7nmnspah> <div class="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[150px]" data-astro-cid-7nmnspah></div> <div class="absolute bottom-[15%] right-[20%] w-[400px] h-[400px] rounded-full bg-accent/6 blur-[120px]" data-astro-cid-7nmnspah></div> </div>  <div class="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl items-center px-4 sm:px-6 lg:px-8" data-astro-cid-7nmnspah> <div class="ml-auto w-full lg:w-[55%] xl:w-[50%]" data-astro-cid-7nmnspah> ${renderComponent($$result, "HeroContent", HeroContent, { "client:load": true, "tagline": tagline, "title": title, "subtitle": subtitle, "role": role, "primaryCta": primaryCta, "secondaryCta": secondaryCta, "primaryHref": getRelativeLocaleUrl(lang, "/properties"), "secondaryHref": getRelativeLocaleUrl(lang, "/#appointment"), "client:component-hydration": "load", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/HeroContent", "client:component-export": "HeroContent", "data-astro-cid-7nmnspah": true })} </div> </div>  <div class="absolute bottom-8 left-8 z-20 hidden lg:block animate-float" data-astro-cid-7nmnspah> <div class="relative" data-astro-cid-7nmnspah> <img src="/images/realtor-card.png" alt="Realtor Card" class="w-48 xl:w-56 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-xl transition-transform duration-500 hover:scale-105" data-astro-cid-7nmnspah> <img src="/images/realstate.png" alt="" class="absolute -top-6 -right-6 w-14 opacity-25 rotate-12 pointer-events-none" aria-hidden="true" data-astro-cid-7nmnspah> </div> </div>  <div class="absolute bottom-0 left-0 right-0 z-20" data-astro-cid-7nmnspah> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 flex items-end justify-between" data-astro-cid-7nmnspah>  <div class="hidden md:flex lg:hidden items-center gap-3 bg-white/90 backdrop-blur-lg rounded-2xl px-5 py-3 shadow-2xl border border-white/60" data-astro-cid-7nmnspah> <div class="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white" data-astro-cid-7nmnspah> <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-7nmnspah> <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" data-astro-cid-7nmnspah></path> </svg> </div> <div data-astro-cid-7nmnspah> <p class="font-bold text-sm text-on-surface leading-tight" data-edit-key="hero.badgeTitle" data-astro-cid-7nmnspah>${badgeTitle}</p> <p class="text-[11px] font-semibold text-primary uppercase tracking-wider" data-edit-key="hero.badgeDesc" data-astro-cid-7nmnspah>${badgeDesc}</p> </div> </div>  <div class="hidden md:flex flex-col items-center gap-1.5 text-white/40 ml-auto animate-bounce-slow" data-astro-cid-7nmnspah> <span class="text-[9px] uppercase tracking-[0.3em] font-medium" data-astro-cid-7nmnspah>Scroll</span> <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-astro-cid-7nmnspah> <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-astro-cid-7nmnspah></path> </svg> </div> </div> </div> </section> `;
}, "/home/miguel/dev/elianarealtor/src/components/sections/HeroSection.astro", void 0);

const $$Astro$4 = createAstro();
const $$StatsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$StatsSection;
  const { t } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="stats-section relative bg-primary py-12 sm:py-16 md:py-20 overflow-hidden"${addAttribute(t("stats.ariaLabel"), "aria-label")}> <div class="absolute inset-0 opacity-10" aria-hidden="true"> <img src="/images/hero-bg.png" alt="" class="h-full w-full object-cover"> </div> <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-10"> <div class="flex flex-col items-center text-center"> <span class="font-serif text-4xl font-bold text-white drop-shadow-sm sm:text-5xl md:text-5xl" aria-hidden="true">${t("stats.years")}</span> <span class="mt-1 text-sm font-semibold uppercase tracking-widest text-white/95 sm:text-base">${t("stats.yearsLabel")}</span> </div> <div class="flex flex-col items-center text-center"> <span class="font-serif text-4xl font-bold text-white drop-shadow-sm sm:text-5xl md:text-5xl" aria-hidden="true">${t("stats.clients")}</span> <span class="mt-1 text-sm font-semibold uppercase tracking-widest text-white/95 sm:text-base">${t("stats.clientsLabel")}</span> </div> <div class="flex flex-col items-center text-center"> <span class="font-serif text-4xl font-bold text-white drop-shadow-sm sm:text-5xl md:text-5xl" aria-hidden="true">${t("stats.deals")}</span> <span class="mt-1 text-sm font-semibold uppercase tracking-widest text-white/95 sm:text-base">${t("stats.dealsLabel")}</span> </div> </div> </div> </section>`;
}, "/home/miguel/dev/elianarealtor/src/components/sections/StatsSection.astro", void 0);

const $$Astro$3 = createAstro();
const $$WhyChooseSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$WhyChooseSection;
  const { t, whyTitle = t("why.title"), whySubtitle = t("why.subtitle"), item1Title = t("why.item1.title"), item1Desc = t("why.item1.desc"), item2Title = t("why.item2.title"), item2Desc = t("why.item2.desc"), item3Title = t("why.item3.title"), item3Desc = t("why.item3.desc") } = Astro2.props;
  const items = [
    { key: "item1", icon: "map", title: item1Title, desc: item1Desc },
    { key: "item2", icon: "handshake", title: item2Title, desc: item2Desc },
    { key: "item3", icon: "shield", title: item3Title, desc: item3Desc }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="why-section relative bg-surface-muted py-16 sm:py-20 md:py-28 overflow-hidden" id="why" aria-labelledby="why-heading"> <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] max-w-md opacity-[0.06] hidden xl:block" aria-hidden="true"> <img src="/images/elianafull.jpg" alt="" class="rounded-l-3xl object-cover h-80 w-full"> </div> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"> <header class="mx-auto max-w-2xl text-center flex flex-col items-center"> <img src="/images/realstate.png" alt="" class="mb-6 h-16 w-auto opacity-90 drop-shadow-sm sm:h-20" aria-hidden="true"> <h2 id="why-heading" class="font-serif text-3xl font-semibold text-on-surface sm:text-4xl md:text-4xl" data-edit-key="why.title"> ${whyTitle} </h2> <p class="mt-4 text-base leading-relaxed text-on-surface-muted sm:text-lg" data-edit-key="why.subtitle"> ${whySubtitle} </p> </header> <ul class="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-12" role="list"> ${items.map(({ key, icon, title: itemTitle, desc: itemDesc }) => renderTemplate`<li class="relative rounded-2xl border border-primary/10 bg-surface p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-accent/30 sm:p-8"> <div class="flex flex-col sm:flex-row sm:items-start sm:gap-4"> <span class="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mb-0" aria-hidden="true"> ${icon === "map" && renderTemplate`<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"></path> </svg>`} ${icon === "handshake" && renderTemplate`<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"></path> </svg>`} ${icon === "shield" && renderTemplate`<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"></path> </svg>`} </span> <div> <h3 class="font-serif text-xl font-semibold text-on-surface sm:text-2xl"${addAttribute(`why.${key}.title`, "data-edit-key")}>${itemTitle}</h3> <p class="mt-2 text-sm leading-relaxed text-on-surface-muted sm:text-base"${addAttribute(`why.${key}.desc`, "data-edit-key")}>${itemDesc}</p> </div> </div> </li>`)} </ul> </div> </section>`;
}, "/home/miguel/dev/elianarealtor/src/components/sections/WhyChooseSection.astro", void 0);

const AboutContent = ({
  title,
  body,
  cardImage,
  badgeText = "About Me",
  ctaText = "Get in Touch",
  happyClientsText = "Happy Clients"
}) => {
  return /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: "easeOut" },
        className: "relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2.5rem] transform rotate-3 scale-105 pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-surface-gray/50 rounded-[2.5rem] transform -rotate-2 scale-105 pointer-events-none" }),
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/40 bg-surface shadow-2xl group z-10", "data-edit-key": "image.about", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: cardImage,
                alt: "Realtor portrait",
                className: "about-card-img h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105",
                onError: (e) => {
                  e.target.style.display = "none";
                  const placeholder = document.getElementById("about-placeholder");
                  if (placeholder) placeholder.classList.remove("hidden");
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                id: "about-placeholder",
                className: "about-card-placeholder absolute inset-0 hidden flex-col items-center justify-center bg-gray-100 font-serif text-5xl font-medium text-gray-400",
                "aria-hidden": "true",
                children: "ER"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { delay: 0.5, duration: 0.6 },
              className: "absolute -right-6 -bottom-6 lg:-right-10 lg:bottom-10 glass rounded-2xl p-4 flex items-center gap-4 shadow-2xl z-20 animate-float",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-lg text-on-surface", children: "Certified" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Top Realtor" })
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
        className: "lg:pl-8",
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 inline-block rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-accent border border-accent/20 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm", "data-edit-key": "about.badge", children: badgeText }),
          /* @__PURE__ */ jsx("h2", { "data-edit-key": "about.title", className: "font-serif text-3xl font-semibold leading-tight text-on-surface sm:text-4xl md:text-5xl", children: title }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" }),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-4 bg-primary/40 rounded-full" }),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 bg-primary/20 rounded-full" })
          ] }),
          /* @__PURE__ */ jsx("p", { "data-edit-key": "about.body", className: "mt-6 text-base leading-relaxed text-on-surface-muted whitespace-pre-line font-light sm:mt-8 sm:text-lg md:text-xl", children: body }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsx("a", { href: "#contact", "data-edit-key": "about.cta", className: "inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-on-surface px-6 py-3.5 text-center font-bold text-white shadow-lg transition-all hover:bg-primary hover:shadow-primary/30 sm:w-auto sm:px-8 sm:py-4", children: ctaText }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 sm:justify-start", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex -space-x-3", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-surface-gray text-xs font-bold", children: "S" }),
                /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-surface-gray text-xs font-bold", children: "M" }),
                /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-[10px] font-bold text-white", children: "50+" })
              ] }),
              /* @__PURE__ */ jsx("span", { "data-edit-key": "about.happyClients", className: "text-sm font-semibold text-on-surface-muted", children: happyClientsText })
            ] })
          ] })
        ]
      }
    )
  ] }) });
};

const $$Astro$2 = createAstro();
const $$AboutSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AboutSection;
  const { t, title = t("about.title"), body, badge = t("about.badge"), cta = t("about.cta"), happyClients = t("about.happyClients"), cardImage = "/images/elianafull.jpg" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden bg-surface-gray py-16 sm:py-24 md:py-32" id="about"> <div class="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true"> <img src="/images/hero-bg.png" alt="" class="h-full w-full object-cover"> </div> <div class="absolute -left-[20%] top-0 h-[600px] w-[600px] rounded-full bg-white/40 blur-3xl pointer-events-none sm:h-[800px] sm:w-[800px]" aria-hidden="true"></div> ${renderComponent($$result, "AboutContent", AboutContent, { "client:visible": true, "title": title, "body": body, "cardImage": cardImage, "badgeText": badge, "ctaText": cta, "happyClientsText": happyClients, "client:component-hydration": "visible", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/AboutContent", "client:component-export": "AboutContent" })} </section>`;
}, "/home/miguel/dev/elianarealtor/src/components/sections/AboutSection.astro", void 0);

const iconPaths = {
  buy: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" }),
  sell: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" }),
  rent: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-.997.43-1.56A6 6 0 1 1 21.75 8.25Z" })
};
const ServicesContent = ({ title, body, services, badgeText = "Services" }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "flex flex-col text-center md:flex-row md:items-end md:justify-between md:text-left gap-6",
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 inline-block rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary sm:mb-4 sm:px-4 sm:text-sm", "data-edit-key": "services.badge", children: badgeText }),
          /* @__PURE__ */ jsx("h2", { "data-edit-key": "services.title", className: "font-serif text-3xl font-semibold text-on-surface sm:text-4xl md:text-5xl", children: title }),
          /* @__PURE__ */ jsx("p", { "data-edit-key": "services.body", className: "mt-4 text-base text-on-surface-muted whitespace-pre-line sm:mt-6 sm:text-lg", children: body })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        variants: container,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-80px" },
        className: "mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3",
        children: services.map((service, index) => /* @__PURE__ */ jsxs(
          motion.article,
          {
            variants: item,
            whileHover: { y: -6 },
            className: `group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-surface shadow-lg transition-all duration-500 hover:shadow-[0_20px_40px_rgba(227,30,47,0.1)] sm:rounded-3xl ${index === 1 ? "lg:-translate-y-8" : ""}`,
            children: [
              service.image && /* @__PURE__ */ jsxs("div", { className: "relative h-48 sm:h-56 overflow-hidden", "data-edit-key": `image.service.${service.key}`, children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: service.image,
                    alt: service.title,
                    className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm text-primary shadow-lg", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    stroke: "currentColor",
                    "aria-hidden": "true",
                    children: iconPaths[service.icon]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-6 sm:p-8", children: [
                !service.image && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 transition-transform duration-700 ease-out group-hover:scale-[2.5]" }),
                  /* @__PURE__ */ jsx("div", { className: "relative mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-light/5 text-secondary transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white group-hover:scale-110 shadow-sm group-hover:shadow-[0_0_20px_rgba(227,30,47,0.3)] group-hover:-translate-y-2", children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "h-8 w-8 transition-transform duration-500 group-hover:rotate-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      stroke: "currentColor",
                      "aria-hidden": "true",
                      children: iconPaths[service.icon]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx("h3", { "data-edit-key": `services.${service.key}.title`, className: "font-serif text-2xl font-bold text-on-surface transition-colors duration-300 group-hover:text-primary", children: service.title }),
                /* @__PURE__ */ jsx("p", { "data-edit-key": `services.${service.key}.desc`, className: "mt-3 leading-relaxed text-on-surface-muted transition-colors duration-300 group-hover:text-on-surface/90", children: service.desc }),
                /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center text-primary font-semibold opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm uppercase tracking-wide", children: "Learn more" }),
                  /* @__PURE__ */ jsx("svg", { className: "ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 ease-in-out group-hover:w-full" })
            ]
          },
          service.key
        ))
      }
    )
  ] });
};

const $$Astro$1 = createAstro();
const $$ServicesSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ServicesSection;
  const { t, title = t("services.title"), badge = t("services.badge"), body, serviceImages = ["/images/hero-bg.png", "/images/hero-2.png", "/images/hero-3.png"], buyTitle = t("services.buy.title"), buyDesc = t("services.buy.desc"), sellTitle = t("services.sell.title"), sellDesc = t("services.sell.desc"), rentTitle = t("services.rent.title"), rentDesc = t("services.rent.desc") } = Astro2.props;
  const services = [
    { key: "buy", icon: "buy", title: buyTitle, desc: buyDesc, image: serviceImages[0] },
    { key: "sell", icon: "sell", title: sellTitle, desc: sellDesc, image: serviceImages[1] },
    { key: "rent", icon: "rent", title: rentTitle, desc: rentDesc, image: serviceImages[2] }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden bg-surface py-16 sm:py-24 md:py-32" id="services"> <div class="absolute inset-0 bg-[url('/images/pattern-light.svg')] opacity-[0.03] pointer-events-none" aria-hidden="true"></div> <div class="absolute right-0 top-0 bottom-0 w-[28%] max-w-md opacity-[0.06] hidden lg:block" aria-hidden="true"> <img src="/images/hero-bg.png" alt="" class="h-full w-full object-cover rounded-l-3xl"> </div> ${renderComponent($$result, "ServicesContent", ServicesContent, { "client:visible": true, "title": title, "body": body, "services": services, "badgeText": badge, "client:component-hydration": "visible", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/ServicesContent", "client:component-export": "ServicesContent" })} </section>`;
}, "/home/miguel/dev/elianarealtor/src/components/sections/ServicesSection.astro", void 0);

const BlogContent = ({
  title,
  emptyText,
  viewAllText,
  viewAllHref,
  posts
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  return /* @__PURE__ */ jsx("section", { className: "bg-surface-gray py-24 md:py-32", id: "blog", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary", children: "Real Estate Insights" }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl font-semibold text-on-surface md:text-5xl lg:text-5xl", children: title })
      ] }),
      posts.length > 0 && /* @__PURE__ */ jsx(
        "a",
        {
          href: viewAllHref,
          className: "inline-flex items-center justify-center rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary-dark hover:text-white hover:border-primary-dark hover:shadow-sm",
          children: viewAllText
        }
      )
    ] }),
    posts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl border border-gray-200 bg-surface p-12 text-center shadow-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "text-on-surface-muted text-lg", children: emptyText }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: viewAllHref,
          className: "mt-6 inline-flex rounded-md border-2 border-primary px-6 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-white",
          children: viewAllText
        }
      )
    ] }) : /* @__PURE__ */ jsx(
      motion.div,
      {
        variants: container,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-50px" },
        className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
        children: posts.slice(0, 3).map((p) => /* @__PURE__ */ jsxs(
          motion.a,
          {
            variants: item,
            whileHover: { y: -6 },
            href: p.href,
            className: "group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-surface shadow-md transition-all duration-500 hover:shadow-2xl",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative h-56 overflow-hidden bg-gray-100", children: [
                p.coverImage ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: p.coverImage,
                    alt: p.title,
                    className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-surface-muted flex items-center justify-center text-gray-400", children: "No Image" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl font-bold leading-tight text-on-surface transition-colors group-hover:text-primary", children: p.title }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 line-clamp-3 leading-relaxed text-on-surface-muted", children: p.excerpt }),
                /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center text-accent font-semibold group-hover:underline decoration-accent/50 underline-offset-4", children: [
                  "Read Article",
                  /* @__PURE__ */ jsx("svg", { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" }) })
                ] })
              ] })
            ]
          },
          p.slug
        ))
      }
    )
  ] }) });
};

const $$Astro = createAstro();
const $$BlogPreview = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPreview;
  const { lang, t, posts } = Astro2.props;
  const formattedPosts = posts.map((p) => ({
    slug: p.slug,
    title: lang === "es" ? p.titleEs : p.titleEn,
    excerpt: lang === "es" ? p.excerptEs ?? "" : p.excerptEn ?? "",
    coverImage: p.coverImage,
    href: getRelativeLocaleUrl(lang, `/blog/${p.slug}`)
  }));
  return renderTemplate`${renderComponent($$result, "BlogContent", BlogContent, { "client:visible": true, "title": t("blog.title"), "emptyText": t("blog.empty"), "viewAllText": t("blog.viewAll"), "viewAllHref": getRelativeLocaleUrl(lang, "/blog"), "posts": formattedPosts, "client:component-hydration": "visible", "client:component-path": "/home/miguel/dev/elianarealtor/src/components/sections/BlogContent", "client:component-export": "BlogContent" })}`;
}, "/home/miguel/dev/elianarealtor/src/components/sections/BlogPreview.astro", void 0);

function FeaturedProperties({
  lang,
  limit = 6,
  featuredTitle,
  viewAll,
  emptyFeatured,
  typeSale,
  typeRent
}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/properties?featured=true&status=available&limit=${limit}`).then((r) => r.json()).then((data) => {
      if (data.data) setList(data.data);
    }).finally(() => setLoading(false));
  }, [limit]);
  const title = (p) => lang === "es" ? p.titleEs : p.titleEn;
  const typeLabel = (type) => type === "sale" ? typeSale : typeRent;
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  return /* @__PURE__ */ jsx("section", { className: "bg-surface py-24 md:py-32", id: "properties", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary", children: "Portfolio" }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl font-semibold text-on-surface md:text-5xl lg:text-5xl", children: featuredTitle })
      ] }),
      !loading && list.length > 0 && /* @__PURE__ */ jsxs(
        "a",
        {
          href: lang === "en" ? "/en/properties" : "/es/properties",
          className: "inline-flex items-center justify-center rounded-lg bg-surface border border-gray-200 px-6 py-3 font-semibold text-on-surface transition-all duration-300 hover:bg-surface-gray hover:shadow-sm",
          children: [
            viewAll,
            /* @__PURE__ */ jsx("svg", { className: "ml-2 h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" }) })
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsx("div", { className: "h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" }) }) : list.length === 0 ? /* @__PURE__ */ jsx("div", { className: "mt-8 rounded-2xl border border-gray-100 bg-surface-gray/30 p-16 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-lg text-on-surface-muted", children: emptyFeatured }) }) : /* @__PURE__ */ jsx(
      motion.div,
      {
        variants: container,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-50px" },
        className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
        children: list.map((p) => /* @__PURE__ */ jsxs(
          motion.a,
          {
            variants: item,
            whileHover: { y: -12 },
            href: lang === "en" ? `/en/properties/${p.id}` : `/es/properties/${p.id}`,
            className: "group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-surface shadow-lg transition-all duration-500 hover:shadow-[0_20px_40px_rgba(227,30,47,0.12)]",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-gray-100", children: [
                p.images?.[0] ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: p.images[0],
                    alt: title(p),
                    className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center text-on-surface-muted bg-surface-gray", children: "No Image Available" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80", "aria-hidden": true }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-black/20 backdrop-blur-[2px]", children: /* @__PURE__ */ jsx("span", { className: "translate-y-8 rounded-full bg-primary/90 px-8 py-3 backdrop-blur-md border border-white/20 font-bold text-white transition-all duration-500 group-hover:translate-y-0 shadow-2xl hover:bg-primary", children: "View Details" }) }),
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md", children: typeLabel(p.type) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex flex-1 flex-col p-8 bg-surface z-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "absolute -top-6 right-6 bg-surface px-5 py-2.5 rounded-2xl shadow-xl border border-gray-100 font-bold text-xl text-primary transform transition-transform duration-500 group-hover:-translate-y-2", children: [
                  "$",
                  Number(p.price).toLocaleString()
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl font-bold text-on-surface line-clamp-1 transition-colors duration-300 md:pr-16 group-hover:text-primary pt-2", children: title(p) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center text-on-surface-muted", children: [
                  /* @__PURE__ */ jsxs("svg", { className: "mr-2 h-5 w-5 text-accent", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }),
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-base font-medium", children: p.zone })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-gray-100 flex items-center justify-between opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hidden md:flex", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Explore property" }),
                  /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-primary transition-transform group-hover:translate-x-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                ] })
              ] })
            ]
          },
          p.id
        ))
      }
    )
  ] }) });
}

function ContactForm({
  lang,
  contactTitle
}) {
  const t = useTranslations(lang);
  const title = contactTitle ?? t("contact.title");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  async function submit(e) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone") || void 0,
        message: fd.get("message") || void 0,
        source: "contact"
      })
    });
    const data = await res.json().catch(() => ({}));
    setSending(false);
    if (!res.ok) {
      setError(typeof data.error === "object" ? lang === "es" ? "Error al enviar" : "Failed to send" : data.error ?? t("form.error"));
      return;
    }
    setSuccess(true);
    form.reset();
  }
  const inputClass = "mt-1 w-full rounded-xl border border-gray-200 bg-surface-gray/30 px-4 py-3 text-on-surface transition-all duration-300 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300";
  return /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden bg-surface-muted py-20 md:py-28", id: "contact", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2 lg:items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "order-2 hidden md:flex flex-col items-center justify-end lg:order-1 pt-8 lg:pt-0", children: /* @__PURE__ */ jsx("img", { src: "/images/eliana.png", alt: "Eliana Velez", className: "w-full max-w-[420px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]" }) }),
    /* @__PURE__ */ jsxs("div", { className: "order-1 lg:order-2", children: [
      /* @__PURE__ */ jsx("h2", { "data-edit-key": "contact.title", className: "font-serif text-3xl font-semibold text-on-surface md:text-4xl", children: title }),
      success ? /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-md rounded-xl bg-accent-muted p-4 text-on-surface border border-accent/20", children: t("form.success") }) : /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-8 max-w-md lg:max-w-xl space-y-5", children: [
        error && /* @__PURE__ */ jsx("p", { className: "rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-700", children: error }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-on-surface", children: t("form.name") }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "name",
                name: "name",
                required: true,
                minLength: 2,
                className: inputClass
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-on-surface", children: t("form.phone") }),
            /* @__PURE__ */ jsx("input", { type: "tel", id: "phone", name: "phone", className: inputClass })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-on-surface", children: t("form.email") }),
          /* @__PURE__ */ jsx("input", { type: "email", id: "email", name: "email", required: true, className: inputClass })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-on-surface", children: t("form.message") }),
          /* @__PURE__ */ jsx("textarea", { id: "message", name: "message", rows: 4, className: inputClass })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: sending,
            className: "group relative w-full overflow-hidden rounded-xl bg-primary px-5 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0",
            children: sending ? "…" : t("form.submit")
          }
        )
      ] })
    ] })
  ] }) }) });
}

function TestimonialsContent({ title, subtitle, testimonials }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  return /* @__PURE__ */ jsxs("section", { className: "bg-surface-gray py-24 md:py-32 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -left-[20%] top-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -right-[20%] bottom-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-16 md:mb-20", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.8 },
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 inline-block rounded-full bg-surface border border-gray-200 px-5 py-2 text-sm font-bold uppercase tracking-widest text-primary shadow-sm hover:shadow-md transition-shadow", children: "Client Stories" }),
            /* @__PURE__ */ jsx("h2", { className: "mt-4 font-serif text-4xl font-bold text-on-surface md:text-5xl lg:text-6xl max-w-3xl mx-auto", children: title }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-on-surface-muted max-w-2xl mx-auto font-light leading-relaxed", children: subtitle })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          variants: container,
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, margin: "-50px" },
          className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
          children: testimonials.map((t, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: item,
              className: `relative bg-surface p-10 rounded-3xl border border-gray-100 shadow-xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(15,42,61,0.08)] hover:-translate-y-2 group flex flex-col justify-between ${idx === 1 ? "lg:translate-y-8" : ""}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-8 right-8 text-gray-200/50 group-hover:text-primary/10 transition-colors duration-500", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex gap-1 mb-6", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: `w-5 h-5 ${i < t.rating ? "text-accent" : "text-gray-200"} transition-transform duration-300 group-hover:scale-110`,
                      style: { transitionDelay: `${i * 50}ms` },
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                    },
                    i
                  )) }),
                  /* @__PURE__ */ jsxs("p", { className: "text-on-surface-muted text-lg leading-relaxed mb-10 flex-grow font-serif italic text-pretty", children: [
                    '"',
                    t.content,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-auto", children: [
                    /* @__PURE__ */ jsx("div", { className: "relative w-14 h-14 rounded-full overflow-hidden border-2 border-surface shadow-md", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: t.image,
                        alt: t.name,
                        className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                        onError: (e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0F2A3D&color=fff`;
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-bold text-on-surface text-lg leading-tight", children: t.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-primary uppercase tracking-wide mt-1", children: t.role })
                    ] })
                  ] })
                ] })
              ]
            },
            t.id
          ))
        }
      )
    ] })
  ] });
}

function AppointmentForm({ lang }) {
  const t = useTranslations(lang);
  const [month, setMonth] = useState(() => {
    const d = /* @__PURE__ */ new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/availability?month=${month}`).then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setSlots(data);
      else setSlots([]);
    }).catch(() => setSlots([])).finally(() => setLoading(false));
  }, [month]);
  const available = slots.filter((s) => !s.isBooked);
  async function submit(e) {
    e.preventDefault();
    if (!selected) return;
    setError(null);
    setSending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slotId: selected,
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone") || void 0,
        message: fd.get("message") || void 0
      })
    });
    const data = await res.json().catch(() => ({}));
    setSending(false);
    if (!res.ok) {
      setError(data.error ?? (lang === "es" ? "No se pudo agendar" : "Could not book"));
      return;
    }
    setSuccess(true);
    setSelected(null);
  }
  const inputClass = "mt-1 w-full rounded-xl border border-gray-200 bg-surface-gray/30 px-4 py-3 text-on-surface transition-all duration-300 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300";
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28", id: "appointment", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-semibold text-on-surface md:text-4xl", children: t("appointment.title") }),
    success ? /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-md rounded-xl bg-accent-muted/50 p-4 text-on-surface", children: lang === "es" ? "Cita agendada. Revisa tu correo." : "Appointment booked. Check your email." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-on-surface", children: lang === "es" ? "Mes" : "Month" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "month",
            value: month,
            onChange: (e) => setMonth(e.target.value),
            className: inputClass
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-on-surface-muted", children: "Loading…" }) : available.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-on-surface-muted", children: lang === "es" ? "No hay horarios disponibles este mes." : "No slots available this month." }) : /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-8 max-w-md space-y-5", children: [
        error && /* @__PURE__ */ jsx("p", { className: "rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-700", children: error }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-on-surface", children: lang === "es" ? "Horarios" : "Slots" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: available.map((s) => {
            const timeStr = typeof s.timeStart === "string" ? s.timeStart.slice(0, 5) : "";
            const label = `${s.date} ${timeStr}`;
            const id = s.id;
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelected(id),
                className: `rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${selected === id ? "border-primary bg-primary text-white shadow-md scale-105" : "border-gray-200 bg-surface hover:border-gray-300 hover:bg-surface-gray"}`,
                children: label
              },
              id
            );
          }) })
        ] }),
        selected && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-on-surface", children: t("form.name") }),
            /* @__PURE__ */ jsx("input", { type: "text", name: "name", required: true, minLength: 2, className: inputClass })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-on-surface", children: t("form.email") }),
            /* @__PURE__ */ jsx("input", { type: "email", name: "email", required: true, className: inputClass })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-on-surface", children: t("form.phone") }),
            /* @__PURE__ */ jsx("input", { type: "tel", name: "phone", className: inputClass })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-on-surface", children: t("form.message") }),
            /* @__PURE__ */ jsx("textarea", { name: "message", rows: 2, className: inputClass })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: sending,
              className: "group relative w-full overflow-hidden rounded-xl bg-primary px-5 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0",
              children: sending ? "…" : lang === "es" ? "Confirmar cita" : "Confirm appointment"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}

export { $$HeroSection as $, AppointmentForm as A, ContactForm as C, FeaturedProperties as F, TestimonialsContent as T, $$StatsSection as a, $$WhyChooseSection as b, $$AboutSection as c, $$ServicesSection as d, $$BlogPreview as e };
