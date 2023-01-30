import React, { useState, createContext, useContext, useEffect } from "react";
import { getCookie, setCookie } from "../js/cookie";

const UserContext = createContext();
export const useUserToken = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [userToken, setToken] = useState(null);

  useEffect(() => {
    if (!userToken) {
      localStorage.clear();
    }

    const token = getCookie("token");

    if (token && !userToken) setToken(token);
  }, [userToken]);

  const setUserToken = (token) => {
    setCookie("token", token);
    setToken(token);
  };

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}
