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
import authToken from "../middleware/authToken.js";

const router = express.Router();

router.get("/items/", authToken, getItemsByUserId); // παίρνουμε όλα τα items του logged user
router.get("/items/getItem/:item_id", authToken, getItemById);
router.post(
  "/items/createitem/:user_id",
  authToken,
  itemImageUpload.single("itemImage"),
  insertItem
);
router.patch(
  "/items/patchitem/:user_id/:item_id",
  itemImageUpload.single("itemImage"),
  authenticateToken,
  patchItem
);
router.delete("/items/delete/:item_id", authToken, deleteItem);

export default router;
