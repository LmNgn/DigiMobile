
import { useState } from "react";
import { Product } from "../../../types/Product";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { useDelete } from "../hooks/useDelete";
import { useList } from "../hooks/useList";

function List() {
  const { data } = useList({ resource: "products" });
  const { mutate } = useDelete({ resource: "products" });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredData = data?.filter((p: Product) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(data?.map((p: Product) => p.category)));

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách sản phẩm</h1>
        <div className="btn-toolbar mb-2 mb-md-0 d-flex align-items-center gap-3">
          {/* Nút thêm */}
          <Link to="/admin/products/add" className="btn btn-outline-primary">
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {uniqueCategories.map((cat:any) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>


      {/* Bảng sản phẩm */}
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
          {filteredData?.map((p: Product, index: number) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()}₫</td>
              <td>{p.category}</td>
              <td>
                {p.inStock ? (
                  <span className="badge text-bg-primary">Còn hàng</span>
                ) : (
                  <span className="badge text-bg-secondary">Hết hàng</span>
                )}
              </td>
              <td>
                <Link className="btn btn-outline-primary" to={`/admin/products/detail/${p.id}`}>
                  <i className="fas fa-info-circle" />
                </Link>
                <Link className="btn btn-outline-warning mx-2" to={`/admin/products/update/${p.id}`}>
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
