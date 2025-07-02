import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { register } = useContext(UserContext);
  const [registerUserReqs, setRegisterUserReqs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUserReqs((prevValue) => {
      if (name === "username") {
        return {
          username: value,
          email: prevValue.email,
          password: prevValue.password,
        };
      } else if (name === "email") {
        return {
          email: value,
          username: prevValue.username,
          password: prevValue.password,
        };
      } else if (name === "password") {
        return {
          password: value,
          username: prevValue.username,
          email: prevValue.email,
        };
      }
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    /* console.log(
      registerUserReqs.username,
      registerUserReqs.email,
      registerUserReqs.password
    );*/

    register(
      registerUserReqs.username,
      registerUserReqs.email,
      registerUserReqs.password
    );
  };

  return (
    <div>
      <div>register in page</div>
      <div>
        <Link to="/signin">page sign in</Link>
        <form action="/register" onSubmit={handleClick} method="post">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={registerUserReqs.username}
            placeholder="username"
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={registerUserReqs.email}
            placeholder="email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={registerUserReqs.password}
            placeholder="password"
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
