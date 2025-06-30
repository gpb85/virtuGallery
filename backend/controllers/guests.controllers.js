import pool from "../config/bd.js";

export const getAllItemsByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    // console.log("userId", user_id);

    const result = await pool.query(`SELECT * FROM items WHERE user_id = $1`, [
      user_id,
    ]);

    if (result.rowCount === 0) {
      console.log("no items found");
      return res
        .status(404)
        .json({ success: false, message: "No items found" });
    }

    res.status(200).json({ success: true, items: result.rows });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const userGetSpecificItem = async (req, res) => {
  const user_id = req.params.user_id;
  const item_id = req.params.item_id;
  // console.log("user_id:", user_id, "item_id:", item_id);

  try {
    const result = await pool.query(
      `SELECT * FROM items WHERE user_id=$1 AND item_id=$2`,
      [user_id, item_id]
    );
    if (result.rowCount === 0) {
      console.log("no item found");
      return res.status(400).json({ success: false, message: "No item found" });
    }
    res.status(200).json({ success: true, item: result.rows[0] });
    console.log(result.rows[0]);
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
