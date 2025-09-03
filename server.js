require("dotenv").config();
const express = require("express");
const postgres = require("postgres");

const app = express();
const port = process.env.PORT || 5000;

// Connect to Neon PostgreSQL
const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

// Root route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products`;
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET products by category
// GET products (optionally filter by categorie)
app.get("/products", async (req, res) => {
  const { categorie } = req.query;
  try {
    let products;
    if (categorie) {
      products = await sql`SELECT * FROM products WHERE categorie = ${categorie}`;
    } else {
      products = await sql`SELECT * FROM products`;
    }
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
