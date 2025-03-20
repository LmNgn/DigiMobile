import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";

function List() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedOrder = { ...orders[index], status: newStatus };
    fetch(`http://localhost:3000/orders/${updatedOrder.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then(() => {
        const updatedOrders = [...orders];
        updatedOrders[index] = updatedOrder;
        setOrders(updatedOrders);
      })
      .catch((error) => console.error("Error updating order status:", error));
  };

  const cancelOrder = (index) => {
    const orderId = orders[index].id;
    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedOrders = orders.filter((_, i) => i !== index);
        setOrders(updatedOrders);
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setShow(true);
  };

  const handleSaveOrder = () => {
    fetch(`http://localhost:3000/orders/${currentOrder.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentOrder),
    })
      .then((response) => response.json())
      .then(() => {
        setOrders(orders.map((o) => (o.id === currentOrder.id ? currentOrder : o)));
        setShow(false);
      })
      .catch((error) => console.error("Error updating order:", error));
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4 text-center">Quản lý đơn hàng</h2>
      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>PRODUCT</th>
              <th>ADDRESS</th>
              <th>TOTAL PRICE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>#{order.id}</td>
                <td>{order.user}</td>
                <td>{order.product}</td>
                <td>{order.address}</td>
                <td>{order.price}</td>
                <td>
                  <Form.Select
                    value={order.status}
                    onChange={(e) => updateStatus(index, e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                  </Form.Select>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <Button variant="primary" onClick={() => handleEditOrder(order)}>
                      Edit
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => updateStatus(index, "Delivered")}
                      disabled={order.status === "Delivered"}
                    >
                      Delivered
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => cancelOrder(index)}
                    >
                      Cancel
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Sản phẩm</Form.Label>
              <Form.Control
                type="text"
                value={currentOrder?.product || ""}
                onChange={(e) => setCurrentOrder({ ...currentOrder, product: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                value={currentOrder?.address || ""}
                onChange={(e) => setCurrentOrder({ ...currentOrder, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                value={currentOrder?.price || ""}
                onChange={(e) => setCurrentOrder({ ...currentOrder, price: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveOrder}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default List;