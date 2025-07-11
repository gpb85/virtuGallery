import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import { ItemContext } from "../context/itemContext.jsx";
import { Link } from "react-router-dom";
import "../css/UserItems.css";
import ExpandableText from "../components/ExpandTable.jsx";

const UserItems = () => {
  const { user } = useContext(UserContext);
  const { userItems, getItemsByUser, deleteItem } = useContext(ItemContext);
  //console.log(userItems);

  useEffect(() => {
    getItemsByUser(user?.user_id);
    console.log("Test");
  }, []);

  if (!user) return <p>Please log in to see your items.</p>;
  if (!userItems) return <p>loading items..</p>;

  const handleDelete = (item_id) => {
    const confirmed = window.confirm(
      "Είσαι σίγουρος/η ότι θέλεις να διαγράψεις αυτό το έργο;"
    );

    if (confirmed) {
      deleteItem(item_id); // Καλεί την υπάρχουσα deleteItem
    }
  };

  return (
    <div className="items-container">
      {userItems.length === 0 ? (
        <div className="empty-container">
          <div className="empty-message">
            <p>Δεν υπάρχουν αντικείμενα.</p>
            <Link to="/insertitem" className="add-button large">
              +
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="items-flex">
            {userItems.map((item) => (
              <div className="item-card" key={item.item_id}>
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="item-image"
                />
                <div className="item-content">
                  <h3 className="item-title">{item.title}</h3>
                  <ExpandableText text={item.description} />
                  <Link to={`/edititem/${item.item_id}`} className="edit-link">
                    Επεξεργασία
                  </Link>
                  <button
                    onClick={() => handleDelete(item.item_id)}
                    className="delete-button"
                  >
                    Διαγραφή
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="add-button-container">
            <Link to="/insertitem" className="add-button">
              +
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UserItems;
