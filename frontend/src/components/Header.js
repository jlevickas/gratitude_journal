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
        <Link to="/login">Log In</Link>
      ) : (
        <button onClick={logoutUser}>Log Out</button>
      )}
    </div>
  );
};

export default Header;
