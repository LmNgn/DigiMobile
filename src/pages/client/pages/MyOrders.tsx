import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

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
    fetch(`http://localhost:3000/orders/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Xóa sản phẩm không thành công");
      }
      // Nếu xóa thành công, cập nhật lại giỏ hàng trên UI
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    })
    .catch((error) => {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi khi xóa sản phẩm!");
    });
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
  const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  const nav = useNavigate();

  // Xử lý thanh toán
  const handleInfo = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    nav("/client/info");
    console.log("Thanh toán các sản phẩm:", selectedItems);
  };

  // Nếu có lỗi khi fetch, hiển thị thông báo lỗi
  if (error) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Lỗi khi tải giỏ hàng</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Giỏ hàng của bạn</h2>
      <div className="list-group shadow-sm">
        {cartItems.length === 0 ? (
          <div className="alert alert-info" role="alert">
            Giỏ hàng của bạn hiện tại chưa có sản phẩm nào.
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="list-group-item d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={item.selected}
                onChange={() => toggleSelectItem(item.id)}
              />
              <img src={item.image} alt={item.product} className="me-3 rounded" width="80" />
              <div className="flex-grow-1">
                <h5>{item.product}</h5>
                <p>
                  <strong className="text-danger">
                    {(item.price || 0).toLocaleString()}đ
                  </strong>{" "}
                  <del className="text-muted">
                    {(item.oldPrice || 0).toLocaleString()}đ
                  </del>
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
          ))
        )}
      </div>

      <div className="mt-4 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">
          Tạm tính: {(totalPrice || 0).toLocaleString()}đ
        </h4>
        <button className="btn btn-danger btn-lg" onClick={handleInfo}>
          Mua ngay ({selectedItems.length})
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
