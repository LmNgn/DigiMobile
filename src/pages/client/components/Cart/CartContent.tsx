import { useMemo } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useCart } from "../../context/cartContext";
import { useQuery } from "@tanstack/react-query";
import { getList } from "../../providers";
import "bootstrap/dist/css/bootstrap.min.css";

const CartContent = () => {
  const {
    state: { carts },
    updateQuantity,
  } = useCart();

  // Lấy toàn bộ danh sách sản phẩm
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => getList({ resource: "products" }),
  });

  // Kết hợp cart + product (join)
  const cartItems = useMemo(() => {
    return carts.map((item) => {
      const product = products.find((p:any) => p.id === item.productId);
      return { ...item, product };
    });
  }, [carts, products]);

  const total = useMemo(() => {
    return cartItems.reduce((sum: number, item: any) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <div className="container">
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Giỏ hàng trống</p>
      ) : (
        <>
          {cartItems.map((item: any) => {
            const product = item.product;
            if (!product) return null;

            const imageUrl =
              product.images?.[0]?.url || product.imageUrl || "https://via.placeholder.com/80";

            return (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-start border-bottom py-3"
              >
                {/* Hình ảnh + Tên + Điều chỉnh SL */}
                <div className="d-flex align-items-start">
                  <img
                    src={imageUrl}
                    className="img-thumbnail me-3"
                    alt={product.name}
                    width="80"
                    height="100"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="fw-semibold">{product.name}</h6>
                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Giá + nút xoá */}
                <div className="text-end">
                  <p className="fw-bold text-danger mb-2">
                    ₫ {product.price.toLocaleString()}
                  </p>
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => updateQuantity(item.id, 0)}
                    title="Xoá sản phẩm"
                  >
                    <RiDeleteBin3Line size={20} />
                  </button>
                </div>
              </div>
            );
          })}

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
