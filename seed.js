require("dotenv").config();
const fs = require("fs");
const postgres = require("postgres");

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

// Load JSON data
const products = JSON.parse(fs.readFileSync("data/products.json", "utf8")).products;

(async () => {
  try {
    console.log(" Creating products table if not exists...");
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image_url TEXT,
        price NUMERIC(10,2),
        categorie TEXT,
        description TEXT,
        instock BOOLEAN
      )
    `;

    console.log("⏳ Inserting products...");
    for (const product of products) {
      await sql`
        INSERT INTO products (name, image_url, price, categorie, description, instock)
        VALUES (
          ${product.name},
          ${product.image_url},
          ${product.price},
          ${product.categorie},
          ${product.description},
          ${product.instock}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }

    console.log("✅ Products seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
})();
