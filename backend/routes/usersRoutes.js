import express from "express";
import { registerUser } from "../controllers/users.controllers.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

//get users
//router.get("/", authenticateToken, users);

//register user
router.post("/register", registerUser);

export default router;
