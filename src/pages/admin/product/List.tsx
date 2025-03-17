import axios from "axios";
import { Product } from "../../../types/Product";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function List() {
  const nav = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const getList = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const delPro = async (id: number) => {
    try {
      if (window.confirm("Xác nhận xóa sản phẩm?")) {
        const response = await axios.delete(
          `http://localhost:3000/products/${id}`
        );
        if (response.status == 200) {
          toast.success("Xóa thành công");
          getList();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa thất bại.");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      nav("/admin/login");
    } else {
      getList();
    }
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách sản phẩm</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/admin/product/add" className="btn btn-outline-primary">
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
            <th>Ảnh</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <img src={p.imageUrl} alt={p.name} width={50} />
              </td>
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
                  to={`/admin/product/detail/${p.id}`}
                >
                  <i className="fas fa-info-circle" />
                </Link>
                <Link
                  className="btn btn-outline-warning"
                  to={"/admin/product/update/" + p.id}
                >
                  <i className="fa-solid fa-gear" />
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => delPro(p.id)}
                >
                  <i className="fas fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
