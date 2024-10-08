import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items"></div>
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {food_list.map((item, index) => {
        console.log("item", cartItems);

        if (cartItems[item._id] > 0) {
          return (
            <>
              <div className="cart-items-title cart-items-item" key={index}>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>Rs-{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>Rs-{item.price * cartItems[item._id]}</p>
                <p className="cross" onClick={() => removeFromCart(item._id)}>
                  x
                </p>
              </div>
              <hr />
            </>
          );
        }
      })}
      <div className="cart-bottom-">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div></div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>if you have a Promocode, Enter it here </p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
