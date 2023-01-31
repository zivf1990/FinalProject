import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserToken } from "../context/UserContext";

const PurchaseHistory = () => {
  const { userToken } = useUserToken();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    console.log(userToken);
    getHistory();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
  };

  const getHistory = async () => {
    const res = await fetch(`http://localhost:8000/purchasehistory/user`, {
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
      <table>
        <tr>
            <th>Product</th>
            <th>Amount bought</th>
            <th>Purchase Date</th>
        </tr>
        {
            history.map((history)=>( <tr>
                <th>{history.product_name}</th>
                <th>{history.purchase_amount}</th>
                <th>{history.purchase_date}</th>
            </tr>))
        }
        </table>
    </div>
  );
};

export default PurchaseHistory;
