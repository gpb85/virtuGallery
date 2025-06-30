import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/configAuth.js";

export const ItemCOntext = createContext();

const ItemContextProvider = ({ children }) => {
  const [item, setItem] = useState(null);
  const [userItems, setUserItems] = useState(null);
  const [newItemMessage, setNewItemMessage] = useState(null);
  const [updateItemMessage, setUpdateItemMessage] = useState(null);
  const [deleteItemMessage, setDeleteItemMessage] = useState();

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const getItemsByUser = async (user_id) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);

      if (token) {
        const response = await axios.get(baseURL + `/auth/items`);
        console.log(response.data);

        if (response.data.success) {
          setUserItems(response.data.items);
          //navigate(`/`); //εδώ κάτι πρέπει να βάλω
        }
        console.log("getAllItemsResponse: ", response.data);
      }
    } catch (error) {
      console.error("get item by user's id  error", error);
    }
  };

  const getItemByItemId = async (item_id) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);

      if (token) {
        const response = await axios.get(
          baseURL + `/auth/items/getItem/${item_id}`
        );

        if (response.data.success) {
          setItem(response.data.item);

          navigate("/"); //κι εδώ κάτι γράφω
        }
        console.log("item by id :", response.data.item);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const newItem = async (
    user_id,
    image_url,
    title,
    description,
    language_code
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("token: ", token);

      if (token) {
        const response = await axios.post(
          baseURL + `/auth/items/createitem/${user_id}`,
          {
            image_url,
            title,
            description,
            language_code,
          }
        );
        console.log(user_id);

        console.log("New item response:", response.data);
        if (response.data.success) {
          setNewItemMessage(response.data.message);
          navigate("/"); // άλλαξέ το αν θες άλλο redirect
        }
      }
    } catch (error) {
      setNewItemMessage(`Error new item: ${error.message}`);
      console.error("Error creating item:", error);
    }
  };

  const patchItem = async (
    user_id,
    item_id,
    image_url,
    title,
    description,
    language_code
  ) => {
    try {
      const response = await axios.patch(
        baseURL + `auth/items/patchitem/${user_id}/${item_id}`,
        { image_url, title, description, language_code }
      );

      if (response.data.success) {
        setUpdateItemMessage(response.data.message);
        navigate("/"); //grapse kati
      }
      console.log("updated item: ", response.data.success);
    } catch (error) {
      setUpdateItemMessage("updated item error: ", error.message);
      console.error("update error", error);
    }
  };

  const deleteItem = async (item_id) => {
    try {
      const token = localStorage.getItem("accessToken");
      //console.log("token: ", token);

      if (token) {
        const response = await axios.delete(
          baseURL + `/auth/items/delete/${item_id}`
        );
        if (response.data.success) {
          setDeleteItemMessage(response.data.message);
          navigate("/"); //isos einai kai auto swsto
        }
        console.log("response delete item: ", response.data.success);
      }
    } catch (error) {
      setDeleteItemMessage("deleteItem error: ", error.message);
      console.error("delete  error", error);
    }
  };

  return (
    <ItemCOntext.Provider
      value={{
        userItems,
        newItemMessage,
        deleteItemMessage,
        updateItemMessage,

        getItemsByUser,
        getItemByItemId,
        newItem,
        patchItem,
        deleteItem,
      }}
    >
      {children}
    </ItemCOntext.Provider>
  );
};

export default ItemContextProvider;
