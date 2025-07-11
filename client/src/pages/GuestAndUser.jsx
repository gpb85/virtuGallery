import { useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GuestContext } from "../context/guestContext.jsx";

import "../css/GuestAndUser.css";

const GuestUser = () => {
  const { user_id } = useParams(); // παίρνουμε user id από το route param
  console.log("user_id", user_id);
  console.log("params:", useParams());

  const navigate = useNavigate();

  const { allItems, getAllItemsByUser, loading, error } =
    useContext(GuestContext);

  useEffect(() => {
    if (user_id) {
      getAllItemsByUser(user_id);
    }
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Items Gallery</h1>
        <Link to={`/`}>Back</Link>
      </div>

      {allItems?.length === 0 ? (
        <p>No items found for this user.</p>
      ) : (
        <div className="items-container">
          {allItems?.map((item) => (
            <div
              key={item.item_id}
              className="item-card"
              onClick={() =>
                navigate(`/guests/items/${user_id}/${item.item_id}`)
              }
            >
              <img src={item.image_url} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestUser;
