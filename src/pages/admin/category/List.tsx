import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";

function List() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState({ id: null, name: "" });

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (category) => {
    setEditCategory(category);
    setEditShow(true);
  };

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      const newCat = { name: newCategory };
      fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCat),
      })
        .then((response) => response.json())
        .then((data) => {
          setCategories([...categories, data]);
          setNewCategory("");
          handleClose();
        })
        .catch((error) => console.error("Error adding category:", error));
    }
  };

  const updateCategory = () => {
    fetch(`http://localhost:3000/categories/${editCategory.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editCategory),
    })
      .then((response) => response.json())
      .then(() => {
        setCategories(categories.map(cat => (cat.id === editCategory.id ? editCategory : cat)));
        handleEditClose();
      })
      .catch((error) => console.error("Error updating category:", error));
  };

  const deleteCategory = (id) => {
    fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCategories(categories.filter(category => category.id !== id));
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Quản lý danh mục</h2>
      <Button variant="primary" onClick={handleShow} className="mb-3">Add Category</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditShow(category)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => deleteCategory(category.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={addCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" value={editCategory.name} onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Close</Button>
          <Button variant="primary" onClick={updateCategory}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default List;