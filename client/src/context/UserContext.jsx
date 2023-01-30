import React, { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext();
export const useUserToken = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (!userToken) {
      localStorage.clear();
    }
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}
