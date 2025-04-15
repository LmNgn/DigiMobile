
import { Product } from "../../../types/Product";
import { Link } from "react-router-dom";
import { useList } from "../hooks/useList";

function List() {
  const { data } = useList({ resource: "orders" });


  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách đơn hàng</h1>
      </div>


      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Tổng giá</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p: any, index: number) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.totalAmount} ₫</td>
              <td>{p.status}</td>
              <td>
                <Link className="btn btn-outline-primary" to={`/admin/orders/detail/${p.id}`}>
                  <i className="fas fa-info-circle" />
                </Link>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
