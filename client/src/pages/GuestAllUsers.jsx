import { useState, useEffect, useContext } from "react";
import { GuestContext } from "../context/guestContext.jsx";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Visitor, our artists are here!</h1>
      {users.length === 0 ? (
        <p>No users, sorry!</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user.user_id}
              style={{ cursor: "pointer" }}
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
