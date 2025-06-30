import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { register } = useContext(UserContext);

  return (
    <div>
      <div>register in page</div>
      <div>
        <Link to="/signin">page sign in</Link>
        <form action="/register">
          <input type="text" name="username" placeholder="username" required />
          <input type="email" name="email" placeholder="email" required />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />

          <input type="submit" value="register" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
