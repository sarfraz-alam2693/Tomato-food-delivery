import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import axios from "axios";
import "react-slideshow-image/dist/styles.css";

const Explore = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/category/list`)
      .then((response) => {
        // console.log("response", response);
        setCategoryList(response.data.data);
      });
  }, []);
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        Chooese from a diverse menu featuring a delectable array of dishes. Our
        mission is to satify your craving and elevate your dinning experince
        ,one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {categoryList.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={`http://localhost:8000/images/categories/${item.image}`}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <p>{item.categoryname}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default Explore;
