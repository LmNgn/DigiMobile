import axios from "axios";
import { Customers } from "../../../../types/Customers";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
function List() {
  const nav = useNavigate();

  const [user, setUser] = useState<Customers[]>([]);
  const getList = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
     
      setUser(data);
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
          message.success("Xóa thành công");
          getList();
        }
      }
    } catch (error) {
      console.log(error);
      message.error("Xóa thất bại.");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Bạn chưa đăng nhập!");
      nav("/admin/login");
    } else {
      getList();
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách tài khoản khách hàng</h1>
        <div className="btn-toolbar mb-2 mb-md-0"></div>
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
                  className="mx-2 btn btn-outline-primary"
                  to={`/admin/account/customers/detail/${u.id}`}
                >
                  <i className="fas fa-info-circle" />
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
