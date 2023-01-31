import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import "../style/checkout.css";

const Checkout = () => {
  const { userToken } = useUserToken();
  const navigate = useNavigate();
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
    console.log(userToken);
  }, [userToken]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="checkout">
      <h1>checkout</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label for="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            required
          />
        </label>

        <label for="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </label>

        <label for="address">
          Address:
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            required
          />
        </label>

        <label for="card-number">
          Card Number:
          <input
            type="text"
            id="card-number"
            name="card-number"
            onChange={handleChange}
            required
          />
        </label>

        <label for="expiry-date">
          Expiry Date:
          <input
            type="month"
            id="expiry-date"
            name="expiry-date"
            onChange={handleChange}
            required
          />
        </label>

        <label for="cvv">
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
