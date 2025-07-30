import { useState, useContext } from "react";
import { ItemContext } from "../context/itemContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import imageCompression from "browser-image-compression";
import "../css/InsertItem.css";

const InsertItem = () => {
  const navigate = useNavigate();
  const { newItem } = useContext(ItemContext);
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [insertItemReqs, setInsertItemReqs] = useState({
    title: "",
    description: "",
    language_code: "",
  });

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
        // Συμπίεση μόνο αν το μέγεθος είναι πάνω από 4.3 MB
        if (originalFile.size / 1024 / 1024 > 4.3) {
          const compressedFile = await imageCompression(originalFile, options);
          setImage(compressedFile);
        } else {
          setImage(originalFile);
        }
      } catch (error) {
        console.error("Compression failed:", error);
        alert("Αποτυχία συμπίεσης εικόνας");
        setImage(originalFile); // fallback
      }
    } else {
      setInsertItemReqs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (isUploading) return;
    if (!image) {
      alert("Επέλεξε εικόνα");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", insertItemReqs.title);
    formData.append("description", insertItemReqs.description);
    formData.append("language_code", insertItemReqs.language_code);
    formData.append("itemImage", image);

    try {
      await newItem(user?.user_id, formData);
      navigate("/allitems");

      // Reset form
      setInsertItemReqs({
        title: "",
        description: "",
        language_code: "",
      });
      setImage(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Αποτυχία υποβολής");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="insert-container">
      <h2 className="insert-title">Προσθήκη Νέου Έργου</h2>
      <form className="insert-form" onSubmit={handleClick}>
        <label htmlFor="itemImage" className="insert-label">
          Εικόνα
        </label>
        <input
          type="file"
          name="itemImage"
          id="itemImage"
          className="insert-input"
          onChange={handleChange}
          required
        />

        <label htmlFor="title" className="insert-label">
          Τίτλος
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="insert-input"
          value={insertItemReqs.title}
          onChange={handleChange}
          placeholder="Π.χ. Τοπίο στο Φως"
          required
        />

        <label htmlFor="description" className="insert-label">
          Περιγραφή
        </label>
        <textarea
          type="text"
          name="description"
          id="description"
          className="insert-input"
          value={insertItemReqs.description}
          onChange={handleChange}
          placeholder="Σύντομη περιγραφή του έργου"
          cols={10}
          rows={3}
          required
        />

        <label htmlFor="language_code" className="insert-label">
          Γλώσσα
        </label>
        <input
          type="text"
          name="language_code"
          id="language_code"
          className="insert-input"
          value={insertItemReqs.language_code}
          onChange={handleChange}
          placeholder="π.χ. el"
          maxLength={2}
          required
        />

        <button type="submit" className="insert-button" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Υποβολή"}
        </button>
      </form>
      <Link to={"/allitems"}>Back</Link>
    </div>
  );
};

export default InsertItem;
