import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../providers/dataProvider";
import { message } from "antd";
export const useRegister = ({ resource = "register" }) => {
    const nav = useNavigate();
    return useMutation({
        mutationFn: (values: any) => register({ resource, values }),
        onSuccess: () => {
            message.success("Thêm thành công");
            nav("/admin/admins");
        },
    });
};