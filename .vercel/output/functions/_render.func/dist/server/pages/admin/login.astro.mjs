import { e as createComponent, g as addAttribute, n as renderHead, l as renderScript, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_Bx_r-E3M.mjs';
/* empty css                                           */
import { f as favicon } from '../../chunks/favicon_PMaL-EV7.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const token = Astro2.cookies.get("auth_token")?.value;
  if (token) {
    try {
      const { verifyToken } = await import('../../chunks/auth_M1WJu4vt.mjs');
      await verifyToken(token);
      return Astro2.redirect("/admin");
    } catch {
    }
  }
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Admin Login</title><link rel="icon" type="image/svg+xml"${addAttribute(favicon, "href")}>${renderHead()}</head> <body class="min-h-screen flex items-center justify-center bg-gray-100"> <main class="w-full max-w-sm p-6 bg-white rounded-lg shadow"> <h1 class="text-xl font-semibold text-center mb-4">Admin Login</h1> <form id="login-form" class="space-y-4"> <div> <label for="email" class="block text-sm font-medium text-gray-700">Email</label> <input type="email" id="email" name="email" required autocomplete="email" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700">Password</label> <input type="password" id="password" name="password" required autocomplete="current-password" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"> </div> <div id="form-error" class="text-sm text-red-600 hidden"></div> <button type="submit" class="w-full rounded bg-brand-600 py-2 px-4 text-white font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
Sign in
</button> </form> </main> ${renderScript($$result, "/home/miguel/dev/elianarealtor/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/miguel/dev/elianarealtor/src/pages/admin/login.astro", void 0);

const $$file = "/home/miguel/dev/elianarealtor/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
