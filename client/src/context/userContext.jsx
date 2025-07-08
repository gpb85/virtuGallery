import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/configAuth.js";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(baseURL + `/users/register`, {
        username,
        email,
        password,
      });

      if (response.data.success) {
        navigate("/signin");
        // console.log("New User==>>", response.data.newUser);
      }

      //window.location.replace("/signedin");
      //window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server.");
      } else {
        console.error("Axios error:", error.message);
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(baseURL + `/auth/login`, {
        email,
        password,
      });
      //console.log(email);
      //console.log(response.data);

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("accessToken", response.data.accessToken);

        navigate("/allitems");
      } else {
        setLoginMessage(response.data.message);
      }

      // console.log("acceesstoken: ", response.data.accessToken);
      //console.log("loggedin user", response.data.user.user_name);

      //window.location.replace("/home");
    } catch (error) {
      console.error("Login error: ", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  //logged user
  const loggedUser = async () => {
    const token = localStorage.getItem("accessToken");
    //console.log("token: ", token);

    if (token) {
      try {
        const response = await axios.get(baseURL + `/auth/loggeduser`);
        //console.log("res1", response.data.user);

        setUser(response.data.user);

        console.log("Fetched user:", response.data.user);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };
  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        register,
        signIn,
        logout,

        user,
        loginMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
