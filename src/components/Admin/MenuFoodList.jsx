import React from "react";
import { Table } from "react-bootstrap";

const MenuFoodList = ({ displayedItems, currentPage, itemsPerPage }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>sno-</th>
            <th>Category </th>
            <th>Menu</th>
            <th>Description</th>
            <th style={{ width: "70px" }}>Price</th>
            <th>Image</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1 + currentPage * itemsPerPage}</td>
              <td>{item.categoryname}</td>
              <td>{item.itemName}</td>
              <td>{item.description}</td>
              <td>Rs-{item.price}</td>
              <td>
                <img
                  src={`http://localhost:8000/images/fooditems/${item.image}`}
                  alt=""
                  width="80px"
                  height="80px"
                />
              </td>
              <td>{item.active == 1 ? "On" : "Off"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MenuFoodList;
