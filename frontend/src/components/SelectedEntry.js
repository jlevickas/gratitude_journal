import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const SelectedEntry = ({ entries, setEntries, date }) => {
  let [selectedDateEntry, setSelectedDateEntry] = useState({});
  let formattedDate = date.toLocaleDateString("sv");

  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    entries.some((entry) => {
      if (formattedDate === entry.created) {
        setSelectedDateEntry(entry);
        return true;
      } else {
        setSelectedDateEntry({});
        return false;
      }
    });
  }, [formattedDate, entries]);

  let defaultTextarea = (grateful_for, looking_forward_to) => {
    return (
      <>
        <label> Grateful for: </label>
        <textarea
          placeholder="What are you grateful for today?"
          defaultValue={grateful_for}
        />
        <label> Looking forward to: </label>
        <textarea
          placeholder="What are you looking forward to?"
          defaultValue={looking_forward_to}
        />
      </>
    );
  };

  let EntryData = ({ entry }) => {
    if (Object.keys(entry).length > 1) {
      return defaultTextarea(
        selectedDateEntry.grateful_for,
        selectedDateEntry.looking_forward_to
      );
    } else if (formattedDate === new Date().toLocaleDateString("sv")) {
      return defaultTextarea();
    } else {
      return <p> No entry that day 😢</p>;
    }
  };

  let deleteEntry = () => {
    fetch(`http://localhost:8000/api/entries/${selectedDateEntry?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    setEntries(entries.filter((entry) => entry.id !== selectedDateEntry.id));
    setSelectedDateEntry({});
  };

  let saveEntry = () => {
    fetch(`http://localhost:8000/api/entries/${selectedDateEntry?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
  };

  let createEntry = () => {
    fetch(`http://localhost:8000/api/entries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: selectedDateEntry,
    });
  };

  return (
    <div>
      <EntryData entry={selectedDateEntry} />
      <button onClick={deleteEntry}>Delete entry</button>
      <button onClick={createEntry}>Save</button>
    </div>
  );
};

export default SelectedEntry;
