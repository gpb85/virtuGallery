import { useState, useEffect, useContext } from "react";
import { ItemContext } from "../context/itemContext.jsx";
import { UserContext } from "../context/userContext.jsx";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import "../css/EditItem.css";

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { item, getItemByItemId, patchItem } = useContext(ItemContext);
  const { user } = useContext(UserContext);

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [updatedItemReqs, setupdatedItemReqs] = useState({
    title: "",
    description: "",
    language_code: "",
  });

  useEffect(() => {
    getItemByItemId(id);
  }, [id]);

  useEffect(() => {
    if (item) {
      setupdatedItemReqs({
        title: item?.title || "",
        description: item?.description || "",
        language_code: item?.language_code || "",
      });
    }
  }, [item]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "itemImage") {
      const originalFile = files[0];
      if (!originalFile) return;

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/jpeg",
        initialQuality: 0.9,
      };

      try {
        if (originalFile.size / 1024 / 1024 > 4.3) {
          const compressedFile = await imageCompression(originalFile, options);
          setImage(compressedFile);
        } else {
          setImage(originalFile);
        }
      } catch (error) {
        console.error("Compression failed:", error);
        alert("Αποτυχία συμπίεσης εικόνας");
        setImage(originalFile);
      }
    } else {
      setupdatedItemReqs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (isUploading) return;
    if (!user || !item) {
      alert("Ανεπαρκή δεδομένα χρήστη ή έργου");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", updatedItemReqs.title);
    formData.append("description", updatedItemReqs.description);
    formData.append("language_code", updatedItemReqs.language_code);
    if (image) formData.append("itemImage", image);

    try {
      await patchItem(user.user_id, id, formData);
      navigate("/allitems");
    } catch (error) {
      console.error("Failed to patch item", error);
      alert("Αποτυχία ενημέρωσης έργου");
    } finally {
      setIsUploading(false);
    }
  };

  if (!item || !user) return <div>Loading...</div>;

  return (
    <div className="edit-container">
      <div>
        <h1>Επεξεργασία Έργου</h1>
      </div>
      <img
        src={item.image_url}
        alt="item img"
        style={{ maxWidth: "100%", marginBottom: "20px" }}
      />
      <form onSubmit={handleClick}>
        <label htmlFor="itemImage" className="edit-label">
          Εικόνα
        </label>
        <input
          type="file"
          name="itemImage"
          id="itemImage"
          onChange={handleChange}
        />

        <label htmlFor="title" className="edit-label">
          Τίτλος
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={updatedItemReqs.title}
          placeholder="Δώσε τίτλο"
          required
        />

        <label htmlFor="description" className="edit-label">
          Περιγραφή
        </label>
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          value={updatedItemReqs.description}
          placeholder="Γράψε κάτι"
          cols={10}
          rows={10}
          required
        />

        <label htmlFor="language_code" className="edit-label">
          Γλώσσα
        </label>
        <input
          type="text"
          name="language_code"
          onChange={handleChange}
          value={updatedItemReqs.language_code}
          maxLength={2}
          required
        />

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Αποστολή..." : "Υποβολή"}
        </button>
      </form>
      <Link to={"/allitems"}>Πίσω</Link>
    </div>
  );
};

export default EditItem;
