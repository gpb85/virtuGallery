import express from "express";
import {
  loginUser,
  refreshToken,
  deleteRefreshToken,
  getLoggedUser,
} from "../controllers/auth.controllers.js";
import authToken from "../middleware/authToken.js";

const router = express.Router();

//login user
router.post("/login", loginUser);

router.get("/loggeduser", authToken, getLoggedUser);

router.get("/refresh_token", refreshToken);

router.delete("/refresh_token", deleteRefreshToken);

export default router;
