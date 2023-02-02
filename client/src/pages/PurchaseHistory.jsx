import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSessionID } from "../context/UserContext";

const PurchaseHistory = () => {
  const { sessionID } = useSessionID();
  const [history, setHistory] = useState([]);
  const [visibleHistory, setVisibleHistory] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    console.log(sessionID);
    getHistory();
  }, []);
  // useEffect(()=>searchByName(), [history]);
  useEffect(() => searchByName(), [searchBar]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchBar(value);
  };
  function searchByName() {
    let result = history.filter((str) =>
      str.product_name.startsWith(searchBar)
    );
    setVisibleHistory(result);
  }
  const getHistory = async () => {
    const res = await fetch(`http://localhost:8000/purchasehistory`, {
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
      setVisibleHistory(data.data);
    } else {
      console.log("Erer");
    }
  };

  return (
    <div>
      <h2>The Purchase History</h2>
        <input
          placeholder="Search By Username"
          type="text"
          name="searchBar"
          id="searchBar"
          className="historyInput"
          onChange={handleChange}
          value={searchBar}
        />
      <table>
        <tr>
          <th>Buyer name</th>
          <th>Product</th>
          <th>Amount bought</th>
          <th>Purchase Date</th>
          <th>Seller name</th>
        </tr>
        {visibleHistory.map((history) => (
          <tr>
            <th>{history.username}</th>
            <th>{history.product_name}</th>
            <th>{history.purchase_amount}</th>
            <th>{history.purchase_date}</th>
            <th>{history.seller_name}</th>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default PurchaseHistory;
