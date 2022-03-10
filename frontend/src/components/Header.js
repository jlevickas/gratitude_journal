import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { authTokens, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home</Link>
      <span> | </span>
      {!authTokens ? (
        <div>
          <Link to="/login">Log In</Link> | <Link to="/register">Register</Link>
        </div>
      ) : (
        <button onClick={logoutUser}>Log Out</button>
      )}
    </div>
  );
};

export default Header;
