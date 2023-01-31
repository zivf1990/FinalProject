import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserToken } from "../context/UserContext";

const ShopifyProducts = () => {
  const { userToken } = useUserToken();
  const [products, setProducts] = useState([]);
  const [check, setCheck] = useState(true);
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    console.log(userToken);
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
        Authorization: `Bearer ${userToken}`,
        headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
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
            <img src={product.product_picture} />
            <b>price:</b> {product.price}
            <b>amount:</b> {product.amount}
             {!product.seller_id ?<button  onClick={() => updateAmount(product.product_id)}>
              update the amount of your product
            </button>:""}
            <button onClick={() => deleteProduct(product.product_id)}>
              delete
            </button>
            {product.seller_id ? <span><b>seller:</b> {product.seller_name}</span>:""}
            <b>description:</b> {product.description}
          </li>
        ))}
      </ul>
      <Link to="/adminHome/addProduct">add product</Link>
    </div>
  );
};

export default ShopifyProducts;
