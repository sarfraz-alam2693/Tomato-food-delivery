import React from "react";
import "./PlaceOrder.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L4NZsSD3HCcd9wnVa8nXHNFiCZwnhBXb8mCMRA6Cv1mSRFuadbbzJgUr9lkSkUnyJIMPdgj2XTxPEtVV5cH5GvC00WFKHThhF"
);

const PlaceOrder = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PlaceOrder;
