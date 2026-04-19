import type { APIRoute } from 'astro'
import { getTokenFromCookies, verifyToken } from '../../../lib/auth'
import { uploadImage } from '../../../lib/cloudinary'

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = getTokenFromCookies(cookies)
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await verifyToken(token)
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const formData = await request.formData()
    const file = formData.get('file') ?? formData.get('image')
    if (!file || typeof file === 'string') {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }
    const blob = file as Blob
    const MAX_SIZE = 10 * 1024 * 1024 // 10 MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
    if (blob.size > MAX_SIZE) {
      return Response.json({ error: 'File too large (max 10 MB)' }, { status: 413 })
    }
    if (!ALLOWED_TYPES.includes(blob.type)) {
      return Response.json({ error: `Invalid file type: ${blob.type}. Allowed: ${ALLOWED_TYPES.join(', ')}` }, { status: 415 })
    }
    const result = await uploadImage(blob)
    return Response.json({ url: result.secure_url, publicId: result.public_id })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
