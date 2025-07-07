import { useState, useEffect, useContext } from "react";
import { GuestContext } from "../context/guestContext";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>Specific {specificItem.title}</h1>
      <div>
        <h2>S{specificItem.title}</h2>
        <img src={specificItem.image_url} alt="img" />
        <p>{specificItem.description}</p>
      </div>
    </div>
  );
};

export default GuestAndItem;
