import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item !== product));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
