import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import { ItemContext } from "../context/itemContext.jsx";
import { Link } from "react-router-dom";

const UserItems = () => {
  const { user } = useContext(UserContext);
  const { userItems, getItemsByUser } = useContext(ItemContext);

  useEffect(() => {
    if (user) {
      getItemsByUser(user.user_id);
    }
  }, [user]);

  if (!user) return <p>Please log in to see your items.</p>;
  if (!userItems) return <p>loading items..</p>;

  return (
    <div>
      <h1>All your items are here</h1>
      {userItems.length === 0 && <p>no item yet</p>}
      {userItems.map((item) => {
        // console.log(item);

        return (
          <div
            key={item.item_id}
            style={{
              border: "1px solid gray",
              margin: 10,
              padding: 10,
              width: 200,
              height: 300,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              overflow: "hidden",
            }}
          >
            <img
              src={item.image_url}
              alt={item.item_title}
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                marginBottom: 10,
              }}
            />

            <h3
              style={{
                fontSize: "1rem",
                margin: "0 0 5px 0",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "0.8rem",
                flexGrow: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                margin: 0,
              }}
            >
              {item.description}
            </p>
            <Link to={`/edititem/${item.item_id}`} style={{ marginTop: 10 }}>
              EDIT
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default UserItems;
