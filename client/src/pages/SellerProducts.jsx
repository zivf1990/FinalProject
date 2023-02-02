import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSessionID } from "../context/UserContext";

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
    <div>
      <h2>my products</h2>
      <input
        onChange={handleChange}
        type="number"
        placeholder="insert new amount"
        value={newAmount}
      />
      <ul>
        {products?.map((product) => (
          <li key={product.product_id}>
            {product.product_name}
            <img
              src={"http://localhost:8000/" + product.product_picture}
              alt=""
            />
            <b>price:</b> {product.price}
            <b>amount:</b> {product.amount}
            <button onClick={() => updateAmount(product.product_id)}>
              edit amount
            </button>
            <button onClick={() => deleteProduct(product.product_id)}>
              Remove
            </button>
            <b>description:</b> {product.description}
          </li>
        ))}
      </ul>
      <Link to="/addProduct">add product</Link>
    </div>
  );
};

export default SellerProducts;
