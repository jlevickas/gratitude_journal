import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import SelectedEntry from "../components/SelectedEntry";
import AuthContext from "../context/AuthContext";

const EntryHistory = () => {
  let [entries, setEntries] = useState([]);
  let [date, setDate] = useState(new Date());

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
    <div>
      <Calendar value={date} onClickDay={setDate} maxDate={new Date()} />
      <SelectedEntry entries={entries} setEntries={setEntries} date={date} />
    </div>
  );
};

export default EntryHistory;
