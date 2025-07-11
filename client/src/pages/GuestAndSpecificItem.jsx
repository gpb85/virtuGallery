import { useState, useEffect, useContext } from "react";
import { GuestContext } from "../context/guestContext";
import { useParams, Link } from "react-router-dom";
import ExpandedText from "../components/ExpandTable";
import "../css/GuestAndSpecificItem.css";
import ExpandableText from "../components/ExpandTable";

const GuestAndItem = () => {
  const { user_id, item_id } = useParams();
  const { specificItem, getSpecificItem } = useContext(GuestContext);
  const [showOverlay, setShowOverlay] = useState(false); // 👈 ΝΕΟ

  useEffect(() => {
    if (user_id && item_id) {
      getSpecificItem(user_id, item_id);
    }
  }, []);

  if (!specificItem) return <p>Loading...</p>;

  return (
    <div className="item-container">
      <div className="item-title">{specificItem.title}</div>
      <img
        src={specificItem.image_url}
        alt={specificItem.title}
        className="item-image"
        onClick={() => setShowOverlay(true)} // Ζουμ με κλικ
        style={{ cursor: "zoom-in" }}
      />
      {/*Εμφάνιση μεγέθυνσης */}
      {showOverlay && (
        <div className="image-overlay" onClick={() => setShowOverlay(false)}>
          <img
            src={specificItem.image_url}
            alt={specificItem.title}
            title="Click to close"
          />
        </div>
      )}
      <div>
        <ul>
          {specificItem.translations?.map((item) => (
            <li key={item.language_code} style={{ color: "white" }}>
              {item.language_code}
            </li>
          ))}
        </ul>
      </div>
      <ExpandableText text={specificItem.description} />
      <Link to={`/guests/users/${user_id}`}>Back</Link>
    </div>
  );
};

export default GuestAndItem;
