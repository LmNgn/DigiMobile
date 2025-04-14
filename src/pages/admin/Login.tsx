import { useForm } from "react-hook-form";
import { useLogin } from "./hooks/useLogin";
import { LoginForm } from "./providers/dataProvider";
import './styles/login.css'
type LoginInput = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const { mutate } = useLogin({ resource: "login" });

  function onFinish(values: LoginForm) {
    mutate(values);
  }

  return (
    <div className="login-wrapper">
      <div className="login-card shadow-lg">
        <div className="login-header mb-4 text-center">
          <img
            src="/logo.svg"
            alt="Digimobile"
            className="mb-3"
            width={60}
            height={60}
          />
          <h2 className="text-primary fw-bold">Đăng nhập quản trị</h2>
          <p className="text-muted">Hệ thống quản lý Digimobile</p>
        </div>

        <form onSubmit={handleSubmit(onFinish)} className="login-form">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              {...register("email", { required: "Không được để trống email" })}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Nhập mật khẩu"
              {...register("password", {
                required: "Không được để trống mật khẩu",
              })}
            />
            <label htmlFor="floatingPassword">Mật khẩu</label>
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-bold"
            type="submit"
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center mt-4 text-muted" style={{ fontSize: "0.9rem" }}>
          &copy; {new Date().getFullYear()} Digimobile Admin
        </div>
      </div>
    </div>
  );
}

export default Login;
