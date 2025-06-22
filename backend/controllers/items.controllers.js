import pool from "../config/bd.js";

//GET items for logged_in user

export const getItems = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const result = await pool.query(
      `SELECT * FROM items where user_id=$1 ORDER BY created_at DESC`,
      [userId]
    );
    res.json({ items: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//POST create new items

export const createItem = async (req, res) => {
  try {
    const userId = req.user.user_id; // από το token
    const { image_url } = req.body;
    const result = await pool.query(
      `INSERT INTO items (user_id, image_url) VALUES ($1, $2) RETURNING *`,
      [userId, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//PUT update item
export const updateItem = async (req, res) => {
  try {
    const userId = req.user.user_id;
    console.log(userId);

    const { id } = req.params;
    const image_url = req.body.image_url;
    console.log();

    const result = await pool.query(
      `UPDATE items SET image_url=$1 WHERE item_id=$2 AND user_id=$3 RETURNING*`,
      [image_url, id, userId]
    );
    if (result.rowCount === 0)
      return res
        .status(404)
        .json({ message: "Item not fount or item not yours" });
    res.json({
      success: true,
      data: result.rows[0],
    });
    console.log(res.json().data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE item
export const deleteItem = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM items WHERE item_id=$1 AND user_id=$2 RETURNING*`,
      [id, userId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Item not found or not yours" });
    }
    res.json({ success: true, message: "item deleted", item: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
