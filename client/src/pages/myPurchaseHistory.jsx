import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserToken } from "../context/UserContext";

const PurchaseHistory = () => {
  const { userToken } = useUserToken();
  const [History, setHistory] = useState([]);

  useEffect(() => {
    console.log(userToken);
    getHistory();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
  };

  const getHistory = async () => {
    const res = await fetch(`http://localhost:8000/products/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        headers: { "Content-Type": "application/json" },
      },
    });
    const data = await res.json();
    console.log("data", data);
    if(res.ok){
        setHistory(data.data);
    }
    else{
        console.log("Erer");
    }
  };

  return (
    <div>
      <h2>My Purchase History</h2>
      
    </div>
  );
};

export default PurchaseHistory;
