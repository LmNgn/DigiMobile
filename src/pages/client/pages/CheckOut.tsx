import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const OrderSuccess: React.FC = () => {

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Alert variant="success">
                <h4>Đơn hàng đã được tạo thành công!</h4>
                <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
              </Alert>
              <div className="d-flex justify-content-between">
                <Button variant="primary" href="/my_orders">
                  Xem đơn hàng của tôi
                </Button>
                <Button variant="secondary" href="/">
                  Quay lại trang chủ
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;
