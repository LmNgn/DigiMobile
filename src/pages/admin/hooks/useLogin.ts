// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { loginAdmin } from "../providers/dataProvider";
import { useNavigate } from "react-router-dom";

export const useLogin = ({ resource = "login" }) => {
    const nav = useNavigate();

    return useMutation({
        mutationFn: (values: any) => loginAdmin({ resource, values }),
        onSuccess: (data) => {
            const { accessToken, user } = data;
            console.log(user);
            
            // Kiểm tra role và trạng thái
            const isAdmin = user.role === "admin0" || user.role === "admin1";
            const isActive = user.status === true;

            if (!isAdmin) {
                message.error("Bạn không có quyền truy cập quản trị.");
                return;
            }

            if (!isActive) {
                message.error("Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.");
                return;
            }

            // Lưu token và điều hướng nếu hợp lệ
            localStorage.setItem("token", accessToken);
            localStorage.setItem("user", JSON.stringify(user));
            message.success("Đăng nhập thành công");
            nav("/admin");
        },
        onError: () => {
            message.error("Đăng nhập thất bại");
        },
    });
};
