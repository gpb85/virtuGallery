import { useContext, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/userContext.jsx";
import { ItemCOntext } from "./context/itemContext.jsx";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
