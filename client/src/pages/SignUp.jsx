import "../css/SignUp.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
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
    <div className="register-container">
      <h1 className="register-title">Καλωσήρθες δημιουργέ</h1>
      <p className="register-subtext">
        Δώσε τα στοιχεία σου και ξεκίνα να εκφράζεσαι.
      </p>

      <Link to="/signin" className="signin-link">
        Έχεις ήδη λογαριασμό; Είσοδος
      </Link>

      <form className="register-form" onSubmit={handleClick} method="post">
        <input
          type="text"
          name="username"
          className="input-field"
          onChange={handleChange}
          value={registerUserReqs.username}
          placeholder="Ψευδώνυμο ή Όνομα"
          required
        />
        <input
          type="email"
          name="email"
          className="input-field"
          onChange={handleChange}
          value={registerUserReqs.email}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="input-field"
          onChange={handleChange}
          value={registerUserReqs.password}
          placeholder="Κωδικός"
          required
        />
        <button type="submit" className="register-button">
          Ξεκίνα
        </button>
      </form>
    </div>
  );
};

export default SignUp;
