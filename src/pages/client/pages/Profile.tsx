import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import axios from "axios";

const Profile = () => {
  const { user, logout } = useUser();  // Lấy thông tin user từ context
  const [profileData, setProfileData] = useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    gender: "",
    address: "",
    country: ""
  });

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3000/users/${user.id}`)  // Dùng user.id thay vì hardcode
        .then((res) => {
          setProfileData(res.data);
        })
        .catch((err) => {
          console.error("Lỗi khi load user:", err);
        });
    }
  }, [user?.id]); // Thực hiện lại khi user.id thay đổi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:3000/users/${profileData.id}`, profileData)
      .then(() => {
        alert("Cập nhật thông tin thành công!");
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Có lỗi xảy ra khi lưu.");
      });
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg w-75 rounded-4">
        <Row>
          <Col md={2} className="border-end">
            <h4 className="fw-bold text-primary">My Profile</h4>
            <ul className="list-unstyled mt-3">
              <li>
                <Link to="/profile" className="text-danger fw-bold text-decoration-none">Dashboard</Link>
              </li>
              <li>
                <Link to="/prorder" className="text-muted text-decoration-none">Orders</Link>
              </li>
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
                    <Form.Control type="text" name="name" value={profileData.name} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control type="email" value={profileData.email} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={profileData.phone} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Gender</Form.Label>
                    <Form.Control as="select" name="gender" value={profileData.gender} onChange={handleChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Address</Form.Label>
                    <Form.Control type="text" name="address" value={profileData.address} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Country</Form.Label>
                    <Form.Control type="text" name="country" value={profileData.country} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-end">
                <Button onClick={handleSave} variant="primary" className="rounded-pill px-4">Save</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
