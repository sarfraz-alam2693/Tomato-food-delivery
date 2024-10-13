import React, { useEffect, useState } from "react";
import Navbar from "./AdminNavbar/Navbar";
import Table from "react-bootstrap/Table";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [showModal, setModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  //Get All Category List
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/admin/category/list`)
      .then((response) => {
        // console.log("categoryList", response);

        setCategoryList(response.data.data);
      });
  }, []);

  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
    setCategoryName("");
    setDescription("");
    setImage("");
  };
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
    // console.log(image);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("innnnn", categoryName, description, image);
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      axios
        .post(`http://localhost:8000/api/admin/save/category`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // console.log("category", response);
            toast.success(response.data.message);
            setModal(false);
            setCategoryList([...categoryList, response.data.data]);
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <div>
      <Navbar />
      <h2>Category</h2>
      <Button style={{ float: "right" }} onClick={handleOpenModal}>
        Add Category
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Category Image</Form.Label>
              <Form.Control type="file" onChange={handleImageFile} />
            </Form.Group>

            {preview && (
              <div>
                <h5>Image Preview:</h5>
                <img
                  src={preview}
                  alt="Selected"
                  style={{
                    width: "40px%",
                    maxHeight: "150px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {categoryList.length ? (
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
      ) : (
        "No record found"
      )}
    </div>
  );
};

export default Category;
