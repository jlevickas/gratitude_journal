import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  let [entries, setEntries] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    let getEntries = async () => {
      let response = await fetch("http://localhost:8000/api/entries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      let data = await response.json();

      if (response.status === 200) {
        setEntries(data);
        console.log(data);
      } else if (response.status === 401) {
        logoutUser();
      } else {
        console.error(response);
      }
    };
    getEntries();
  }, []);
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          {entry.grateful_for}, {entry.created}
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
