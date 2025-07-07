import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GuestContext } from "../context/guestContext.jsx";

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
      <h1>User's Items Gallery</h1>
      {allItems.length === 0 ? (
        <p>No items found for this user.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {allItems.map((item) => (
            <li
              key={item.item_id}
              style={{ marginBottom: "2rem" }}
              onClick={() =>
                navigate(`/guests/items/${user_id}/${item.item_id}`)
              }
            >
              <img
                src={item.image_url}
                alt={item.title}
                style={{
                  maxWidth: "300px",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestUser;
