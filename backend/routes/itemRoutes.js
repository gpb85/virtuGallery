import express from "express";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/items.controllers.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/items/:id", authenticateToken, getItems); // παίρνουμε όλα τα items του logged user
router.post("/createItem", authenticateToken, createItem);
router.put("/update/:id", authenticateToken, updateItem);
router.delete("/delete/:id", authenticateToken, deleteItem);

export default router;
