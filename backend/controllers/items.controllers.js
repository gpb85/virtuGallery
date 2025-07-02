import pool from "../config/bd.js";
import cloudinary from "../config/cloudinary.js";

//GET items for logged_in user

export const getItemsByUserId = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    // console.log("user_id: ", user_id);

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
    res.json({ success: true, items: result.rows });
    //console.log("items: ", result.rows);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getItemById = async (req, res) => {
  const user_id = req.user.user_id;
  const itemId = req.params.item_id;
  //console.log(itemId);

  try {
    const result = await pool.query(
      `
  SELECT 
    i.item_id,
    i.user_id,
    i.image_url,
    i.created_at,
    t.language_code,
    t.title,
    t.description
  FROM items i
  JOIN item_translations t ON i.item_id = t.item_id
  WHERE  i.item_id = $1
  `,
      [itemId]
    );
    // console.log(result.rows[0]);

    if (result.rowCount === 0)
      return res
        .status(400)
        .json({ success: false, message: "Item not found" });

    res.status(200).json({ success: true, item: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//POST insert new items

export const insertItem = async (req, res) => {
  const user_id = req.user.user_id;

  // console.log("user_id: ", user_id);
  // console.log("req.body:", req.body);
  // console.log("req.file", req.file);

  const image_url = req.file.path;

  // console.log("image ulr", image_url);

  const { title, description, language_code } = req.body;

  if (!title || !description || !language_code)
    return res.status(400).json({ message: "Missing required fields" });

  const client = await pool.connect();

  try {
    //insert into item

    const insertItemResult = await client.query(
      `INSERT INTO items (user_id,image_url) VALUES($1,$2) RETURNING*`,
      [user_id, image_url]
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
  const client = await pool.connect();

  try {
    const user_id = req.params.user_id;
    const itemId = req.params.item_id;

    if (!user_id || !itemId) throw new Error("Unknown user or item ID");

    await client.query("BEGIN");

    // 1. Φέρε το υπάρχον item
    const itemResult = await client.query(
      `SELECT * FROM items WHERE item_id = $1`,
      [itemId]
    );
    const existingItem = itemResult.rows[0];
    if (!existingItem) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Item not found" });
    }

    const { title, description, language_code } = req.body;

    // 2. Ανέβηκε νέα εικόνα;
    const newImageUrl = req.file?.path;
    if (newImageUrl) {
      // Αν υπάρχει παλιά εικόνα, διαγράψ' την από το Cloudinary
      if (existingItem.image_url) {
        const filename = existingItem.image_url.split("/").pop();
        const publicId = filename?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(
            `VirtuGallery/${user_id}/${publicId}`
          );
        }
      }

      // Ενημέρωσε το image_url
      await client.query(`UPDATE items SET image_url = $1 WHERE item_id = $2`, [
        newImageUrl,
        itemId,
      ]);
    }
    console.log("1", req.body.language_code);
    // 3. Ενημέρωση μετάφρασης
    if ((title !== undefined || description !== undefined) && language_code) {
      const result = await client.query(
        `SELECT * FROM item_translations WHERE item_id = $1 `,
        [itemId]
      );
      console.log("2", req.body.language_code);

      const currentTranslation = result.rows[0];
      console.log("curentTr", currentTranslation);

      if (!currentTranslation) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Translation not found" });
      }

      const updatedTitle = title ?? currentTranslation.title;
      const updatedDescription = description ?? currentTranslation.description;
      const updatedLanguageCode =
        language_code ?? currentTranslation.language_code;

      await client.query(
        `UPDATE item_translations SET title = $1, description = $2 ,language_code=$3
         WHERE item_id = $4 `,
        [updatedTitle, updatedDescription, updatedLanguageCode, itemId]
      );
    }
    console.log("3", req.body.language_code);

    // 4. Πάρε την ενημερωμένη εγγραφή και κάνε commit
    const updatedItemResult = await client.query(
      `SELECT 
        i.item_id,
        i.image_url,
        t.title,
        t.description,
        t.language_code
      FROM items i
      JOIN item_translations t ON i.item_id = t.item_id
      WHERE i.item_id = $1 AND t.language_code = $2`,
      [itemId, language_code]
    );

    await client.query("COMMIT");

    res.status(200).json({
      success: true,
      item: updatedItemResult.rows[0],
      message: "Item updated successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("patchItem error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

//DELETE item
export const deleteItem = async (req, res) => {
  const user_id = req.user.user_id;
  const itemId = req.params.item_id;
  // console.log("user_id: ", user_id);
  //console.log("itemId: ", itemId);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Βρες το item και έλεγξε τον ιδιοκτήτη
    const itemResult = await client.query(
      `SELECT user_id FROM items WHERE item_id = $1`,
      [itemId]
    );

    if (itemResult.rowCount === 0) {
      await client.query("ROLLBACK");
      console.log("no item");
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    const itemOwnerId = itemResult.rows[0].user_id;

    if (itemOwnerId !== user_id) {
      await client.query("ROLLBACK");
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this item",
      });
    }

    // Διαγραφή μεταφράσεων (προαιρετικά ή με ON DELETE CASCADE)

    // Διαγραφή του item
    await client.query(`DELETE FROM items WHERE item_id = $1`, [itemId]);

    await client.query("COMMIT");

    return res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};
