import React, { useEffect, useState } from "react";
import "./foodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";

// use Disstructuring to get the category property from category object....
const FoodDisplay = ({ category }) => {
  const [foodmenuList, setFoodmenuList] = useState([]);
  // console.log("category", category);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/foodmenu/list`)
      .then((response) => {
        // console.log("foodmenuList", response);
        setFoodmenuList(response.data.data);
      });
  }, []);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodmenuList.map((item, index) => {
          return <FoodItem item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
