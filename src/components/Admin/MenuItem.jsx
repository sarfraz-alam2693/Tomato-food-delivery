import React, { useEffect, useState } from "react";
import Navbar from "./AdminNavbar/Navbar";
import axios from "axios";
import { Button, Container, Modal, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Select from "react-select";

const MenuItem = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [active, setActive] = useState("1");
  const [menulist, setMenuList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Define how many items per page

  useEffect(() => {
    getAllMenuList();
    axios
      .get(`http://localhost:8000/api/user/category/list`)
      .then((response) => {
        setCategoryList(response.data.data);
      });
  }, []);

  function getAllMenuList() {
    axios.get(`http://localhost:8000/api/admin/menulist`).then((response) => {
      setMenuList(response.data.data);
    });
  }

  const handleModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", categoryId);
    formData.append("item_name", itemName);
    formData.append("item_price", price);
    formData.append("item_description", description);
    formData.append("active", active);
    if (itemImage) {
      formData.append("image", itemImage);
    }

    axios
      .post(`http://localhost:8000/api/admin/create/menu`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setShowModal(false);
        setMenuList((previous) => [...previous, response.data.data[0]]);
        setItemName("");
        setCategoryId("");
        setPrice("");
        setDescription("");
        setItemImage("");
        setActive("");
        setPreview(null);
      });
  };

  // function resetForm() {
  //   setItemName("");
  //   setCategoryId("");
  //   setPrice("");
  //   setDescription("");
  //   setItemImage("");
  //   setActive("");
  //   setPreview(null);
  // }

  const categoryOptions = categoryList.map((item) => ({
    value: item.id,
    label: item.categoryname,
  }));

  const activeOptions = [
    { value: "1", label: "On" },
    { value: "0", label: "Off" },
  ];

  // Pagination logic
  const pageCount = Math.ceil(menulist.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedItems = menulist.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <Container>
        <Row></Row>
      </Container>
      <Navbar />
      <h3>Menu Item </h3>
      <Button style={{ float: "right" }} onClick={handleModal}>
        Add Food Menu
      </Button>

      {displayedItems && displayedItems.length > 0 ? (
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
      ) : (
        <p>No Data Founds</p>
      )}

      {/* ReactPaginate for pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        // marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Category Selection */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <Select
                id="category"
                name="category"
                value={categoryOptions.find((opt) => opt.value === categoryId)}
                onChange={(selectedOption) =>
                  setCategoryId(selectedOption.value)
                }
                options={categoryOptions}
                placeholder="Select Category"
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="itemName">Item Name</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                className="form-control"
                placeholder="Enter Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="description">Item Description</label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                placeholder="Item Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="price">Item Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                placeholder="Item Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="itemImage">Item Image</label>
              <input
                type="file"
                id="itemImage"
                className="form-control"
                onChange={handleImageFile}
              />
            </div>
            <br />

            {preview && (
              <div className="form-group">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid"
                  width="200"
                  height="150"
                />
              </div>
            )}
            <br />

            <div className="form-group">
              <label htmlFor="active">Active</label>
              <Select
                id="active"
                value={activeOptions.find((opt) => opt.value === active)}
                onChange={(selectedOption) => setActive(selectedOption.value)}
                options={activeOptions}
                placeholder="Select Status"
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MenuItem;
