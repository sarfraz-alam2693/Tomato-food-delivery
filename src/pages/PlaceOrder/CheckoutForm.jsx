import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function CheckoutForm() {
  const location = useLocation();
  const totalItemsAmount = location.state?.totalItemsAmount || 0;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("paymentMethod", paymentMethod);

      // Send paymentMethod.id to your backend
    }
  };
  const cardStyle = {
    style: {
      base: {
        color: "#32325d", // Text color
        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px", // Font size
        "::placeholder": {
          color: "#aab7c4", // Placeholder color
        },
      },
      invalid: {
        color: "#fa755a", // Color for invalid inputs
        iconColor: "#fa755a", // Icon color for invalid inputs
      },
    },
  };
  return (
    <form className="place-order" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-feilds">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleInputChange}
        />
        <div className="multi-feilds">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="multi-feilds">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>Rs- {totalItemsAmount}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee(Rs)</p>
              <p>Rs- {10}</p>
            </div>
            <div className="cart-total-details">
              <b>Total(Rs)</b>
              <b>{totalItemsAmount + 10}</b>
            </div>
            <CardElement options={cardStyle} />
          </div>
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
          {/* <button type="submit" disabled={!stripe || loading}>
            {loading ? "Processing..." : "PROCEED TO PAYMENT"}
          </button> */}
          {/* <CardElement /> */}
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
