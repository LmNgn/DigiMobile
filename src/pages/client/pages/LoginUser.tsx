import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import "bootstrap/dist/css/bootstrap.min.css";

type LoginInput = {
    email: string;
    password: string;
};

function LoginUser() {
    const { register, handleSubmit } = useForm<LoginInput>();
    const nav = useNavigate();

    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/login", data);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.accessToken);
                toast.success("Đăng nhập thành công");
                nav("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="p-5 shadow-lg rounded-4 bg-white" style={{ width: "600px" }}>
          <div className="text-center mb-4">
              <img src="/src/assets/logo.png" alt="Logo" width="80" className="mb-3" />
              <h4 className="fw-bold text-primary">Đăng nhập</h4>
          </div>

          {/* Đăng nhập bằng MXH */}
          <div className="d-flex justify-content-center gap-3 mb-4">
              <button className="btn btn-outline-dark d-flex align-items-center px-4 py-2 rounded-3 w-50">
                  <FaGoogle className="me-2" /> Google
              </button>
              <button className="btn btn-outline-primary d-flex align-items-center px-4 py-2 rounded-3 w-50">
                  <SiZalo className="me-2" /> Zalo
              </button>
          </div>

          <div className="text-center text-muted my-3">Hoặc đăng nhập bằng Tài Khoản</div>

          {/* Form đăng nhập */}
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                  <input
                      type="email"
                      className="form-control py-3 rounded-3"
                      placeholder="Nhập email hoặc số điện thoại"
                      {...register("email")}
                  />
              </div>
              <div className="mb-3">
                  <input
                      type="password"
                      className="form-control py-3 rounded-3"
                      placeholder="Nhập mật khẩu"
                      {...register("password")}
                  />
              </div>
              <div className="text-end mb-3">
                  <a href="#" className="text-decoration-none text-muted small">Quên mật khẩu?</a>
              </div>
              <button className="btn rounded-pill btn-danger w-100 py-3 rounded-3 fw-bold" type="submit">
                  Đăng nhập
              </button>
          </form>

          <div className="text-center mt-4">
            <p className="small">
              Bạn chưa có tài khoản? <a href="/client/register" className="text-danger fw-bold" onClick={() => nav("/register")}>Đăng ký ngay</a>
            </p>
            <a href="#" className="text-danger fw-bold small">Xem chính sách ưu đãi</a>
          </div>
      </div>
  </div>
    );
}

export default LoginUser;