import React, { useEffect, useState } from "react";
import { useUserToken } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { userToken } = useUserToken();
  const { cart, addToCart, removeFromCart } = useCart();
  const [selectedValue, setSelectedValue] = useState(1);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    //   console.log(userToken);
    //   getProduct();
    console.log("cart ", cart);
  }, []);

  return (
    <div className="product">
      {cart &&
        cart.map((item, index) => (
          <div
            key={Math.random() * Number.MAX_SAFE_INTEGER}
            className="item-in-cart"
          >
            <label htmlFor="number-select"></label>
            <b>price:</b> {item.price}
            <b>amount:</b>
            <input
              type="number"
              id="number-select"
              value={selectedValue}
              min={1}
              max={item.amount}
              onChange={handleChange}
            />
            <img src={`${item.product_picture}`} />
            <button onClick={() => removeFromCart(index)}>remove</button>
          </div>
        ))}
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
