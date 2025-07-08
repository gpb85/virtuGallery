import { useState, useEffect, useContext } from "react";
import { ItemContext } from "../context/itemContext.jsx";
import { UserContext } from "../context/userContext.jsx";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/EditItem.css";

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log("itemID", id);

  const { item, getItemByItemId, patchItem } = useContext(ItemContext);

  const { user } = useContext(UserContext);

  const [image, setImage] = useState(null);
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "itemImage") {
      setImage(files[0]);
    } else {
      setupdatedItemReqs((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user || !item) {
      console.error("Missing user or item context");
      return;
    }

    const formData = new FormData();
    formData.append("title", updatedItemReqs.title);
    formData.append("description", updatedItemReqs.description);
    formData.append("language_code", updatedItemReqs.language_code);
    if (image) formData.append("itemImage", image);
    try {
      await patchItem(user.user_id, id, formData);
      navigate("/allitems");
    } catch (error) {
      console.error("Failed to patch Items", error);
    }
  };

  if (!item || !user) return <div>Loading...</div>;

  return (
    <div className="edit-container">
      <div>
        <h1>editPage</h1>
      </div>
      <img src={item.image_url} alt="item img" />
      <form onSubmit={handleClick}>
        <input type="file" name="itemImage" onChange={handleChange} />
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={updatedItemReqs.title}
          placeholder="Give a title"
          required
        />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={updatedItemReqs.description}
          placeholder="Write something"
          required
        />
        <input
          type="text"
          name="language_code"
          onChange={handleChange}
          value={updatedItemReqs.language_code}
          maxLength={2}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditItem;
