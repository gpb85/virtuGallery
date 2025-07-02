import { useContext, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/userContext.jsx";

import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import InsertItem from "./pages/InsertItem.jsx";
import EditItem from "./pages/Edititem.jsx";
import UserItems from "./pages/AllUserItems.jsx";

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
      </Routes>
    </>
  );
}

export default App;
