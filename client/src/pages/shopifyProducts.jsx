import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import "../style/stock.css";

const ShopifyProducts = () => {
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
    const res = await fetch(`http://localhost:8000/products`, {
      method: "GET",
      headers: {
        "x-session-id": sessionID,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("dassssssssssssssssssssssssa", data.data);
    setProducts(data.data);
  };
  async function deleteProduct(product_id) {
    console.log("erere");
    const res = await fetch(`http://localhost:8000/products/deleteProduct`, {
      method: "DELETE",
      headers: {"x-session-id": sessionID,
      "Content-Type": "application/json", },
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
      headers: {"x-session-id": sessionID,
      "Content-Type": "application/json",},
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
      <h2>Shopify Products</h2>
      <div id="headersPr">
      <br/>
      <input
        onChange={handleChange}
        id="searchBar"
        type="number"
        placeholder="insert new amount"
        value={newAmount}
      />
      <Link to="/adminHome/addProduct" id="addProduct">add product</Link>
      </div>
      <ul id="sellerProducts">
        {products?.map((product) => (
          <li  id="sellerProduct" key={product.product_id}>
            <img src={product.product_picture} />
            <div>
            <b>product name:</b> 
            {product.product_name}
            <b>price:</b> {product.price}
            <b>amount:</b> {product.amount}
            <b>description:</b> {product.description}
            {product.seller_id ? (
              <span>
                <b>seller:</b> {product.seller_name}
              </span>
            ) : (
              ""
            )}
            <div>
            {!product.seller_id ? (
              <button onClick={() => updateAmount(product.product_id)}>
                edit amount
              </button>
            ) : (
              ""
            )}
            <button onClick={() => deleteProduct(product.product_id)}>
              delete
            </button>
            </div>
            </div>
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default ShopifyProducts;
