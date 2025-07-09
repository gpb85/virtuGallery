import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/configAuth.js";

export const ItemContext = createContext();

const ItemContextProvider = ({ children }) => {
  const [item, setItem] = useState(null);
  const [userItems, setUserItems] = useState(null);
  const [newItemMessage, setNewItemMessage] = useState(null);
  const [updateItemMessage, setUpdateItemMessage] = useState(null);
  const [deleteItemMessage, setDeleteItemMessage] = useState();

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const getItemsByUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      //console.log(token);

      if (token) {
        const response = await axios.get(baseURL + `/auth/items`);
        // console.log(response.data);

        if (response.data.success) {
          setUserItems(response.data.items);
          //navigate(`/`); //εδώ κάτι πρέπει να βάλω
        }
        //console.log("getAllItemsResponse: ", response.data);
      }
    } catch (error) {
      console.error("get item by user's id  error", error);
    }
  };

  const getItemByItemId = async (item_id) => {
    try {
      const token = localStorage.getItem("accessToken");
      // console.log(token);

      if (token) {
        const response = await axios.get(
          baseURL + `/auth/items/getItem/${item_id}`
        );

        if (response.data.success) {
          setItem(response.data.item);
        }
        // console.log("item by id :", response.data.item);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const newItem = async (user_id, formData) => {
    try {
      const token = localStorage.getItem("accessToken");
      // console.log("token: ", token);
      //console.log("user_id", user_id);

      if (token) {
        const response = await axios.post(
          baseURL + `/auth/items/createitem/${user_id}`,
          formData
        );

        console.log("New item response:", response.data);
        if (response.data.success) {
          setNewItemMessage(response.data.message);
          await getItemsByUser(user_id); // αμέσως μετά το insert

          console.log("Items User after new Item: ", userItems);

          //console.log("newitem: ", response.data);

          // navigate("/"); // άλλαξέ το αν θες άλλο redirect
        }
      }
    } catch (error) {
      setNewItemMessage(`Error new item: ${error.message}`);
      console.error("Error creating item:", error);
    }
  };

  const patchItem = async (user_id, item_id, formData) => {
    try {
      const response = await axios.patch(
        `${baseURL}/auth/items/patchitem/${user_id}/${item_id}`,
        formData
      );

      if (response.data.success) {
        setUpdateItemMessage(response.data.message);
        //console.log("updatedItem:", response.data.item);
        navigate("/items"); // 🔄 ή όπου θέλεις
      }
      //console.log("updated item: ", response.data.success);
    } catch (error) {
      setUpdateItemMessage(`updated item error: ${error.message}`);
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
        //console.log("response delete item: ", response.data.success);
      }
    } catch (error) {
      setDeleteItemMessage("deleteItem error: ", error.message);
      console.error("delete  error", error);
    }
  };

  return (
    <ItemContext.Provider
      value={{
        getItemsByUser,
        getItemByItemId,
        newItem,
        patchItem,
        deleteItem,

        item,
        userItems,
        newItemMessage,
        deleteItemMessage,
        updateItemMessage,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
