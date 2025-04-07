import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Nav, Dropdown, ButtonGroup, Collapse } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.filter(product => product.inStock)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Container className="product-list-container mt-4">
      <h2 className="text-center mb-3 text-primary">Danh Sách Sản Phẩm</h2>
      
      {/* Tabs chọn dòng sản phẩm */}
      <Nav variant="tabs" className="mb-3 justify-content-center">
        {["iPhone 16 Series", "iPhone 15 Series", "iPhone 14 Series", "iPhone 13 Series", "iPhone 12 Series", "iPhone 11 Series"].map((series, index) => (
          <Nav.Item key={index}>
            <Nav.Link active={filter === series.toLowerCase()} onClick={() => setFilter(series.toLowerCase())}>
              {series}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Nút bộ lọc */}
      <div className="text-center mb-3">
  <Button
    variant={showFilters ? "danger" : "primary"} // Đổi màu khi mở/đóng
    onClick={() => setShowFilters(!showFilters)}
    className="d-flex align-items-center gap-2 fw-bold shadow"
    style={{
      borderRadius: "10px",
      transition: "all 0.3s ease",
    }}
  >
    <FaFilter />
    {showFilters ? "Đóng bộ lọc" : "Bộ lọc"}
  </Button>
</div>
      
      {/* Hiệu ứng trượt khi mở bộ lọc */}
      <Collapse in={showFilters}>
        <div className={`filter-container ${showFilters ? "d-flex" : "d-none"} flex-wrap gap-2 mb-3 justify-content-center p-3 border rounded bg-light`}>
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
            <Dropdown.Toggle variant="secondary">Bộ nhớ trong</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>128GB</Dropdown.Item>
              <Dropdown.Item>256GB</Dropdown.Item>
              <Dropdown.Item>512GB</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="secondary">Dung lượng RAM</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>4GB</Dropdown.Item>
              <Dropdown.Item>6GB</Dropdown.Item>
              <Dropdown.Item>8GB</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="secondary">Kích thước màn hình</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>5.4 inch</Dropdown.Item>
              <Dropdown.Item>6.1 inch</Dropdown.Item>
              <Dropdown.Item>6.7 inch</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary">Xác nhận</Button>
        </div>
      </Collapse>

      {/* Sắp xếp theo */}
      <div className="d-flex gap-2 mb-3 justify-content-center">
        <Button variant="outline-secondary">Giá Cao - Thấp</Button>
        <Button variant="outline-secondary">Giá Thấp - Cao</Button>
        <Button variant="outline-secondary">Khuyến Mãi Hot</Button>
        <Button variant="outline-danger">Xem nhiều</Button>
      </div>

      <Row className="g-3">
  {products
    .filter((product) => filter === "all" || product.series === filter)
    .map((product) => (
      <Col key={product.id} md={3} sm={6} xs={12}>
        <Card
          className="border-0 shadow-sm p-2 position-relative"
          style={{ transition: "transform 0.3s ease-in-out" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {/* Huy hiệu Trả góp */}
          <Badge
            bg="light"
            text="dark"
            className="position-absolute top-0 start-0 m-2 px-2 py-1 fw-bold border"
            style={{ fontSize: "12px" }}
          >
            Trả chậm 0%
          </Badge>

          {/* Hình ảnh sản phẩm */}
          <Card.Img
            variant="top"
            src={product.images?.[0]?.url}
            className="p-3 img-fluid"
          />

          <Card.Body className="text-center">
            {/* Tên sản phẩm */}
            <Card.Title
              className="fw-bold text-dark text-truncate"
              title={product.name}
              style={{ fontSize: "16px" }}
            >
              {product.name}
            </Card.Title>

            {/* RAM & SSD */}
            <div
              className="d-flex justify-content-center gap-2 my-2"
              style={{ fontSize: "13px" }}
            >
              <Badge bg="secondary" className="px-2 py-1">
                RAM {product.ram} GB
              </Badge>
              <Badge bg="secondary" className="px-2 py-1">
                SSD {product.storage} GB
              </Badge>
            </div>

            {/* Giá sản phẩm */}
            <Card.Text className="fw-bold">
              <span className="text-danger fs-5">{product.price}đ</span>
              {product.originalPrice && (
                <span
                  className="text-muted text-decoration-line-through ms-2"
                  style={{ fontSize: "14px" }}
                >
                  {product.originalPrice}đ
                </span>
              )}
              {product.discount > 0 && (
                <Badge bg="danger" className="ms-2">
                  -{product.discount}%
                </Badge>
              )}
            </Card.Text>

            {/* Quà tặng */}
            {product.gift && (
              <Card.Text
                className="text-muted small"
                style={{ fontSize: "13px" }}
              >
                🎁 Quà: {product.gift}đ
              </Card.Text>
            )}

            {/* Đánh giá sao */}
            <Card.Text className="text-warning" style={{ fontSize: "14px" }}>
              ⭐ {product.rating} • Đã bán {product.sold}
            </Card.Text>

            {/* Nút mua ngay */}
            <Button
              variant="warning"
              className="w-100 fw-bold shadow-sm"
              style={{ fontSize: "14px", padding: "10px" }}
              onClick={() => handleBuyNow(product.id)}
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