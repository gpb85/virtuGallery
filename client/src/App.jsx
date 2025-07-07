import { useContext, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/userContext.jsx";

import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import InsertItem from "./pages/InsertItem.jsx";
import EditItem from "./pages/Edititem.jsx";
import UserItems from "./pages/AllUserItems.jsx";
import GuestGetUsers from "./pages/GuestAllUsers.jsx";
import GuestAndUser from "./pages/GuestAndUser.jsx";
import GuestAndItem from "./pages/GuestAndSpecificItem.jsx";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/insertitem" element={<InsertItem />} />
        <Route path="/allitems" element={<UserItems />} />
        <Route path="/edititem/:id" element={<EditItem />} />
        <Route path="/guests/users" element={<GuestGetUsers />} />
        <Route path="/guests/users/:user_id" element={<GuestAndUser />} />
        <Route
          path="/guests/items/:user_id/:item_id"
          element={<GuestAndItem />}
        />
      </Routes>
    </>
  );
}
//<Route path="/guests/item/:id/:id" element={</>}//>
export default App;
