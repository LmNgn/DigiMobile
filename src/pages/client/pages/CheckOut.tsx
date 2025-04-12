import { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useUser } from "../context/userContext";

const CheckOut = () => {
  const [selected, setSelected] = useState("offline");
  const {
    state: { carts },
  } = useCart();
  const { user } = useUser();
  const nav = useNavigate();
  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    const savedFee = parseInt(localStorage.getItem("shippingFee") || "0", 10);
    setShippingFee(savedFee);
  }, []);

  const total = useMemo(() => {
    return carts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [carts]);

  const finalTotal = total + shippingFee;

  const paymentMethods = [
    {
      id: "vnpay",
      name: "Thanh toán qua VNPAY",
      logo: "/src/assets/vnpay.png",
    },
    { id: "momo", name: "Thanh toán qua MoMo", logo: "/src/assets/momo.png" },
    {
      id: "offline",
      name: "Thanh toán khi nhận hàng",
      logo: "/src/assets/money.png",
    },
  ];

  const handleReturn = () => {
    localStorage.removeItem("shippingFee");
    localStorage.removeItem("shippingMethod");
    nav("/info");
  };

  return (
    <div className="container mt-4">
      <h4 className="fw-bold">Thanh toán</h4>
      <div className="progress mb-3">
        <div className="progress-bar bg-secondary w-50">1. THÔNG TIN</div>
        <div className="progress-bar w-50">2. THANH TOÁN</div>
      </div>

      {carts.map((item) => (
        <div key={item.id} className="card p-3 mb-3">
          <div className="d-flex">
            <img
              src={item.product.imageUrl}
              alt="Product"
              className="me-3"
              width={80}
            />
            <div>
              <h5>{item.product.name}</h5>
              <p className="text-danger fw-bold">
                {item.product.price.toLocaleString()}đ
              </p>
              <p>Số lượng: {item.quantity}</p>
            </div>
          </div>
        </div>
      ))}

      <h5>Thông tin khách hàng</h5>
      <div className="card p-3 mb-3">
        <p className="fw-bold">{user?.email?.split("@")[0]}</p>
        <p>Email: {user?.email}</p>
        <p>Số điện thoại: {user?.phone || "Chưa có"}</p>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="subscribe" />
          <label className="form-check-label" htmlFor="subscribe">
            Nhận email thông báo và ưu đãi
          </label>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="mb-3 fw-bold text-center">
          Chọn phương thức thanh toán
        </h2>
        <div className="list-group shadow-lg rounded-3 overflow-hidden">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`list-group-item d-flex align-items-center py-3 px-4 border-0 ${
                selected === method.id ? "bg-primary text-white" : "bg-light"
              }`}
              style={{
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                borderRadius: "8px",
                boxShadow:
                  selected === method.id
                    ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                    : "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  selected === method.id ? "#0b5ed7" : "#e9ecef")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  selected === method.id ? "#0d6efd" : "#f8f9fa")
              }
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
              <img
                src={method.logo}
                alt={method.name}
                className="me-3"
                width="32"
                height="32"
              />
              <span className="fw-medium flex-grow-1">{method.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="card p-3 mt-3">
        <div className="d-flex justify-content-between mb-2">
          <span>Tạm tính:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Phí vận chuyển:</span>
          <span>{shippingFee.toLocaleString()}đ</span>
        </div>
        <hr />
        <h5 className="d-flex justify-content-between">
          <span>Tổng cộng:</span>
          <span className="text-danger">{finalTotal.toLocaleString()}đ</span>
        </h5>
        <button className="btn btn-warning w-100 mt-2">Tiếp tục</button>
        <button onClick={handleReturn} className="btn btn-danger w-100 mt-2">
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
