import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserConsumer = ({ children }) => {
  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
