import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { loginAdmin } from "../providers/dataProvider";
import { useNavigate } from "react-router-dom";

export const useLogin = ({ resource = "login" }) => {
    const nav = useNavigate();

    return useMutation({
        mutationFn: (values: any) => loginAdmin({ resource, values }),
        onSuccess: (data) => {
            message.success("Đăng nhập thành công");
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            nav("/admin");
        },
        onError: () => {
            message.error("Đăng nhập thất bại")
        }
    });
};