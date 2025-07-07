import pool from "../config/bd.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    // console.log(result.rows);

    if (result.rowCount === 0) {
      return res.status(400).json({ success: false, message: "No users yet." });
    }

    return res.status(200).json({
      success: true,
      users: result.rows,
      message: "All users uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllItemsByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    // console.log("userId", user_id);

    const result = await pool.query(
      `SELECT 
         i.item_id,
         i.user_id,
         i.image_url,
         i.created_at AS item_created_at,
         it.language_code,    
         it.title,
         it.description
       FROM items i
       LEFT JOIN item_translations it ON i.item_id = it.item_id
       WHERE i.user_id = $1
       ORDER BY i.created_at DESC, it.language_code`,
      [user_id]
    );

    //console.log(result.rows);

    if (result.rowCount === 0) {
      console.log("no items found");
      return res.status(404).json({
        success: false,
        items: result.rows,
        message: "No items found",
      });
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

  // Έλεγχος ότι υπάρχουν τα params
  if (!user_id || !item_id) {
    return res.status(400).json({
      success: false,
      message: "Missing user_id or item_id in request parameters",
    });
  }

  try {
    const result = await pool.query(
      `SELECT 
         i.item_id,
         i.user_id,
         i.image_url,
         i.created_at AS item_created_at,
         it.language_code,    
         it.title,
         it.description
       FROM items i
       LEFT JOIN item_translations it ON i.item_id = it.item_id
       WHERE i.user_id = $1 AND i.item_id = $2
       ORDER BY i.created_at DESC, it.language_code`,
      [user_id, item_id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No item found for this user" });
    }

    res.status(200).json({ success: true, item: result.rows[0] });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
