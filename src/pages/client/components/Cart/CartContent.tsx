import { useMemo } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useCart } from "../../context/cartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const CartContent = () => {
  const {
    state: { carts },
    updateQuantity,
  } = useCart();

  const total = useMemo(() => {
    return carts.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    );
  }, [carts]);

  return (
    <div className="container">
      {carts.length === 0 ? (
        <p className="text-center text-muted">Giỏ hàng trống</p>
      ) : (
        <>
          {carts.map((item: any) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-start border-bottom py-3"
            >
              {/* Hình ảnh + Tên + Điều chỉnh SL */}
              <div className="d-flex align-items-start">
                <img
                  src={item.product.imageUrl}
                  className="img-thumbnail me-3"
                  alt={item.product.name}
                  width="80"
                  height="100"
                />
                <div>
                  <h6 className="fw-semibold">{item.product.name}</h6>
                  <div className="d-flex align-items-center mt-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Giá + nút xoá */}
              <div className="text-end">
                <p className="fw-bold text-danger mb-2">
                  ₫ {item.product.price.toLocaleString()}
                </p>
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => updateQuantity(item.id, 0)} // 👈 Gọi context xoá
                >
                  <RiDeleteBin3Line size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Tổng tiền */}
          <div className="text-end mt-4">
            <h5 className="fw-bold">Tổng cộng: ₫ {total.toLocaleString()}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default CartContent;
