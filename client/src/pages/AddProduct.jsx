import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserToken } from "../context/UserContext";

const AddProduct = () => {
  const { userToken } = useUserToken();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userToken);
  }, [userToken]);

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    product_name: "",
    product_picture: "",
    price: "",
    amount: "",
    category: "1 sport",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    AddProduct();
  };

  async function AddProduct() {
    const category_id = userInput.category[0];
    const res = await fetch(`http://localhost:8000/products/addProduct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: userInput.product_name,
        product_picture: userInput.product_picture,
        price: userInput.price,
        amount: userInput.amount,
        category_id: category_id,
        token: userToken,
      }),
    });

    if (res.ok) {
      navigate("/products");
    } else {
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <div className="input-field">
            <label htmlFor="product_name">product name</label>
            <input
              type="text"
              name="product_name"
              id="product_name"
              onChange={handleChange}
              value={userInput.product_name}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="product_picture">product picture url</label>
            <input
              type="text"
              name="product_picture"
              id="product_picture"
              onChange={handleChange}
              value={userInput.product_picture}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="price">price</label>
            <input
              type="text"
              name="price"
              id="price"
              onChange={handleChange}
              pattern="^[0-9]*\.?[0-9]+$"
              value={userInput.price}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="amount">amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleChange}
              value={userInput.amount}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="category">category</label>
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
    </div>
  );
};

export default AddProduct;
