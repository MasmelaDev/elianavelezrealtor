import { getTokenFromCookies, verifyToken } from '../../../chunks/auth_M1WJu4vt.mjs';
import { Readable } from 'node:stream';
import { v2 } from 'cloudinary';
export { renderers } from '../../../renderers.mjs';

v2.config({
  cloud_name: "tu_cloud_name",
  api_key: "xxxxxxxxxxxx",
  api_secret: "xxxxxxxxxxxxxxxxxxxx"
});
async function uploadImage(file, folder = "realtor") {
  const blob = file instanceof Blob ? file : new Blob([new Uint8Array(file)]);
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);
  return new Promise((resolve, reject) => {
    const uploadStream = v2.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err);
        if (!result?.secure_url) return reject(new Error("No URL returned"));
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.pipe(uploadStream);
  });
}

const POST = async ({ request, cookies }) => {
  const token = getTokenFromCookies(cookies);
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await verifyToken(token);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") ?? formData.get("image");
    if (!file || typeof file === "string") {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }
    const blob = file;
    const MAX_SIZE = 10 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
    if (blob.size > MAX_SIZE) {
      return Response.json({ error: "File too large (max 10 MB)" }, { status: 413 });
    }
    if (!ALLOWED_TYPES.includes(blob.type)) {
      return Response.json({ error: `Invalid file type: ${blob.type}. Allowed: ${ALLOWED_TYPES.join(", ")}` }, { status: 415 });
    }
    const result = await uploadImage(blob);
    return Response.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
