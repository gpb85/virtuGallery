import express from "express";
import {
  getItemsByUserId,
  insertItem,
  patchItem,
  deleteItem,
  getItemById,
} from "../controllers/items.controllers.js";
import { itemImageUpload } from "../middleware/multerCloudinary.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/items/:user_id", getItemsByUserId); // παίρνουμε όλα τα items του logged user
router.get("/items/getItem/:item_id", getItemById);
router.post(
  "/items/createitem/:id",
  authenticateToken,
  itemImageUpload.single("itemImage"),

  insertItem
);
router.patch(
  "/items/patchitem/:id/:itemId",
  itemImageUpload.single("itemImage"),
  authenticateToken,
  patchItem
);
router.delete("/items/delete/:id", authenticateToken, deleteItem);

export default router;
