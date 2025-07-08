import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import { ItemContext } from "../context/itemContext.jsx";
import { Link } from "react-router-dom";
import "../css/UserItems.css";

const UserItems = () => {
  const { user } = useContext(UserContext);
  const { userItems, getItemsByUser } = useContext(ItemContext);
  console.log(userItems);

  useEffect(() => {
    if (user) {
      getItemsByUser(user.user_id);
    }
  }, [user]);

  if (!user) return <p>Please log in to see your items.</p>;
  if (!userItems) return <p>loading items..</p>;

  return (
    <div className="items-container">
      <div className="items-flex">
        {userItems.map((item) => (
          <div className="item-card" key={item.item_id}>
            <img src={item.image_url} alt={item.title} className="item-image" />
            <div className="item-content">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-description">{item.description}</p>
              <Link to={`/edititem/${item.item_id}`} className="edit-link">
                Επεξεργασία
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="add-button-container">
        <Link to="/insertitem" className="add-button">
          +
        </Link>
      </div>
    </div>
  );
};

export default UserItems;
