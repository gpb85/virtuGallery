import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserContextProvider from "./context/userContext.jsx";
import ItemContextProvider from "./context/itemContext.jsx";
import GuestContextProvider from "./context/guestContext.jsx";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GuestContextProvider>
        <UserContextProvider>
          <ItemContextProvider>
            <App />
          </ItemContextProvider>
        </UserContextProvider>
      </GuestContextProvider>
    </BrowserRouter>
  </StrictMode>
);
