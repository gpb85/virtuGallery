import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Storage for item images
const itemImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "items_images", // Cloudinary folder
    format: async (req, file) => {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.mimetype)) {
        throw new Error("Only image files are allowed!");
      }

      return file.mimetype.split("/")[1]; // e.g. "jpeg"
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `item-${uniqueSuffix}`;
    },
  },
});

// Optional: Add extra validation using fileFilter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const itemImageUpload = multer({
  storage: itemImageStorage,
  fileFilter,
});

export default itemImageUpload;
