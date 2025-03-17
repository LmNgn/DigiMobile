import axios from "axios";
import { Role, UserAuth } from "../../../../types/User";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function List() {
  const nav = useNavigate();

  const [user, setUser] = useState<UserAuth[]>([]);
  const getList = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      const filteredUsers = data.filter(
        (user: UserAuth) => user.role === Role.USER
      );
      setUser(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      if (window.confirm("Xác nhận xóa tài khoản?")) {
        const response = await axios.delete(
          `http://localhost:3000/users/${id}`
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
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách tài khoản khách hàng</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {user.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                {u.status ? (
                  <span className="badge text-bg-success">Hoạt động</span>
                ) : (
                  <span className="badge text-bg-secondary">Đình chỉ</span>
                )}
              </td>
              <td>
                <Link
                  className="btn btn-outline-primary"
                  to={`/admin/product/detail/${u.id}`}
                >
                  <i className="fas fa-info-circle" />
                </Link>
                <Link
                  className="btn btn-outline-warning"
                  to={"/admin/product/update/" + u.id}
                >
                  <i className="fa-solid fa-gear" />
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteUser(u.id)}
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
