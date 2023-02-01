import React, { useEffect, useState } from "react";
import { useSessionID } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { sessionID } = useSessionID();
  const { cart, editCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (event, item) => {
    let updatedProduct = { ...item, quantity: parseInt(event.target.value) };
    editCart(updatedProduct);
  };

  useEffect(() => {
    //   console.log(sessionID);
    //   getProduct();
    console.log("cart ", cart);
  }, []);

  return (
    <div className="product">
      {cart &&
        cart.map((item, index) => {
          const options = [];
          for (let i = 1; i <= item.amount; i++) {
            options.push(
              <option key={Math.random() * Number.MAX_SAFE_INTEGER} value={i}>
                {i}
              </option>
            );
          }

          return (
            <div
              key={Math.random() * Number.MAX_SAFE_INTEGER}
              className="item-in-cart"
            >
              <label htmlFor="number-select"></label>
              <b>price:</b> {item.price}
              <b>amount:</b>
              <select
                name="quantity"
                value={item.quantity}
                onChange={(event) => handleChange(event, item)}
              >
                {options}
              </select>
              <img src={`${item.product_picture}`} alt="" />
              <button onClick={() => removeFromCart(index)}>remove</button>
            </div>
          );
        })}
      <button
        onClick={() => {
          navigate("/checkout");
        }}
      >
        Go to checkout
      </button>
    </div>
  );
};

export default ShoppingCart;
