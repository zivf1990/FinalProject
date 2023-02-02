import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import "../style/stock.css";

const SellerProducts = () => {
  const { sessionID } = useSessionID();
  const [products, setProducts] = useState([]);
  const [check, setCheck] = useState(true);
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    console.log(sessionID);
    getProducts();
  }, [check]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewAmount(value);
  };

  const getProducts = async () => {
    const res = await fetch(`http://localhost:8000/products/user`, {
      method: "GET",
      headers: {
        "x-session-id": sessionID,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("data", data);
    setProducts(data.data);
  };

  async function deleteProduct(product_id) {
    console.log("erere");
    const res = await fetch(`http://localhost:8000/products/deleteProduct`, {
      method: "DELETE",
      headers: {
        "x-session-id": sessionID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id,
      }),
    });
    if (res.ok) {
      console.log("good");
      setCheck(!check);
    } else {
      alert("bad");
    }
  }
  async function updateAmount(product_id) {
    const res = await fetch(`http://localhost:8000/products/updateAmount`, {
      method: "PUT",
      headers: {
        "x-session-id": sessionID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id,
        amount: newAmount,
      }),
    });
    if (res.ok) {
      console.log("good");
      setCheck(!check);
    } else {
      alert("bad");
    }
  }

  console.log(products);
  return (
    <div id="productsDiv">
      <h2>My Products</h2>
      <div id="headersPr">
   <input
        onChange={handleChange}
        type="number"
        id="searchBar"
        name="searchBar"
        placeholder="insert new amount"
        value={newAmount}
      />
      <Link to="/addProduct" id="addProduct">add product</Link></div>
      <ul id="sellerProducts">
        {products?.map((product) => (
          <li id="sellerProduct" key={product.product_id}>
            <img src={product.product_picture} />
            <div>
            <b>product name:</b>
            {product.product_name}
            <b>price:</b> {product.price}
            <b>amount:</b> {product.amount}
            <b>description:</b> {product.description}
            <div>
            <button onClick={() => updateAmount(product.product_id)} style={{display:'inline'}}>
              edit amount
            </button>
            <button onClick={() => deleteProduct(product.product_id)}>
              Remove
            </button>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerProducts;
