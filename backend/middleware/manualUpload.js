import cloudinary from "../config/cloudinary.js";

cloudinary.uploader.upload(
  "C:/Users/giorg/Desktop/test.jpg",
  {
    folder: `VirtuGallery/items_images/${user_id}`,
    public_id: "item-image", //name for image
  },
  function (err, result) {
    if (err) {
      console.error("Upload image failed ", err);
    } else {
      console.error("Image uploaded successfully ", result);
    }
  }
);
