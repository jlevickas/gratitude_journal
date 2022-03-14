import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Form from "../components/Form";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div>
      <form onSubmit={loginUser}>
        <Form />
      </form>
      <Link to="/register">Don't have an account? Create one!</Link>
      <br />
      <Link to="/register">Don't remember your password? That sucks</Link>
    </div>
  );
};

export default LoginPage;
