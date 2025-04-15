import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOne } from "../hooks/useOne";
import { OrderStatus } from "../../../types/Order";

const UpdateOrder = () => {
  const { id } = useParams();
  const { data: order } = useOne({ resource: "orders", id });

  const [products, setProducts] = useState<any[]>([]);

  // Lấy thông tin người dùng
  const userId = order?.userId;
  const { data: user } = useOne(
    userId ? { resource: "users", id: userId } : { resource: "users", id: "" }
  );

  // Lấy thông tin nhiều sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      if (order?.items?.length) {
        const productPromises = order.items.map((item: any) =>
          useOne({ resource: "products", id: item.productId }).data
        );

        const result = await Promise.all(productPromises);
        setProducts(result);
      }
    };

    fetchProducts();
  }, [order]);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    if (order) {
      reset({
        status: order.status,
      });
    }
  }, [order, reset]);

  const onFinish = (values: any) => {
    console.log("Cập nhật:", values);
    // mutate(values);
  };

  const orderStatusOptions = Object.entries(OrderStatus);

  const totalAmount = order?.items?.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container-fluid">
      {/* Tiêu đề */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Thông tin đơn hàng</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/admin/orders" className="btn btn-outline-primary">
              Quay lại
            </Link>
          </div>
        </div>
      </div>

      {/* Thông tin cơ bản */}
      <div className="m-auto mb-3 row col-md-8">
        <h5 className="text-center mb-3">Thông tin cơ bản</h5>
        <table className="table">
          <tbody>
            <tr>
              <th>Tên khách hàng:</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th>Điện thoại:</th>
              <td>{user?.phone}</td>
            </tr>
            <tr>
              <th>Địa chỉ:</th>
              <td>{order?.address}</td>
            </tr>
            <tr>
              <th>Ngày đặt hàng:</th>
              <td>{order?.date}</td>
            </tr>
            <tr>
              <th>Phương thức thanh toán:</th>
              <td>{order?.paymentMethod}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Form cập nhật trạng thái */}
      <form className="offset-2 col-md-8" onSubmit={handleSubmit(onFinish)}>
        <h5 className="text-center mb-3">Cập nhật trạng thái</h5>
        <div className="mb-3 row">
          <label htmlFor="status" className="col-sm-2 col-form-label text-end">
            Trạng thái đơn hàng
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              id="status"
              {...register("status")}
            >
              <option value="">-- Chọn trạng thái --</option>
              {orderStatusOptions.map(([key, value]) => (
                <option key={key} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-sm-10 offset-8">
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </div>
      </form>

      {/* Thông tin sản phẩm */}
      <div className="mx-auto mb-3 row col-md-8">
        <h5 className="text-center my-5">Thông tin sản phẩm</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order?.items?.map((item: any, index: number) => {
              const product = products.find(p => p?.id === item.productId);
              return (
                <tr key={index}>
                  <td>{product?.name || "N/A"}</td>
                  <td>{item.quantity}</td>
                  <td>{product?.price?.toLocaleString()} đ</td>
                  <td>
                    {(product?.price * item.quantity)?.toLocaleString()} đ
                  </td>
                </tr>
              );
            })}
            <tr>
              <th colSpan={3} className="text-end">
                Tổng tiền:
              </th>
              <td>{totalAmount?.toLocaleString()} đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateOrder;
