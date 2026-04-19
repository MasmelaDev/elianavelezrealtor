import { Readable } from 'node:stream'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
})

export type UploadResult = { secure_url: string; public_id: string }

export async function uploadImage(file: Buffer | Blob, folder = 'realtor'): Promise<UploadResult> {
  const blob = file instanceof Blob ? file : new Blob([new Uint8Array(file)])
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const stream = Readable.from(buffer)
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err)
        if (!result?.secure_url) return reject(new Error('No URL returned'))
        resolve({ secure_url: result.secure_url, public_id: result.public_id })
      }
    )
    stream.pipe(uploadStream)
  })
}
