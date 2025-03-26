import { useMutation } from "@tanstack/react-query";
import { ProductForm, update } from "../providers/dataProvider";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

type useListParams = {
  resource: string;
  id?: string | number;
};

export const useUpdate = ({ resource, id }: useListParams) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: ProductForm) => update({ resource, values, id }),
    onSuccess: () => {
      message.success("Cập nhật thành công");
      nav(`/${resource}`);
    },
  });
};
