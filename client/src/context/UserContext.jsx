import React, { useState, createContext, useContext, useEffect } from "react";
import { deleteCookie, getCookie, setCookie } from "../js/cookie";

const UserContext = createContext();
export const useUserToken = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [userToken, setToken] = useState(null);

  useEffect(() => {
    const token = getCookie("token");

    if (token && !userToken) setToken(token);
  }, [userToken]);

  const setUserToken = (token) => {
    setCookie("token", token);
    setToken(token);
  };

  const removeToken = () => {
    deleteCookie("token");
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ userToken, setUserToken, removeToken }}>
      {children}
    </UserContext.Provider>
  );
}
