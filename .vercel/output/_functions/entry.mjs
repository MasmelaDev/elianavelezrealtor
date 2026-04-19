import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DPgYDJHz.mjs';
import { manifest } from './manifest_TXXL5lCU.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/appointments.astro.mjs');
const _page2 = () => import('./pages/admin/availability.astro.mjs');
const _page3 = () => import('./pages/admin/blog/new.astro.mjs');
const _page4 = () => import('./pages/admin/blog/_id_.astro.mjs');
const _page5 = () => import('./pages/admin/blog.astro.mjs');
const _page6 = () => import('./pages/admin/content.astro.mjs');
const _page7 = () => import('./pages/admin/leads.astro.mjs');
const _page8 = () => import('./pages/admin/login.astro.mjs');
const _page9 = () => import('./pages/admin/preview.astro.mjs');
const _page10 = () => import('./pages/admin/properties/new.astro.mjs');
const _page11 = () => import('./pages/admin/properties/_id_.astro.mjs');
const _page12 = () => import('./pages/admin/properties.astro.mjs');
const _page13 = () => import('./pages/admin.astro.mjs');
const _page14 = () => import('./pages/api/appointments.astro.mjs');
const _page15 = () => import('./pages/api/auth/login.astro.mjs');
const _page16 = () => import('./pages/api/auth/logout.astro.mjs');
const _page17 = () => import('./pages/api/availability/_id_.astro.mjs');
const _page18 = () => import('./pages/api/availability.astro.mjs');
const _page19 = () => import('./pages/api/blog/_id_.astro.mjs');
const _page20 = () => import('./pages/api/blog.astro.mjs');
const _page21 = () => import('./pages/api/content.astro.mjs');
const _page22 = () => import('./pages/api/leads/_id_.astro.mjs');
const _page23 = () => import('./pages/api/leads.astro.mjs');
const _page24 = () => import('./pages/api/properties/_id_.astro.mjs');
const _page25 = () => import('./pages/api/properties.astro.mjs');
const _page26 = () => import('./pages/api/upload/image.astro.mjs');
const _page27 = () => import('./pages/en/blog/_slug_.astro.mjs');
const _page28 = () => import('./pages/en/blog.astro.mjs');
const _page29 = () => import('./pages/en/properties/_id_.astro.mjs');
const _page30 = () => import('./pages/en/properties.astro.mjs');
const _page31 = () => import('./pages/en.astro.mjs');
const _page32 = () => import('./pages/es/blog/_slug_.astro.mjs');
const _page33 = () => import('./pages/es/blog.astro.mjs');
const _page34 = () => import('./pages/es/properties/_id_.astro.mjs');
const _page35 = () => import('./pages/es/properties.astro.mjs');
const _page36 = () => import('./pages/es.astro.mjs');
const _page37 = () => import('./pages/robots.txt.astro.mjs');
const _page38 = () => import('./pages/sitemap.xml.astro.mjs');
const _page39 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.18.1_@types+node@25.5.0_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.31.1_15e705843cfb1b50a35e83e8ebd72787/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/appointments.astro", _page1],
    ["src/pages/admin/availability.astro", _page2],
    ["src/pages/admin/blog/new.astro", _page3],
    ["src/pages/admin/blog/[id].astro", _page4],
    ["src/pages/admin/blog/index.astro", _page5],
    ["src/pages/admin/content.astro", _page6],
    ["src/pages/admin/leads.astro", _page7],
    ["src/pages/admin/login.astro", _page8],
    ["src/pages/admin/preview.astro", _page9],
    ["src/pages/admin/properties/new.astro", _page10],
    ["src/pages/admin/properties/[id].astro", _page11],
    ["src/pages/admin/properties/index.astro", _page12],
    ["src/pages/admin/index.astro", _page13],
    ["src/pages/api/appointments/index.ts", _page14],
    ["src/pages/api/auth/login.ts", _page15],
    ["src/pages/api/auth/logout.ts", _page16],
    ["src/pages/api/availability/[id].ts", _page17],
    ["src/pages/api/availability/index.ts", _page18],
    ["src/pages/api/blog/[id].ts", _page19],
    ["src/pages/api/blog/index.ts", _page20],
    ["src/pages/api/content/index.ts", _page21],
    ["src/pages/api/leads/[id].ts", _page22],
    ["src/pages/api/leads/index.ts", _page23],
    ["src/pages/api/properties/[id].ts", _page24],
    ["src/pages/api/properties/index.ts", _page25],
    ["src/pages/api/upload/image.ts", _page26],
    ["src/pages/en/blog/[slug].astro", _page27],
    ["src/pages/en/blog/index.astro", _page28],
    ["src/pages/en/properties/[id].astro", _page29],
    ["src/pages/en/properties/index.astro", _page30],
    ["src/pages/en/index.astro", _page31],
    ["src/pages/es/blog/[slug].astro", _page32],
    ["src/pages/es/blog/index.astro", _page33],
    ["src/pages/es/properties/[id].astro", _page34],
    ["src/pages/es/properties/index.astro", _page35],
    ["src/pages/es/index.astro", _page36],
    ["src/pages/robots.txt.ts", _page37],
    ["src/pages/sitemap.xml.ts", _page38],
    ["src/pages/index.astro", _page39]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "2817c3d9-feac-44f3-b4d8-372dd7b51c3a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
