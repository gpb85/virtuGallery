import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { Link } from "react-router-dom";
const SignIn = () => {
  const { signIn } = useContext(UserContext);

  const [userSingIn, setUserSignIn] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserSignIn((prevValue) => {
      if (name === "email") {
        return { email: value, password: prevValue.password };
      } else if (name === "password") {
        return { password: value, email: prevValue.email };
      }
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    signIn(userSingIn.email, userSingIn.password);
  };

  return (
    <div>
      <div>sign in page</div>
      <div>
        <Link to="/signup">page register</Link>
        <form action="/signin" onSubmit={handleClick} method="post">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={userSingIn.email}
            placeholder="Write your email"
            required
          />
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={userSingIn.password}
            placeholder="Write your password"
            required
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
