import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// Define the context
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // Add Cart Item
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };
  // console.log("cartItem", cartItems);

  // Remove Cart Item
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const Item in cartItems) {
      if (cartItems[Item] > 0) {
        let itemInfo = food_list.find((product) => product._id === Item);
        totalAmount += itemInfo.price * cartItems[Item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

// Export the provider as default
export default StoreContextProvider;
