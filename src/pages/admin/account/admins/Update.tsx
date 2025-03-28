import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useOne } from "../../hooks/useOne";
import { useUpdate } from "../../hooks/useUpdate";
import { AdminForm } from "../../providers/dataProvider";
const UpdateCategory = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { data: admin } = useOne({ resource: "admins", id });
  const { mutate } = useUpdate({ resource: "admins", id });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AdminForm>();

  useEffect(() => {
    if (admin) {
      reset({
        email: admin.email,
        status: admin.status,
      });
    }
  }, [admin]);

  const onFinish = (values: AdminForm) => {
    if (window.confirm("Xác nhận cập nhập thông tin tài khoản?")) {
      mutate(values, {
        onSuccess: () => {
          nav("/admin/admins");
        }
      });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Cập nhật thông tin admin</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to="/admin/admins" className="btn btn-outline-primary">
              Quay lại
            </Link>
          </div>
        </div>
      </div>

      <form className="offset-2 col-md-8" onSubmit={handleSubmit(onFinish)}>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label text-end">
            Tên sản phẩm
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email", { required: "Không bỏ trống email" })}
            />
            {errors.email && (
              <div className="invalid-feedback d-block">
                {errors.email.message}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-2 text-end">Trạng thái</div>
          <div className="col-sm-10">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                {...register("status")}
              />
              <span>{watch("status") ? "Hoạt động" : "Đình chỉ"}</span>
            </div>
          </div>
        </div>
        <div className="row mx-auto">
          <div className="col-sm-10 offset-2">
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
