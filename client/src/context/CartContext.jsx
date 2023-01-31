import React, { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../util/localsessionStorage";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const lsCart = getLocalStorage("cart");
    if (lsCart) setCart(lsCart);
  }, []);

  useEffect(() => {
    setLocalStorage("cart", cart);
  }, [cart]);

  const addToCart = (product) => {
    console.log("adding to cart", product);
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((item, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
