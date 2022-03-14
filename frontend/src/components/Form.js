import React, { useState } from "react";

const Form = () => {
  let [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <label>Username</label>
      <input type="text" name="username" placeholder="Enter Username" />
      <label>Password</label>
      <input
        type={passwordShown ? "text" : "password"}
        name="password"
        placeholder="Enter password"
      />
      <label>Show password</label>
      <input type="checkbox" onClick={togglePassword} />
      <input type="submit" value="Submit" />
    </>
  );
};

export default Form;
