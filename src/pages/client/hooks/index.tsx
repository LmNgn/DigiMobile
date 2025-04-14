// Hook
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  auth,
  create,
  deleteOne,
  getList,
  getOne,
  Props,
  update,
} from "../providers";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
export const useList = ({ resource = "products" }) => {
  return useQuery({
    queryKey: [resource],
    queryFn: () => getList({ resource }),
  });
};

// useOne -> getOne

export const useOne = ({ resource = "products", id }: Props) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => getOne({ resource, id }),
  });
};
// useCreate: addData
export const useCreate = ({ resource = "products" }) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => create({ resource, values }),
    onSuccess: () => {
      message.success("them thanh cong");
      // chuyen sang trang list: /products
      nav(`/admin/${resource}`);
    },
  });
};

// useUpdate: updateData
export const useUpdate = ({ resource = "products", id }: Props) => {
  const nav = useNavigate();

  return useMutation({
    mutationFn: (values: any) => update({ resource, id, values }),
    onSuccess: (data) => {
      message.success("update thanh cong");
      console.log({ data });
      // chuyen sang trang list: /products
      nav(`/admin/${resource}`);
    },
  });
};
// useDelete -> deleteOne
export const useDelete = ({ resource = "products" }: Props) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id?: string | number) => deleteOne({ resource, id }),
    onSuccess: () => {
      message.success("Xoá thành công");
      qc.invalidateQueries({ queryKey: [resource] });
    },
  });
};

// useAuth
export const useAuth = ({ resource = "register" }) => {
  const nav = useNavigate();
  const { setUser } = useUser();

  return useMutation({
    mutationFn: (values: any) => auth({ resource, values }),
    onSuccess: (data) => {
      if (resource === "register") {
        message.success("Đăng ký thành công");
        nav("/login");
        return;
      }
      
      const { accessToken, user } = data;
      console.log(user);

      if (user.role !== "customer") {
        message.error("Tài khoản không được phép đăng nhập ở trang người dùng");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        nav("/login");
        return;
      }
      message.success("Đăng nhập thành công");
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      nav("/");
    },
    onError: () => {
      message.error("Đăng nhập thất bại");
    },
  });
};
