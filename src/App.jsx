import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import AdminHome from "./components/Admin/AdminHome";
import Category from "./components/Admin/Category";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuItem from "./components/Admin/MenuItem";

function App() {
  return (
    <>
      <div className="app">
        <ToastContainer />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/menu-item" element={<MenuItem />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
