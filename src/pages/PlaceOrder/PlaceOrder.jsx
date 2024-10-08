import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-feilds">
          <input type="text" placeholder="first Name" />
          <input type="text" placeholder="last Name" />
        </div>

        <input type="email" placeholder="email Address" />
        <input type="text" placeholder="street" />
        <div className="multi-feilds">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-feilds">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotals</p>
              <p>Rs-{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs-{getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                Rs-{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
              </b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
