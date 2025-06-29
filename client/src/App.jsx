import { useContext, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/userContext.jsx";
import { ItemCOntext } from "./context/itemContext.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  const { usera, signIn } = useContext(UserContext);
  /* useEffect(() => {
    signIn("john@email.com", "john");
  }, []);*/
  return (
    <>
      <div>{usera}</div>
    </>
  );
}

export default App;
