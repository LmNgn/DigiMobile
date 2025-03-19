import axios from "axios";
import { Role, UserAuth } from "../../../../types/User";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
type addInput = {
  email: string;
};
function List() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addInput>();
  const [user, setUser] = useState<UserAuth[]>([]);
// lấy danh sách tài khoản
  const getList = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      const filteredUsers = data.filter(
        (user: UserAuth) => user.role === Role.ADMIN1
      );
      setUser(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };
  //reset mật khẩu
  const resetPassword = async (id: number) => {
    try {
      if (window.confirm("Reset mật khẩu của tài khoản này?")) {
        const response = await axios.patch(
          `http://localhost:3000/users/${id}`,
          {
            password: "DigiMobile0641#$",
          }
        );
        if (response.status === 200) {
          toast.success("Reset thành công");
          getList();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Reset thất bại.");
    }
  };

  //xóa tài khoản
  const deleteAdmin = async (id: number) => {
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

//thêm tài khoản mới
  const onSubmit: SubmitHandler<addInput> = async (data) => {
    try {
      if (window.confirm("Xác nhận thêm tài khoản?")) {
        const newAdmin = {
          email: data.email,
          password: "DigiMobile0641#$",
          role: "admin1",
          status: true,
        };
        await axios.post(`http://localhost:3000/users`, newAdmin);
        toast.success("Thêm tài khoản thành công.");
        getList();
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm tài khoản thất bại.");
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
        <h1 className="h2">Danh sách tài khoản quản trị viên</h1>
        <div className="btn-toolbar mb-2 mb-md-0"></div>
      </div>
      <form className="col-md-12 " onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 row">
          <div className="col-sm-12">
            <h5>Thêm tài khoản</h5>
          </div>
          <div className="col-sm-12">
            <input
              placeholder="Email"
              type="text"
              className="form-control"
              id="email"
              {...register("email", { required: "Không bỏ trống tên" })}
            />
            {errors.email && (
              <div className="invalid-feedback d-block">
                {errors.email.message}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </div>
        </div>
      </form>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {user.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.email}</td>
              <td>
                {a.status ? (
                  <span className="badge text-bg-success">Hoạt động</span>
                ) : (
                  <span className="badge text-bg-secondary">Đình chỉ</span>
                )}
              </td>
              <td>
                <Link
                  className="btn btn-outline-primary"
                  to={"/admin/account/admin/update/" + a.id}
                >
                  <i className="fa-solid fa-circle-info" />
                </Link>
                <button
                  className="btn btn-outline-warning mx-1"
                  onClick={() => resetPassword(a.id)}
                >
                  <i className="fa-solid fa-rotate-right" />
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteAdmin(a.id)}
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
