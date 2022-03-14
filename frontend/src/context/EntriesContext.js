import { createContext, useState, useEffect } from "react";

const EntriesContext = createContext();

export default EntriesContext;

export const EntriesProvider = ({ children }) => {
  let [entries, setEntries] = useState([]);

  let contextData = { entries };
  return (
    <EntriesContext.Provider value={contextData}>
      {children}
    </EntriesContext.Provider>
  );
};
