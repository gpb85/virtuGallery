import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/configAuth.js";

export const GuestContext = createContext();

const GuestContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [allItems, setAllItems] = useState(null);
  const [specificItem, setSpecificItem] = useState(null);

  const getAllItemsByUser = async (user_id) => {
    try {
      const result = await axios.get(baseURL + `/guests/items/${user_id}`);
      if (result.data.success) {
        setAllItems(result.data);
        console.log(result.data);
      } else {
        console.log("No items found");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    getAllItemsByUser(1);
  }, []);

  const getSpecificItem = async (user_id, item_id) => {
    try {
      const response = await axios.get(
        `${baseURL}/guests/items/${user_id}/${item_id}`
      );
      if (response.data.success) {
        setSpecificItem(response.data.message);
        console.log(response.data);
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
        allItems,
        specificItem,

        getAllItemsByUser,
        getSpecificItem,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};

export default GuestContextProvider;
