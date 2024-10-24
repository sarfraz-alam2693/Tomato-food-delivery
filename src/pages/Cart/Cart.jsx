import React, { useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [sum, setSum] = useState(0);
  // Retrieve cart items from localStorage when the component loads
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
    let obj = {};
    storedCart.forEach((elem) => {
      if (obj.hasOwnProperty(elem.id)) {
        obj[elem.id].qty += 1;
      } else {
        obj[elem.id] = { ...elem, qty: 1 };
      }
    });
    const cartArray = Object.values(obj);
    setCartItems(cartArray);
  }, []);

  // Update the localStorage when cartItems changes
  useEffect(() => {
    totalItem(cartItems);
    // localStorage.setItem("Cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((elem) => {
      return elem.id !== itemId;
    });
    setCartItems(updatedCart);
  };
  const totalItem = (cartItems) => {
    let sum = 0;
    cartItems.forEach((elem) => {
      sum += elem.price * elem.qty;
    });
    setSum(sum);
  };

  return (
    <>
      <Navbar />
      <div className="cart" key="cart">
        <div className="cart-items"></div>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItems &&
          cartItems.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <div
                  className="cart-items-title cart-items-item"
                  // key={item.id}
                  key={item.id}
                >
                  <img
                    src={`http://localhost:8000/images/fooditems/${item.image}`}
                    alt=""
                  />
                  <p>{item.itemName}</p>
                  <p>{item.qty}</p>
                  <p>Rs{item.price}</p>
                  <p>Rs{item.qty * item.price}</p>
                  <p className="cross" onClick={() => removeFromCart(item.id)}>
                    x
                  </p>
                </div>
                <hr />
              </React.Fragment>
            );
          })}

        <div className="cart-bottom-">
          <div className="cart-total-summary">
            <h2>Cart Totals Rs={sum}</h2>
            <button
              onClick={() =>
                navigate("/order", { state: { totalItemsAmount: sum } })
              }
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
