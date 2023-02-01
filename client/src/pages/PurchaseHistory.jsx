import React, { useEffect, useState } from "react";
import { useSessionID } from "../context/UserContext";

const PurchaseHistory = () => {
  const { sessionID } = useSessionID();
  const [userHistory, setUserHistory] = useState(null);

  useEffect(() => {
    console.log(sessionID);
    getPurchaseHistory();
  }, [sessionID]);

  const getPurchaseHistory = async () => {
    if (sessionID) {
      const res = await fetch(`http://localhost:8000/purchaseHistory`, {
        method: "GET",
        headers: {
          "x-session-id": sessionID,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data: ", data);
      setUserHistory(data);
    }
  };

  return <div>{userHistory && <>{userHistory.forEach((item) => {})}</>}</div>;
};

export default PurchaseHistory;
