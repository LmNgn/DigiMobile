import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { Cart } from "../../../types/Cart";
import { message } from "antd";

const MyOrders = () => {
  const { state, updateQuantity } = useCart();
  const cartItems = state.carts as Cart[];

  const navigate = useNavigate();

  const handleQuantityChange = (id: number, change: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      // Nếu giảm xuống 0 thì tự xoá sản phẩm
      updateQuantity(id, 0);
      message.info("Đã xoá sản phẩm khỏi giỏ hàng.");
      return;
    }

    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    updateQuantity(id, 0);
    message.success("Đã xoá sản phẩm.");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    navigate("/client/checkout");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p className="text-muted text-center">Giỏ hàng hiện đang trống.</p>
      ) : (
        <>
          <div className="list-group shadow-sm">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex align-items-center"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="me-3 rounded"
                  width="80"
                />
                <div className="flex-grow-1">
                  <h5>{item.product.name}</h5>
                  <p className="text-danger fw-bold">
                    {item.product.price.toLocaleString()}đ
                  </p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(item.id!, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(item.id!, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Nút xoá */}
                <button
                  className="btn btn-outline-danger btn-sm ms-3"
                  onClick={() => handleRemoveItem(item.id!)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4 className="fw-bold">Tạm tính: {totalPrice.toLocaleString()}đ</h4>
            <button className="btn btn-danger btn-lg" onClick={handleCheckout}>
              Mua ngay ({cartItems.length})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
