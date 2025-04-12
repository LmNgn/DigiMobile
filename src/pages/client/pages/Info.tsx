import { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/cartContext";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const OrderInfo = () => {
  const [shippingMethod, setShippingMethod] = useState("store");
  const {
    state: { carts },
  } = useCart();
  const { user } = useUser();
  const nav = useNavigate();
  const total = useMemo(() => {
    return carts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [carts]);

  const shippingFee = shippingMethod === "home" ? 30000 : 0;
  const finalTotal = total + shippingFee;
  const handleCheckout = () => {
    localStorage.setItem("shippingMethod", shippingMethod); // lưu lại lựa chọn
    localStorage.setItem(
      "shippingFee",
      shippingMethod === "home" ? "30000" : "0"
    ); // lưu phí ship
    nav("/checkout");
  };
  
  
  return (
    <div className="container mt-4">
      <h4 className="fw-bold">Thông tin</h4>
      <div className="progress mb-3">
        <div className="progress-bar w-50">1. THÔNG TIN</div>
        <div className="progress-bar bg-secondary w-50">2. THANH TOÁN</div>
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

      <h5>Thông tin nhận hàng</h5>
      <div className="card p-3 mb-3">
        <div className="d-flex">
          <div className="form-check me-3">
            <input
              type="radio"
              id="store"
              name="shipping"
              className="form-check-input"
              checked={shippingMethod === "store"}
              onChange={() => setShippingMethod("store")}
            />
            <label className="form-check-label" htmlFor="store">
              Nhận tại cửa hàng
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="home"
              name="shipping"
              className="form-check-input"
              checked={shippingMethod === "home"}
              onChange={() => setShippingMethod("home")}
            />
            <label className="form-check-label" htmlFor="home">
              Giao hàng tận nơi
            </label>
          </div>
        </div>
        <div className="mt-3">
          <select className="form-select mb-2">
            <option>Chọn tỉnh/thành phố</option>
            <option>Hà Nội</option>
            <option>Hồ Chí Minh</option>
          </select>
          {shippingMethod === "store" ? (
            <select className="form-select">
              <option>Chọn địa chỉ cửa hàng</option>
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              placeholder="Nhập địa chỉ giao hàng"
            />
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
        <button
          className="btn btn-warning w-100 mt-3"
          onClick={() => handleCheckout()}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default OrderInfo;
