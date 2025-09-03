require("dotenv").config();
const fs = require("fs");
const postgres = require("postgres");

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

async function seed() {
  const data = JSON.parse(fs.readFileSync("data/products.json", "utf8"));
  const products = data.products;

  for (const p of products) {
    await sql`
      INSERT INTO products (id, name, image_url, price, categorie, description, instock)
      VALUES (${p.id}, ${p.name}, ${p.image_url}, ${p.price}, ${p.categorie}, ${p.description}, ${p.instock})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  console.log("Seeding done ✅");
  process.exit();
}

seed();
