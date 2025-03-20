import axios from "axios";
import { Order, OrderStatus } from "../../../types/Order";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function List() {

  const getAllOrder = async () => {
    const { data } = await axios.get("http://localhost:3000/orders");
    return data;
  };
  const { data } = useQuery({
    queryKey: ["order"],
    queryFn: getAllOrder,
  });

  const statusBadgeMap = {
    [OrderStatus.Pending]: {
      label: "Đang chờ xử lý",
      className: "badge text-bg-warning",
    },
    [OrderStatus.Confirmed]: {
      label: "Đã xác nhận",
      className: "badge text-bg-info",
    },
    [OrderStatus.Shipped]: {
      label: "Đã vận chuyển",
      className: "badge text-bg-primary",
    },
    [OrderStatus.Delivered]: {
      label: "Đã giao hàng",
      className: "badge text-bg-success",
    },
    [OrderStatus.Cancelled]: {
      label: "Đã hủy",
      className: "badge text-bg-danger",
    },
    [OrderStatus.Returned]: {
      label: "Trả hàng",
      className: "badge text-bg-secondary",
    },
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-md-nowrap flex-wrap align-items-center border-bottom justify-content-between mb-3 pb-2 pt-3">
        <h1 className="h2">Danh sách đơn hàng</h1>
        <div className="btn-toolbar mb-2 mb-md-0"></div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn hàng</th>
            <th>Tổng tiền</th>
            <th>Ngày đặt</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((o: Order, index: number) => {
            const badge = statusBadgeMap[o.status];
            return (
              <tr key={o.id}>
                <td>{index + 1}</td>
                <td>{o.id}</td>
                <td>{o.totalPrice}</td>
                <td>{o.orderDate}</td>
                <td>
                  {badge ? (
                    <span className={badge.className}>{badge.label}</span>
                  ) : (
                    <span className="badge text-bg-secondary">
                      Không xác định
                    </span>
                  )}
                </td>
                <td>
                  <Link
                    className="btn btn-outline-primary me-1"
                    to={`/admin/order/detail/${o.id}`}
                  >
                    <i className="fa-info-circle fas" />
                  </Link>
                  <Link
                    className="btn btn-outline-warning"
                    to={`/admin/order/update/${o.id}`}
                  >
                    <i className="fa-gear fa-solid" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
