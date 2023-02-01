import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionID } from "../context/UserContext";

const AddProduct = () => {
  const { sessionID } = useSessionID();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionID);
  }, [sessionID]);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [userInput, setUserInput] = useState({
    product_name: "",
    product_picture: "",
    price: "",
    amount: "",
    category: "1 sport",
    description: "",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    AddProduct();
  };

  const getCategories = async () => {
    const res = await fetch(`http://localhost:8000/categories`, {
      method: "GET",
      headers: {
        "x-session-id": sessionID,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setCategories(data);
  };

  async function AddProduct() {
    const category_id = userInput.category[0];
    console.log("resuuuu");
    const res = await fetch(`http://localhost:8000/products/addProduct`, {
      method: "POST",
      headers: {
        "x-session-id": sessionID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: userInput.product_name,
        product_picture: userInput.product_picture,
        price: userInput.price,
        amount: userInput.amount,
        category_id: category_id,
        description: userInput.description,
      }),
    });
    console.log("res");
    let jes = await res.json();
    if (res.ok) {
      if (jes.data == "user") {
        navigate("/sellerproducts");
      } else {
        navigate("/AdminHome/products");
      }
    } else {
      setErrorMessage(jes);
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
              {categories.map((item) => (
                <option key={item.category_id} value={item.category_id}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="description">description</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
              value={userInput.description}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="submit"
              value={loading === false ? "Add" : "Loading..."}
            />
          </div>
          <p id="response-text">{errorMessage}</p>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
