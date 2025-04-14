import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProfileOrder = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [orders, setOrders] = useState([]);

  // Dữ liệu đơn hàng giả lập
  useEffect(() => {
    const dummyOrders = [
      {
        id: 1,
        date: "2025-04-10",
        total: "$120.00",
        status: "Delivered",
        items: 3,
      },
      {
        id: 2,
        date: "2025-03-28",
        total: "$85.50",
        status: "Processing",
        items: 2,
      },
    ];
    setOrders(dummyOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg w-75 rounded-4">
        <Row>
          <Col md={2} className="border-end">
            <h4 className="fw-bold text-primary">My Profile</h4>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="/profile" className="text-muted text-decoration-none">Dashboard</Link>
              </li>
              <li>
                <Link to="/prorder" className="text-danger fw-bold text-decoration-none">Orders</Link>
              </li>
              <Button
                variant="link"
                onClick={logout}
                className="text-muted p-0 d-flex align-items-center mt-3"
                style={{
                  fontWeight: 'bold',
                  transition: 'color 0.3s, background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#dc3545';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6c757d';
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Log Out
              </Button>
            </ul>
          </Col>

          <Col md={10}>
            <h4 className="fw-bold mb-4">Đơn hàng của bạn</h4>
            {orders.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ngày đặt</th>
                    <th>Số lượng SP</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>{order.total}</td>
                      <td>{order.status}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          as={Link}
                          to={`/order-detail/${order.id}`}
                        >
                          Xem chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Bạn chưa có đơn hàng nào.</p>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProfileOrder;
