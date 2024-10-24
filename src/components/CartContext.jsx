import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  // const addToCart = (item) => {
  //   setCartItems((prev) => [...prev, item]);
  //   // Update localStorage
  //   const existingCart = JSON.parse(localStorage.getItem("Cart")) || [];
  //   existingCart.push(item);
  //   localStorage.setItem("Cart", JSON.stringify(existingCart));
  // };

  // const removeFromCart = (item) => {
  //   const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
  //   setCartItems(updatedCart);
  //   localStorage.setItem("Cart", JSON.stringify(updatedCart));
  // };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
