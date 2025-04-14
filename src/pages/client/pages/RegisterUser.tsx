import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterInput = {
    name: string;
    phone: string;
    email: string;
    password: string;
    repassword: string;
    terms: boolean;
};

function RegisterUser() {
    const { register, handleSubmit, watch } = useForm<RegisterInput>();
    const nav = useNavigate();
    const password = watch("password");

    const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
        if (!data.terms) {
            toast.error("Bạn cần đồng ý với các điều khoản để tiếp tục.");
            return;
        }
        if (!emailRegex.test(data.email)) {
            toast.error("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
            return;
        }
        if (data.password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }
        if (data.password !== data.repassword) {
            toast.error("Mật khẩu nhập lại không khớp.");
            return;
        }
        const userData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            role: "customer",
            status: true      
        };

        try {
            const response = await axios.post("http://localhost:3000/register", userData);
            if (response.status === 201) {
                toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
                nav("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="p-5 shadow-lg rounded-4 bg-white" style={{ width: "600px" }}>
                <div className="text-center mb-4">
                    <img src="/src/assets/logo.png" alt="Logo" width="80" className="mb-3" />
                    <h4 className="fw-bold text-primary">Đăng ký</h4>
                </div>

                {/* Form đăng nhập */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control py-3 rounded-3"
                            placeholder="Nhập họ và tên"
                            {...register("name")}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="tel"
                            className="form-control py-3 rounded-3"
                            placeholder="Nhập số điện thoại"
                            {...register("phone")}
                        />
                    </div>
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
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control py-3 rounded-3"
                            placeholder="Nhập lại mật khẩu"
                            {...register("repassword")}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="terms"
                            {...register("terms")}
                        />
                        <label className="form-check-label small" htmlFor="terms">
                            Tôi đồng ý với <a href="#" className="text-danger fw-bold">các điều khoản</a>
                        </label>
                    </div>
                    <button className="btn rounded-pill btn-danger w-100 py-3 rounded-3 fw-bold" type="submit">
                        Đăng ký
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="small">
                        Bạn đã có tài khoản? <a href="/client/login" className="text-danger fw-bold" onClick={() => nav("/login")}>Đăng nhập ngay</a>
                    </p>
                    <a href="#" className="text-danger fw-bold small">Xem chính sách ưu đãi</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterUser;