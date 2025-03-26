import { useMutation } from "@tanstack/react-query";
import { ProductForm, create } from "../providers/dataProvider";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

type useListParams = {
  resource: string;
};

export const useCreate = ({ resource }: useListParams) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: ProductForm) => create({ resource, values }),
    onSuccess: () => {
      message.success("Thêm thành công");
      nav(`/admin/${resource}`);
    },
  });
};