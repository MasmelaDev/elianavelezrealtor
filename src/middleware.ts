import { defineMiddleware } from 'astro:middleware'
import { verifyToken } from './lib/auth'

export const onRequest = defineMiddleware(async ({ url, cookies, redirect }, next) => {
  const isAdmin = url.pathname.startsWith('/admin')
  const isLogin = url.pathname === '/admin/login'

  if (isAdmin && !isLogin) {
    const token = cookies.get('auth_token')?.value
    if (!token) return redirect('/admin/login')
    try {
      await verifyToken(token)
    } catch {
      return redirect('/admin/login')
    }
  }

  return next()
})
