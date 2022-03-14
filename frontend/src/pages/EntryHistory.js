import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import AuthContext from "../context/AuthContext";

const EntryHistory = () => {
  let [entries, setEntries] = useState([]);
  let [date, setDate] = useState(new Date());
  let [selectedDateEntry, setSelectedDateEntry] = useState();

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

  useEffect(() => {
    entries.forEach((entry) => {
      if (date.toLocaleDateString("sv") === entry.created) {
        setSelectedDateEntry(entry.grateful_for);
      } else {
        setSelectedDateEntry(null);
      }
    });
    console.log(selectedDateEntry);
  }, [date]);

  return (
    <div>
      <Calendar value={date} onClickDay={setDate} />

      {selectedDateEntry ? selectedDateEntry : <p> No entry that day :c</p>}
    </div>
  );
};

export default EntryHistory;
