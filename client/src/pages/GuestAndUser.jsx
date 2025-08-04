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
    const fetchData = async () => {
      setLoading(true);
      await getAllItemsByUser(user_id); // περιμένουμε τα δεδομένα
      setLoading(false); // Μόνο τότε λέμε "φόρτωσε"
    };

    if (user_id) {
      fetchData();
    }
  }, [user_id]);

  useEffect(() => {
    if (allItems.length > 0) {
      setUsername(allItems[0].user_name || "Unknown");
    }
  }, [allItems]);

  // ✅ ΠΡΩΤΑ ελέγχεις loading
  if (loading) return <p>Loading...</p>;

  return (
    <div className="guest-wrapper" aria-label={`${username} Gallery`}>
      <header className="gallery-header">
        <div>
          <h1 className="gallery-title">{username} Gallery</h1>
          <p className="gallery-subtitle"></p>
        </div>
        <Link to="/" className="back-link"></Link>
      </header>

      {!allItems || allItems.length === 0 ? (
        <div className="empty-state">
          <p>No items found for this user.</p>
        </div>
      ) : (
        <div className="card-list">
          {allItems.map((item) => (
            <div
              key={item.item_id}
              className="card"
              onClick={() =>
                navigate(`/guests/items/${user_id}/${item.item_id}`)
              }
              aria-label={item.title}
            >
              <div className="card-image-wrapper">
                <img
                  src={item.image_url || "/placeholder.png"}
                  alt={item.title || "Artwork image"}
                  className="card-image"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </div>
              <div className="card-content">
                <h2 className="title">{item.title || "Untitled"}</h2>

                <p className="description">
                  {(() => {
                    const desc =
                      item.description || "No description available.";
                    if (desc.length > 120) {
                      const visible = desc.slice(0, 120);
                      return (
                        <>
                          {visible.trimEnd()}{" "}
                          <span className="more-label">more...</span>
                        </>
                      );
                    }
                    return desc;
                  })()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bottom-indicator" aria-hidden="true">
        <svg viewBox="0 0 24 24" aria-label="Περισσότερα">
          <path
            d="M12 16l-6-6h12z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default GuestUser;
