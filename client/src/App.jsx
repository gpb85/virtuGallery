import { useContext, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/userContext.jsx";

import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import InsertItem from "./pages/InsertItem.jsx";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="insertitem" element={<InsertItem />} />
      </Routes>
    </>
  );
}

export default App;
