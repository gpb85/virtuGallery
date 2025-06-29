import pool from "../config/bd.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt.helpers.js";

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(`SELECT * FROM users WHERE user_email=$1`, [
      email,
    ]);

    if (result.rows.length === 0)
      return res.status(401).json({ message: "Email is incorrect" });

    const hashedPassword = result.rows[0].user_password;
    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (!validPassword)
      return res.status(401).json({ message: "Wrong password" });

    const tokens = jwtTokens(result.rows[0]);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        user_id: result.rows[0].user_id,
        user_name: result.rows[0].user_name,
        user_email: result.rows[0].user_email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token missing" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      // Δημιουργούμε νέα tokens (access + refresh)
      const tokens = jwtTokens(user);

      // Ανανέωση του refresh token cookie
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      res.json(tokens);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRefreshToken = (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Refresh token has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLoggedUser = async (req, res) => {
  try {
    const user = req.user;
    //console.log(req.user);

    if (!user) return res.status(401).json({ message: "No user logged in" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
