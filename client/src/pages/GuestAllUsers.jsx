import { useState, useEffect, useContext } from "react";
import { GuestContext } from "../context/guestContext.jsx";
import { useNavigate } from "react-router-dom";
import "../css/GuestAllUsers.css";

const GuestGetUsers = () => {
  const { allUsers } = useContext(GuestContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (allUsers && Array.isArray(allUsers)) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  return (
    <div className="guest-container">
      <h1 className="guest-title">Visitor, our artists are here!</h1>
      {users.length === 0 ? (
        <p className="guest-subtext">No users, sorry!</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li
              key={user.user_id}
              onClick={() => navigate(`/guests/users/${user.user_id}`)}
            >
              {user.user_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestGetUsers;
