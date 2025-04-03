import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const [shippingMethod, setShippingMethod] = useState("store");

    const nav = useNavigate();
    const handleCheckOut = () => {
      nav("/client/checkout")
    };

  return (
    <div className="container mt-4">
      <h4 className="fw-bold">Thông tin</h4>
      <div className="progress mb-3">
        <div className="progress-bar w-50">1. THÔNG TIN</div>
        <div className="progress-bar bg-secondary w-50">2. THANH TOÁN</div>
      </div>

      <div className="card p-3 mb-3">
        <div className="d-flex">
          <img src="https://picsum.photos/80" alt="Product" className="me-3" />
          <div>
            <h5>realme C65 8GB 256GB-Đen</h5>
            <p className="text-danger fw-bold">3.650.000đ <del className="text-muted">5.290.000đ</del></p>
            <p>Số lượng: 1</p>
          </div>
        </div>
      </div>

      <h5>Thông tin khách hàng</h5>
      <div className="card p-3 mb-3">
        <p className="fw-bold">Nguyễn Khôi</p>
        <p>Email: khoi30925@gmail.com</p>
        <p>Số điện thoại: 0946911816</p>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="subscribe" />
          <label className="form-check-label" htmlFor="subscribe">
            Nhận email thông báo và ưu đãi
          </label>
        </div>
      </div>

      <h5>Thông tin nhận hàng</h5>
      <div className="card p-3 mb-3">
        <div className="d-flex">
          <div className="form-check me-3">
            <input type="radio" id="store" name="shipping" className="form-check-input" checked={shippingMethod === "store"} onChange={() => setShippingMethod("store")} />
            <label className="form-check-label" htmlFor="store">Nhận tại cửa hàng</label>
          </div>
          <div className="form-check">
            <input type="radio" id="home" name="shipping" className="form-check-input" checked={shippingMethod === "home"} onChange={() => setShippingMethod("home")} />
            <label className="form-check-label" htmlFor="home">Giao hàng tận nơi</label>
          </div>
        </div>
        <div className="mt-3">
          <select className="form-select mb-2">
            <option>Chọn tỉnh/thành phố</option>
            <option>Hà Nội</option>
          </select>
          {shippingMethod === "store" ? (
            <select className="form-select">
              <option>Chọn địa chỉ cửa hàng</option>
            </select>
          ) : (
            <input type="text" className="form-control" placeholder="Nhập địa chỉ giao hàng" />
          )}
        </div>
      </div>

      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="vat" />
        <label className="form-check-label" htmlFor="vat">
          Yêu cầu xuất hóa đơn công ty
        </label>
      </div>

      <div className="card p-3 mt-3">
        <h5 className="d-flex justify-content-between">
          <span>Tổng tiền tạm tính:</span> <span className="text-danger">3.650.000đ</span>
        </h5>
        <button onClick={handleCheckOut} className="btn btn-danger w-100 mt-2">Tiếp tục</button>
      </div>
    </div>
  );
};

export default Info;