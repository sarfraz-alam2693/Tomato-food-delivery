import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key
const stripePromise = loadStripe("your_stripe_publishable_key");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        {/* Wrap your app with the Stripe provider */}
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>
);
