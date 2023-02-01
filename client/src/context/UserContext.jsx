import React, { useState, createContext, useContext, useEffect } from "react";
import { deleteCookie, getCookie, setCookie } from "../js/cookie";

const UserContext = createContext();
export const useSessionID = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [sessionID, setSessionIDc] = useState(null);

  useEffect(() => {
    const coockieSessionID = getCookie("shopifySessionID");

    if (coockieSessionID && !sessionID) setSessionIDc(coockieSessionID);
  }, [sessionID]);

  const setSessionID = (sessionID) => {
    setCookie("shopifySessionID", sessionID);
    setSessionIDc(sessionID);
  };

  const removeSessionID = () => {
    deleteCookie("shopifySessionID");
    sessionID(null);
  };

  return (
    <UserContext.Provider value={{ sessionID, setSessionID, removeSessionID }}>
      {children}
    </UserContext.Provider>
  );
}
