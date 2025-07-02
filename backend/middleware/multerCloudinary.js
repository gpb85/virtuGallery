import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const itemImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Μπορείς να πάρεις το userId είτε από params είτε από req.user (token)
    const userId = req.params.id || req.user?.user_id || "anonymous";

    // console.log("User ID (middleware):", userId);

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!validTypes.includes(file.mimetype)) {
      console.error("Invalid mimetype:", file.mimetype);
      throw new Error("Only image files are allowed!");
    }

    const fileExt = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //console.log("uniqueSUffix: ", uniqueSuffix);

    return {
      folder: `VirtuGallery/${userId}`,
      format: fileExt,
      public_id: `item-${uniqueSuffix}`,
    };
  },
});

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

export { itemImageUpload };
