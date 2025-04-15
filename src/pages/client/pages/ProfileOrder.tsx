import { Button, Container, Row, Col, Card, Table, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useList } from "../hooks";

const ProfileOrder = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fetch orders
  const { data: orders, isLoading, error } = useList({ resource: "orders" });

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg w-75 rounded-4">
        <Row>
          <Col md={2} className="border-end">
            <h4 className="fw-bold text-primary">Thông tin tài khoản</h4>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="/profile" className="text-muted text-decoration-none">Tài khoản</Link>
              </li>
              <li>
                <Link to="/prorder" className="text-danger fw-bold text-decoration-none">Đơn hàng</Link>
              </li>
              <Button
                variant="link"
                onClick={handleLogout}
                className="text-muted p-0 d-flex align-items-center mt-3"
                style={{
                  fontWeight: 'bold',
                  transition: 'color 0.3s, background-color 0.3s',
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Log Out
              </Button>
            </ul>
          </Col>

          <Col md={10}>
            <h4 className="fw-bold mb-4">Đơn hàng của bạn</h4>

            {isLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : error ? (
              <p className="text-danger">Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</p>
            ) : orders.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o: any, index: number) => (
                    <tr key={o?.id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(o?.date)
                          .toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
                      </td>
                      <td>{o?.totalAmount}</td>
                      <td>{o?.status}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          as={Link}
                          to={`/order-detail/${o?.id}`}
                        >
                          Xem chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-muted">Bạn chưa có đơn hàng nào.</p>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProfileOrder;
