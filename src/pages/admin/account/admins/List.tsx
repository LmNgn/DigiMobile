import { useForm } from "react-hook-form";
import { useList } from "../../hooks/useList";
import { Admin } from "../../../../types/Admin";
import { useDelete } from "../../hooks/useDelete";
import { Popconfirm } from "antd";
import { useUpdate } from "../../hooks/useUpdate";
import { AdminForm } from "../../providers/dataProvider";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Role } from "../../../../types/Admin";
import { useRegister } from "../../hooks/useRegister";
import { useEffect } from "react";
function List() {
  const keyResource = "users";
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminForm>();
  // lấy danh sách tài khoản
  const { data: adminList, refetch } = useList({ resource: `${keyResource}` });
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}"); // Lấy thông tin user đang đăng nhập

  const filteredAdmins = adminList?.filter(
    (admin: AdminForm) => admin.role && admin.role.startsWith("admin") && admin.email !== currentUser.email
  );

  //reset mật khẩu
  const { mutate: resetPassword } = useUpdate({ resource: `${keyResource}` });
  const onReset = (id: number) => {

    const newPassword = "123123";

    resetPassword(
      { id, values: { password: newPassword } }
    );
  };

  //xóa tài khoản
  const { mutate: deleteOne } = useDelete({ resource: `${keyResource}` });
  //thêm tài khoản mới
  const { mutate: addOne } = useRegister({ resource: "register" });
  const onAdd = (values: any) => {
    const isExist = adminList?.some((p: AdminForm) => p.email.toLowerCase() === values.email.toLowerCase());

    if (isExist) {
      message.error("Tài khoản đã tồn tại!");
      return;
    }
    if (window.confirm("Thêm tài khoản mới?")) {
      const newValue = { ...values, password: "123123", status: true, role: Role.ADMIN1 };
      addOne(newValue);
      reset();
    }
  };
  refetch();
  useEffect(() => {
    if (currentUser.role !== "admin0") {
      nav("/admin");
    }
  })
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Danh sách tài khoản quản trị viên</h1>
        <div className="btn-toolbar mb-2 mb-md-0"></div>
      </div>
      <form className="col-md-12" onSubmit={handleSubmit(onAdd)} >
        <div className="mb-3 row">
          <div className="col-sm-12">
            <h5>Thêm tài khoản</h5>
          </div>
          <div className="col-sm-12">
            <input
              placeholder="Email"
              type="email"
              className="form-control"
              id="email"
              {...register("email", { required: "Vui lòng không bỏ trống." })}
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
          {filteredAdmins?.map((a: Admin, index: number) => (
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
                  to={`/admin/admins/update/${a.id}`}
                >
                  <i className="fa-solid fa-circle-info" />
                </Link>
                <Popconfirm
                  title="Reset mật khẩu"
                  description="Xác nhận reset mật khẩu?"
                  onConfirm={() => onReset(a.id)}
                  okText="Xác nhận"
                  cancelText="Hủy">
                  <button
                    className="mx-2 btn btn-outline-warning">
                    <i className="fa-solid fa-rotate-right" />
                  </button>
                </Popconfirm>


                <Popconfirm
                  title="Xóa tài khoản"
                  description="Xác nhận xóa tài khoản?"
                  onConfirm={() => deleteOne(a.id)}
                  okText="Xác nhận"
                  cancelText="Hủy">
                  <button
                    className="btn btn-outline-danger">
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
