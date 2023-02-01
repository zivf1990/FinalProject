import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSessionID } from "../context/UserContext";

const PurchaseHistory = () => {
  const { sessionID } = useSessionID();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    console.log(sessionID);
    getHistory();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
  };

  const getHistory = async () => {
    const res = await fetch(`http://localhost:8000/purchasehistory/user`, {
      method: "GET",
      headers: {
        "x-session-id": sessionID,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("data", data);
    if (res.ok) {
      setHistory(data.data);
    } else {
      console.log("Erer");
    }
  };

  return (
    <div>
      <h2>My Purchase History</h2>
      <table>{history.map((history) => {})}</table>
    </div>
  );
};

export default PurchaseHistory;
