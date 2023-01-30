import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (productID) => {
    setCart((prev) => [...prev, productID]);
  };

  const removeFromCart = (productID) => {
    setCart(cart.filter((product_id) => product_id !== productID));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
