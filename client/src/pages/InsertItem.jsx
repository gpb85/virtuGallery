import { useState, useEffect, useContext } from "react";
import { ItemContext } from "../context/itemContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import "../css/InsertItem.css";

const InsertItem = () => {
  const navigate = useNavigate();
  const { newItem } = useContext(ItemContext);
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [insertItemReqs, setInsertItemReqs] = useState({
    title: "",
    description: "",
    language_code: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "itemImage") {
      setImage(files[0]);
    } else {
      setInsertItemReqs((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", insertItemReqs.title);
    formData.append("description", insertItemReqs.description);
    formData.append("language_code", insertItemReqs.language_code);
    formData.append("itemImage", image);
    newItem(user?.user_id, formData);
    navigate("/allitems");
    //console.log(formData);

    setInsertItemReqs({
      title: "",
      description: "",
      language_code: "",
    });
    setImage(null);
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
        <input
          type="text"
          name="description"
          id="description"
          className="insert-input"
          value={insertItemReqs.description}
          onChange={handleChange}
          placeholder="Σύντομη περιγραφή του έργου"
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

        <button type="submit" className="insert-button">
          Υποβολή
        </button>
      </form>
      <Link to={"/allitems"}>Back</Link>
    </div>
  );
};

export default InsertItem;
