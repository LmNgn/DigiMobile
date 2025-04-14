import { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/cartContext";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getList } from "../providers";
import axios from "axios";
import { Spinner } from "react-bootstrap"; // Import Spinner
import { Order } from "../../../types/Order";
import { OrderStatus } from "../../../types/Order";

const OrderInfo = () => {
  const [selected, setSelected] = useState("offline");
  const [shippingMethod, setShippingMethod] = useState("store");
  const [selectedStore, setSelectedStore] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const paymentMethods = [
    {
      id: "vnpay",
      name: "Thanh toán qua VNPAY",
      logo: "/src/assets/vnpay.png",
    },
    {
      id: "momo",
      name: "Thanh toán qua MoMo",
      logo: "/src/assets/momo.png",
    },
    {
      id: "offline",
      name: "Thanh toán khi nhận hàng",
      logo: "/src/assets/money.png",
    },
  ];

  const { state: { carts }, dispatch } = useCart();
  const { user } = useUser();
  const nav = useNavigate();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => getList({ resource: "products" }),
  });

  const enrichedCarts = carts
    .map((item) => {
      const product = products.find((p: any) => p.id === item.productId);
      return { ...item, product };
    })
    .filter((item) => item.product);

  const total = useMemo(() => {
    return enrichedCarts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [enrichedCarts]);

  const shippingFee = shippingMethod === "home" ? 30000 : 0;
  const finalTotal = total + shippingFee;

  // Function to create order in the database
  const createOrder = async (order: Order): Promise<Order> => {
    try {
      setLoading(true); // Set loading to true when the request starts
      const response = await axios.post('http://localhost:3000/orders', order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Tạo đơn hàng thất bại. Vui lòng thử lại sau.');
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const { mutate } = useMutation<Order, Error, Order>({
    mutationFn: createOrder,
    onSuccess: () => {
      dispatch({ type: "CLEAR_CART" }); // Clear the cart after a successful order
      nav("/checkout");
    },
    onError: (error) => {
      console.log("Error creating order: " + error.message);
    },
  });

  const handleCheckout = () => {
    // Create the order object
    const order: Order = {
      id: Date.now(), // Or use any other logic for unique ID
      userId: user?.id || 0,
      date: new Date(),
      status: OrderStatus.PENDING,
      address: shippingMethod === "store" ? selectedStore : deliveryAddress,
      paymentMethod: selected,
    };

    // Send the order to the database
    mutate(order);
  };

  return (
    <div className="container mt-4">
      <h4 className="fw-bold">Thông tin đơn hàng</h4>

      {enrichedCarts.map((item) => (
        <div key={item.id} className="card p-3 mb-3">
          <div className="d-flex">
            <img
              src={item.product.imageUrl || "https://via.placeholder.com/100"}
              alt="Product"
              className="me-3"
              width={100}
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
            <select
              className="form-select"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="">Chọn địa chỉ cửa hàng</option>
              <option value="Trịnh Văn Bô">Trịnh Văn Bô</option>
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              placeholder="Nhập địa chỉ giao hàng"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          )}
        </div>
      </div>

      <h5>Phương thức thanh toán</h5>
      <div className="list-group shadow-sm rounded-3 overflow-hidden mb-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`list-group-item d-flex align-items-center py-3 px-4 border-0 ${selected === method.id ? "bg-primary text-white" : "bg-light"
              }`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelected(method.id)}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              className="form-check-input me-3"
            />
            <img
              src={method.logo}
              alt={method.name}
              className="me-3"
              width="32"
              height="32"
            />
            <span>{method.name}</span>
          </label>
        ))}
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
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Tiếp tục"}
        </button>
      </div>
    </div>
  );
};

export default OrderInfo;
