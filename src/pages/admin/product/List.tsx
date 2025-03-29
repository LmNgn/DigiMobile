import { Product } from "../../../types/Product";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { useDelete } from "../hooks/useDelete";
import { useList } from "../hooks/useList";
function List() {
  const { data } = useList({ resource: "products" });
  const { mutate } = useDelete({ resource: "products" });
  // if (isLoading) return <p>Đang tải dữ liệu...</p>;
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách sản phẩm</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/admin/products/add" className="btn btn-outline-primary">
              Thêm sản phẩm
            </Link>
          </div>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p: Product, index: number) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>
                {p.inStock ? (
                  <span className="badge text-bg-primary">Còn hàng</span>
                ) : (
                  <span className="badge text-bg-secondary">Hết hàng</span>
                )}
              </td>
              <td>
                <Link
                  className="btn btn-outline-primary"
                  to={`/admin/products/detail/${p.id}`}
                >
                  <i className="fas fa-info-circle" />
                </Link>
                <Link
                  className="btn btn-outline-warning mx-2"
                  to={`/admin/products/update/${p.id}`}
                >
                  <i className="fa-solid fa-gear" />
                </Link>
                <Popconfirm
                  title="Xóa sản phẩm"
                  description="Xác nhận xóa sản phẩm?"
                  onConfirm={() => mutate(p.id)}
                  okText="Xác nhận"
                  cancelText="Hủy"
                >
                  <button className="btn btn-outline-danger">
                    <i className="fas fa-trash" />
                  </button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
