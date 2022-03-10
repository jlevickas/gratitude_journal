import React, { useState } from "react";

const RegisterPage = () => {
  let [created, setCreated] = useState(false);

  let registerUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8000/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    if (response.statusText === "Created") {
      setCreated(true);
    } else {
      console.log(response);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default RegisterPage;
