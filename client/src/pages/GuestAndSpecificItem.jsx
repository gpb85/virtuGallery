import { useState, useEffect, useContext } from "react";
import { GuestContext } from "../context/guestContext";
import { useParams, Link } from "react-router-dom";
import "../css/GuestAndSpecificItem.css";

const GuestAndItem = () => {
  const { user_id, item_id } = useParams();
  const { specificItem, getSpecificItem } = useContext(GuestContext);

  console.log("user_id", user_id);
  console.log("item_id", item_id);

  useEffect(() => {
    if (user_id && item_id) {
      getSpecificItem(user_id, item_id);
    }
  }, []);

  console.log("specific item:", specificItem);
  if (!specificItem) return <p>Loading...</p>;

  return (
    <div className="item-container">
      <div className="item-title">{specificItem.title}</div>
      <img
        src={specificItem.image_url}
        alt={specificItem.title}
        className="item-image"
      />
      <div>
        <ul>
          {specificItem.translations?.map((item) => (
            <li key={item.language_code} style={{ color: "white" }}>
              {item.language_code}
            </li>
          ))}
        </ul>
      </div>
      <div className="item-description">{specificItem.description}</div>
      <Link to={`/guests/users/${user_id}`}>Back</Link>
    </div>
  );
};

export default GuestAndItem;
