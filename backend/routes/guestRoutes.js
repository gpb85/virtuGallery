import express from "express";
import {
  getAllUsers,
  getAllItemsByUserId,
  userGetSpecificItem,
} from "../controllers/guests.controllers.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get(`/items/:user_id`, getAllItemsByUserId);
router.get("/items/:user_id/:item_id", userGetSpecificItem);

export default router;
