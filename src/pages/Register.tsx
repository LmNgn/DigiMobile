import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
type RegisterInput = {
    email: string,
    password: string,
    confirmPassword: string
}

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterInput>();

    const nav = useNavigate();
    const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
        try {
            await axios.post(`http://localhost:3000/users`, data);
            toast.success('Đăng ký thành công');
            nav("/login");
        } catch (error) {
            console.log(error);
            toast.error('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
        }
    }

    return (
        <div
            className="d-flex align-items-center py-4 bg-body-tertiary"
            style={{ height: "100vh" }}
        >
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="h3 mb-3 fw-normal">Đăng ký</h1>
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            {
                            ...register('email', { required: "Không bỏ trống email" })
                            }
                        />
                        <label htmlFor="floatingInput">Email</label>
                        {errors.email && (
                            <div className="invalid-feedback d-block">{errors.email.message}</div>
                        )}
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Nhập mật khẩu"
                            {
                            ...register('password', {
                                required: "Không bỏ trống mật khẩu",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu tối thiểu 6 ký tự",
                                },
                            })
                            }
                        />
                        <label htmlFor="floatingPassword">Mật khẩu</label>
                        {errors.password && (
                            <div className="invalid-feedback d-block">{errors.password.message}</div>
                        )}
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingConfirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            {
                            ...register('confirmPassword', {
                                required: "Không bỏ trống xác nhận mật khẩu",
                                validate: () => {
                                    return (
                                        watch('password') === watch('confirmPassword') ||
                                        "Mật khẩu không khớp"
                                    );
                                },
                            })
                            }
                        />
                        <label htmlFor="floatingConfirmPassword">Xác nhận mật khẩu</label>
                        {errors.confirmPassword && (
                            <div className="invalid-feedback d-block">{errors.confirmPassword.message}</div>
                        )}
                    </div>
                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">
                        Đăng ký
                    </button>
                </form>
                <div className="mt-2">
                    <Link to="/login" className="text-decoration-none text-primary fw-normal">Đã có tài khoản. Đăng nhập.</Link>
                </div>
            </main>
        </div>
    )
}

export default Register