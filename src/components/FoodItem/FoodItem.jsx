import React, { createContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";

const FoodItem = ({ item, index }) => {
  const [addCart, setAddCart] = useState([]);

  const handleAddToCart = (item) => {
    setAddCart((prev) => [...prev, item]);
    //Set to local storage
    const existingCart = JSON.parse(localStorage.getItem("Cart")) || [];
    existingCart.push(item);
    localStorage.setItem("Cart", JSON.stringify(existingCart));
  };
  // console.log("addCart++++++++", addCart);
  const addToCart = createContext();

  const handleDeleteToCart = () => {};
  return (
    <>
      <div className="food-item" key={index}>
        <div className="food-item-img-container">
          <img
            className="food-item-image"
            src={`http://localhost:8000/images/fooditems/${item.image}`}
            alt=""
          />
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => handleDeleteToCart(item)}
            />
            {addCart.length}
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => handleAddToCart(item)}
            />
          </div>
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{item.itemName}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-desc">{item.description}</p>
          <p className="food-item-price">Rs-{item.price}</p>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
