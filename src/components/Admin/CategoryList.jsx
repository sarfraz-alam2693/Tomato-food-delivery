import React from "react";
import { Button, Table } from "react-bootstrap";

const CategoryList = ({ categoryList }) => {
  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S no-</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((elem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{elem.categoryname}</td>
              <td>
                <img
                  src={`http://localhost:8000/images/categories/${elem.image}`}
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>{elem.description}</td>
              <td>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryList;
