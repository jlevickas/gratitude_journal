import React, { useState, useEffect } from "react";

const SelectedEntry = ({ entries, date }) => {
  let [selectedDateEntry, setSelectedDateEntry] = useState({});

  useEffect(() => {
    entries.some((entry) => {
      if (date.toLocaleDateString("sv") === entry.created) {
        setSelectedDateEntry(entry);
        return true;
      } else {
        setSelectedDateEntry({});
        return false;
      }
    });
  }, [date, entries]);

  let EntryData = ({ entry }) => {
    if (Object.keys(entry).length > 1) {
      return (
        <>
          <div>Grateful for: {entry.grateful_for}</div>
          <div>Looking forward to: {entry.looking_forward_to}</div>
        </>
      );
    } else {
      return <p> No entry that day 😢</p>;
    }
  };

  return (
    <div>
      <EntryData entry={selectedDateEntry} />
    </div>
  );
};

export default SelectedEntry;
