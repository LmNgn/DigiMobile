import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
type LoginInput = {
    email: string,
    password: string,
}

function Login() {
    const {
        register,
        handleSubmit
    } = useForm<LoginInput>({});
    const nav = useNavigate();
    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/login', data);
            if (response.status == 200) { 
                localStorage.setItem('token', response.data.accessToken);
                toast.success('Đăng nhập thành công');
                nav("/admin");
            }
        } catch (error) {
            console.log(error);
            toast.error('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.')
        }
    }

    return (
        <div
            className="d-flex align-items-center py-4 bg-body-tertiary"
            style={{ height: "100vh" }}
        >
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="h3 mb-3 fw-normal">Đăng nhập</h1>
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            {
                            ...register('email')
                            }
                        />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Nhập mật khẩu"
                            {
                            ...register('password')
                            }
                        />
                        <label htmlFor="floatingPassword">Mật khẩu</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">
                        Đăng nhập
                    </button>
                </form>
                <div className="mt-2">
                    <Link to="/register" className="text-decoration-none fw-normal">Chưa có tài khoản. Đăng ký ngay.</Link>
                </div>
            </main>
        </div>
    )
}

export default Login