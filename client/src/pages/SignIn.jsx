import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { Link } from "react-router-dom";
const SignIn = () => {
  const { signIn } = useContext(UserContext);

  return (
    <div>
      <div>sign in page</div>
      <div>
        <Link to="/signup">page register</Link>
      </div>
    </div>
  );
};

export default SignIn;
