import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserToken } from "../context/UserContext";

const AddProduct = () => {
  const { setUserId } = useUserToken();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    product_name: "",
    product_picture: "",
    price: "",
    amount: "",
    category: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }
  };

  return (<div>
    <form

      onSubmit={handleSubmit}
    >
      <div className="input-box">
        <header>Log In</header>
        <div className="input-field">
          <input
            type="text"
            name="product_name"
            id="product_name"
            onChange={handleChange}
            value={userInput.product_name}
            required
          />
          <label htmlFor="product_name">product name</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            name="product_picture"
            id="product_picture"
            onChange={handleChange}
            value={userInput.product_picture}
            required
          />
          <label htmlFor="product_picture">product picture url</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            pattern="^[0-9]*\.?[0-9]+$"
            value={userInput.price}
            required
          />
          <label htmlFor="price">price</label>
        </div>
        <div className="input-field">
          <input
            type="number"
            name="amount"
            id="amount"
            onChange={handleChange}
            value={userInput.amount}
            required
          />
          <label htmlFor="amount">amount</label>
        </div>
        <div className="input-field">
          <label htmlFor="amount">amount</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={userInput.category}
            required
          >
            <option value="1">1 sport</option>
            <option value="2">2 house</option>
            <option value="3">3 fashion</option>
            <option value="4">4 electronics</option>
          </select>
        </div>
        <div className="input-field">
          <input
            type="submit"
            value={loading === false ? "Login" : "Loading..."}
          />
        </div>
        {/* <p id="response-text">{errorMessage}</p> */}
      </div>
    </form>
  </div>);
};

export default AddProduct;
