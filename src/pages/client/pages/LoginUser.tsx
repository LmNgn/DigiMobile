import { useForm, SubmitHandler } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks"; 

type LoginInput = {
  email: string;
  password: string;
};

function LoginUser() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const { mutate: login } = useAuth({ resource: "login" }); 

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    login(data);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="p-5 shadow-lg rounded-4 bg-white" style={{ width: "600px" }}>
        <div className="text-center mb-4">
          <img src="/src/assets/logo.png" alt="Logo" width="80" className="mb-3" />
          <h4 className="fw-bold text-primary">Đăng nhập</h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control py-3 rounded-3"
              placeholder="Nhập email hoặc số điện thoại"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control py-3 rounded-3"
              placeholder="Nhập mật khẩu"
              {...register("password", { required: true })}
            />
          </div>
          <div className="text-end mb-3">
            <a href="#" className="text-decoration-none text-muted small">Quên mật khẩu?</a>
          </div>
          <button className="btn rounded-pill btn-danger w-100 py-3 fw-bold" type="submit">
            Đăng nhập
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="small">
            Bạn chưa có tài khoản?{" "}
            <a href="/register" className="text-danger fw-bold">Đăng ký ngay</a>
          </p>
          <a href="#" className="text-danger fw-bold small">Xem chính sách ưu đãi</a>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
