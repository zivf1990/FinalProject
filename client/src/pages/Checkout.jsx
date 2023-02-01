import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import "../style/checkout.css";

const Checkout = () => {
  const { sessionID } = useSessionID();
  const navigate = useNavigate();
  const { cart } = useCart();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    address: "",
    "card-number": "",
    "expiry-date": "",
  });

  useEffect(() => {
    console.log(sessionID);
  }, [sessionID]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Checkout... ", userInput);

    if (sessionID) {
      const res = await fetch(`http://localhost:8000/purchasehistory`, {
        method: "POST",
        headers: {
          "x-session-id": sessionID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userinfo: userInput, purchaseList: cart }),
      });

      const data = await res.json();
      console.log("data: ", data);
    }
  };

  return (
    <div className="checkout">
      <h1>checkout</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="address">
          Address:
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="card-number">
          Card Number:
          <input
            type="text"
            id="card-number"
            name="card-number"
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="expiry-date">
          Expiry Date:
          <input
            type="month"
            id="expiry-date"
            name="expiry-date"
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="cvv">
          CVV:
          <input
            type="text"
            id="cvv"
            name="cvv"
            required
            onChange={handleChange}
          />
        </label>

        <input type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default Checkout;
