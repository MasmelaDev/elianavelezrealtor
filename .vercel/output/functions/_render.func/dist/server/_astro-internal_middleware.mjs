import { d as defineMiddleware, s as sequence } from './chunks/index_BrZ1ntr8.mjs';
import { verifyToken } from './chunks/auth_M1WJu4vt.mjs';
import './chunks/astro-designed-error-pages_CzbkTPaV.mjs';
import './chunks/astro/server_Bx_r-E3M.mjs';

const onRequest$1 = defineMiddleware(async ({ url, cookies, redirect }, next) => {
  const isAdmin = url.pathname.startsWith("/admin");
  const isLogin = url.pathname === "/admin/login";
  if (isAdmin && !isLogin) {
    const token = cookies.get("auth_token")?.value;
    if (!token) return redirect("/admin/login");
    try {
      await verifyToken(token);
    } catch {
      return redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
