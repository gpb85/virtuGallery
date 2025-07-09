import pool from "../config/bd.js";
import bcrypt from "bcrypt";

//get users
/*
export const users = async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM  users`);
    if (users.rows.length === 0)
      return res.json({ message: "There are no users" });
    res.status(200).json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/

//register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //console.log(req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const checkUsername = await pool.query(
      `SELECT * FROM users WHERE user_name = $1`,
      [username]
    );
    if (checkUsername.rowCount > 0) {
      return res
        .status(401)
        .json({ success: false, message: "Select other username" });
    }

    const saltRounds = 10;
    const result = await pool.query(`SELECT * FROM users WHERE user_email=$1`, [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(401).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      `INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, hashedPassword]
    );

    const { user_password, ...userWithoutPassword } = newUser.rows[0];

    res.status(201).json({ success: true, newUser: userWithoutPassword });
  } catch (error) {
    console.error("Register error:", error); // <== αυτό προσθέσέ το
    res.status(500).json({ success: false, error: error.message });
  }
};
