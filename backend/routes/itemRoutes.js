import express from "express";
import {
  getItems,
  insertItem,
  patchItem,
  deleteItem,
} from "../controllers/items.controllers.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/items/:id", authenticateToken, getItems); // παίρνουμε όλα τα items του logged user
router.post("/items/createitem", authenticateToken, insertItem);
router.patch("/items/patchitem/:id", authenticateToken, patchItem);
router.delete("/items/delete/:id", authenticateToken, deleteItem);

export default router;
