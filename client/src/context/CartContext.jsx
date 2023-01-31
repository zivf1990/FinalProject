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
    // Check if the item with the same product_id exists in the cart
    const existingIndex = cart.findIndex(
      (item) => item.product_id === product.product_id
    );

    // If there's no item with the same product_id, add the new item to the cart
    if (existingIndex === -1) {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
    // If there's already an item with the same product_id, add +1 to its quantity unless there is no more in stock.
    else {
      // Get the cart item with the same product_id
      const cartItem = cart[existingIndex];
      if (cartItem.quantity + 1 <= product.amount) {
        setCart((prev) => {
          // Create a copy of the current cart
          const updatedCart = [...prev];
          // Update the item's quantity
          updatedCart[existingIndex].quantity += 1;
          // Return the updated cart
          return updatedCart;
        });
      }
    }

    console.log(cart);
  };

  const editCart = (product) => {
    const existingIndex = cart.findIndex(
      (item) => item.product_id === product.product_id
    );

    setCart((prev) => {
      // Create a copy of the current cart
      const updatedCart = [...prev];
      // Update the item's quantity
      updatedCart[existingIndex] = product;
      // Return the updated cart
      return updatedCart;
    });
    console.log(cart);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((item, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, editCart }}>
      {children}
    </CartContext.Provider>
  );
}
