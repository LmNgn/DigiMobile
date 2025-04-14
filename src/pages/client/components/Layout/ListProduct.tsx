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
import { FaFilter, FaMemory, FaMobileAlt, FaMoneyBillWave, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useCart } from "../../context/cartContext";
import { Product } from "../../../../types/Product";
import { useList } from "../../hooks";

const ProductList = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    price: "",
    ram: "",
    memory: "",
    screenSize: "",
    inStock: true,
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const { addToCart } = useCart();
  const { data: products = [] } = useList({ resource: "products" });

  const filteredProducts = products.filter((product: Product) => {
    return (
      (filters.inStock ? product.inStock : true) &&
      (filters.price
        ? product.price >= parseInt(filters.price.split("-")[0]) &&
          (filters.price.includes("-")
            ? product.price <= parseInt(filters.price.split("-")[1] || "999999999")
            : true)
        : true) &&
      (filters.ram ? product.ram === parseInt(filters.ram) : true) &&
      (filters.memory ? product.memory === filters.memory : true) &&
      (filters.screenSize
        ? product.screenSize === parseFloat(filters.screenSize)
        : true)
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleViewAllProducts = () => {
    setFilters({
      price: "",
      ram: "",
      memory: "",
      screenSize: "",
      inStock: true,
    });
  };

  const handleAddToCart = (product: Product) => {
    setAddingToCart(product.id);
    addToCart(product);
    setTimeout(() => setAddingToCart(null), 1000);
  };

  return (
    <Container className="mt-4">
      <style>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: scale(1.03);
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
        }
        .dropdown-item.active {
          background-color: #0d6efd;
          color: #fff;
        }
      `}</style>

      <h2 className="text-center mb-3 text-primary fw-bold">Danh Sách Sản Phẩm</h2>

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

      <Collapse in={showFilters}>
        <div>
          <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center p-3 border rounded bg-light">
            <Button
              variant="secondary"
              onClick={() => setFilters({ ...filters, inStock: !filters.inStock })}
            >
              {filters.inStock ? "Sẵn hàng" : "Tất cả sản phẩm"}
            </Button>

            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="secondary">Giá</Dropdown.Toggle>
              <Dropdown.Menu>
                {[
                  { label: "Dưới 10 triệu", value: "0-10000000" },
                  { label: "10 - 20 triệu", value: "10000000-20000000" },
                  { label: "20 - 30 triệu", value: "20000000-30000000" },
                  { label: "Trên 30 triệu", value: "30000000-" },
                ].map((item) => (
                  <Dropdown.Item
                    key={item.value}
                    active={filters.price === item.value}
                    onClick={() => handleFilterChange("price", item.value)}
                  >
                    <FaMoneyBillWave className="me-2" />
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="secondary">Bộ nhớ trong</Dropdown.Toggle>
              <Dropdown.Menu>
                {["128GB", "256GB", "512GB"].map((mem) => (
                  <Dropdown.Item
                    key={mem}
                    active={filters.memory === mem}
                    onClick={() => handleFilterChange("memory", mem)}
                  >
                    <FaMemory className="me-2" />
                    {mem}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="secondary">Dung lượng RAM</Dropdown.Toggle>
              <Dropdown.Menu>
                {[4, 6, 8].map((ram) => (
                  <Dropdown.Item
                    key={ram}
                    active={filters.ram === ram.toString()}
                    onClick={() => handleFilterChange("ram", ram.toString())}
                  >
                    <Badge bg="info" className="me-2">{ram}GB</Badge>
                    RAM {ram}GB
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="secondary">Kích thước màn hình</Dropdown.Toggle>
              <Dropdown.Menu>
                {[5.4, 6.1, 6.7].map((size) => (
                  <Dropdown.Item
                    key={size}
                    active={filters.screenSize === size.toString()}
                    onClick={() => handleFilterChange("screenSize", size.toString())}
                  >
                    <FaMobileAlt className="me-2" />
                    {size}" inch
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Collapse>

      <div className="d-flex gap-2 mb-3 justify-content-center">
      <Button
          variant="light"
          onClick={() => setSortOrder("asc")}
          className="shadow-sm d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
          style={{
            borderRadius: "25px",
            border: "1px solid #ced4da",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#e9f7ef";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "white";
          }}
        >
          <FaArrowUp />
          Giá Thấp - Cao
        </Button>

        <Button
          variant="light"
          onClick={() => setSortOrder("desc")}
          className="shadow-sm d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
          style={{
            borderRadius: "25px",
            border: "1px solid #ced4da",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#fdecea";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "white";
          }}
        >
          <FaArrowDown />
          Giá Cao - Thấp
        </Button>
        <Button
        variant="info"
        onClick={handleViewAllProducts}
        className="fw-bold shadow d-flex align-items-center justify-content-center gap-2 px-4 py-2"
        style={{
          borderRadius: "30px",
          background: "linear-gradient(135deg, #17a2b8, #0dcaf0)",
          color: "#fff",
          border: "none",
          fontSize: "15px",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      >
        <FaMobileAlt />
        Xem tất cả sản phẩm
      </Button>

      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center text-muted my-5">
          <h5>😥 Không tìm thấy sản phẩm phù hợp</h5>
          <p>Vui lòng thử thay đổi bộ lọc</p>
        </div>
      ) : (
        <Row className="g-3">
          {sortedProducts.map((product: Product) => (
            <Col key={product.id} lg={3} md={4} sm={6} xs={12}>
              <Card className="border-0 shadow-sm p-2 card-hover position-relative">
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
                  <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <Card.Title
                      className="fw-bold text-dark text-truncate"
                      title={product.name}
                      style={{ fontSize: "16px" }}
                    >
                      {product.name}
                    </Card.Title>
                  </Link>

                  <div className="d-flex justify-content-center gap-2 my-2" style={{ fontSize: "13px" }}>
                    <Badge bg="secondary">RAM {product.ram}GB</Badge>
                    <Badge bg="secondary">{product.memory}GB</Badge>
                  </div>

                  <Card.Text className="fw-bold">
                    {product.oldPrice && (
                      <span className="text-muted text-decoration-line-through me-2">
                        {product.oldPrice.toLocaleString()}đ
                      </span>
                    )}
                    <span className="text-danger fs-5">
                      {product.price.toLocaleString()}đ
                    </span>
                  </Card.Text>

                  <Button
                    variant="warning"
                    className="w-100 fw-bold shadow-sm"
                    style={{ fontSize: "14px", padding: "10px" }}
                    disabled={addingToCart === product.id}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addingToCart === product.id ? "Đang thêm..." : "Mua ngay"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
