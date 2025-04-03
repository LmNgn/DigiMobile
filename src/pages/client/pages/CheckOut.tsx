import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckOut = () => {
  const [selected, setSelected] = useState("nganluong");
  const paymentMethods = [
    { id: "vnpay", name: "Thanh toán qua VNPAY", logo: "/src/assets/vnpay.png" },
    { id: "momo", name: "Thanh toán qua MoMo", logo: "/src/assets/momo.png" },
    { id: "offline", name: "Thanh toán khi nhận hàng", logo: "/src/assets/money.png" },
  ];
  return (
    <div className="container mt-4">
      <h4 className="fw-bold">Thanh toán</h4>
      <div className="progress mb-3">
        <div className="progress-bar bg-secondary w-50">1. THÔNG TIN</div>
        <div className="progress-bar w-50">2. THANH TOÁN</div>
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

      <div className="container mt-4">
      <h2 className="mb-3 fw-bold text-center">Chọn phương thức thanh toán</h2>
      <div className="list-group shadow-lg rounded-3 overflow-hidden">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`list-group-item d-flex align-items-center py-3 px-4 border-0 ${selected === method.id ? 'bg-primary text-white' : 'bg-light'}`}
            style={{ 
              transition: "all 0.3s ease-in-out", 
              cursor: "pointer",
              borderRadius: "8px",
              boxShadow: selected === method.id ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = selected === method.id ? "#0b5ed7" : "#e9ecef"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selected === method.id ? "#0d6efd" : "#f8f9fa"}
            onClick={() => setSelected(method.id)}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              className="form-check-input me-3"
              style={{ transform: "scale(1.2)" }}
            />
            <img src={method.logo} alt={method.name} className="me-3" width="32" height="32" />
            <span className="fw-medium flex-grow-1">{method.name}</span>
          </label>
        ))}
      </div>
    </div>

      <div className="card p-3 mt-3">
        <h5 className="d-flex justify-content-between">
          <span>Tổng tiền tạm tính:</span> <span className="text-danger">3.650.000đ</span>
        </h5>
        <button className="btn btn-danger w-100 mt-2">Tiếp tục</button>
      </div>
    </div>
  );
};

export default CheckOut;