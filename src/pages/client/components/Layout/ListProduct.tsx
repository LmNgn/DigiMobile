import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data.filter(product => product.inStock))) // Lọc sản phẩm hết hàng
        .catch((error) => console.error("Error fetching products:", error));
    }, []);
  
    return (
      <Container className="product-list-container mt-4">
        <h2 className="text-center mb-4 text-primary">Danh Sách Sản Phẩm</h2>
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} md={3} sm={6} className="d-flex align-items-stretch">
              <Card className="product-card shadow-sm border-0 w-100">
                <Card.Img variant="top" src={product.imageUrl} className="product-image p-3" />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="product-title text-truncate" title={product.name}>{product.name}</Card.Title>
                  <Card.Text className="product-price text-danger fw-bold">{product.price} VND</Card.Text>
                  <Button variant="warning" className="mt-auto w-100 fw-bold shadow-sm">
                    Mua ngay
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  
  export default ProductList;