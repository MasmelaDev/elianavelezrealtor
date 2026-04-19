import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const sql = neon(dbUrl);

async function main() {
  const images = [
    '/images/properties/prop1.jpg',
    '/images/properties/prop2.jpg',
    '/images/properties/prop3.jpg',
    '/images/properties/prop4.jpg',
    '/images/properties/prop5.jpg',
    '/images/properties/prop6.jpg'
  ];

  const rows = await sql`SELECT id FROM properties ORDER BY created_at DESC LIMIT 6`;
  
  if (rows.length === 0) {
    console.log("No properties found to update.");
    return;
  }

  for (let i = 0; i < rows.length; i++) {
    const propertyId = rows[i].id;
    const imageUrl = images[i % images.length];
    const imageArray = JSON.stringify([imageUrl]);
    
    await sql`UPDATE properties SET images = ${imageArray}::jsonb WHERE id = ${propertyId}`;
    console.log(`Updated property ${propertyId} with image ${imageUrl}`);
  }
  
  console.log("Done updating images");
}

main().catch(console.error);
