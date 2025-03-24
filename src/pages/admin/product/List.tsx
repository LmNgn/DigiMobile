import axios from "axios";
import { Product } from "../../../types/Product";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
function List() {
  const queryClient = useQueryClient();

  //lấy danh sách sản phẩm
  const getList = async () => {
    const { data } = await axios.get(`http://localhost:3000/products`);
    return data;
  }
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getList
  })
  //xoá 1 sản phẩm
  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`http://localhost:3000/products/${id}`);
    },
    onSuccess: () => {
      toast.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Cập nhật danh sách
    },
    onError: () => {
      toast.error("Xóa sản phẩm thất bại");
    },
  });

  //xác nhận xoá
  const handleDelete = (id: number) => {
    if (window.confirm("Xác nhận xóa sản phẩm?")) {
      deleteProduct.mutate(id);
    }
  };
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
          {data?.map((p: Product, index: number) => (
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
                  className="btn btn-outline-warning mx-2"
                  to={"/admin/product/update/" + p.id}
                >
                  <i className="fa-solid fa-gear" />
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(p.id)}
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
