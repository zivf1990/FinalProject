import React, { useEffect, useState } from "react";
import { useUserToken } from "../context/UserContext";

const PurchaseHistory = () => {
  const { userToken } = useUserToken();
  const [userHistory, setUserHistory] = useState(null);

  useEffect(() => {
    console.log(userToken);
    getPurchaseHistory();
  }, [userToken]);

  const getPurchaseHistory = async () => {
    if (userToken) {
      const res = await fetch(`http://localhost:8000/purchaseHistory`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          headers: { "Content-Type": "application/json" },
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
