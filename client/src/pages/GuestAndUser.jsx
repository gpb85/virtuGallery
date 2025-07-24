import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GuestContext } from "../context/guestContext.jsx";

import "../css/GuestAndUser.css";

const GuestUser = () => {
  const { user_id } = useParams(); // παίρνουμε user id από το route param
  // console.log("user_id", user_id);
  //console.log("params:", useParams());

  const navigate = useNavigate();

  const { allItems, getAllItemsByUser } = useContext(GuestContext);

  const [username, setUsername] = useState("");
  const [loading, setLoading] = true;

  useEffect(() => {
    if (user_id) {
      getAllItemsByUser(user_id);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allItems.length > 0 && allItems[0].user_name) {
      setUsername(allItems[0].user_name);
    }
  }, [allItems]);

  if (loading) return <p>loading..</p>;

  return (
    <div>
      <div className="header">
        <h1>{username} Gallery</h1>
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
