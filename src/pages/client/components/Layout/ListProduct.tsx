import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Dropdown,
  ButtonGroup,
  Collapse,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { useCart } from "../../context/cartContext";
import { Product } from "../../../../types/Product";
import { useList } from "../../hooks";
const ProductList = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const { data: products = [] } = useList({ resource: "products" });

  const filteredProducts = products.filter(
    (product: Product) => product.inStock
  );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-3 text-primary fw-bold">
        Danh Sách Sản Phẩm
      </h2>

      {/* Nút bộ lọc */}
      <div className="text-center mb-3">
        <Button
          variant={showFilters ? "danger" : "primary"}
          onClick={() => setShowFilters(!showFilters)}
          className="d-flex align-items-center gap-2 fw-bold shadow"
          style={{ borderRadius: "10px" }}
        >
          <FaFilter />
          {showFilters ? "Đóng bộ lọc" : "Bộ lọc"}
        </Button>
      </div>

      {/* Bộ lọc */}
      <Collapse in={showFilters}>
        <div>
          <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center p-3 border rounded bg-light">
            <Button variant="secondary">Sẵn hàng</Button>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="secondary">Giá</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Giá dưới 10 triệu</Dropdown.Item>
                <Dropdown.Item>10 - 20 triệu</Dropdown.Item>
                <Dropdown.Item>20 - 30 triệu</Dropdown.Item>
                <Dropdown.Item>Trên 30 triệu</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="secondary">
                Bộ nhớ trong
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>128GB</Dropdown.Item>
                <Dropdown.Item>256GB</Dropdown.Item>
                <Dropdown.Item>512GB</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="secondary">
                Dung lượng RAM
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>4GB</Dropdown.Item>
                <Dropdown.Item>6GB</Dropdown.Item>
                <Dropdown.Item>8GB</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="secondary">
                Kích thước màn hình
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>5.4 inch</Dropdown.Item>
                <Dropdown.Item>6.1 inch</Dropdown.Item>
                <Dropdown.Item>6.7 inch</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary">Xác nhận</Button>
          </div>
        </div>
      </Collapse>

      {/* Sắp xếp theo */}
      <div className="d-flex gap-2 mb-3 justify-content-center">
        <Button variant="outline-secondary">Giá Cao - Thấp</Button>
        <Button variant="outline-secondary">Giá Thấp - Cao</Button>
        <Button variant="outline-secondary">Khuyến Mãi Hot</Button>
        <Button variant="outline-danger">Xem nhiều</Button>
      </div>

      {/* Danh sách sản phẩm */}
      <Row className="g-3">
        {filteredProducts.map((product: Product) => (
          <Col key={product.id} md={3} sm={6} xs={12}>
            <Card
              className="border-0 shadow-sm p-2 position-relative"
              style={{ transition: "transform 0.3s ease-in-out" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Badge
                bg="light"
                text="dark"
                className="position-absolute top-0 start-0 m-2 px-2 py-1 fw-bold border"
                style={{ fontSize: "12px" }}
              >
                Trả chậm 0%
              </Badge>

              <Card.Img
                variant="top"
                src={product.images?.[0]?.url}
                className="p-3 img-fluid"
              />

              <Card.Body className="text-center">
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none"
                >
                  <Card.Title
                    className="fw-bold text-dark text-truncate"
                    title={product.name}
                    style={{ fontSize: "16px" }}
                  >
                    {product.name}
                  </Card.Title>
                </Link>

                <div
                  className="d-flex justify-content-center gap-2 my-2"
                  style={{ fontSize: "13px" }}
                >
                  <Badge bg="secondary">RAM {product.ram}GB</Badge>
                  <Badge bg="secondary">{product.memory}GB</Badge>
                </div>

                <Card.Text className="fw-bold">
                  <span className="text-danger fs-5">
                    {product.price.toLocaleString()}đ
                  </span>
                </Card.Text>

                <Button
                  variant="warning"
                  className="w-100 fw-bold shadow-sm"
                  style={{ fontSize: "14px", padding: "10px" }}
                  onClick={() => addToCart(product)}
                >
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
