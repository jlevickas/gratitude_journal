import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import isStrongPassword from "validator/lib/isStrongPassword";
import AuthContext from "../context/AuthContext";
import Form from "../components/Form";

const RegisterPage = () => {
  let { loginUser } = useContext(AuthContext);
  let [validationMessage, setValidationMessage] = useState("");

  let validateUser = (username, password) => {
    if (username === "" || password === "") {
      setValidationMessage("Please fill all fields");
      return false;
    } else if (
      !isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      setValidationMessage(
        "Your password must contain at least 1 number and 1 letter."
      );
      return false;
    } else {
      return true;
    }
  };

  let registerUser = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;

    if (!validateUser(username, password)) {
      return;
    }

    let response = await fetch("http://localhost:8000/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.statusText === "Created") {
      toast.success("Succesfully registrated!");
      loginUser(e);
    } else {
      toast.error(
        "There's been an issue with your registration.\n Try again later."
      );
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <Form />
      </form>
      <div>{validationMessage}</div>
      <Toaster />
    </div>
  );
};

export default RegisterPage;
