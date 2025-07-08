import "../css/SignIn.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { signIn } = useContext(UserContext);

  const [userSignIn, setUserSignIn] = useState({ email: "", password: "" });

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
    signIn(userSignIn.email, userSignIn.password);
  };

  return (
    <div className="signin-container">
      <h1 className="signin-heading">Είσοδος</h1>

      <p className="signin-subtext">Καλώς ήρθες ξανά. Ετοίμασε τα έργα σου.</p>

      <Link to="/signup" className="signup-link">
        Δεν έχεις λογαριασμό; Κάνε εγγραφή
      </Link>

      <form className="signin-form" onSubmit={handleClick} method="post">
        <input
          type="email"
          name="email"
          className="input-field"
          onChange={handleChange}
          value={userSignIn.email}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="input-field"
          onChange={handleChange}
          value={userSignIn.password}
          placeholder="Κωδικός πρόσβασης"
          required
        />
        <button type="submit" className="submit-button">
          Είσοδος
        </button>
      </form>
    </div>
  );
};

export default SignIn;
