import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GuestContext } from "../context/guestContext.jsx";
import "../css/GuestAndUser.css";

const GuestUser = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const { allItems, getAllItemsByUser } = useContext(GuestContext);

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user_id) {
      getAllItemsByUser(user_id); // Δεν κάνουμε setLoading(false) εδώ!
    }
  }, [user_id]);

  useEffect(() => {
    if (allItems.length > 0) {
      setUsername(allItems[0].user_name || "Unknown");
      setLoading(false); // ✅ Τώρα που έχουμε δεδομένα, σταματάμε το loading
    } else {
      setLoading(false); // ✅ Ακόμα και αν δεν υπάρχουν items, σταματάμε loading
    }
  }, [allItems]);

  if (loading) return <p>Loading...</p>;

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
          {allItems.map((item) => (
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
