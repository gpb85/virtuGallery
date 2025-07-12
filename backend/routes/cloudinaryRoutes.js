import express from "express";
import crypto from "crypto";
import router from "./usersRoutes";

const royter = express.Router();

royter.post("/sign-upload", (req, res) => {
  try {
    const timeStamp = Math.floor(Date.now() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const paramsToSign = `timeStamp=${timeStamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign)
      .digest("hex");
    res.json({
      timeStamp,
      signature,
      api_key: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error("Error creating Cloudinary signature:", error);
    res.status(500).json({ error: "Failed to create signature" });
  }
});

export default router;
