import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import streamifier from "streamifier";

// Χρησιμοποιούμε memory storage αντί για disk (Vercel δεν έχει filesystem)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (validTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const itemImageUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 12 * 1024 * 1024 },
});

// Helper function για upload στο Cloudinary μέσω stream
const uploadToCloudinary = (fileBuffer, userId, mimetype) => {
  return new Promise((resolve, reject) => {
    const fileExt = mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `VirtuGallery/${userId}`,
        format: fileExt,
        public_id: `item-${uniqueSuffix}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export { itemImageUpload, uploadToCloudinary };
