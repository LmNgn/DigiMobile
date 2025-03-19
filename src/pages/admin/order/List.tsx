import React, { useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
function List() {
  const [orders, setOrders] = useState([
    { id: "67540ced3376121b361a0ed0", user: "User", product: "Laptop", address: "123 Main St", price: "$199.96", status: "Processing" },
    { id: "67540d3ca67b4a70a43a4092", user: "User", product: "Phone", address: "456 Oak St", price: "$40", status: "Processing" },
    { id: "675bf2c6a7bcd8ed7d7e", user: "User", product: "Headphones", address: "789 Pine St", price: "$39.99", status: "Processing" },
    { id: "675c24b09b88827304bd5cc1", user: "User", product: "Mouse", address: "101 Elm St", price: "$39.99", status: "Processing" },
  ]);

  const updateStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  const cancelOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };
    return (
      <Container fluid className="p-4">
    <h2 className="mb-4">Quản lý đơn hàng</h2>
    <Table striped bordered hover>
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
              <Button
                variant="success"
                onClick={() => updateStatus(index, "Delivered")}
                disabled={order.status === "Delivered"}
              >
                Delivered
              </Button>
              {' '}
              <Button
                variant="danger"
                onClick={() => cancelOrder(index)}
              >
                Cancel
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
  );
  }
  export default List;
  