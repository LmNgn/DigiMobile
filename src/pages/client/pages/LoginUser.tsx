import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogin } from "../../admin/hooks/useLogin";
import { LoginForm } from "../../admin/providers/dataProvider";
import { Link } from "react-router-dom";
type LoginInput = {
    email: string;
    password: string;
};

function LoginUser() {
    const {
        register,
        handleSubmit
    } = useForm<LoginInput>({});
    const { mutate } = useLogin({ resource: "login" });

    function onFinish(values: LoginForm) {
        mutate(values);
    }
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
                <form onSubmit={handleSubmit(onFinish)}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control py-3 rounded-3"
                            placeholder="Nhập email"
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
                        Bạn chưa có tài khoản? <Link to="/client/register" className="text-danger fw-bold">Đăng ký ngay</Link>
                    </p>
                    <a href="#" className="text-danger fw-bold small">Xem chính sách ưu đãi</a>
                </div>
            </div>
        </div>
    );
}

export default LoginUser;