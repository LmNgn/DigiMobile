import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          id: "123",
          createAt: new Date(),
          shippingAddress: { city: "Ha Noi", country: "VN" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/id/237/200/300",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          id: "234",
          createAt: new Date(),
          shippingAddress: { city: "Ha Noi", country: "VN" },
          orderItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/id/237/200/300",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fs-4 fw-bold mb-4">My Orders</h2>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped">
          <thead className="table-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Order ID</th>
              <th scope="col">Created</th>
              <th scope="col">Shipping Address</th>
              <th scope="col">Items</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="img-thumbnail" style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>#{order.id}</td>
                  <td>
                    {new Date(order.createAt).toLocaleDateString()} {" "}
                    {new Date(order.createAt).toLocaleTimeString()}
                  </td>
                  <td>
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td>{order.orderItems.length}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <span
                      className={`badge ${order.isPaid ? "bg-success" : "bg-danger"}`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  Bạn chưa có đơn hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;