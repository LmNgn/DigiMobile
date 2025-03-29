import { useForm } from "react-hook-form";
import { useLogin } from "./hooks/useLogin";
import { LoginForm } from "./providers/dataProvider";
type LoginInput = {
    email: string,
    password: string,
}

function Login() {
    const {
        register,
        handleSubmit
    } = useForm<LoginInput>({});
    const { mutate } = useLogin({ resource: "login" });

    function onFinish(values: LoginForm) {
        mutate(values);
    }
    return (
        <div
            className="d-flex align-items-center py-4 bg-body-tertiary"
            style={{ height: "100vh" }}
        >
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit(onFinish)}>
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

            </main>
        </div>
    )
}

export default Login