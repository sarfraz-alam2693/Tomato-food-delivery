import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ item, index }) => {
  return (
    <div className="food-item" key={index}>
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`http://localhost:8000/images/fooditems/${item.image}`}
          alt=""
        />
        <div className="food-item-counter">
          <img src={assets.remove_icon_red} alt="" />
          {/* <p>{cartItems[id]}</p> */}
          <img src={assets.add_icon_green} alt="" />
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
  );
};

export default FoodItem;
