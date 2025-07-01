import { useState, useEffect, useContext } from "react";
import { ItemContext } from "../context/itemContext.jsx";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";

const InsertItem = () => {
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
    //console.log(formData);

    setInsertItemReqs({
      title: "",
      description: "",
      language_code: "",
    });
    setImage(null);
  };

  return (
    <div>
      <div>insert item page</div>
      <form onSubmit={handleClick}>
        <input type="file" name="itemImage" onChange={handleChange} />{" "}
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={insertItemReqs.title}
          placeholder="Write the title"
          required
        />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={insertItemReqs.description}
          placeholder="Write the description"
          required
        />
        <input
          type="text"
          name="language_code"
          onChange={handleChange}
          value={insertItemReqs.language_code}
          maxLength={2}
          required
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default InsertItem;
