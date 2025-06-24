import pool from "../config/bd.js";

//GET items for logged_in user

export const getItems = async (req, res) => {
  try {
    const userId = req.params.id;
    //console.log("user1ID: ", userId);

    const result = await pool.query(
      `SELECT * FROM items where user_id=$1 ORDER BY created_at DESC`,
      [userId]
    );
    res.json({ items: result.rows });
    // console.log("items: ", result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//POST insert new items

export const insertItem = async (req, res) => {
  const userId = req.user.user_id;
  // console.log(userId);

  const { image_url, title, description, language_code } = req.body;
  if (!image_url || !title || !description || !language_code)
    return res.status(400).json({ message: "Missing required fields" });

  const client = await pool.connect();

  try {
    //insert into item
    const insertItemResult = await client.query(
      `INSERT INTO items (user_id,image_url) VALUES($1,$2) RETURNING*`,
      [userId, image_url]
    );
    const newItemId = insertItemResult.rows[0].item_id;
    //console.log(insertItemResult.rows[0]);

    //Insert into item_translations
    const itemTranslation = await client.query(
      `INSERT INTO item_translations (item_id,language_code,title,description) VALUES ($1,$2,$3,$4) RETURNING*`,
      [newItemId, language_code, title, description]
    );
    await client.query("COMMIT");
    //console.log(itemTranslation.rows[0]);

    res.status(201).json({
      success: true,
      message: "Item and translation created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

//edit item

export const patchItem = async (req, res) => {
  const itemId = req.params.id;

  const { image_url, title, description, language_code } = req.body;
  // console.log("body: ", req.body);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    //console.log("image_url: ", image_url);

    // 1. Ενημέρωση image_url αν υπάρχει
    if (image_url !== undefined) {
      await client.query(`UPDATE items SET image_url = $1 WHERE item_id = $2`, [
        image_url,
        itemId,
      ]);
    }

    //console.log(title, description, language_code);

    // 2. Ενημέρωση μετάφρασης αν έχουν έρθει κάποια πεδία
    if ((title !== undefined || description !== undefined) && language_code) {
      const result = await client.query(
        `SELECT * FROM item_translations WHERE item_id = $1 AND language_code = $2`,
        [itemId, language_code]
      );

      console.log(result.rows[0]);

      const current = result.rows[0];
      console.log("current:", current);

      if (!current) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Translation not found" });
      }

      const updatedTitle = title ?? current.title;
      const updatedDescription = description ?? current.description;

      await client.query(
        `UPDATE item_translations SET title = $1, description = $2 
         WHERE item_id = $3 AND language_code = $4`,
        [updatedTitle, updatedDescription, itemId, language_code]
      );
    }

    await client.query("COMMIT");
    res.status(200).json({ success: true, message: "Item updated" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

//DELETE item

export const deleteItem = async (req, res) => {
  const itemId = req.params.id;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(`DELETE FROM items WHERE item_id = $1`, [
      itemId,
    ]);

    if (result.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Item not found" }); // ✅ μόνο αν ΔΕΝ βρέθηκε
    }

    await client.query("COMMIT");

    return res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" }); // ✅ σωστά τώρα στέλνει απάντηση
  } catch (error) {
    await client.query("ROLLBACK");
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};
