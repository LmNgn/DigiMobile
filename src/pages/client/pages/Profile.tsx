import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [user, setUser] = useState({
    email: "jonyaka@localhost.com",
    fullName: "Jony Aka",
    phone: "2134124124",
    gender: "Male",
    address: "New York",
    country: "United States",
    avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-18.png", // Placeholder avatar
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage
    localStorage.removeItem("user");
    // Điều hướng về trang đăng nhập (hoặc trang khác)
    navigate("/login");
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg w-75 rounded-4">
        <Row>
          <Col md={2} className="border-end">
            <h4 className="fw-bold text-primary">My Profile</h4>
            <ul className="list-unstyled mt-3">
              <li className="text-danger fw-bold">Dashboard</li>
              <li className="text-muted">Orders</li>
              <li className="text-muted">Wishlist</li>
              
              <Button
                variant="link"
                onClick={logout}
                className="text-muted p-0 d-flex align-items-center"
                style={{
                  fontWeight: 'bold',
                  transition: 'color 0.3s, background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#dc3545'; // Màu đỏ khi hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6c757d'; // Màu xám khi không hover
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i> {/* Thêm biểu tượng */}
                Log Out
              </Button>

            </ul>
          </Col>
          <Col md={8}>
            <h4 className="fw-bold mb-4">Thông tin hồ sơ</h4>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Name</Form.Label>
                    <Form.Control type="text" name="fullName" value={user.fullName} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control type="email" value={user.email} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={user.phone} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Gender</Form.Label>
                    <Form.Select name="gender" value={user.gender} onChange={handleChange}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Address</Form.Label>
                    <Form.Control type="text" name="address" value={user.address} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Country</Form.Label>
                    <Form.Control type="text" name="country" value={user.country} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-end">
                <Button variant="primary" className="rounded-pill px-4">Save</Button>
              </div>
            </Form>
          </Col>
          <Col md={2} className="border-start d-flex flex-column align-items-center">
            <img src={user.avatar} alt="Profile" className="rounded-circle mb-2" width="100" />
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;