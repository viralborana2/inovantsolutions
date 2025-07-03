import pool from "../db/dbconnection.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log('req?.files', req.files)
    const { sku, name, price } = req.body;
    const images = req?.files?.map(file => file.filename);

    const result = await pool.query(
      "INSERT INTO products (sku, name, price, images) VALUES ($1, $2, $3, $4) RETURNING *",
      [sku, name, price, images]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { sku, name, price } = req.body;
    const id = req.params.id;
    const images = req.files?.map(file => file.filename);

    const result = await pool.query(
      "UPDATE products SET sku=$1, name=$2, price=$3, images=$4 WHERE id=$5 RETURNING *",
      [sku, name, price, images, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ msg: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
