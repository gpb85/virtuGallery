import { createContext, useEffect, useState } from "react";
import axios from "../config/configAuth.js";

export const GuestContext = createContext();

const GuestContextProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [allUsers, setAllUsers] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [specificItem, setSpecificItem] = useState(null);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(baseURL + `/guests/users`);

      if (response.data.success) {
        setAllUsers(response.data.users);
      } else {
        console.log("No users found");
      }
    } catch (error) {
      "Error fetching users", error;
    }
  };
  useEffect(() => {
    getAllUsers(); // <-- Αυτό ήταν που έλειπε
  }, []);

  const getAllItemsByUser = async (user_id) => {
    try {
      setAllItems([]);
      const result = await axios.get(baseURL + `/guests/items/${user_id}`);
      if (result.data.success && result.data.items) {
        setAllItems(result.data.items);
        console.log(result.data.items);
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getSpecificItem = async (user_id, item_id) => {
    setSpecificItem(null);
    try {
      const response = await axios.get(
        `${baseURL}/guests/items/${user_id}/${item_id}`
      );
      if (response.data.success) {
        setSpecificItem(response.data.item);
        console.log("setSpecificItem", response.data.item);
      } else {
        console.log("item did not found");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <GuestContext.Provider
      value={{
        allUsers,
        allItems,
        specificItem,

        getAllUsers,
        getAllItemsByUser,
        getSpecificItem,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};

export default GuestContextProvider;
