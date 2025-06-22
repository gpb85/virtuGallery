import express from "express";
import {
  loginUser,
  refreshToken,
  deleteRefreshToken,
} from "../controllers/auth.controllers.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

//login user
router.post("/login", loginUser);

router.get("/refresh_token", refreshToken);

router.delete("/refresh_token", deleteRefreshToken);

export default router;
