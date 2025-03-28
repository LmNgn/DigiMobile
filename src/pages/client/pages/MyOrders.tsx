import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";

const MyOrders = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra 12GB 256GB",
      image: "https://picsum.photos/200/300",
      price: 22990000,
      oldPrice: 33990000,
      quantity: 1,
      selected: false,
    },
    {
      id: 2,
      name: "Xiaomi 14T Pro - Xám",
      image: "https://picsum.photos/200/300",
      price: 14490000,
      oldPrice: 17990000,
      quantity: 1,
      selected: false,
    },
  ]);

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Chọn/bỏ chọn sản phẩm để thanh toán
  const toggleSelectItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Tính tổng tiền sản phẩm được chọn
  const selectedItems = cartItems.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    console.log("Thanh toán các sản phẩm:", selectedItems);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Giỏ hàng của bạn</h2>
      <div className="list-group shadow-sm">
        {cartItems.map((item) => (
          <div key={item.id} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={item.selected}
              onChange={() => toggleSelectItem(item.id)}
            />
            <img src={item.image} alt={item.name} className="me-3 rounded" width="80" />
            <div className="flex-grow-1">
              <h5>{item.name}</h5>
              <p>
                <strong className="text-danger">{item.price.toLocaleString()}đ</strong>{" "}
                <del className="text-muted">{item.oldPrice.toLocaleString()}đ</del>
              </p>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">Tạm tính: {totalPrice.toLocaleString()}đ</h4>
        <button className="btn btn-danger btn-lg" onClick={handleCheckout}>
          Mua ngay ({selectedItems.length})
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
